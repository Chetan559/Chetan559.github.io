# Chetan Sharma — Portfolio

Personal portfolio of Chetan Sharma: final-year Computer Engineering student at VGEC (Class of 2026), AI/ML Engineer Intern at Bacancy Services, and Tech Lead. Built with a Dayos-inspired design system — bold condensed typography, blue/amber accents extracted from the profile photo, light/dark themes, and 21st.dev-style interactive cards.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS 3.4** — `darkMode: "selector"`, design tokens in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, 3D tilt cards, spotlight borders, custom cursor
- **next-themes** — flash-free light/dark toggle
- **EmailJS** — contact form (keys via `NEXT_PUBLIC_EMAILJS_*` env vars)

## Structure

- `app/` — routes: `/` (single-page scroll: Hero → About → Experience → Projects → Resume), `/contact`, `/gallery`, `/utilities`
- `components/` — UI, cards (`SpotlightCard`, `TiltCard`), motion primitives (`Reveal`, `CustomCursor`)
- `data/` — all copy and content live here; edit content without touching components

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
```

## Deploy

Deployed on Vercel. Set these env vars in the Vercel dashboard:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```
