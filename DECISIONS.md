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
- No netlify.toml existed; deploy was failing per handoff.md (Node 18 default). Added in this effort.

### Asset provenance
- brand-board.png copied from ~/Downloads (ChatGPT board, Jun 2 2026, "BOARD 1: COMMERCIAL ANCHOR - GRAZA FARM STAND").
- logo-source.svg = frannys_route_1_supporting_floral_top_right_transparent-optimized.svg from ~/Downloads.
- Board's farmer/person illustrations explicitly rejected; produce + barn only.

## Judgment calls
- Reservation CTA uses tables.toasttab.com GUID URL (explicit Toast Tables surface); book.toasttab.com alternate recorded above.
- Home page had no Visit strip with Google 360 tour link in prototype; added per brief. Google Maps embed + 360 tour URL are best-guess placeholders. <!-- TOAST-URL-VERIFY n/a; MAPS-VERIFY with owner -->

## Palette migration (filled in Phase 1)

## Contrast table (filled in Phase 6)
