// ── Decorations ────────────────────────────────────────────────────────────
const SHAPES = [
  { bg: '#f0b4bc', br: '50%',            w: 22, h: 22 },
  { bg: '#f5df9e', br: '50%',            w: 14, h: 14 },
  { bg: 'rgba(255,255,255,.52)', br: '50%', w: 20, h: 20 },
  { bg: '#90c49a', br: '0 60% 60% 0',   w: 11, h: 20, rot:  45 },
  { bg: '#90c49a', br: '60% 0 0 60%',   w: 11, h: 20, rot: -30 },
  { bg: '#f0b4bc', br: '50% 50% 0 50%', w: 18, h: 18, rot:  20 },
  { bg: '#c9a84c', br: '50%',            w:  8, h:  8 },
  { bg: '#e8c4ca', br: '50%',            w: 28, h: 28, op: .4 },
  { bg: '#a8d8b0', br: '50% 0 50% 0',   w: 16, h: 22, rot: 60 },
  { bg: '#f7e0a0', br: '50%',            w: 10, h: 10 },
  { bg: '#f0b4bc', br: '50%',            w: 16, h: 16 },
  { bg: '#90c49a', br: '50% 0',          w: 10, h: 18, rot: 30 },
];
const POS = [
  { top: '3%',  left: '4%'  }, { top: '7%',  left: '78%' },
  { top: '14%', left: '85%' }, { top: '20%', left: '3%'  },
  { top: '32%', left: '87%' }, { top: '38%', left: '2%'  },
  { top: '52%', left: '82%' }, { top: '58%', left: '5%'  },
  { top: '68%', left: '84%' }, { top: '74%', left: '3%'  },
  { top: '84%', left: '6%'  }, { top: '88%', left: '80%' },
];

function seedDecorations() {
  document.querySelectorAll('.bg-layer').forEach(layer => {
    POS.forEach((pos, i) => {
      const s  = SHAPES[i % SHAPES.length];
      const el = document.createElement('span');
      el.className = 'deco';
      el.style.cssText = `
        width:${s.w}px; height:${s.h}px;
        background:${s.bg}; border-radius:${s.br};
        top:${pos.top}; left:${pos.left};
        opacity:${s.op || 0.58};
        --rot:${s.rot || 0}deg;
        --dur:${2.2 + (i * .35) % 2}s;
        --delay:${(i * .28) % 2.5}s;
      `;
      layer.appendChild(el);
    });
  });
}

// ── Slides ─────────────────────────────────────────────────────────────────
const slides = Array.from(document.querySelectorAll('.slide'));
const segs   = document.querySelectorAll('.seg');
const arrL   = document.getElementById('arr-l');
const arrR   = document.getElementById('arr-r');
const total  = slides.length;
let current  = 0;

function goTo(index) {
  if (index < 0 || index >= total) return;

  slides.forEach((s, i) => {
    s.dataset.state = i < index ? 'left' : i > index ? 'right' : 'active';
  });
  current = index;

  // Pause video when not on cover, resume when back
  const video = document.querySelector('.cover-media');
  if (video) index === 0 ? video.play().catch(() => {}) : video.pause();

  // Trigger staggered content animation
  const inner = slides[index].querySelector('.slide-inner');
  if (inner) {
    inner.classList.remove('entered');
    void inner.offsetWidth;
    inner.classList.add('entered');
  }

  updateUI();
}

function updateUI() {
  segs.forEach((s, i) => s.classList.toggle('done', i <= current));
  arrL.classList.toggle('hidden', current === 0);
  arrR.classList.toggle('hidden', current === total - 1);
}

arrL.addEventListener('click', () => goTo(current - 1));
arrR.addEventListener('click', () => goTo(current + 1));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') goTo(current + 1);
  if (e.key === 'ArrowLeft')                   goTo(current - 1);
});

// ── Swipe ──────────────────────────────────────────────────────────────────
let tx = 0, ty = 0;
document.getElementById('slides').addEventListener('touchstart', e => {
  tx = e.touches[0].clientX;
  ty = e.touches[0].clientY;
}, { passive: true });

document.getElementById('slides').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 44)
    dx < 0 ? goTo(current + 1) : goTo(current - 1);
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

// Start muted so browser allows autoplay, unmute on first interaction
audio.play().then(() => {
  playing = true;
  musicBtn.textContent = '♫';
  function unmute() { audio.muted = false; }
  document.addEventListener('click',      unmute, { once: true });
  document.addEventListener('touchstart', unmute, { once: true, passive: true });
}).catch(() => {
  function autoStart() { if (!playing) { audio.muted = false; setMusic(true); } }
  document.addEventListener('click',      autoStart, { once: true });
  document.addEventListener('touchstart', autoStart, { once: true, passive: true });
});

// ── Countdown ─────────────────────────────────────────────────────────────
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

// ── Copy BCA ──────────────────────────────────────────────────────────────
document.getElementById('copy-btn').addEventListener('click', function () {
  navigator.clipboard.writeText('7025308875').then(() => {
    this.classList.add('copied');
    this.textContent = 'Tersalin ✓';
    setTimeout(() => {
      this.classList.remove('copied');
      this.textContent = 'Salin Nomor Rekening';
    }, 2500);
  });
});

// ── Init ──────────────────────────────────────────────────────────────────
seedDecorations();
updateUI();

// Kick video on mobile where autoplay attr alone may be blocked
const coverVideo = document.getElementById('cover-video');
if (coverVideo) coverVideo.play().catch(() => {});
