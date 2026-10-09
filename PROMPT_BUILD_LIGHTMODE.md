# Prompt — Rebuild the Odylytics landing page (Light mode, v1)

Copy everything below the line into the coding chat.

---

## Role & goal

You are rebuilding the Odylytics landing page from scratch in this repo (React 19 + TypeScript + Vite, plain CSS, oxlint). Build a **light-mode-only** version first. The result must follow two source-of-truth documents in the repo root:

1. `CONTENT_OUTLINE.md`: section order, copy, data tables. All on-page copy is **English**.
2. `DESIGN_GUIDELINES.md`: colours, typography, layout, components, motion, voice.

Read both files fully before writing any code. Also read `CLAUDE.md` for repo conventions. If the outline and the guidelines conflict, the outline decides **what** to show and the guidelines decide **how** it looks. The light-mode rules below override the guidelines' dark-first defaults.

## Before you code: audit the repo

- `src/App.tsx` (~1000 lines) and `src/App.css` contain the **old** site (bilingual EN/VI via a `tx()` helper, LiquidEther hero, coin parallax, testimonial modal, team coins, contact form). Treat them as reference only. You may reuse useful patterns (IntersectionObserver reveal, `useCoinParallax` pointer logic, testimonial modal with Escape/scroll-lock, mailto contact form), but rewrite the page to match the new outline.
- **Drop the VI translation for now.** Write English only and remove the `tx()` / language toggle plumbing. Keep copy in module-level constant arrays so a later i18n pass is easy.
- `public/assets/` **does not currently exist**, even though the old code references `/assets/...`. Don't rely on old asset paths. Create the folder structure you need under `public/assets/` and use root-relative paths (`/assets/...`).
- Brand files are in `OdylyticsBrand/`:
  - `Horizontal Wordmark Logo Lightmode.svg`: main logo. Per guidelines §4.1, copy it to `public/assets/brand/odylytics-wordmark.svg` and remove the white background `<rect>` and the black outer border so it's transparent. Don't change the gradient.
  - `favicon.svg`: symbol. Copy to `public/assets/brand/odylytics-symbol.svg`. Use it for the favicon, the parallax decoration and the watermark.
