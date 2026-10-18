const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { BUSINESS, publicView, parseKolkataLocal, isWithinHours } = require('./config/business');
const { appendEnquiryToSheet, sheetEnabled } = require('./lib/sheets');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');
const GAME_TITLES = BUSINESS.catalogue.games.filter((g) => g.status === 'available').map((g) => g.title);
const HOUR = 3600e3;

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ---- Enquiry storage (JSON file for now; move to a database later) ----
let enquiries = [];

function loadEnquiries() {
  try {
    enquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    enquiries = [];
  }
}

function saveEnquiries() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2));
}

loadEnquiries();

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

// Consoles in use during [startMs, endMs), ignoring cancelled enquiries.
function consolesInUse(startMs, endMs) {
  return enquiries.filter(
    (e) => e.status !== 'cancelled' && e.start < endMs && startMs < e.start + e.hours * HOUR
  ).length;
}

// ---- Routes ----
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/business', (req, res) => res.json(publicView()));

app.post('/api/bookings', async (req, res) => {
  const body = req.body || {};
  const name = clean(body.name, 61);
  const phone = typeof body.phone === 'string' ? body.phone.replace(/[\s-]/g, '') : '';
  const email = clean(body.email, 121);
  const hours = Number(body.hours);
  const players = Number(body.players);
  const game = clean(body.game, 80);
  const startMs = parseKolkataLocal(body.start);
  const errors = [];

  if (name.length < 2 || name.length > 60) errors.push('Enter a name between 2 and 60 characters.');
  if (!/^\+?\d{10,13}$/.test(phone)) errors.push('Enter a valid phone number.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Enter a valid email address, or leave it blank.');
  if (startMs === null || startMs < Date.now() - 60e3) errors.push('Pick a future date and time.');
  if (!BUSINESS.sessionDurations.includes(hours)) errors.push('Choose a session length: 30 minutes or 1 hour.');
  if (!BUSINESS.playerOptions.includes(players)) errors.push('Choose between 1 and 4 players.');
  if (game && !GAME_TITLES.includes(game)) errors.push('Pick a game from the list, or leave it blank.');

  const validTime = startMs !== null && BUSINESS.sessionDurations.includes(hours);
  if (validTime && !isWithinHours(startMs, hours)) {
    errors.push('We are closed for part of that session. Choose a time within our opening hours.');
  }
  if (validTime && errors.length === 0) {
    const endMs = startMs + hours * HOUR;
    if (consolesInUse(startMs, endMs) >= BUSINESS.capacity.consoles) {
      errors.push('All PS5s are booked for that time. Please choose another time.');
    }
  }

  if (errors.length) return res.status(400).json({ errors });

  const enquiry = {
    reference: `AK-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    name,
    phone,
    email: email || null,
    start: startMs,
    hours,
    players,
    game: game || null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  enquiries.push(enquiry);
  saveEnquiries();

  // Mirror to Google Sheets if configured. A sheet failure must not lose the enquiry.
  if (sheetEnabled()) {
    appendEnquiryToSheet(enquiry).catch((err) => console.error('Sheet sync failed:', err.message));
  }

  // Never echo the phone or email back to the client
  res.status(201).json({
    enquiry: {
      reference: enquiry.reference,
      status: enquiry.status,
      start: enquiry.start,
      hours: enquiry.hours,
      players: enquiry.players,
      game: enquiry.game,
    },
  });
});

app.use('/api', (req, res) => res.status(404).json({ errors: ['Not found.'] }));

app.listen(PORT, () => {
  console.log(`AK Gaming Lounge website running at http://localhost:${PORT}`);
});
