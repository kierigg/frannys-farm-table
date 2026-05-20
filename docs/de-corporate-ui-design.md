# De-Corporate UI: Loosen & Layer

## Context

Franny's Farm Table website is well-built (Astro 6, clean CSS architecture, accessible, performant animations) but reads as a generic restaurant template. The layout is symmetrical, spacing is uniform, decorative elements are invisible, and animations feel mechanical. The goal is to inject playful, earthy personality without sacrificing functionality, accessibility, or the existing content structure. A bold sunflower motif provides the visual reference point.

## Approach

"Loosen & Layer": break grid uniformity, elevate the sunflower from ghost decoration to visible identity element, and tune animation timing to feel organic rather than mechanical.

## Files Modified

- `src/styles/tokens.css` -- animation timing tokens
- `src/styles/global.css` -- grid layouts, keyframes, stagger timing, reveal easing
- `src/styles/components.css` -- card offsets, pull-quote positioning, section label treatment, footer grid, hero sunflower, section dividers
- `src/components/Sunflower.astro` -- no structural changes, but CSS targeting this component changes
- `src/pages/index.astro` -- add sunflower divider elements between sections
- `src/scripts/animations.js` -- no changes (all animation tuning is CSS-side)

## Design

### 1. Asymmetric Grid Layouts

**"What We Do" cards (index.astro):**
Replace `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` with explicit `1.2fr 1fr 0.8fr` on desktop. The first card (main pitch) gets more room. Falls back to single column below 768px.

**"Guest Favorites" dish cards:**
Keep the 3-column grid but stagger vertical position. Middle card gets `margin-top: -1.5rem`, creating a table-arranged feel rather than CMS grid.

**Footer:**
Brand column gets `2fr`, link columns get `1fr`. Gives brand identity more visual weight.

### 2. Card & Element Offsets

**"What We Do" cascading step-down:**
Cards get incremental `margin-top` offsets via nth-child: first 0, second 1rem, third 2rem. Creates a cascading step-down effect. Breaks the flat horizontal alignment without using rotations. Collapses to 0 on mobile.

**Pull-quote indent:**
The `.pull-quote` in dark sections shifts from centered to `margin-left: 3rem` on desktop. Reads as a margin note rather than a corporate callout. Reverts to `margin-left: 0` on mobile.

**Section label sidebar (the "What We Do" section only):**
The `.section-label` for the "What We Do" section becomes `position: absolute; left: -2rem` with `writing-mode: vertical-lr; transform: rotate(180deg)`. The parent section needs `position: relative` and `overflow: visible`. Falls back to normal inline flow on mobile. Other section labels remain unchanged.

### 3. Sunflower Motif Elevation

**Hero (bold presence):**
- Opacity: 0.07 -> 0.2-0.25
- Size: ~200px -> ~400px
- Position: bottom-right, unmistakably present as part of the visual composition
- `candleBreath` animation continues at this scale (slow, living presence)

**Section dividers (index.astro only):**
- Small sunflower SVGs (48-64px) centered between sections
- Placed at 3 specific gaps: after hero, after "What We Do", and after "Guest Favorites"
- Styled in accent color (olive) at 0.3 opacity
- `candleBreath` animation applies
- Wrapped in a `<div>` with `text-align: center; padding: 1.5rem 0`

**Dark sections:**
- Opacity: 0.06 -> 0.1
- Positioned to partially peek from behind content edges (clipped by overflow)
- Feels environmental rather than stamped on

### 4. Animation Timing Evolution

No new animation systems. Tuning the character of existing ones.

**Reveal easing:**
`cubic-bezier(0.25, 0.1, 0.25, 1)` -> `cubic-bezier(0.22, 1, 0.36, 1)`. Quicker attack, longer gentle settle. Things come to rest naturally.

**Stagger timing:**
Uniform 0ms/150ms/300ms -> non-uniform 0ms/120ms/280ms. Slight irregularity reads as "arriving" rather than "deployed."

**`candleBreath` keyframe:**
Add a 5th stop at ~50% with a different scale/opacity value. Breathing rhythm becomes less predictable. Living things don't breathe in perfect sine waves.

**Number stamp bounce:**
`cubic-bezier(0.34, 1.4, 0.64, 1)` -> `cubic-bezier(0.34, 1.56, 0.64, 1)`. More playful overshoot. Lands with a satisfying thud.

**Pull-quote blur:**
Duration: 1.2s -> 1.5s. The extra 300ms makes it contemplative rather than efficient.

### 5. What Stays Unchanged

- Color palette (olive, terracotta, cream)
- Typography (Fraunces, Inter, Libre Franklin, Caveat)
- Navigation (structure, scroll behavior, mobile drawer, underline hover)
- Page structure and content hierarchy
- Reservation form, menu filters, accordion, view transitions
- All accessibility: `prefers-reduced-motion` guards, ARIA labels, skip links, focus indicators
- Responsive: mobile stays single-column, all asymmetric offsets collapse below 768px
- No new JS dependencies

## Verification

1. Run `npm run dev` and check all 6 pages in browser
2. Verify hero sunflower is visually present and animated
3. Verify "What We Do" cards cascade (step-down visible on desktop)
4. Verify "Guest Favorites" middle card is offset upward
5. Verify section divider sunflowers appear between sections
6. Verify pull-quote is indented on desktop
7. Resize to mobile (< 768px): all offsets collapse, single-column layout, no horizontal scroll
8. Check `prefers-reduced-motion`: all animations should be disabled
9. Verify no layout shifts or overflow issues on any page
10. Check dark section sunflower is visible but not competing with content
