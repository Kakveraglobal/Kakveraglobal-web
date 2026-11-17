# Kakvera — chat handoff (for new agent session)

Copy this file into a new Cursor chat to continue. Repo-only: **Kakveraglobal/Kakveraglobal-web**.

**Previous agent chat:** https://cursor.com/agents/bc-c4c38259-bf1d-4b05-abf8-bd6b4b59838a  
**Repo:** https://github.com/Kakveraglobal/Kakveraglobal-web  
**Live site:** https://www.kakveraglobal.com (GitHub Pages)  
**Stack:** Vite + React + TypeScript + Tailwind  
**Ongoing notes in repo:** `PROJECT_NOTES.md`  
**Handoff date:** 17 Nov 2026

---

## Hard rules

- **Only this GitHub repo** — do not mix with other projects.
- **Never** put hidden partner names on the public site or rate cards (e.g. NBC Sky Logistics, Skyjet). Destination notes say “higher destination rate” only.
- Stay on **GitHub Pages** unless user asks to move.
- Deploy by merging PRs to `main` unless user says local-only.
- When user asks to preview first, **do not ship** until they approve.
- Save progress in `PROJECT_NOTES.md` when asked.
- Branch naming: `cursor/<descriptive-name>-838a`.

---

## What’s live now

- Marketing site: Home, About, Services, Shipping Rates, Track Shipment, Contact, etc.
- Quote: Email (`trade@kakveraglobal.com`) + WhatsApp (`+234 816 277 7605`)
- Contact: main `+234 816 277 7605`, secondary `+234 815 613 1470`, Airport Road Ikeja Lagos, Mon–Sat 10am–7pm WAT, RC `9263583`
- Shipping rates corridors: China→Nigeria (peak season), Gadgets Express (peak season), Turkey, UK, Canada
- China peak-season rates + combined downloadable card: `public/rate-cards/china-nigeria.jpg` ([PR #25](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/25))
- Track shipment via Google Apps Script + Sheets (`src/config/shipmentTracking.ts`, `google-apps-script/shipment-lookup.gs`)
- PWA foundation live ([PR #21](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/21)): manifest, icons, service worker, install/update prompts
- Site title: “KAKVERA GLOBAL SERVICES Official Website”

---

## Active next (do this first when user continues)

**Kakvera Rider app (PWA)** at `/app` — in progress.

**Locked:** riders + admin · Nigeria only · status updates (GPS later) · ID/selfie + admin approve · admin-created orders · bank details + mark paid · PWA first · later **subdomain** + Services link.

**Data:** Supabase when env keys set (`supabase/schema.sql`); else local demo at `/app`.

**Demo logins (local only):** admin `08011111111` / `Admin1234` · rider `08022222222` / `Rider1234`

**Not** the Shop concept. Preview before merge/ship.

---

## Parked — keep for later (do not drop)

### 1) Shop / Source / Ship / Cart (website concept)

- Status: **PAUSED** — mockups reviewed; **not implemented**
- User confirmed (17 Nov 2026): keep stored; return later; **not** the new app starting now
- Idea: hub with 4 tabs
  1. **Shop** — demo catalogue → cart (inspiration; not verified stock/checkout)
  2. **Source a Product** — form → WhatsApp quote
  3. **Ship Your Goods** — form → WhatsApp shipping request
  4. **My Cart** — cart review
- WhatsApp lead capture, not full e‑commerce checkout; demo prices marked unverified
- Mockup screenshots (may still be on prior agent machine):
  - Shop: `.../assets/3563075b-c265-4daf-b152-b91f74aa0e09.png`
  - Source: `.../assets/4f1d4cee-5cc6-4952-bbec-dea80d04c781.png`
  - Ship: `.../assets/57e87754-bd29-42ad-b33c-22215355082f.png`
  - Cart: `.../assets/866600b9-0e12-4cff-b5a4-5437c4cf252e.png`

### 2) PWA mobile install help

- Draft [PR #22](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/22) — branch `cursor/pwa-mobile-install-838a`
- iOS Safari Share → Add to Home Screen instructions; Android Chrome menu steps; **Get the App** in navbar
- **Not merged** — ship only when user approves
- Context: desktop Install works; phones need manual Add to Home Screen guidance

---

## Key files

- `src/pages/ShippingRates.tsx` — rates UI (China peak season live)
- `src/pages/TrackShipment.tsx` + `src/config/shipmentTracking.ts` — tracking
- `src/pages/Contact.tsx` — quote / contact / partner placeholder
- `src/components/PwaPrompts.tsx` — PWA prompts (mobile help on PR #22 branch)
- `public/rate-cards/` — downloadable JPGs
- `public/icons/` — PWA icons
- `vite.config.ts` — Vite + `vite-plugin-pwa`
- `PROJECT_NOTES.md` — longer ongoing notes
- `.github/workflows/deploy.yml` — deploy on `main`

---

## Tracking (quick)

- Lookup: `KGS Shipment ID` (e.g. `KGS-CN-2609-001`)
- Public fields only: Route, Mode, Item Description, Weight/CBM, Current Status, Last Update
- Keep private: Customer Name, Phone, Forwarder, Next Action, Assigned To

---

## How to continue in a new chat

1. Attach or paste this file / read it from the repo.
2. Continue **Rider app** — help user finish Supabase project setup if keys missing; preview `/app`; do not merge until approved.
3. After backend works: subdomain deploy + Services “Additional Services” link; then GPS; then stores.
4. Do not resume Shop concept or merge PR #22 unless user asks.
