# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static single-page React 19 + TypeScript + Vite landing page for Odylytics. Dark mode by default with a light mode toggle in the nav (v2, styled after the Finaro template: serif display headings, pill buttons, rounded cards, aurora gradients). Two source-of-truth documents live in the repo root:

- `CONTENT_OUTLINE.md` — section order, copy and data tables (English only). Decides **what** is shown.
- `DESIGN_GUIDELINES.md` — colours, typography, layout, components, motion, voice. Decides **how** it looks.

## Commands

```bash
npm install
npm run dev # Vite dev server
npm run build # tsc -b (project references) then vite build
npm run lint # oxlint
npm run preview # serve the built dist/
```

There is no test suite. CI-equivalent verification is `npm run lint && npm run build`.

## Code architecture

`src/main.tsx` mounts `<App />` into `#root` inside `<StrictMode>`. No router, no state library, no data fetching, no runtime dependencies besides React.

- `src/App.tsx` — composes the page: `Nav`, then `<main>` with `Hero`, `Solutions`, `Featured`, `Recognition`, `Partners`, `Testimonials`, `Team`, `Contact`, then `Footer`. Calls `useReveal()` once.
- `src/sections/*.tsx` — one component per section. Anchors: `#home`, `#solutions`, `#featured`, `#recognition`, `#partners`, `#testimonials`, `#team`, `#contact`. `Hero` ends with a solutions logo marquee strip (`.hero__trust`); `Testimonials` is a scroll-snap carousel (`.quotes__track`) with round arrow buttons; `Hero` and `Contact` both render an `.aurora` background layer.
- `src/components/` — `Button` (variants `primary` / `outline` / `inverse` / `signal`, renders `<a>` when `href` is set), `SectionHeading` + `Eyebrow` (serif `.h2-serif` with an italic `.em` tail), `Marquee` (duplicated CSS track, clone is `aria-hidden` + `inert`), `Modal` (native `<dialog>` + scroll-lock + focus return), `Icons` (includes `CheckIcon`, `ArrowLeftIcon` / `ArrowRightIcon`).
- `src/hooks/` — `useTheme` (`useSyncExternalStore` over `<html data-theme>`, `setTheme` persists to `localStorage['odylytics-theme']`; an inline script in `index.html` applies the saved theme before first paint), `useBrandAssets` (picks the wordmark/symbol variant for the current theme), `useReveal` (one shared IntersectionObserver for `[data-reveal]`), `useRotatingWord`, `useMediaQuery` / `usePrefersReducedMotion`. There is no parallax in v2.
- `src/data/content.ts` — all copy and data as typed module-level constants. Placeholders waiting for real content are marked `TODO(content)`; grep for it before shipping.

### Styling

- `src/index.css` — Google Fonts import (Instrument Serif for display, Inter for body/UI), design tokens (`--purple-*`, `--orange-*`, `--neutral-*` brand ramps; dark semantic tokens `--bg` / `--surface` / `--surface-2` / `--border` / `--text*` / `--accent*` / `--signal`; radii `--radius-card: 20px`, `--radius-chip: 14px`, `--radius-pill: 999px`), resets, type classes (`.display`, `.h2-serif` + `.em`, `.h3`, `.stat`, `.body-l`, `.label`), and shared primitives (`.btn`, `.eyebrow` pill badge, `.tag`, `.card`, `.logo-chip`, `.logo-placeholder`, `.aurora`, reveal).
- `src/App.css` — section- and component-level CSS, with breakpoints `≤1024/1100px`, `≤820px`, `≤520px` (plus a few per-grid ones).
- Components consume semantic tokens only; brand ramp variables stay inside `index.css` definitions. Light mode is purely a token override block (`:root[data-theme="light"]`), so never hard-code colours in component CSS — add a token with both values instead. In light mode signal text uses `--orange-500` and soft purple text uses `--purple-500` for contrast on white.
- Rules: pill buttons/badges/inputs, 20px-radius cards with 1px `--border`, no box-shadow, no inline styles, no CSS-in-JS or Tailwind. Orange `#FF8C00` is for text on dark backgrounds only; on orange fills use dark text.
- Gotcha: `backdrop-filter` on `.nav` makes it the containing block for the fixed `.nav__menu`, so `.nav.is-open` must reset `backdrop-filter: none`.
- Every motion respects `prefers-reduced-motion` (aurora animation, rotating word and marquees turn off; the hero logo marquee is replaced by the static `.strip-static` row).

### TypeScript / linting

- Linter is **oxlint** (not ESLint). Config in `.oxlintrc.json` enables `react`, `typescript`, `oxc` plugins; `react/rules-of-hooks` is `error`.
- `tsconfig.app.json` enables `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, and `noUnusedParameters`. Type-only imports must use `import type`; enums and parameter-property syntax are disallowed.

## Assets

Production assets live under `public/assets/` and are referenced with root-relative paths (`/assets/...`).

- `brand/odylytics-wordmark-dark.svg` — main logo in v2 (white text, for dark backgrounds), derived from `OdylyticsBrand/Horizontal Wordmark Logo Darkmode.svg` with the viewBox cropped to the artwork. Used in nav, hero and footer.
- `brand/odylytics-wordmark.svg` — light-background variant, kept for later use.
- `brand/odylytics-symbol.svg` / `brand/odylytics-symbol-dark.svg` — symbol (black / white fills), from `OdylyticsBrand/favicon.svg` (also `public/favicon.svg`). The dark variant is used for the hero note and team photo placeholders.
- `solutions/<name>.png` — solution logos (`aquaguard`, `airguard`, `includio`, `roomie`, `hearwork`, `enablecode`), centre-cropped and resized to 960px wide. `solutions/dark/<name>.png` holds the dark-mode variants with identical names and framing (source: `DarkMode/`, same crop); `useBrandAssets().solutionLogo(path)` swaps to them when the theme is dark.
- Expected later: `partners/<name>.svg`, `team/<name>.jpg`, recognition issuer logos. Until then the UI renders bordered placeholder blocks at final sizes.

`OdylyticsBrand/` holds the raw brand sources and the colour palette; don't reference it from code.
