# Kakvera Global — project notes

Ongoing notes for the Kakvera website so later sessions can pick up quickly.

**Agent chat (this project):** https://cursor.com/agents/bc-c4c38259-bf1d-4b05-abf8-bd6b4b59838a  
**Repo:** `Kakveraglobal/Kakveraglobal-web`  
**Live site:** https://www.kakveraglobal.com (GitHub Pages)  
**Stack:** Vite + React + TypeScript + Tailwind  
**Last updated:** 13 Sep 2026

## Done

- **Quote → trade email** — Request a Quote mailto goes to `trade@kakveraglobal.com`. [PR #1](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/1)
- **Quote → WhatsApp** — Side-by-side **Email Quote** and **WhatsApp Quote** buttons; WhatsApp opens `+234 816 277 7605` with prefilled details. [PR #3](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/3)
- **Shipping Rates page** — `/shipping-rates` with tabbed corridors from the official rate cards. [PR #4](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/4)
  - China → Nigeria (general air/sea)
  - China → Nigeria Gadgets Express
  - Turkey → Nigeria
  - UK ↔ Nigeria
  - Nigeria ↔ Canada
  - Structured tables + notes (not image-only)
  - Downloadable rate-card images in `/public/rate-cards/`
  - Linked from navbar and footer

## Design / content decisions

- Prefer **typed rates on the site** over pasting rate-card images as the main content; keep images as downloads.
- Rate cards can be read from photos and converted into clean web tables.
- Site stays on existing Kakvera blue/white visual language.

## Contact routing (current)

- Quote form → `trade@kakveraglobal.com` **or** WhatsApp `+234 816 277 7605`
- General contact form still routes by subject (General / Trade / Imports / Exports / Support)
- Rate cards also list: `+234 815 613 1470`, `imports@`, `exports@`, `logistics@kakveraglobal.com`

## Open / paused

### Hosting
- Keep **GitHub Pages** for now.
- Consider **Netlify** later for cleaner SPA deep-link status codes, PR previews, or forms.
- Note: GitHub Pages serves SPA routes via `404.html` fallback (HTTP 404 status, page still loads).

### Signup / login (paused)
- Needs a database or auth product (e.g. **Supabase** / **Firebase**).
- Decide purpose first: customer portal, quote history, admin-only, etc.

## Key files

- `src/pages/Contact.tsx` — quote + contact forms
- `src/pages/ShippingRates.tsx` — shipping rates UI
- `public/rate-cards/` — original rate-card JPGs
- `.github/workflows/deploy.yml` — GitHub Pages deploy on push to `main`
