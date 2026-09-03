# The Vaughn Brothers Sign Co. — handoff

A front-end mockup for a Houston sign company. React 19 + Vite 8 + Tailwind 4, no backend.

**The company is fictional and every contact detail is a deliberate placeholder** — `(555) 555-5555`, `hello@example.com`, `1234 Example Street`. The 555 range and `example.com` are both reserved for fictional use, so nothing on the page can reach a real business.

---

## Two ways to send it

### 1. Live URL — the main link

Already built. The folder to upload is **`dist/`**.

1. Go to **https://app.netlify.com/drop**
2. Drag the whole **`dist`** folder onto the page
3. You get a public HTTPS link in about ten seconds

No account, no signup, no CLI. The link works on any phone or laptop. Rename the site from the Netlify dashboard if you want something tidier than the random URL.

To rebuild after a change:

```bash
npm run build
```

### 2. Single self-contained file — the attachment

**`dist-single/index.html`** — one file, 1.2 MB. Everything is inlined: the JavaScript, the CSS, all five fonts, and the favicon. Zero external requests, verified.

Double-click it and it runs. Works offline, from a USB stick, or straight out of an email attachment. Good as a fallback if a corporate mail filter strips links.

To rebuild:

```bash
npm run build:single
```

---

## What to point at when they look

- **The hero sign is interactive** — type your own business name onto it, change the tube colour, swap the typeface, flip the power switch and watch it flicker on.
- **Whatever you type on the sign carries into the quote form.** That's the detail worth mentioning out loud; it turns two demos into one product.
- **"Get a Quote" doesn't open a modal — it grows into one.** The button physically expands into the form panel and collapses back on close, from any of the five places it appears.
- **The quote form is a shop job ticket**: three steps, a live scale drawing that stays proportionally honest from a 1 ft plaque to a 150 × 80 ft pylon, inline validation, and a printed ticket with a `RECEIVED` stamp at the end.
- **Type `SRV` onto the hero sign.** Easter egg.
- The billboard tilts toward your cursor in 3D; the work rail scrolls itself and can be grabbed and thrown.

## Running the source

```bash
npm install
npm run dev
```

## Known scope

No backend — the quote form validates fully and reaches its success state without submitting anywhere. All imagery is CSS and inline SVG rather than photography, so the repo is self-contained; real photos would drop into the portfolio cards.
