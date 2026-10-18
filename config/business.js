// Central business configuration for AK GAMING LOUNGE.
// Edit this file to update the website. Everything public is generated from here.
// Opening hours are interpreted in Asia/Kolkata (IST, UTC+05:30, no daylight saving).
//
// VERIFICATION STATUS: address, phone, coordinates, hours, rating and review count
// come from a preliminary listing summary and must be verified before launch.
// Set reviews.verified to true only after checking the figures on Google.

const TZ = 'Asia/Kolkata';
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const BUSINESS = {
  name: 'AK GAMING LOUNGE',
  category: 'Gaming lounge / video game store',
  address: {
    lines: '17, Theni Road, Arasaradi, Arappalayam',
    locality: 'Madurai, Tamil Nadu 625016, India',
  },
  phone: { display: '+91 93603 57514', tel: '+919360357514' },
  maps: {
    url: 'https://maps.app.goo.gl/vr1VEephmvSRcUKo6',
    lat: 9.9285038,
    lng: 78.0979142,
  },
  timeZone: TZ,
  // Keys are weekday numbers (0 = Sunday). null means closed. Times are 24-hour "HH:MM".
  hours: {
    0: { open: '10:00', close: '23:00' },
    1: { open: '11:00', close: '23:00' },
    2: { open: '11:00', close: '23:00' },
    3: { open: '11:00', close: '23:00' },
    4: { open: '11:00', close: '23:00' },
    5: { open: '11:00', close: '23:00' },
    6: { open: '11:00', close: '23:00' },
  },
  social: {
    instagram: {
      label: 'Instagram',
      url: 'https://www.instagram.com/ak_gaming_lounge_mdu?utm_source=ig_web_button_share_sheet&vrfl=ZDNlZDc0MzIxNw==',
    },
  },
  reviews: {
    googleRating: 5.0,
    reviewCount: 17,
    verified: false, // false hides the numbers on the public site
    url: 'https://maps.app.goo.gl/8uuWpTVN87648Six5', // Google reviews link
    themes: [
      'PS5 gaming',
      'Spending time gaming with friends',
      'Clean and comfortable atmosphere',
      'Helpful staff',
    ],
  },
  catalogue: {
    platform: 'PlayStation 5',
    genres: [
      { id: 'all', label: 'All' },
      { id: 'action', label: 'Action' },
      { id: 'sports', label: 'Sports' },
      { id: 'racing', label: 'Racing' },
      { id: 'fighting', label: 'Fighting' },
    ],
    // status: 'available' or 'coming-soon'. Only 'available' titles can be picked in the booking form.
    games: [
      { id: 'gta5', title: 'GTA 5', genre: 'action', status: 'available', image: 'assets/games/gta5.jpg' },
      { id: '2k26', title: '2K26', genre: 'sports', status: 'available', image: 'assets/games/2k26.jpg' },
      { id: 'fc27', title: 'FC 27', genre: 'sports', status: 'available', image: 'assets/games/fc27.jpg' },
      { id: 'cricket26', title: 'Cricket 26', genre: 'sports', status: 'available', image: 'assets/games/cricket26.jpg' },
      { id: 'awayout', title: 'A Way Out', genre: 'action', status: 'available', image: 'assets/games/awayout.jpg' },
      { id: 'ittakestwo', title: 'It Takes Two', genre: 'action', status: 'available', image: 'assets/games/ittakestwo.jpg' },
      { id: 'splitfiction', title: 'Split Fiction', genre: 'action', status: 'available', image: 'assets/games/splitfiction.jpg' },
      { id: 'motogp25', title: 'MotoGP 25', genre: 'racing', status: 'available', image: 'assets/games/motogp25.jpg' },
      { id: 'mk2', title: 'Mortal Kombat 2', genre: 'fighting', status: 'available', image: 'assets/games/mk2.jpg' },
      { id: 'spiderman2', title: 'Spider-Man 2', genre: 'action', status: 'available', image: 'assets/games/spiderman2.jpg' },
      { id: 'resident', title: 'Resident Evil Requiem', genre: 'action', status: 'available', image: 'assets/games/resident.jpg' },
      { id: 'gt7', title: 'Gran Turismo 7', genre: 'racing', status: 'available', image: null },
      { id: 'first-light', title: '007 First Light', genre: 'action', status: 'available', image: 'assets/games/first-light.jpg' },
      { id: 'gta6', title: 'GTA 6', genre: 'action', status: 'coming-soon', image: 'assets/games/gta6.jpg' },
    ],
  },
  // Price per session, in rupees, per number of players. Shown as a table on the site.
  pricing: {
    currency: '\u20B9',
    columns: [
      { id: '30m', label: '30 mins' },
      { id: '1h', label: '1 hour' },
    ],
    rows: [
      { players: 1, label: '1 player', prices: { '30m': 120, '1h': 200 } },
      { players: 2, label: '2 players', prices: { '30m': 200, '1h': 300 } },
      { players: 3, label: '3 players', prices: { '30m': 250, '1h': 400 } },
      { players: 4, label: '4 players', prices: { '30m': 300, '1h': 500 } },
    ],
    note: 'Prices are per session for the number of players shown.',
  },
  // Frequently asked questions. Hours and prices are shown in their own sections, so answers point there.
  faqs: [
    {
      q: 'What does a session cost?',
      a: 'Prices are per session, for 30 minutes or 1 hour, and depend on how many players are playing. The price table in Sessions and pricing lists every option.',
    },
    {
      q: 'How many players can play at once?',
      a: 'You can book for 1 to 4 players. Choose your number of players in the booking form.',
    },
    {
      q: 'Which games can I play?',
      a: 'Every game in The lineup is on PS5. GTA 6 is coming soon and cannot be booked yet. The lineup can change, so call us before you visit to check a specific game.',
    },
    {
      q: 'Is my booking confirmed when I send the form?',
      a: 'No. Sending the form creates a booking enquiry. Our team confirms it by phone. Call us if you need an answer sooner.',
    },
    {
      q: 'Can I book a longer session or a group?',
      a: 'The booking form offers 30 minutes and 1 hour sessions. For longer sessions or larger groups, call us.',
    },
    {
      q: 'When are you open?',
      a: 'Opening hours are listed in the Visit us section, along with whether we are open right now. Times are in Indian Standard Time.',
    },
    {
      q: 'Where are you?',
      a: 'We are at 17, Theni Road, Arasaradi, Arappalayam, Madurai, Tamil Nadu 625016. Use Get directions in the Visit us section to open the route in Google Maps.',
    },
    {
      q: 'Can I pay online?',
      a: 'This website does not take payments. Call us to ask about payment options.',
    },
    {
      q: 'Where can I read reviews?',
      a: 'Our reviews are on Google. Use the Read reviews on Google button in the Reviews section.',
    },
  ],
  // Session lengths offered in the booking form (hours, as numbers).
  sessionOptions: [
    { value: 0.5, label: '30 minutes' },
    { value: 1, label: '1 hour' },
  ],
  sessionDurations: [0.5, 1],

  // Capacity: each booking uses one PS5. Up to 4 players share one PS5.
  capacity: { consoles: 3, maxPlayersPerConsole: 4 },

  // Holidays and special hours. Dates are YYYY-MM-DD in Asia/Kolkata.
  // closedDates: days the lounge is closed all day.
  // specialHours: { 'YYYY-MM-DD': { open: 'HH:MM', close: 'HH:MM' } } overrides the normal hours that day.
  closedDates: [],
  specialHours: {},
  playerOptions: [1, 2, 3, 4],
};

