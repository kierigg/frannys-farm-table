# Handoff — Franny's Farm Table

## Goal

Get the Franny's Farm Table website live on Netlify (connected to `kierigg/frannys-farm-table` GitHub repo, deploys on push to `main`). The site is a fully built Astro 6 static restaurant site with all visual polish complete — it just needs the deployment plumbing working.

---

## Current State

- **Build:** Clean. 6 pages, zero errors locally.
- **GitHub:** `main` branch is 1 commit ahead of origin (unstaged changes not yet committed — see below).
- **Netlify:** Connected to the repo but showing nothing. Root cause is almost certainly one of: wrong publish directory (`dist`), wrong build command (`npm run build`), or Node version too old (project requires `>=22.12.0`, Netlify defaults to 18).
- **Design:** Fully complete. Two rounds of visual polish landed — soul pass (olive hero, Caveat font, grain texture, tactile buttons) + full animation + sunflower pass. A second design iteration (feature-strip layout, opacity bumps, SVG refinements) is sitting unstaged.

---

## Files In Progress

| File | Status |
|------|--------|
| `src/styles/global.css` | Unstaged: feature-strip CSS added, `card-number` color reverted to `--color-accent`, size bumped to 1.2rem |
| `src/styles/components.css` | Unstaged: opacity bumps on sunflower watermarks, font-size bumps on address/scroll indicator, menu price color reverted |
| `src/components/Sunflower.astro` | Unstaged: SVG rebuilt — 12 petals at 30° (was 8+8 at 45°/22.5°), seed head revised |
| `src/pages/index.astro` | Unstaged: numbered cards replaced with `.feature-strip` / `.feature-item` layout |
| `src/pages/reviews.astro` | Unstaged: minor change (1 line deleted) |

---

## What's Changed (This Session + Prior Sessions)

### Design — Soul Pass (all committed, pushed)
- `--color-bg-dark` pushed to `#242a20` (dark olive)
- Caveat handwritten font added via Google Fonts, applied to card numbers, address, scroll indicator, page labels, pull quote attribution via `--font-display` token
- Chalkboard grain SVG texture on all dark surfaces (`::before` pseudo-elements)
- Tactile press-in button (shadow lifts/presses), warm terracotta card hovers

### Design — Sunflower + Gold Brand Color (committed, pushed as `16b0f4e`)
- Sunflower gold token added: `--color-sunflower: #E8B84B`, `--color-sunflower-deep`, `--color-sunflower-pale`
- `src/components/Sunflower.astro` — botanical SVG (16-petal bezier + fibonacci seed spiral)
- `src/components/SunflowerDivider.astro` — sunflower + rule divider replacing plain `<hr>` between sections
- Hero sunflower: gold, 300px, 22% opacity (upper-right echo at 8%)
- Reviews dark banner sunflower: gold, 18% opacity
- Section labels: inline 13px sunflower icon + gold underline draw animation
- Menu prices, review stars, card numbers, category borders all use sunflower gold
- Footer brand mark: 36px sunflower above restaurant name

### Animations (all committed, pushed)
- A: Nav draw-from-center underline
- B: Heading mask lift (clip-path, JS observer)
- C+I: Organic card stagger (varied Y offsets 48/28/38px, non-uniform easing)
- D: Candle breath on sunflowers
- E: Card number stamp entrance (scale + rotate)
- F: Pull quote blur-to-focus reveal
- G: Section label underline draw
- H: Accordion smooth height-to-auto (interpolate-size + max-height fallback)
- J: Card lift hover with spring easing
- `src/scripts/animations.js` — IntersectionObserver module, re-inits on `astro:page-load`
- All animations respect `prefers-reduced-motion`

### Legibility Fix (committed, pushed)
- `.stat-number--light` variant (cream on dark)
- `.nav--hero .nav-links a.active` override to cream

### Unstaged Design Iteration (NOT YET COMMITTED)
- Feature-strip layout: replaced 3 equal numbered cards on homepage with horizontal list layout (`feature-item` with large left-column number)
- Sunflower SVG: 12 petals at 30° instead of 8+8; simpler/cleaner at small sizes
- Opacity bumps: hero sunflower 22%→38%, echo 8%→13%, reviews sunflower 18%→30%
- Font sizes: address 1rem→1.3rem, scroll indicator 0.9rem→1.1rem, card-number 0.9rem→1.2rem
- Color reverts: `card-number` and menu prices back to `--color-accent` (olive) from `--color-sunflower-deep`
- Section label `--light` variant opacity 0.65→0.88

---

## Failed Attempts

### Netlify deployment showing blank
- **Not yet resolved.** Site builds clean locally but Netlify shows nothing.
- Likely causes (in order of probability):
  1. **Node version:** Project requires `>=22.12.0`. Netlify defaults to Node 18. Fix: add `NODE_VERSION = 22` env var in Netlify site settings, or add `netlify.toml` (see Next Steps).
  2. **Wrong publish directory:** Must be `dist`. Netlify sometimes guesses wrong.
  3. **Wrong build command:** Must be `npm run build`. If Netlify ran a different command the output dir won't exist.
- Check Netlify deploy logs for the actual error — the log will show exactly which step failed.

---

## Next Steps

1. **Fix Netlify deployment** — Add `netlify.toml` to the repo root to lock in build settings:
   ```toml
   [build]
     command   = "npm run build"
     publish   = "dist"

   [build.environment]
     NODE_VERSION = "22"
   ```
   Then commit, push, and trigger a new Netlify deploy. This is the single most likely fix.

2. **Commit the unstaged design iteration** — The feature-strip layout and SVG/opacity refinements are sitting unstaged. They build clean. Commit with:
   ```bash
   git add src/components/Sunflower.astro src/pages/index.astro src/pages/reviews.astro src/styles/components.css src/styles/global.css
   git commit -m "feat: feature-strip layout, sunflower SVG refinement, opacity/size bumps"
   git push origin main
   ```

3. **Verify live site** — Once Netlify deploys, walk through all 6 pages and check: animations fire on scroll, sunflowers render in gold, accordion opens smoothly, mobile layout holds.

4. **Optional — SunflowerDivider review** — The `SunflowerDivider` component was added in the gold pass but may need visual QA between sections (spacing, alignment at mobile widths).
