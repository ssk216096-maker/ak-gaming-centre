const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = matchMedia('(pointer: coarse)').matches;

const esc = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function api(path, options) {
  const res = await fetch(path, options);
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

/* 1. Intro: split the headline into letters for the staggered entrance.
   Each word is kept together (nowrap) so the headline only breaks between words. */
$$('.split').forEach((el) => {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  let i = 0;
  text.split(' ').forEach((word, wi, words) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'word';
    wordEl.setAttribute('aria-hidden', 'true');
    [...word].forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.setProperty('--i', i++);
      span.textContent = ch;
      wordEl.appendChild(span);
    });
    el.appendChild(wordEl);
    if (wi < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
      i++;
    }
  });
});

/* 2. Scroll-linked motion: progress bar, nav state, hero parallax */
const nav = $('.nav');
const progress = $('.progress');
const hero = $('.hero');
let scrollQueued = false;

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  nav.classList.toggle('scrolled', scrollY > 40);
  if (!reduceMotion) hero.style.setProperty('--parallax', `${Math.min(scrollY, 800) * 0.25}px`);
  scrollQueued = false;
}

addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
onScroll();

/* 3. Cursor light that eases toward the pointer */
const glow = $('.glow');
if (reduceMotion || coarsePointer) {
  glow.style.display = 'none';
} else {
  let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  (function follow() {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  })();
}

/* 4. Scroll reveals (each element animates once) */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveals(root = document) {
  $$('[data-reveal]', root).forEach((el) => revealObserver.observe(el));
}
observeReveals();

/* 5. Business data: loaded once from the backend, used everywhere */
let B = null;

function renderStatus(status) {
  $$('[data-status]').forEach((el) => {
    el.textContent = status.label;
    el.classList.toggle('is-open', status.isOpen);
    el.classList.toggle('is-closed', !status.isOpen);
  });
}

function renderBusiness(b) {
  $$('[data-name]').forEach((el) => { el.textContent = b.name; });
  $$('[data-phone]').forEach((el) => { el.textContent = b.phone.display; });
  $$('[data-tel]').forEach((el) => { el.href = `tel:${b.phone.tel}`; });
  $$('[data-maps]').forEach((el) => { el.href = b.maps.url; });
  $$('[data-instagram]').forEach((el) => { el.href = b.social.instagram.url; });
  $$('[data-reviews]').forEach((el) => { el.href = b.reviews.url; });
  $$('[data-directions]').forEach((el) => {
    el.href = `https://www.google.com/maps/dir/?api=1&destination=${b.maps.lat},${b.maps.lng}`;
  });
  $$('[data-address]').forEach((el) => { el.textContent = `${b.address.lines}, ${b.address.locality}`; });

  $('#hours-list').innerHTML = b.hoursDisplay
    .map((d) => `<div><dt>${esc(d.day)}</dt><dd>${esc(d.label)}</dd></div>`).join('');

  renderStatus(b.status);
  renderReviews(b.reviews);
  renderFaqs(b.faqs);
  renderPricing(b);
  renderGameOptions(b);
  setupGenreFilter(b);
  setupBookingForm(b);
}

function renderReviews(r) {
  $('#review-stats').textContent = r.verified
    ? `${r.googleRating.toFixed(1)} out of 5 from ${r.reviewCount} reviews on Google.`
    : 'Read the latest reviews on Google.';
  $('#review-themes').innerHTML = r.themes.map((t) => `<li>${esc(t)}</li>`).join('');
}

function renderFaqs(faqs) {
  $('#faq-list').innerHTML = faqs.map((f) => `
    <details class="faq-item">
      <summary>${esc(f.q)}</summary>
      <p>${esc(f.a)}</p>
    </details>`).join('');
}

function renderPricing(b) {
  const { currency, columns, rows, note } = b.pricing;
  const money = (n) => `${currency}${Number(n).toLocaleString('en-IN')}`;

  $('#pricing-grid').innerHTML = `
    <div class="price-table" data-reveal role="table" aria-label="Session prices by number of players">
      <div class="price-row price-head" role="row">
        <span role="columnheader">Players</span>
        ${columns.map((c) => `<span role="columnheader">${esc(c.label)}</span>`).join('')}
      </div>
      ${rows.map((r) => `
        <div class="price-row" role="row">
          <span role="rowheader" class="price-players">${esc(r.label)}</span>
          ${columns.map((c) => `<span role="cell" class="price-value">${money(r.prices[c.id])}</span>`).join('')}
        </div>`).join('')}
    </div>
    <div class="pricing-footer" data-reveal>
      <p class="muted">${esc(note)}</p>
      <div class="plan-actions">
        <a class="btn btn-primary" href="#book">Book a session</a>
        <a class="btn" href="tel:${esc(b.phone.tel)}">Call ${esc(b.phone.display)}</a>
      </div>
    </div>`;
  observeReveals($('#pricing-grid'));
}

/* 6. Game lineup: suggested titles, filtered client-side, labelled as unverified */
const gamesGrid = $('#games-grid');
let genre = 'all';

