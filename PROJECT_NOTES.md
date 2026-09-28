# Kakvera Global — project notes

Ongoing notes for the Kakvera website so later sessions can pick up quickly.

**Agent chat (this project):** https://cursor.com/agents/bc-c4c38259-bf1d-4b05-abf8-bd6b4b59838a  
**Repo:** `Kakveraglobal/Kakveraglobal-web`  
**Live site:** https://www.kakveraglobal.com (GitHub Pages)  
**Stack:** Vite + React + TypeScript + Tailwind  
**Last updated:** 28 Sep 2026 (PWA started)

## Resume here (28 Sep 2026)

Site is live on `main`. **PWA foundation in progress** on branch `cursor/pwa-foundation-838a`.

**Just finished / in flight:**
1. Partner names removed; China/Gadgets rate cards restored (partner-safe).
2. **PWA v1 started** — installable web app: manifest, icons, service worker, install/update prompts, offline app shell.

**Constraints to remember:**
- Do **not** put hidden partner names on the public site or in downloadable rate cards.
- Stay on **GitHub Pages** unless user asks to move.
- Deploy by merging to `main` unless user says local-only.
- Save progress in this file (`PROJECT_NOTES.md`) when asked.

**Useful links:** reopen this agent chat above; live site https://www.kakveraglobal.com ; shipping rates `/shipping-rates` ; track shipment `/track-shipment`.

## Done

- **Quote → trade email** — Request a Quote mailto goes to `trade@kakveraglobal.com`. [PR #1](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/1)
- **Quote → WhatsApp** — Side-by-side **Email Quote** / **WhatsApp Quote** buttons. [PR #3](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/3)
- **Shipping Rates page** — `/shipping-rates` with tabbed corridors + downloadable rate cards. [PR #4](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/4)
  - China → Nigeria (general air/sea)
  - China → Nigeria Gadgets Express
  - Turkey → Nigeria
  - UK ↔ Nigeria
  - Nigeria ↔ Canada
- **Track Shipment page** — `/track-shipment` live via Google Apps Script + Sheets. [PR #6](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/6) / [PR #7](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/7)
- **Contact details refresh** — [PR #10](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/10)
  - Phone / WhatsApp (main): `+234 816 277 7605` · Secondary: `+234 815 613 1470`
  - Address: Airport Road, Ikeja, Lagos
  - Hours: Mon–Sat 10am–7pm WAT (Sunday closed); shown on Home, Contact, Footer
  - RC: `9263583`
  - Contact map removed → **Partner With Us — coming soon** placeholder
- **Brand imagery update** — Home hero, About Our Story, and all four Services section images replaced with KGS branded assets in `/public/`. [PR #13](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/13)
- **China rates refresh** — Updated China → Nigeria + Gadgets Express prices; Lagos/Onitsha/Abuja/Kano destination rates under China tab. [PR #14](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/14)
- **Site title** — “Official Website” in `index.html`. [PR #15](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/15)
- **Hidden partners** — Removed NBC Sky Logistics [PR #16](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/16) and Skyjet [PR #17](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/17) from public copy. Destination notes say “higher destination rate” only.
- **China / Gadgets rate cards restored** — Partner-safe downloads live: `china-nigeria.jpg`, `china-nigeria-destinations.jpg`, `china-nigeria-gadgets.jpg`. [PR #19](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/19)
- **PWA foundation** — Installable Progressive Web App: web manifest, app icons, service worker (offline shell + cached assets), install/update prompts.
## Company / contact (current)

- Phone / WhatsApp (main): `+234 816 277 7605` · Secondary: `+234 815 613 1470`
- Address: Airport Road, Ikeja, Lagos
- Hours: Monday–Saturday 10:00 AM – 7:00 PM WAT · Sunday closed
- RC: 9263583
- Quote form → `trade@kakveraglobal.com` **or** WhatsApp (`+234 816 277 7605`)
- General contact form routes by subject (General / Trade / Imports / Exports / Support)
- Also used: `info@`, `imports@`, `exports@`, `support@`, `logistics@kakveraglobal.com`

## Shipment tracking ↔ Google Sheets

**Lookup key:** `KGS Shipment ID` (column A), e.g. `KGS-CN-2609-001`  
**Public fields shown:** Route, Mode, Item Description, Weight/CBM, Current Status, Last Update  
**Keep private:** Customer Name, Phone, Forwarder, Next Action, Assigned To

**Live Web App URL** (in `src/config/shipmentTracking.ts`):  
`https://script.google.com/macros/s/AKfycbyo1bvMRWmLalSyh9PptpcHF-DKuT7vxhh0O0IuGZrreo4npQ1gVIWgGdt6RqnO9bxxWA/exec`

**Script source:** `google-apps-script/shipment-lookup.gs`  
- Searches all sheet tabs, normalizes IDs  
- If redeploying: Extensions → Apps Script → paste script → Deploy → New version → Web app (Execute as Me, Anyone)

**Test:** `WEB_APP_URL?id=KGS-CN-2609-001` should return JSON `ok:true`

Sheet columns (A–S): KGS Shipment ID, Date Booked, Customer Name, Phone, Route, Mode, Cargo Type, Item Description, Qty, Weight/CBM, Forwarder, Origin Warehouse, Date Warehouse, Dispatch Date, Current Status, Last Update, Next Action, Next Action Date, Assigned To

## Design decisions

- Typed rates on the site (not image-only); keep rate-card images as downloads in `/public/rate-cards/`
- Existing Kakvera blue/white visual language
- Stay on GitHub Pages for now (SPA deep links use `404.html` fallback)
- Never show hidden partner brand names on the public site or in rate-card assets

## Open / next

- **PWA polish** — after foundation ships: optional offline rates page messaging, better icon mark (globe-only) if a clean square asset is provided, iOS install guide tip
- **Partner form** — placeholder on Contact; waiting for real form to embed
- **Signup / login (paused)** — needs Supabase/Firebase or similar; decide purpose first
- **Netlify (optional later)** — cleaner SPA routing, PR previews, forms

## Key files

- `src/pages/Contact.tsx` — quote + contact + partner placeholder
- `src/pages/Home.tsx` — business hours highlight
- `src/pages/ShippingRates.tsx` — shipping rates UI
- `src/pages/TrackShipment.tsx` — shipment tracking UI
- `src/config/shipmentTracking.ts` — Web App URL
- `google-apps-script/shipment-lookup.gs` — secure sheet lookup
- `public/icons/` — PWA / favicon assets
- `src/components/PwaPrompts.tsx` — install + update banners
- `vite.config.ts` — Vite + `vite-plugin-pwa`
- `.github/workflows/deploy.yml` — GitHub Pages deploy on `main`
- `PROJECT_NOTES.md` — this file (session handoff)
