# The Vaughn Brothers Sign Co.

A front-end build for a Houston sign shop — Texas-cowboy styling, a hero neon sign you can actually type on, and a quote form that grows out of whichever button you pressed.

**React 19 · Vite 8 · Tailwind CSS 4 · Motion 13**

> The shop is fictional and every contact detail is a deliberate placeholder — `(555) 555-5555`, `hello@example.com`, `1234 Example Street`. The 555 range and `example.com` are both reserved for fictional use, so nothing on the page can reach a real business.

---

## Run it

```bash
npm install
npm run dev
```

| Script | Output |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | `dist/` — static site, relative paths, deploys anywhere |
| `npm run build:single` | `dist-single/index.html` — one self-contained file, ~1.2 MB, zero external requests |

The single-file build inlines the JavaScript, the CSS, all five fonts and the favicon. Double-click it and it runs offline.

## What's interesting in here

**The hero sign is the product demo.** Type your business name onto it, change the tube colour, swap the typeface, flip the power switch and watch it flicker on. Whatever you type carries into the quote form as the business name — two demos wired into one.

**"Get a Quote" doesn't open a modal, it *becomes* one.** The button physically expands into the form panel and collapses back on close, from any of the six places it appears. Each trigger owns its own `layoutId`; the modal adopts the id of whichever one was pressed, so the morph starts from the right corner of the screen every time.

**The quote form is a shop job ticket.** Three steps, inline validation, and a live scale drawing with a 6 ft human for reference that stays proportionally honest from a 1 ft plaque to a 150 × 80 ft pylon. It ends on a printed ticket with a `RECEIVED` stamp.

**The work rail scrolls itself, and you can throw it.** Auto-scroll on a float accumulator, click-and-drag in both directions with release inertia, seamless wrap at both ends. Native touch scrolling is left completely alone.

**The billboard tilts toward your cursor** in 3D, and the page runs a light/dark theme that survives a reload without a flash of the wrong one.

Type `SRV` onto the hero sign.

## Layout

```
src/
├── components/
│   ├── hero/       Hero, NeonSign, PowerSwitch, SignControls
│   ├── layout/     Nav, Footer, MobileDrawer, ThemeToggle
│   ├── quote/      QuoteTrigger, QuoteModal, the three steps, JobTicket
│   ├── sections/   PortfolioRail, Services, Billboard3D, Process, Contact …
│   └── ui/         Button, Marquee, Reveal, RopeDivider, StarMark
├── data/site.js     All copy, links and contact details in one place
├── lib/             quoteContext — form state, validation, hero↔form bridge
└── index.css        Tailwind v4 @theme tokens, neon/grain/woodgrain utilities
```

Tailwind v4 has no `tailwind.config.js` — tokens live in the `@theme` block in [`src/index.css`](src/index.css), and class-based dark mode is declared there as a `@custom-variant`.

## Scope

No back end. The quote form validates fully and reaches its success state without submitting anywhere. All imagery is CSS and inline SVG rather than photography, so the repo is self-contained — real photos drop straight into the portfolio cards.