- **The 7 core-solution logos** will be in a folder I add to the repo (expected at `public/assets/solutions/`; if it's somewhere else, find it and move it there). Use the real filenames. Map each logo to its row in the `CONTENT_OUTLINE.md` §2 table, and use the filename as the solution name when the outline still says `[TBD]`. If the folder isn't there yet, build with clearly named placeholder tiles and tell me which files you expect.
- For every other missing asset (partner logos, team photos, award images), use neutral placeholder blocks with 1px borders that keep the final layout sizes. Never use stock or AI imagery.
- For every `[TBD]` in the outline, write short, realistic placeholder copy in the brand voice, wrap it in a clearly greppable marker in the data constants (e.g. `// TODO(content)`), and keep it calm and factual. **Never invent statistics, award names, partner names or testimonials that look real.** Use obvious placeholders such as `Partner Name`, `Award Title — 2025`.

## Light-mode adaptation of the guidelines

The guidelines describe a dark-first site. For this pass, **every section uses a light background**:

- Backgrounds alternate between `--white` and `--neutral-100` (`#E4E3E5`) to keep the section rhythm. No `neutral-700` section backgrounds this pass, including the hero and footer.
- Text: primary `--neutral-700`, muted/two-tone lead `--neutral-300` for headline lead clauses, metadata `--neutral-400`.
- Borders and hatch dividers: `--neutral-200`.
- Logo: use the original **black + gradient** wordmark everywhere. Don't use the negative version.
- Purple text on white is AA-compliant (~4.9:1). **Orange text on white is forbidden.** For orange text use `--orange-500` (`#944F00`). `--orange-300` is only allowed as a fill (badge/button background) with **black** text.
- Hero CTA: **Primary** (purple bg, white text) + **Outline** (instead of Inverse).
- Brand colour ≤ ~15% of the visible area, purple:orange ≈ 65:35. The gradient `--gradient-brand` is allowed **once per viewport** at most.
- Implement all tokens in `src/index.css` exactly as listed in guidelines §11, plus the Google Fonts import from §3 (Exo 2 + Google Sans Flex). Remove the old tokens (`--blue`, `--aqua-bg`, Montserrat, etc.). Structure the semantic tokens (`--bg-*`, `--text-*`, `--border-*`) so dark mode can be added later by overriding them under a `[data-theme="dark"]` selector. Don't build dark mode now.
- Square corners (`--radius: 0`), 1px borders, **no box-shadow**, no glassmorphism. Only avatars may be round.

## Page structure (follow `CONTENT_OUTLINE.md` exactly)

0. **Nav**: fixed, 64px high, white with 1px bottom border, background blur after scroll. Left: wordmark (height ≥ 24px). Center/right: `SOLUTIONS · RECOGNITION · PARTNERS · TEAM · CONTACT` (Label style, uppercase). Right: Primary button `GET IN TOUCH →`. On ≤820px: 64×64 square menu button that opens a full-screen white menu with H1-sized links numbered `01`–`05` in purple.
1. **Hero `#home`**: see the parallax spec below.
2. **Core Digital Solutions `#solutions`**: eyebrow + H2 + intro, then an **infinite horizontal logo loop** of the 7 solution logos (CSS transform marquee, duplicated track, 40s per cycle, pause on hover/focus). Each tile: logo + name. Hovering or keyboard-focusing a tile reveals its one-liner. Flagship tiles (AquaGuard, AirGuard) get a small purple `FLAGSHIP` label. Also render an accessible static list (`sr-only`, or a visible grid fallback under reduced motion) so all 7 solutions are reachable without the animation.
3. **Featured Solutions `#featured`**: the 2 flagships as large alternating rows (visual left/text right, then swapped). Each row: badge, name, tagline, problem, 3–4 features as a 1px-bordered feature grid (guidelines §6.5), 1–3 metric blocks (Stat style, number in `--orange-500`), CTA `LEARN MORE →`.
4. **Awards & Certifications `#recognition`**: placed **directly after** Featured, visually connected to it (e.g. a hatch divider between them, or the same container frame). Group the cards by flagship using tabs or two columns. Card: issuer logo placeholder, type label (`AWARD` / `CERTIFICATION` / `ACCELERATOR`), title, issuer, year, 1-line context.
5. **Partnerships `#partners`**: 3×2 grid of bordered cells with no gaps (shared 1px borders, like guidelines §6.5). Each cell: logo (grayscale, full colour on hover), partner type label, name, ≤ 25-word description.
6. **Testimonials `#testimonials`**: 4 cards in a 2×2 grid. Quote, name, role + organisation, avatar (round), related-solution label. Quotes over ~300 characters get a `READ MORE` that opens an accessible modal (focus trap, Escape to close, body scroll-lock). Optional stat headline only if the outline provides a verified number. Otherwise omit it.
7. **Core Team `#team`**: 5 cards in one row on desktop (5 → 3+2 → 2 → 1 as the width shrinks). Photo (duotone/grayscale placeholder), name (H3), role (Label, purple), 1-line bio, LinkedIn icon link.
8. **Contact + Footer `#contact`**: two-tone headline, form (Name, Email, Organisation, Message → `SEND MESSAGE →`, mailto submit like the old code). Footer: link columns (Solutions ×7, Company, Contact with `A`/`P`/`E` labels, Social separated by `/`), then the **giant full-width `ODYLYTICS` wordmark** in Exo 2 Bold `--neutral-700`, with the "O" filled by `--gradient-brand` (background-clip text). Then the © line.

Every section has the `■ LABEL` eyebrow (8×8 purple square, 12px gap, 32px above the H2), sentence-case two-tone H2s, and uses the type scale from guidelines §3.1.

## Hero spec: light mode + parallax

Layout from guidelines §7.1, adapted to light mode:

- Background `--white`, height `100svh` (min ~720px), content in the 1440px container.
- **Asymmetric two-block Display headline**: top block left-aligned, bottom block right-aligned. Use headline option A/B/C from the outline (pick one and keep the others as comments). Include the **rotating keyword** in `--orange-500`: `predict → protect → respond → recover`, slide-up with a mask, 500ms transition every 2.5s, `aria-live="off"`, and a stable `sr-only` full sentence for screen readers.
- Eyebrow `■ AI-POWERED DIGITAL SOLUTIONS`, Body L sub-headline (max 64ch), Primary + Outline CTAs, and the wordmark logo prominently placed (the brief requires the Odylytics logo in the hero). Provide a visually hidden `<h1>`.
- Optional uppercase marquee strip at the bottom of the hero (Label, `--neutral-400`, separated by purple `■`).

**Parallax (required)**: a layered depth scene behind and around the headline.

- **Layers (back → front)**, each an absolutely positioned element with `data-depth`:
  1. Very large Odylytics symbol watermark, opacity 4–6%.
  2. Subtle 1px grid / hatch pattern in `--neutral-200` (8-bit accent, guidelines §5.2).
  3. A few floating geometric brand accents: small squares/outlined squares and 1–2 tiny symbol marks, mostly purple, one or two orange (`--orange-300` fills only), plus 2–3 of the 7 solution logos as floating chips if the folder exists.
  4. Foreground headline block (moves the least, or inverse direction, for depth).
- **Two inputs combined:**
  - **Pointer parallax** (only on `(hover: hover) and (pointer: fine)`): normalise the pointer to −1…1 relative to the viewport and translate each layer by `depth × maxOffset` (maxOffset ≈ 24px for the deepest layer). Smooth with lerp (≈0.08) inside a single `requestAnimationFrame` loop. Ease back to 0 on pointer leave.
  - **Scroll parallax**: as the hero scrolls out, layers move at different rates (`translateY = scrollY × depth × 0.15–0.4`), and the headline fades/lifts slightly. Only compute while the hero is in view (IntersectionObserver gate).
- Use **transform: translate3d only** (no top/left animation), `will-change: transform` on the layers only, passive listeners, one rAF loop, and clean up everything on unmount. Write it as a reusable hook, e.g. `useParallax(ref)`, in the same style as the old `useCoinParallax`.
- Keep it subtle. Guidelines §8 forbid strong parallax, bounce and elastic. The movement should feel calm and premium, never game-like.
- **`prefers-reduced-motion: reduce`**: disable pointer and scroll parallax, the rotating keyword (show the first word) and the marquees. Keep only fades.
- On touch/mobile, skip pointer parallax and keep a lighter scroll parallax (or none ≤520px).

## Motion (global)

Follow guidelines §8: reveal on enter (translateY 24px → 0, opacity 0 → 1, 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 80ms stagger) via one shared IntersectionObserver. On button hover, the arrow shifts 4px and the colour changes over 200ms. Respect reduced motion everywhere.

## Code architecture

- `src/main.tsx` stays as is. `src/App.tsx` composes sections. Since the page is being rebuilt, you **may** split it into `src/sections/*.tsx` (`Hero`, `Solutions`, `Featured`, `Recognition`, `Partners`, `Testimonials`, `Team`, `Contact`, `Footer`, `Nav`), `src/components/*` (`SectionHeading`, `Button`, `Marquee`, `Modal`), `src/hooks/*` (`useParallax`, `useReveal`, `useRotatingWord`) and `src/data/content.ts` (all copy/data from the outline, typed). Keep styling in `src/index.css` (tokens, resets, fonts) and `src/App.css` (or one CSS file per section imported in the component, but no CSS-in-JS, no Tailwind, no inline styles beyond CSS custom properties for parallax values).
- **No new runtime dependencies** unless clearly necessary. Vanilla rAF + IntersectionObserver are enough for parallax and marquees. If you think GSAP is truly needed, ask me first.
- TypeScript rules from `tsconfig.app.json`: `verbatimModuleSyntax` (`import type`), `erasableSyntaxOnly` (no enums, no parameter properties), `noUnusedLocals`/`Parameters`.
- Lint is **oxlint**, and `react/rules-of-hooks` is an error.
- Responsive breakpoints: `≤1440px`, `≤820px`, `≤520px` (container padding 32/24/16px, section spacing 160/120/96/72px per guidelines §5).
- Accessibility: semantic landmarks, one `<h1>`, logical heading order, visible focus (2px `--purple-300` outline, 3px offset), alt text for every logo, keyboard-reachable marquee items, `aria-label`s on icon-only buttons, AA contrast per guidelines §2.4.
- Update `CLAUDE.md` at the end so its architecture/styling/assets sections describe the new structure and tokens. Remove the stale references (Montserrat, `--blue`, LiquidEther, etc.).

## Definition of done

- [ ] `npm run lint && npm run build` pass with zero errors.
- [ ] All 8 outline sections are rendered in order with the correct anchors, and nav links scroll to them (smooth scroll, offset for the 64px nav).
- [ ] The hero shows the Odylytics logo, the AI-startup headline, the rotating orange keyword, and working pointer + scroll parallax that turns off under reduced motion.
- [ ] The 7 solution logos are looping, hoverable/focusable, with an accessible fallback.
- [ ] Recognition directly follows Featured and is visually connected to it.
- [ ] Light mode only, guidelines checklist §13 satisfied (adapted to light), no box-shadows, square corners, no orange text on white.
- [ ] Every placeholder is marked `TODO(content)` so I can grep and replace them when I send the documents.
- [ ] Verified in the browser at 1920, 1440, 820 and 390px widths. Share screenshots of the hero and of one mid-page section.

When you finish, report: the files created/changed, every `TODO(content)` location grouped by section, the asset filenames you expect me to provide, and any decisions you made where the docs were ambiguous.