function renderGames() {
  const games = B.catalogue.games.filter((g) => genre === 'all' || g.genre === genre);
  gamesGrid.innerHTML = games.length
    ? games.map((g, i) => `
        <article class="game${g.status === 'coming-soon' ? ' is-soon' : ''}${g.image ? '' : ' no-art'}" style="--i:${i}">
          ${g.image
            ? `<div class="game-art"><img src="${esc(g.image)}" alt="${esc(g.title)} cover art" loading="lazy"></div>`
            : ''}
          <div class="game-body">
            <h3>${esc(g.title)}</h3>
            <div class="meta">
              <span>${esc(B.catalogue.platform)}</span>
              <span class="badge ${g.status === 'coming-soon' ? 'badge-soon' : 'badge-live'}">
                ${g.status === 'coming-soon' ? 'Coming soon' : 'Available'}
              </span>
            </div>
          </div>
        </article>`).join('')
    : '<p class="muted">No titles in this category yet.</p>';
}

function setupGenreFilter(b) {
  const chips = $('#genre-chips');
  chips.innerHTML = b.catalogue.genres
    .map((g) => `<button class="chip" role="tab" data-genre="${esc(g.id)}" aria-selected="${g.id === genre}">${esc(g.label)}</button>`)
    .join('');
  chips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    genre = chip.dataset.genre;
    $$('.chip', chips).forEach((c) => c.setAttribute('aria-selected', String(c === chip)));
    gamesGrid.classList.add('swap');
    setTimeout(() => {
      renderGames();
      gamesGrid.classList.remove('swap');
    }, reduceMotion ? 0 : 250);
  });
  renderGames();
}

gamesGrid.addEventListener('pointermove', (e) => {
  const card = e.target.closest('.game');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
});

function renderGameOptions(b) {
  $('#game').insertAdjacentHTML('beforeend',
    b.catalogue.games
      .filter((g) => g.status === 'available')
      .map((g) => `<option value="${esc(g.title)}">${esc(g.title)}</option>`).join(''));
}

/* 7. Booking enquiry: sent to the backend, never shown as confirmed */
const form = $('#book-form');
const msg = $('#form-msg');
const ticket = $('#ticket');
const submitBtn = form.querySelector('button[type="submit"]');

function showError(text) {
  msg.className = 'form-msg error';
  msg.textContent = text;
  form.classList.remove('shake');
  void form.offsetWidth;
  form.classList.add('shake');
}

function setupBookingForm(b) {
  $('#hours').innerHTML = b.sessionOptions
    .map((o) => `<option value="${o.value}">${esc(o.label)}</option>`).join('');
  $('#players').innerHTML = b.playerOptions
    .map((n) => `<option value="${n}">${n} player${n > 1 ? 's' : ''}</option>`).join('');
  form.start.min = b.nowLocal; // Asia/Kolkata wall-clock time
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(form));

  if (!body.name?.trim()) return showError('Enter your name.');
  if (!body.phone?.trim()) return showError('Enter a phone number so we can confirm.');
  if (!body.start) return showError('Pick a preferred date and time.');

  msg.className = 'form-msg';
  msg.textContent = 'Sending your enquiry…';
  submitBtn.disabled = true;

  try {
    const { ok, data } = await api('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!ok) return showError((data.errors || ['Something went wrong. Please try again.']).join(' '));

    const en = data.enquiry;
    msg.className = 'form-msg ok';
    msg.textContent = 'Enquiry sent. We will confirm by phone.';
    $('#t-id').textContent = en.reference;
    $('#t-time').textContent = new Date(en.start).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short',
    }) + ' IST';
    const option = B.sessionOptions.find((o) => o.value === en.hours);
    $('#t-session').textContent = `${option ? option.label : `${en.hours} hours`}${en.game ? `, ${en.game}` : ''}`;
    $('#t-players').textContent = `${en.players} player${en.players > 1 ? 's' : ''}`;
    ticket.hidden = false;
    setTimeout(() => ticket.classList.add('show'), 30);
    form.reset();
    setupBookingForm(B);
  } catch {
    showError('Network issue. Check your connection and try again.');
  } finally {
    submitBtn.disabled = false;
  }
});

/* 8. Copy address */
const copyBtn = $('#copy-address');
copyBtn.addEventListener('click', async () => {
  const full = `${B.address.lines}, ${B.address.locality}`;
  try {
    await navigator.clipboard.writeText(full);
    copyBtn.textContent = 'Address copied';
  } catch {
    copyBtn.textContent = 'Copy failed. Select the address manually';
  }
  setTimeout(() => { copyBtn.textContent = 'Copy address'; }, 2200);
});

/* Boot */
$('#year').textContent = new Date().getFullYear();

async function boot() {
  const { ok, data } = await api('/api/business');
  if (!ok) {
    $$('[data-status]').forEach((el) => { el.textContent = 'Opening hours are unavailable right now. Please call us.'; });
    return;
  }
  B = data;
  renderBusiness(B);
}

async function refreshStatus() {
  const { ok, data } = await api('/api/business');
  if (ok) {
    B.status = data.status;
    B.nowLocal = data.nowLocal;
    renderStatus(B.status);
    form.start.min = B.nowLocal;
  }
}

boot();
setInterval(refreshStatus, 60000);
