# CLAUDE.md — EMS ElRiyadh website

> Read this fully before changing anything. It captures the *spirit*, the rules,
> the brand facts, the page architecture, and the exact build order. Match what's
> already in the Home page — **do not redesign**.

---

## 1. What this is

Marketing site for **EMS ElRiyadh** — premium, one-on-one **EMS (Electrical Muscle
Stimulation)** personal training that comes to the client's **home, hotel or compound
in Riyadh, KSA**. German-engineered, powered by the **MyoStyle(R)** suit/system.
Promise: *the studio comes to you — 20 minutes, twice a week.*

**Stack:** Vite + React 18 (JSX, no TypeScript). Plain CSS in `src/index.css`
(design tokens as CSS variables). No Tailwind, no UI kit.
**Run:** `npm install` -> `npm run dev` / `npm run build`.

The Home page is **approved and final in look & feel**. Everything new must look
like it belongs to it.

---

## 2. Brand facts (use these — do NOT invent)

- **Contact / WhatsApp / phone:** **+966 54 089 9508** — the single source of
  truth lives in `src/constants.js`. Never hardcode any of these; import them:
  - `WA` = `https://wa.me/966540899508` (link form)
  - `PHONE` = `+966 54 089 9508` (display form)
  - `waLink(message)` — builds a WhatsApp link with a pre-filled message
  - `EMAIL` = `info@emselriyadh.com`
  - `IG_HANDLE` = `@emselriyadh`
  - `INSTAGRAM` = `https://www.instagram.com/emselriyadh/`
  - `SITE` = `https://emselriyadh.com`
- **Coverage:** **all of Riyadh** (home / hotel / compound — no specific districts).
- **Hours:** available / flexible — **do not publish specific opening hours**.
  Phrase as "flexible scheduling across Riyadh" / "book a time that suits you".
- **Partner:** **MyoStyle(R)** (the German EMS suit/system) — credit it.
- **Pricing:** **DO NOT display prices anywhere.** Every plan/CTA routes to
  WhatsApp ("Enquire" / "Book on WhatsApp"). Present plans by *what's included*,
  not by number.
- **Testimonials & trainer profiles:** none real yet -> use clearly-marked
  **placeholders** (`// TODO: replace with real testimonial/trainer`). Plausible,
  on-brand, **no medical or guaranteed-result claims** in quotes.

---

## 3. Brand truths (NEVER break)

1. **Primary color** `--red: #ED3B1B`. Black + warm cream/off-white around it.
   Red = accent + highlight, not the whole page.
2. **Look = warm, bright, premium, energetic** (matches their real IG creatives:
   warm interiors, black EMS suit w/ red piping, red ring logo, neon-red glowing
   arc, soft red glow). NOT B&W, NOT flat/minimal, NOT busy/cheap.
3. **Language: English now.** Arabic + RTL is a later phase — keep all copy in
   data arrays so it's a translation layer later, not a rewrite.
4. **Convert via WhatsApp** (number above) using `waLink(message)`.
5. **HARD RULE — no medical/guaranteed claims.** Fitness, toning, strength,
   wellbeing, time-efficiency only. Keep the disclaimer. No "cure / guaranteed /
   weight loss / treatment / instant transformation".
6. **Dark AND light** both first-class. **Native cursor only** (custom cursor was
   rejected). Respect `prefers-reduced-motion`. AA contrast. Mobile excellent.

---

## 4. Design language & tokens

- **Fonts:** display = **Sora** (700/800); body/UI = **Plus Jakarta Sans**
  (loaded in `index.html`). Red accent words = `<span className="r">`.
- **Tokens:** all colors/spacing are CSS variables under `:root` /
  `html[data-theme="dark"]` at top of `src/index.css`. Reuse — don't add new hexes.
- **Signature motifs:** red ring logo `<Ring/>` (icons.jsx) - neon arc `.arc`
  (draws on scroll, glows) - red ambient `.glow` blobs.
- **Motion:** `.rv` = fade-up reveal (+ `.d1/.d2/.d3` stagger); `.arc` = stroke-draw.
  Hovers: cards lift + soft red glow + image zoom; buttons deepen + glow.
  Rich but cohesive — generous spacing, never cluttered.
- **Imagery:** real brand photos in `public/images/`. Avoid generic stock people
  (reads cheap / off-brand). Interiors-only stock OK as placeholder until real
  shots arrive (see `Where.jsx`).

---

