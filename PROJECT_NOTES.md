# Kakvera Global — project notes

Ongoing notes for the Kakvera website so later sessions can pick up quickly.

**Agent chat (this project):** https://cursor.com/agents/bc-c4c38259-bf1d-4b05-abf8-bd6b4b59838a  
**Repo:** `Kakveraglobal/Kakveraglobal-web`  
**Live site:** https://www.kakveraglobal.com (GitHub Pages)  
**Stack:** Vite + React + TypeScript + Tailwind  
**Last updated:** 17 Sep 2026 (tracking live)

## Done

- **Quote → trade email** — Request a Quote mailto goes to `trade@kakveraglobal.com`. [PR #1](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/1)
- **Quote → WhatsApp** — Side-by-side **Email Quote** and **WhatsApp Quote** buttons; WhatsApp opens `+234 815 613 1470` with prefilled details. [PR #3](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/3)
- **Shipping Rates page** — `/shipping-rates` with tabbed corridors from the official rate cards. [PR #4](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/4)
  - China → Nigeria (general air/sea)
  - China → Nigeria Gadgets Express
  - Turkey → Nigeria
  - UK ↔ Nigeria
  - Nigeria ↔ Canada
  - Structured tables + notes (not image-only)
  - Downloadable rate-card images in `/public/rate-cards/`
  - Linked from navbar and footer
- **Track Shipment page** — `/track-shipment` live with Google Sheets lookup by `KGS Shipment ID` (status, route, mode, item, weight, last update; no customer name/phone).

## Design / content decisions

- Prefer **typed rates on the site** over pasting rate-card images as the main content; keep images as downloads.
- Rate cards can be read from photos and converted into clean web tables.
- Site stays on existing Kakvera blue/white visual language.
- Public tracking fields: Shipment ID, Route, Mode, Status, Last Update, Item Description, Weight/CBM.
- Keep private: Customer Name, Phone, Forwarder, Next Action, Assigned To.

## Contact routing (current)

- Quote form → `trade@kakveraglobal.com` **or** WhatsApp `+234 815 613 1470`
- General contact form still routes by subject (General / Trade / Imports / Exports / Support)
- Phone: `+234 815 613 1470` · Address: Airport Road, Ikeja, Lagos · Hours: Mon–Sat 10am–7pm WAT · RC: 9263583
- Rate cards also list: `imports@`, `exports@`, `logistics@kakveraglobal.com`

## Shipment tracking ↔ Google Sheets (setup)

Source sheet columns (A–S): KGS Shipment ID, Date Booked, Customer Name, Phone, Route, Mode, Cargo Type, Item Description, Qty, Weight/CBM, Forwarder, Origin Warehouse, Date Warehouse, Dispatch Date, Current Status, Last Update, Next Action, Next Action Date, Assigned To.

### Connect live data
1. Open the shipments Google Sheet.
2. **Extensions → Apps Script**.
3. Paste code from `google-apps-script/shipment-lookup.gs` (replace any default code).
4. If the data is not on the first tab, set `SHEET_NAME` in the script to the exact tab name.
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the Web App URL and put it in `src/config/shipmentTracking.ts` as `SHIPMENT_LOOKUP_URL` (or send it to Cursor to wire in).
7. Redeploy the website after the URL is set.

Lookup URL shape: `YOUR_WEB_APP_URL?id=KGS-CN-2609-001`

## Open / paused

### Hosting
- Keep **GitHub Pages** for now.
- Consider **Netlify** later for cleaner SPA deep-link status codes, PR previews, or forms.
- Note: GitHub Pages serves SPA routes via `404.html` fallback (HTTP 404 status, page still loads).

### Signup / login (paused)
- Needs a database or auth product (e.g. **Supabase** / **Firebase**).
- Decide purpose first: customer portal, quote history, admin-only, etc.

### Track shipment (live)
- Page: `/track-shipment`
- Google Apps Script Web App connected and returning live sheet data
- Public fields only: ID, route, mode, item, weight, status, last update
- Test ID: `KGS-CN-2609-001` → IN TRANSIT

## Key files

- `src/pages/Contact.tsx` — quote + contact forms
- `src/pages/ShippingRates.tsx` — shipping rates UI
- `src/pages/TrackShipment.tsx` — shipment tracking UI
- `src/config/shipmentTracking.ts` — Web App URL config
- `google-apps-script/shipment-lookup.gs` — secure sheet lookup (public fields only)
- `public/rate-cards/` — original rate-card JPGs
- `.github/workflows/deploy.yml` — GitHub Pages deploy on push to `main`
