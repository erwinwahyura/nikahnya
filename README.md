# Erwin & Farras — Wedding Invitation

A simple, mobile-first digital wedding invitation website built with vanilla HTML/CSS/JS.
Shared via WhatsApp link — no framework, no build step, deploys anywhere.

---

## Content (from `data/`)

| Asset | Description |
|---|---|
| `data/Wedding/1.png` | Cover illustration — Erwin & Farras cartoon couple |
| `data/Wedding/2.png` | Quranic verse — Ar-Rum 21 (Arabic + Indonesian) |
| `data/Wedding/3.png` | Event details (names, date, venue) |
| `data/Wedding/4.png` | Gift info + closing |
| `data/Wedding/5.png` | Back cover illustration |
| `data/SVT...mp3.mpeg` | Background music — *Same Dream, Same Mind, Same Night* (Instrumental) |
| `data/Wedding.pdf` | Original print design (reference only) |

---

## Wedding Details

**Groom:** Erwin Wahyu Ramadhan S.Kom
— Putra kedua dari Bpk. Abd. Yusuf & Ibu Mukharomah

**Bride:** Farras Caesarmas Putri S.Ab., M.M.
— Putri pertama dari Bpk. Irwan M. & Ibu Adijah

**Akad Nikah:**
- Kamis, 2 Juli 2026
- KUA Kembangan, Jakarta Barat
- *(dan akad secara keluarga inti di Selasar Masjid Nabawi, Madinah)*

**Gift:**
- BCA `7025308875` a.n. FARRAS CAESARMAS PUTRI
- Konfirmasi WA: 081290536767

---

## Site Structure

```
nikahnya/
├── index.html          # Single-page invitation
├── style.css           # All styles (mobile-first)
├── script.js           # Countdown, music toggle, copy-to-clipboard
└── assets/
    ├── cover.png       # (renamed from 1.png)
    ├── quran.png       # (renamed from 2.png)
    ├── event.png       # (renamed from 3.png)
    ├── gift.png        # (renamed from 4.png)
    ├── closing.png     # (renamed from 5.png)
    └── music.mp3       # (renamed from SVT...mpeg)
```

---

## Page Sections

1. **Cover** — Illustration + "Erwin & Farras" + music toggle button
2. **Opening** — Bismillah greeting + Ar-Rum 21 verse
3. **Invitation** — Names, parents, date, venue
4. **Countdown** — Live timer to 2 Juli 2026
5. **Gift** — Bank account with one-tap copy + WA button
6. **Closing** — Jazakumullahu khairan

---

## Features

- **Background music** — plays on first user tap (browser autoplay policy); toggle button top-right
- **Countdown timer** — days / hours / minutes / seconds to the akad
- **Copy to clipboard** — tap BCA number to copy; shows "Tersalin!" confirmation
- **WA deep-link** — opens WhatsApp directly to 081290536767
- **Scroll animations** — sections fade in as user scrolls
- **No dependencies** — pure HTML/CSS/JS, single `index.html` deliverable if needed

---

## Design

- Color palette pulled from the illustrations: `#B8D4E8` (sky blue background), `#1B3B6F` (navy text), warm floral accents
- Font: *Playfair Display* (serif, for names) + *Poppins* (sans, for body) — both from Google Fonts
- Mobile-first, max-width 430px card layout (matches WhatsApp share preview)

---

## Deployment

Any static host works — GitHub Pages, Netlify, Vercel, or a simple file share.

```bash
# GitHub Pages (simplest)
git add .
git commit -m "wedding invitation"
git push origin main
# enable Pages → branch: main, folder: / (root)
```

---

## TODO

- [ ] Create `assets/` folder and copy/rename files from `data/`
- [ ] `index.html` — full page structure
- [ ] `style.css` — layout, typography, animations
- [ ] `script.js` — countdown, music, clipboard
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Deploy to GitHub Pages → share link