## 5. Code conventions

- **Routing:** `react-router-dom`. Pages in `src/pages/`, reusable blocks in
  `src/components/`. A `Layout` renders `<Nav/>`, `<Outlet/>`, `<Footer/>`,
  `<MobileBook/>`, and a `ScrollToTop` on route change. Nav/Footer links use
  `<Link>` (hash anchors only for in-page jumps on Home).
- **One component/page per file, default-exported.** Copy lives as a **data array
  at the top** of the file (see Benefits/Where/Sessions/Faq).
- **All CTAs** use `waLink("...prefilled...")`, `target="_blank" rel="noopener noreferrer"`.
- **Reveals:** add `className="... rv"`. `useScrollReveal()` must run per page
  (re-observe on route change) — call it in Layout, re-run on navigation.
- **Section shell:** `<section className="pad"><div className="wrap">` + `.shead`
  header (`.eyebrow`, `<h2>` with `.r`, `.idx`).
- **Theme:** `useTheme()` + pre-paint script in `index.html` (localStorage `ems-theme`).
- New CSS -> `src/index.css`, existing tokens + naming. Responsive (test ~380px),
  reduced-motion safe.
- Mark every placeholder: `// TODO: replace with real ...`.

---

## 6. Site architecture — 12 pages (build routing first)

| # | Route | Page | Notes |
|---|-------|------|-------|
| 1 | `/` | **Home** | existing landing (sections already built) |
| 2 | `/about` | **About** | story + MyoStyle(R) partnership + values |
| 3 | `/how-it-works` | **How EMS Works** | the science/experience, compliant, no claims |
| 4 | `/trainers` | **Trainers** | profile cards (placeholder people) |
| 5 | `/pricing` | **Pricing / Sessions** | plans by *inclusions only*, NO prices -> WhatsApp |
| 6 | `/locations` | **Locations / Coverage** | all Riyadh: home/hotel/compound |
| 7 | `/results` | **Results & Testimonials** | placeholder reviews + "what to expect" |
| 8 | `/faq` | **FAQ** | full Q&A page |
| 9 | `/articles` | **Articles / Blog** | list of posts (data array now; CMS/markdown later) |
| 10 | `/articles/:slug` | **Article** | single post template |
| 11 | `/contact` | **Contact / Book** | booking form -> opens WhatsApp via `waLink()`; email + IG |
| 12 | `/privacy` & `/terms` | **Legal** | required for Meta/Google ads |

(12-13 routes total: Home + Articles list + Article detail + 2 legal = full set.)

---

## 7. Build order (ONE step at a time — confirm before next)

**Step 0 — Plan & routing skeleton.** Add `react-router-dom`. Create `Layout`
(Nav/Outlet/Footer/MobileBook + ScrollToTop + per-route reveal). Move current Home
sections into `pages/Home.jsx`. Add **stub** pages for all routes + wire Nav/Footer
`<Link>`s. Verify navigation works in both themes. *Stop, show me.*

**Step 1 — About + How EMS Works.** Real, compliant copy. *Stop, show me.*

**Step 2 — Trainers + Results/Testimonials.** Placeholder people/quotes, TODO-marked.

**Step 3 — Pricing + Locations.** Pricing = inclusions only, WhatsApp CTAs (no
prices). Locations = all-Riyadh coverage.

**Step 4 — FAQ page + Contact/Book.** Form fields: name, phone, area, preferred
time/plan -> build a WhatsApp message with `waLink()` and open it (no backend).
Show email + IG too.

**Step 5 — Articles list + Article template.** 2-3 placeholder posts in a data
array; structure so real posts/markdown drop in later.

**Step 6 — Legal (Privacy + Terms).** Simple, real boilerplate tailored to a KSA
fitness service that uses WhatsApp + runs ads.

**Step 7 — Ship plumbing.** Per-route SEO (`<title>`/meta/OG + JSON-LD
`LocalBusiness`), favicon + OG image from the red ring, GA4 + **Meta Pixel** (env
IDs; fire Lead on WhatsApp clicks), then deploy to Vercel + domain emselriyadh.com.

**Phase 2 (not now):** Arabic + full RTL toggle.

---

## 8. Definition of done

All 12 pages live with routing, both themes flawless, mobile-perfect, every CTA ->
WhatsApp (+966 54 089 9508), **no prices shown, no medical claims**, placeholders
clearly TODO-marked, SEO + analytics + legal in place, deployed to the domain.