# Kakvera Global — project notes

Ongoing notes for the Kakvera website so later sessions can pick up quickly.

**Agent chat (this project):** https://cursor.com/agents/bc-c4c38259-bf1d-4b05-abf8-bd6b4b59838a  
**Repo:** `Kakveraglobal/Kakveraglobal-web`  
**Live site:** https://www.kakveraglobal.com (GitHub Pages)  
**Stack:** Vite + React + TypeScript + Tailwind  
**Last updated:** 17 Sep 2026

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
  - Phone / WhatsApp: `+234 815 613 1470`
  - Address: Airport Road, Ikeja, Lagos
  - Hours: Mon–Sat 10am–7pm WAT (Sunday closed); shown on Home, Contact, Footer
  - RC: `9263583`
  - Contact map removed → **Partner With Us — coming soon** placeholder

## Company / contact (current)

- Phone / WhatsApp: `+234 815 613 1470`
- Address: Airport Road, Ikeja, Lagos
- Hours: Monday–Saturday 10:00 AM – 7:00 PM WAT · Sunday closed
- RC: 9263583
- Quote form → `trade@kakveraglobal.com` **or** WhatsApp
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

## Open / next

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
- `public/rate-cards/` — original rate-card JPGs
- `.github/workflows/deploy.yml` — GitHub Pages deploy on `main`
