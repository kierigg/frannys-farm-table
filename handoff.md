# Handoff

## Goal
Ship the Franny's Farm Table Astro site, fully migrated to the "Playful Farm Stand" design system, live on Netlify (`kierigg/frannys-farm-table`, deploys on push to `main`). 7-phase redesign (Phases 0-6). **All phases 0-6 complete and committed.** Remaining action: get Kieran's OK to push (push triggers the Netlify deploy).

## Current State
- **Build:** Clean. `npm run build` = 6 pages / 7 routes (home, menu, about, reviews, gallery, `/visit`, plus `/reserve` redirect stub). Node >=22.12.0. Astro 6.3.1.
- **Git:** ~9 commits ahead of `origin/main`, **NOT pushed**. Phase 6 changes staged/uncommitted (see below). Pushing is an approval gate (deploys).
- **Phases 0-6:** complete. 0-3 done in a prior session; 4 (promos + content reconcile), 5 (SEO/AIO), and 6 (verification) done this session.
- **netlify.toml:** present (Node 22, publish `dist`). Old deploy blocker fixed.

## What's Changed (this session — Phase 6, uncommitted)
- **Dead-CSS/JS purge.** Removed orphaned selectors: `.nav--transparent`, `.card--numbered`, `.card-number` (+ `.stamped`, `@keyframes stampIn`, nth-child stagger), `.page-top`, `.divider`/`.divider--accent`/`.divider--accent-dark`, and the full reserve-form block (`.reserve-form`, `.form-field`*, `.form-row`, `.form-confirmation`*) — orphaned when reservations moved to Toast Tables in Phase 3. Removed dead JS `initNumberStamp()` in `animations.js`. Removed unused tokens `--ls-card`, `--space-inline`, `--duration-stagger`. Kept `--color-accent-warm` (intentional alias).
- **a11y fix.** `visit.astro` action grid: dropped `role="list"`/anchor `role="listitem"` that were stripping native link semantics.
- **DECISIONS.md.** Filled the Phase 6 section: full WCAG contrast table (computed ratios for all fg/bg pairs), a11y pass results (0 HIGH, 1 MED fixed, deferred best-practice notes), purge log, carried owner-verify flags.
- Files touched: `src/styles/{tokens,global,components}.css`, `src/scripts/animations.js`, `src/pages/visit.astro`, `DECISIONS.md`, `handoff.md`. Also untracked `docs/superpowers/plans/*` (3 plan files, ignorable).
- **Codex audit of the Phase 6 diff: clean, no findings.** Build clean post-purge.

## Earlier this session (already committed)
- **Phase 4** (`7abbbc7`): `promos` content collection (`src/content.config.ts`, zod schema), home "On the Calendar" strip surfacing active promos. Seed `girls-night-out.md` is `active:false` (one-time past event, unverified — owner flips to publish). Price/copy reconcile: featured dishes moved into `restaurant.ts` `featuredDishes` single-source, aligned to menu page. Design polish (`5ae43cf`): produce SVG accents on Guest Favorites cards, promo badge stacking, olive schedule label.
- **Phase 5** (`ab2a94d`): SEO/AIO — Restaurant + Menu + Review JSON-LD linked via `@id` entity graph, geo meta + robots in `Base.astro`, OG image dims/alt, `entityId`/`foundingDate` in `restaurant.ts`, `llms.txt`, sitemap priority/changefreq/lastmod. Removed `aggregateRating` from Restaurant schema (Google penalty risk).

## Next Steps
1. **Commit Phase 6** (CSS/JS purge + a11y fix + DECISIONS): suggested `chore: phase 6 verification — dead-css purge, a11y fix, contrast table`.
2. **Ask Kieran before pushing** the ~10 commits (push deploys to Netlify). After deploy, walk all 7 routes: Toast links open new tab, `/reserve`->`/visit` redirect works, animations fire, mobile holds.

## Open owner-verify flags (carried to launch, all in DECISIONS.md)
MENU-VERIFY (items/prices vs Toast admin), HOURS-VERIFY (Mon-Fri 11-9 / Sat-Sun 9-9), MAPS-VERIFY (maps embed + 360 tour are placeholders), PROMO-VERIFY ("Girls Night Out" seeded `active:false`). og-image.jpg is a branded placeholder pending owner photo.

## Deferred (best-practice, non-blocking — owner/Kieran call)
- New-tab links on index/menu/gallery/Footer lack a per-link "opens in new tab" SR cue (`/visit` states it globally). menu filter buttons expose active state via class only, not `aria-pressed`. Neither is a WCAG failure.
- Designer MED/LOW polish: promo spacing, ghost CTA copy, label opacity, card hover lift.
- Full-menu single-source refactor (menu items still inline in `menu.astro`; `featuredDishes` only covers the 3 home cards).

Notes: DECISIONS.md is ground truth for resolved URLs/judgment calls. ai-stack rule: codex-audit each diff before declaring done (done for Phase 6). Approval gates: ask before push/publish. No em dashes.
