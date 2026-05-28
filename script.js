// ── Music ──────────────────────────────────────────────────────────────────
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let playing = false;

function setMusicState(on) {
  playing = on;
  musicBtn.textContent = on ? '🎵' : '🔇';
  if (on) { audio.play().catch(() => {}); }
  else { audio.pause(); }
}

musicBtn.addEventListener('click', () => setMusicState(!playing));

// start on first user interaction anywhere
document.addEventListener('click', () => { if (!playing) setMusicState(true); }, { once: true });
document.addEventListener('touchstart', () => { if (!playing) setMusicState(true); }, { once: true });

// ── Countdown ──────────────────────────────────────────────────────────────
const TARGET = new Date('2026-07-02T08:00:00+07:00');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = TARGET - Date.now();
  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('mins').textContent = '00';
    document.getElementById('secs').textContent = '00';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('days').textContent = pad(d);
  document.getElementById('hours').textContent = pad(h);
  document.getElementById('mins').textContent = pad(m);
  document.getElementById('secs').textContent = pad(s);
}
tick();
setInterval(tick, 1000);

// ── Copy to clipboard ──────────────────────────────────────────────────────
document.getElementById('copy-btn').addEventListener('click', function () {
  navigator.clipboard.writeText('7025308875').then(() => {
    this.classList.add('copied');
    this.innerHTML = '✓ &nbsp;Tersalin!';
    setTimeout(() => {
      this.classList.remove('copied');
      this.innerHTML = '🏦 &nbsp;Salin Nomor BCA';
    }, 2500);
  });
});

// ── Scroll fade-in ─────────────────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('section').forEach(s => observer.observe(s));
