# EMS ElRiyadh — Marketing Site (React + Vite)

Premium mobile EMS training in Riyadh. This is the React port of the approved
single-page design (warm / energetic / on-brand, red + black, MyoStyle® powered).

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

> Requires Node 18+.

## Project structure

```
ems-elriyadh/
├─ index.html              # fonts + pre-paint theme script + #root
├─ vite.config.js
├─ public/
│  └─ images/              # brand photography (real EMS ElRiyadh creatives)
│     ├─ hero.jpg          # hero + "You activate" step
│     ├─ cut2.jpg          # "You recharge" step + final CTA background
│     ├─ cut3.jpg          # "We arrive" step
│     └─ soc1..3.jpg       # @emselriyadh feed cards
└─ src/
   ├─ main.jsx             # entry
   ├─ App.jsx              # composition + loader/reveal orchestration
   ├─ index.css            # ALL styles + animations (design tokens at :root)
   ├─ constants.js         # WhatsApp number/links, prefers-reduced-motion
   ├─ hooks/
   │  ├─ useTheme.js        # light/dark toggle, persisted to localStorage
   │  └─ useScrollReveal.js # IntersectionObserver reveals + neon-arc draw + nav scroll
   └─ components/
      ├─ icons.jsx          # Ring logo, WhatsApp, Instagram, Arrow, Check
      ├─ Loader.jsx  Nav.jsx  Hero.jsx  Ticker.jsx  Benefits.jsx
      ├─ How.jsx  Stats.jsx  Where.jsx  Feed.jsx  Sessions.jsx
      └─ Faq.jsx  Final.jsx  Footer.jsx  MobileBook.jsx
```

## Theming

- Light is the default; dark is first-class. Toggle is in the nav.
- All colors live as CSS variables under `:root` and `html[data-theme="dark"]`
  in `src/index.css`. Brand red: `--red: #ED3B1B`.
- Theme persists to `localStorage` under the key `ems-theme`, and is applied
  pre-paint by a tiny script in `index.html` to avoid a flash.

## Content / editing notes

- **WhatsApp**: single source of truth in `src/constants.js` (`WA`, `PHONE`,
  `waLink()`). Every CTA uses it with a pre-filled message.
- **Copy** for each section lives at the top of its component as a small data
  array — easy to edit without touching markup.
- **Images**: replace the files in `public/images/` (keep the names) or update
  the `src` paths. The three `soc*.jpg` are the real Instagram creatives; hero
  and step images were cropped from the brand shots.
- The "Where" cards still use a few warm Unsplash interior shots (remote URLs in
  `Where.jsx`) as placeholders — swap for real brand photography when available.

## Compliance

Copy is intentionally framed as **fitness / toning / wellbeing / time-efficiency**.
No medical or guaranteed-outcome claims. There is a disclaimer in the Sessions
section ("a fitness training system, not a medical device or treatment").

## Accessibility & performance

- Respects `prefers-reduced-motion` (animations and count-ups degrade to static).
- AA-contrast scrims over all text-on-image.
- Native cursor (no custom cursor), keyboard-focusable, `:focus-visible` styles.
- Images are `loading="lazy"` / `decoding="async"` below the fold.