// ---- Time helpers (all in Asia/Kolkata) ----

function kolkataParts(date) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return { weekday: SHORT_DAYS.indexOf(p.weekday), minutes: Number(p.hour) * 60 + Number(p.minute) };
}

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

function fmtTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

// Form value "YYYY-MM-DDTHH:mm" is treated as Kolkata wall-clock time.
function parseKolkataLocal(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const ms = Date.parse(`${value}:00+05:30`);
  return Number.isNaN(ms) ? null : ms;
}

function kolkataInputNow(date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(date).map((x) => [x.type, x.value])
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

// Hours for a given date: holiday override first, then the normal weekday hours.
function hoursFor(dateKey, weekday) {
  if (BUSINESS.closedDates.includes(dateKey)) return null;
  return BUSINESS.specialHours[dateKey] || BUSINESS.hours[weekday] || null;
}

// True only if the whole session fits inside that day's opening hours.
function isWithinHours(startMs, hours) {
  const dateKey = kolkataInputNow(new Date(startMs)).slice(0, 10);
  const { weekday, minutes } = kolkataParts(new Date(startMs));
  const day = hoursFor(dateKey, weekday);
  if (!day) return false;
  return minutes >= toMin(day.open) && minutes + hours * 60 <= toMin(day.close);
}

function openStatus(date) {
  const { weekday, minutes } = kolkataParts(date);
  const todayKey = kolkataInputNow(date).slice(0, 10);
  if (BUSINESS.closedDates.includes(todayKey)) {
    return { isOpen: false, label: 'Closed today' };
  }
  const today = hoursFor(todayKey, weekday);
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { isOpen: true, label: `Open now, closes ${fmtTime(today.close)}` };
  }
  if (today && minutes < toMin(today.open)) {
    return { isOpen: false, label: `Closed, opens today at ${fmtTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (weekday + i) % 7;
    const next = hoursFor(new Date(date.getTime() + i * 86400e3).toISOString().slice(0, 10), d);
    if (next) {
      return { isOpen: false, label: `Closed, opens ${DAY_NAMES[d]} at ${fmtTime(next.open)}` };
    }
  }
  return { isOpen: false, label: 'Closed' };
}

// Data safe to send to the browser.
function publicView(date = new Date()) {
  return {
    name: BUSINESS.name,
    category: BUSINESS.category,
    address: BUSINESS.address,
    phone: BUSINESS.phone,
    maps: BUSINESS.maps,
    timeZone: TZ,
    hoursDisplay: [1, 2, 3, 4, 5, 6, 0].map((d) => ({
      day: DAY_NAMES[d],
      label: BUSINESS.hours[d] ? `${fmtTime(BUSINESS.hours[d].open)} to ${fmtTime(BUSINESS.hours[d].close)}` : 'Closed',
    })),
    status: openStatus(date),
    nowLocal: kolkataInputNow(date),
    social: BUSINESS.social,
    reviews: BUSINESS.reviews,
    catalogue: BUSINESS.catalogue,
    pricing: BUSINESS.pricing,
    sessionOptions: BUSINESS.sessionOptions,
    playerOptions: BUSINESS.playerOptions,
    faqs: BUSINESS.faqs,
  };
}

module.exports = { BUSINESS, publicView, parseKolkataLocal, isWithinHours, kolkataInputNow };
