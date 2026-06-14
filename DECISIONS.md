# DECISIONS — Franny's Farm Table Redesign

## Phase 0 — Research notes (2026-06-12)

### Resolved canonical Toast URLs
| Feature | Canonical URL | Status |
|---|---|---|
| Online ordering | https://order.toasttab.com/online/frannys-farm-table-311-main-street | Resolved via Toast search listing; CF bot-blocked to curl but valid public URL |
| Reservations (Toast Tables) | https://tables.toasttab.com/restaurants/8df7c581-dcdf-43b2-9191-453e9d8b140e/findTime | Resolved; GUID confirmed against Toast marketplace listing (r-8df7c581-...). Alternate human-readable: https://book.toasttab.com/r/frannys-farm-table-311-main-street |
| Gift cards | https://order.toasttab.com/egiftcards/frannys-farm-table-311-main-street | Resolved by following redirect from toasttab.com/frannys-farm-table-311-main-street/giftcards |
| Loyalty | https://www.toasttab.com/frannys-farm-table-311-main-street/rewardsSignup | Verified 200 OK |

### Live-site scrape limitations
- frannysfarmtable.co, frannysfarmtable.toast.site, and order.toasttab.com all sit behind Cloudflare managed challenge; direct fetch returns 403.
- Live menu reconcile NOT possible programmatically. Prototype menu (12 categories, synced from live Toast site in a prior session) retained as source of truth. <!-- MENU-VERIFY: owner to spot-check items/prices against Toast admin -->
- Hours confirmed via Toast/web listings: Mon-Fri 11 AM-9 PM, Sat-Sun 9 AM-9 PM. Old prototype reserve page said Mon-Thu close 8 PM; trusting live listing. <!-- HOURS-VERIFY with owner -->
- Promo seeded from project brief ("Girls Night Out" Sat June 13); could not be independently confirmed against live site (CF block).

### Baseline
- Build clean before changes (Astro 6.3.1, 6 pages, sitemap OK). Node >=22.12.0 required.
- Pre-existing unstaged design iteration committed separately as 2a34145 before redesign began.
- No netlify.toml existed; deploy was failing per handoff.md (Node 18 default). Created 2026-06-14: command `npm run build`, publish `dist`, NODE_VERSION 22.

### Asset provenance
- brand-board.png copied from ~/Downloads (ChatGPT board, Jun 2 2026, "BOARD 1: COMMERCIAL ANCHOR - GRAZA FARM STAND").
- logo-source.svg = frannys_route_1_supporting_floral_top_right_transparent-optimized.svg from ~/Downloads.
- Board's farmer/person illustrations explicitly rejected; produce + barn only.
- Logo marks derived from logo-source.svg (Phase 2): 816-path traced woodcut. Programmatically classified fills by luminance/hue — dropped the light-shade background field (transparent), unified ~687 near-black barn paths to single ink #22221f, recolored 10 gold-ray paths #e7ab36->#f2c230, kept 21 sage-leaf paths (#6b6a4a). Stripped one stray left-gutter artifact path. svgo mergePaths cut 215KB->88KB. Square viewBox 27 104.5 570 570. Light variant maps ink+sage->cream #f8f4e3 for dark surfaces. Outputs: public/logo/logo-mark.svg, logo-mark-light.svg; favicon set (svg/32/16/apple-touch/favicon.ico); og-image.jpg (1200x630, barn on cream, placeholder pending owner photo). Barn is primary mark; no monogram.

## Judgment calls
- Reservation CTA uses tables.toasttab.com GUID URL (explicit Toast Tables surface); book.toasttab.com alternate recorded above.
- Home page had no Visit strip with Google 360 tour link in prototype; added per brief. Google Maps embed + 360 tour URL are best-guess placeholders. <!-- TOAST-URL-VERIFY n/a; MAPS-VERIFY with owner -->

## Palette migration (filled in Phase 1)

Migrated from "Agrarian Warmth / sunflower-gold" to **Playful Farm Stand** (sourced from brand-board.png).

| Role | Old token/value | New token/value |
|---|---|---|
| Page bg | `--color-bg` #faf8f5 cream | `--color-cream` #f8f4e3 |
| Dark surface | `--color-bg-dark` #242a20 dark olive | `--color-olive` #3d4a26 |
| Primary / headings / nav / illustration ink | `--color-accent` #3d5a3e olive | `--color-olive` #3d4a26 |
| Max-contrast text / footer | `--color-text` #1a1a1a near-black | `--color-charcoal` #22221f |
| Body copy | `--color-text-body` #6b6560 | `--color-text-body` #635d50 (5.93:1 on cream, AA) |
| Warm accent | `--color-accent-warm` #c4704b terracotta | `--color-tomato` #dd4a2a (badges/frames/large display only) |
| Gold accent | `--color-sunflower` #E8B84B (+deep #C49A2A / pale #F5E098) | `--color-sunflower` #f2c230 (badge fills/accents; never text on cream) |
| Border | `--color-border` #e8e4df | `--color-border` #e6e0cd |
| Display font | `--font-display` 'Caveat' | removed; Fraunces SOFT axis carries display weight |

- Legacy token names (`--color-bg`, `--color-bg-dark`, `--color-accent`, `--color-accent-hover`, `--color-accent-deep`, `--color-accent-warm`, `--color-border-dark`) retained as aliases pointing at new palette so existing rules resolve without a full sweep.
- Typography: Fraunces opsz + SOFT axis (wght 600-900) replaces multi-weight Caveat/Fraunces load; Inter 400-600 body; Libre Franklin 600/700 for labels/badges.
- Body font-size 0.9375rem -> 1rem; hero/section/card tracking loosened (-0.03/-0.02/-0.01em -> -0.01/-0.01/0).
- New components: `Badge.astro` (6 sticker variants), `src/components/illustrations/` (Tomato, Lemon, OliveSprig, Squash, HerbSprig, LeafyGreens) — produce-only per board (farmer/person art rejected).
- Purge verified: grep of src for #c4704b, #3d5a3e, #1a1a1a, Caveat, #E8B84B, sunflower-deep/pale, Espresso/Linen returns zero matches.

## Contrast table (filled in Phase 6)
