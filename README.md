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

## Waitlist (Resend)

The `/api/waitlist` route uses **Resend** to both store signups (Audience) and
send a branded confirmation email. Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — server-side secret.
- `RESEND_AUDIENCE_ID` — Resend dashboard → Audiences.
- `RESEND_FROM` — from address on a verified sending domain (e.g.
  `Margin <hello@margin9.com>`). Test with `onboarding@resend.dev` until
  `margin9.com` is verified.

Without `RESEND_API_KEY`, signups are logged server-side so the form still
works in dev. The confirmation email is best-effort and never blocks a signup.

**Smoke test** the live endpoint after deploy:

```bash
node scripts/smoke-waitlist.mjs https://margin9.com you+test@example.com
# add RESEND_API_KEY + RESEND_AUDIENCE_ID to also confirm the contact landed
```

## Before launch: placeholders to fill

- `src/app/download/page.tsx` → `DMG_URL` (the real download link)
- `src/app/pricing/page.tsx` → real Pro price (currently `TBA`)
- `src/app/privacy/page.tsx` + `src/app/terms/page.tsx` → `[LEGAL ENTITY]`,
  `[CONTACT EMAIL]`, `[JURISDICTION]`, and have a lawyer review
- Verify `margin9.com` as a Resend sending domain (DKIM/SPF DNS at Hostinger)
- `src/components/Footer.tsx` → real X / email links

## Brand

Ink `#14131A` + gold `#FFC233`. Newsreader (display) · Inter (body) ·
JetBrains Mono (labels). The aperture logo lives in `src/components/Logo.tsx`.

## Deploy

Optimized for Vercel. Push to GitHub, import the repo, set the env var(s)
above. `npm run build` must pass (it does).
