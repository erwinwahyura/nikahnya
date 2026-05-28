// ── State ──────────────────────────────────────────────────────────────────
const slides  = Array.from(document.querySelectorAll('.slide'));
const dots    = document.querySelectorAll('.dot');
const segs    = document.querySelectorAll('.seg');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const total   = slides.length;
let current   = 0;

// ── Navigation ─────────────────────────────────────────────────────────────
function goTo(index) {
  if (index < 0 || index >= total) return;
  slides.forEach((s, i) => {
    s.dataset.state = i < index ? 'left' : i > index ? 'right' : 'active';
  });
  current = index;
  updateUI();
}

function updateUI() {
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
  segs.forEach((s, i) => s.classList.toggle('done', i < current));
  btnPrev.classList.toggle('hidden', current === 0);
  btnNext.classList.toggle('hidden', current === total - 1);
}

btnNext.addEventListener('click', () => goTo(current + 1));
btnPrev.addEventListener('click', () => goTo(current - 1));

// keyboard (desktop)
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') goTo(current + 1);
  if (e.key === 'ArrowLeft')                   goTo(current - 1);
});

// ── Swipe ──────────────────────────────────────────────────────────────────
let tx = 0, ty = 0;
const slidesEl = document.getElementById('slides');

slidesEl.addEventListener('touchstart', e => {
  tx = e.touches[0].clientX;
  ty = e.touches[0].clientY;
}, { passive: true });

slidesEl.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 44) {
    dx < 0 ? goTo(current + 1) : goTo(current - 1);
  }
}, { passive: true });

// ── Music ──────────────────────────────────────────────────────────────────
const audio    = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let playing    = false;

function setMusic(on) {
  playing = on;
  musicBtn.textContent = on ? '♫' : '♪';
  on ? audio.play().catch(() => {}) : audio.pause();
}

musicBtn.addEventListener('click', e => { e.stopPropagation(); setMusic(!playing); });

// auto-start on first user interaction
function autoStart() { if (!playing) setMusic(true); }
document.addEventListener('click',    autoStart, { once: true });
document.addEventListener('touchend', autoStart, { once: true });

// ── Countdown ──────────────────────────────────────────────────────────────
const TARGET = new Date('2026-07-02T08:00:00+07:00');
const pad    = n => String(n).padStart(2, '0');

function tick() {
  const diff = Math.max(0, TARGET - Date.now());
  document.getElementById('days').textContent  = pad(Math.floor(diff / 86400000));
  document.getElementById('hours').textContent = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('mins').textContent  = pad(Math.floor((diff % 3600000) / 60000));
  document.getElementById('secs').textContent  = pad(Math.floor((diff % 60000) / 1000));
}
tick();
setInterval(tick, 1000);

// ── Copy BCA ───────────────────────────────────────────────────────────────
document.getElementById('copy-btn').addEventListener('click', function () {
  navigator.clipboard.writeText('7025308875').then(() => {
    this.classList.add('copied');
    this.textContent = '✓  Tersalin!';
    setTimeout(() => {
      this.classList.remove('copied');
      this.textContent = '🏦  Salin Nomor BCA';
    }, 2500);
  });
});

// ── Init ───────────────────────────────────────────────────────────────────
updateUI();
