# Kakvera Global — project notes

Saved from Cursor cloud agent session (11 Aug 2026).  
Agent chat: https://cursor.com/agents/bc-c4c38259-bf1d-4b05-abf8-bd6b4b59838a  
Repo: `Kakveraglobal/Kakveraglobal-web`  
Live site: https://www.kakveraglobal.com (GitHub Pages)

## Done

- **Request a Quote** form now emails `trade@kakveraglobal.com` (was `info@`). Merged via [PR #1](https://github.com/Kakveraglobal/Kakveraglobal-web/pull/1).
- **Request a Quote** also offers WhatsApp to `+234 816 277 7605` beside email (Email Quote / WhatsApp Quote buttons).

## Decisions / open items

### Hosting
- Keep **GitHub Pages** for now (static Vite + React site; deploy workflow already on `main`).
- Consider **Netlify** later if you want cleaner SPA deep links, PR previews, or built-in forms.

### Signup / login (paused — revisit later)
- Real auth needs a **database** (or an auth product that includes one). This site is static today, so frontend-only auth is not enough.
- Recommended starting path: **Supabase** or **Firebase** (handles signup/login + DB without a custom backend).
- Before building: decide what login is for (customer portal, quote history, admin only, etc.).

## Contact routing (current)

- Quote form → `trade@kakveraglobal.com` **or** WhatsApp `+234 816 277 7605` (side-by-side Email / WhatsApp buttons)
- General contact form still routes by subject (General/Trade/Imports/Exports/Support) to the matching `@kakveraglobal.com` inbox
