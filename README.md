# Margin - website

Marketing site & beta waitlist for **Margin**, a quiet AI agent that lives at
the edge of your Mac. Built with Next.js 16 (App Router) + Tailwind v4.

> The best ideas were never in the text. They were in the margin.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route       | Purpose                                            |
| ----------- | -------------------------------------------------- |
| `/`         | Landing: hero, the margin story, how-it-works, the Apple-Intelligence contrast, pillars, waitlist |
| `/download` | App download (waitlist CTA until the `.dmg` is live) |
| `/pricing`  | Free-in-beta + Pro tiers                            |
| `/privacy`  | Privacy policy                                      |
| `/terms`    | Terms of service                                    |
| `/api/waitlist` | POST `{ email }`: captures a signup             |

## Waitlist

The `/api/waitlist` route is provider-agnostic. Copy `.env.example` to
`.env.local` and set **one** of:

- `WAITLIST_WEBHOOK_URL`: POSTs `{ email, source, ts }` to Zapier / Make /
  Google Sheets / your own endpoint. Easiest.
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`: upserts into a `waitlist`
  table (`create table waitlist (email text primary key, created_at timestamptz default now());`).

With neither set, signups are logged server-side so the form still works in
dev. **Set a provider before running ads.**

## Before launch: placeholders to fill

- `src/app/download/page.tsx` → `DMG_URL` (the real download link)
- `src/app/pricing/page.tsx` → real Pro price (currently `TBA`)
- `src/app/privacy/page.tsx` + `src/app/terms/page.tsx` → `[LEGAL ENTITY]`,
  `[CONTACT EMAIL]`, `[JURISDICTION]`, and have a lawyer review
- `src/app/layout.tsx` → `SITE_URL` (currently `https://margin.app`) and add an
  OG image at `/public` for social sharing
- `src/components/Footer.tsx` → real X / email links

## Brand

Ink `#14131A` + gold `#FFC233`. Newsreader (display) · Inter (body) ·
JetBrains Mono (labels). The aperture logo lives in `src/components/Logo.tsx`.

## Deploy

Optimized for Vercel. Push to GitHub, import the repo, set the env var(s)
above. `npm run build` must pass (it does).
