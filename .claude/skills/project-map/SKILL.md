---
name: project-map
description: Use when orienting in this portfolio codebase for the first time or answering "where does X live" — covers the full route table, the data/ content layer, the component inventory, navigation/sitemap wiring, the Vercel deploy story, outstanding TODO(chetan) markers, and which other skill to load for a given task.
---

# Project Map — Chetan Sharma's Portfolio

Read this FIRST before touching anything. It tells you where everything lives and why.
Repo root: `/home/Chetan559.github.io` (git repo, working branch `next-rewrite`, deploys to Vercel — despite the repo name, GitHub Pages is dead and NOT the deploy target).

Stack: Next.js 15 App Router + TypeScript, Tailwind CSS 3.4 (`darkMode: "selector"`, all tokens in `tailwind.config.ts`), framer-motion 12, next-themes, @emailjs/browser, react-icons, @giscus/react, React 19. Scripts: `npm run dev | build | start | lint` (see `package.json`). Every route builds as static (○) or SSG (●) — there is no server runtime code beyond React Server Components at build time.

## 1. Route table

| Route | File | Renders | Type |
|---|---|---|---|
| `/` | `app/page.tsx` | Composes, in order: `Hero → About → Experience → Hackathons → Projects → ResumeSection` (all from `components/home/`) | Static |
| `/blog` | `app/blog/page.tsx` | All posts from `data/blogs.ts`, sorted by date desc, as `BlogCard` grid inside `Section` | Static |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | One post: full-bleed cover header + `BlogBlocks` body. `generateStaticParams()` maps `blogs` slugs; `generateMetadata` per post; unknown slug → `notFound()` | SSG |
| `/contact` | `app/contact/page.tsx` | `ContactForm` (EmailJS) + email/socials column from `data/site.ts` | Static |
| `/guestbook` | `app/guestbook/page.tsx` | Intro copy + `Guestbook` (giscus comments widget) | Static |
| `/gallery` | `app/gallery/page.tsx` | `GalleryGrid` (25 photos from `data/gallery.ts`) | Static |
| `/utilities` | `app/utilities/page.tsx` | `GearGrid` ("Everyday" hardware) then `ToolGroups` (System / Coding Tools / Software & Applications) | Static |
| 404 | `app/not-found.tsx` | "Lost in space." hero + Back Home `Button` | Static |
| `/sitemap.xml` | `app/sitemap.ts` | 6 pages + every blog slug (see §4) | Build-time |

Shared shell: `app/layout.tsx` loads Oswald (`--font-oswald`, headings) and Inter (`--font-inter`, body) via `next/font/google`, sets site-wide `metadata` (title template `"%s — Chetan Sharma"`), and wraps everything:

```tsx
<html lang="en" suppressHydrationWarning className={`${oswald.variable} ${inter.variable}`}>
  <body id="top" className="font-sans">
    <ThemeProvider>
      <CustomCursor />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </ThemeProvider>
  </body>
</html>
```

`suppressHydrationWarning` and `id="top"` are load-bearing (next-themes class swap; navbar logo scroll target). `pt-20` offsets the fixed 80px navbar.

## 2. Data layer — ALL copy lives here

Rule: components never hardcode content. Every string a visitor reads comes from a typed module in `data/`. To change site copy, edit the data file — do not touch components. Drafted/unverified facts carry `// TODO(chetan)` comments (see §6).

| Module | Exports | Consumed by |
|---|---|---|
| `data/site.ts` | `site` (name, role, taglines, intro, about[], hobbies, socials, email, `nav[]`) | `Hero`, `About`, `Navbar`, `Footer`, `app/contact/page.tsx` |
| `data/experience.ts` | `Experience` type, `experience[]` | `components/home/Experience.tsx` → `ExperienceCard` |
| `data/projects.ts` | `Project` type, `projects[]` (slug, tagline, tech, github/live links, `mark`, `accent`) | `components/home/Projects.tsx` → `ProjectCard` |
| `data/hackathons.ts` | `Hackathon` type, `hackathonsIntro`, `hackathons[]` | `components/home/Hackathons.tsx` |
| `data/education.ts` | `Education` type, `education[]` | `components/home/About.tsx` |
| `data/resumes.ts` | `Resume` type, `resumes[]` (two PDFs under `public/`) | `components/home/ResumeSection.tsx` |
| `data/blogs.ts` | `BlogBlock` + `Blog` types, `blogs[]`, `getBlog(slug)` | `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `BlogCard`, `BlogBlocks`, `app/sitemap.ts` |
| `data/gallery.ts` | `GalleryImage` type, `gallery[]` (generated: `/images/gallery/photo1..25.jpg`) | `components/gallery/GalleryGrid.tsx` |
| `data/gear.ts` | `Gear` type, `gear[]` (images under `public/images/gear/`) | `components/utilities/GearGrid.tsx` |
| `data/tools.ts` | `Tool` + `ToolGroup` types, `toolGroups[]` (imports `IconType` from react-icons) | `components/utilities/ToolGrid.tsx` (`ToolGroups`) — the CLIENT component imports this module itself; never pass icon components as props from a server component (build fails: "Functions cannot be passed directly to Client Components") |

Blog posts are code, not markdown: a post is a `Blog` object whose `blocks` array mixes `heading | paragraph | image | video (youtubeId or self-hosted src) | quote`. Add a post by appending to `blogs[]`; SSG params, listing, and sitemap all update automatically.

## 3. Component inventory

All interactive elements carry `data-cursor="hover"` (feeds `CustomCursor`). External `<a>` links use `target="_blank" rel="noopener noreferrer"`. `"use client"` only where hooks/motion are needed; pages stay server components composing client leaves.

- `components/layout/` — `Navbar.tsx` (client; fixed header, blur-on-scroll via `useScroll`, desktop links + animated mobile menu from `site.nav`, `ThemeToggle`), `Footer.tsx` (server; "Let's build something." + socials), `Section.tsx` (server; the page shell: `mx-auto w-full max-w-[1440px] px-6 py-24 md:px-16 xl:px-40` + eyebrow + Oswald `text-display` title — wrap ALL new page content in it).
- `components/home/` — `Hero.tsx` (client; clip-reveal headline via `heroLine` variants), `About.tsx` (server; `site.about` + `education` timeline + hobbies), `Experience.tsx`/`ExperienceCard.tsx`, `Hackathons.tsx`, `Projects.tsx`/`ProjectCard.tsx` (renders per-project `mark` — `documind` uses `components/logos/DocuMindMark.tsx`, an abstract 3x3 SVG grid), `ResumeSection.tsx` (two resume download cards).
- `components/cards/` — `SpotlightCard.tsx` (client; mouse-tracked mask-ring glow; padding override goes through `innerClassName ?? "p-8"`, NOT by appending a conflicting class — Tailwind conflicts resolve by stylesheet order, not class order), `TiltCard.tsx` (client; spring tilt ±8°, degrades to plain `SpotlightCard` under reduced motion).
- `components/motion/` — `Reveal.tsx` (client; `Reveal` container + `RevealItem`; `initial={reduce ? "visible" : "hidden"}` — the reduced-motion contract), `CustomCursor.tsx` (client; renders `null` for touch/reduced-motion; grows on `[data-cursor="hover"]` targets).
- `components/theme/` — `ThemeProvider.tsx` (next-themes wrapper), `ThemeToggle.tsx` (mounted-gated: `useState`+`useEffect`, placeholder until mounted — required for any `useTheme()` consumer or you get hydration mismatches).
- `components/ui/Button.tsx` — primary (inverted fg/bg) and ghost variants; ≤4px radius per the design system.
- `components/blog/` — `BlogCard.tsx` (client; cover-image listing card), `BlogBlocks.tsx` (server; renders the `BlogBlock` union — extend the union here AND in `data/blogs.ts` together).
- `components/contact/ContactForm.tsx` — client; EmailJS send. Payload keys `from_name`, `reply_to`, `phone`, `message` match EmailJS template `template_awl7mrt` — renaming any of them silently breaks delivery.
- `components/guestbook/Guestbook.tsx` — client; giscus widget, mounted-gated on `resolvedTheme`, theme `noborder_dark`/`noborder_light`. Config is hardcoded: `repo="Chetan559/Chetan559.github.io"`, `repoId="R_kgDOIX1yWA"`, `category="Announcements"`, `categoryId="DIC_kwDOIX1yWM4DArww"`, `mapping="specific"`, `term="Guestbook"`.
- `components/gallery/GalleryGrid.tsx`, `components/utilities/{GearGrid,ToolGrid}.tsx` — client grids over their data modules.
- `lib/motion.ts` — the ONLY place motion constants live: `EASE = [0.22, 1, 0.36, 1]`, `containerStagger` (staggerChildren 0.08), `fadeUpItem` (y: 32, 0.6s), `fadeIn`, `heroLine` (y "110%"→"0%"), `viewport = { once: true, margin: "-80px" }`. Reuse these; do not invent new easings.
- `lib/utils.ts` — `cn()` is a plain `filter(Boolean).join(" ")`. It does NOT dedupe conflicting Tailwind classes (it is not tailwind-merge).

Design guardrails (full spec in root `Design.md`; the build deviates from it deliberately — the repo wins): purple/magenta/violet are BANNED. Accents: `accent` #2557A7 (royal blue) and `amber` #F5A623. Semantic tokens with dark variants in `tailwind.config.ts`: `bg`, `fg`, `muted`, `line` — always pair, e.g. `text-fg dark:text-fg-dark`. Radius: buttons/chips ≤4px; `rounded-card` (24px) is for feature cards/containers only. Fluid type tokens: `text-hero`, `text-display`, `text-h3` (clamp-based).

## 4. Navigation and sitemap wiring

`data/site.ts` `nav[]` is the single source for the Navbar (desktop + mobile). Two href shapes:
- Home-page anchors: `/#about`, `/#experience`, `/#projects`, `/#resume` — these resolve because the home sections pass `id` to `Section` (e.g. `components/home/About.tsx`: `<Section id="about" ...>`). Adding a home section = add the component to `app/page.tsx`, give it an `id`, add `{ label, href: "/#id" }` to `nav`.
- Standalone routes: `/blog`, `/guestbook`, `/gallery`, `/utilities`, `/contact` — adding a page = create `app/<name>/page.tsx` (wrap in `Section`, export `metadata`), add to `nav`, AND add the path to the `pages` array in `app/sitemap.ts`.

`app/sitemap.ts` emits the 6 static pages plus one entry per blog slug (`${BASE}/blog/${b.slug}`). `BASE = "https://chetansharma.co"` is still a TODO — confirm the real production domain before shipping SEO work.

## 5. Deploy story

- Vercel builds from branch `next-rewrite`. Do not expect `main` to be current.
- Env vars (in `.env.local` locally, must ALSO be set in the Vercel project dashboard or the contact form breaks in production): `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. `.env.local` is gitignored — never commit it.
- giscus caveat: the guestbook only works if the giscus GitHub App is installed on `Chetan559/Chetan559.github.io` AND repo Discussions are enabled with a "Guestbook" discussion in the Announcements category. That is a manual, web-only step — no code change can fix a broken guestbook if the app was uninstalled.
- The repo name (`Chetan559.github.io`) is historical; GitHub Pages is NOT serving anything. Ignore any instinct to add `output: "export"` or a Pages workflow.

## 6. Outstanding TODO(chetan) markers — owner input needed, do not invent facts

Verify with `grep -rn "TODO" data/ app/` from the repo root. As of writing:

- `data/experience.ts:12,18,32,35,43` — Bacancy start month, SoHo Dragon role title/dates/scope, VGEC org name are drafted placeholders.
- `data/projects.ts:33,55` — DocuMind and MOSDAC `github` fields point at the profile (`https://github.com/Chetan559`), not real repos.
- `data/blogs.ts:28,35,52,77,94,109,126` — all three posts are samples: gallery photos as covers/diagrams, a placeholder YouTube id (`dQw4w9WgXcQ`).
- `data/hackathons.ts:57` — SSIP grant result wording unconfirmed.
- `app/sitemap.ts:4` — production domain unconfirmed.

When editing near these, preserve the TODO comments unless you have the owner's confirmed facts.

## 7. Typical tasks → which skill to load

Sibling skills live in `/home/Chetan559.github.io/.claude/skills/` — run `ls` there to see what exists (they may be added over time). Route by task:

| Task | Load |
|---|---|
| "Where is X / how is Y wired?" | This file — you're done. |
| Styling, colors, typography, radius, new component visuals | The design-system skill if present; otherwise §3 guardrails + `tailwind.config.ts` + root `Design.md`. |
| Animations, reveal/stagger, cursor, reduced-motion | A motion/animation skill if present; otherwise `lib/motion.ts` + `components/motion/`. |
| Adding/editing content (experience, project, blog post, gear) | A content/data skill if present; otherwise §2 + §4 of this file. |
| Build, smoke test, design-audit greps, deploy checks | A verify/smoke-test skill if present; otherwise §Verify below. |
| Contact form / EmailJS, guestbook / giscus issues | An integrations skill if present; otherwise §3 (ContactForm, Guestbook) + §5. |

If a named skill directory does not exist, fall back to the referenced section here — do not guess conventions from generic Next.js habits.

## Verify

From `/home/Chetan559.github.io`:

```bash
npm run build          # must succeed; route table shows ○/● only, /blog/[slug] lists each post
```

Smoke test (never `pkill -f next` — it matches and kills its own shell, exit 144):

```bash
(npm run start -- -p 4321 &> /tmp/claude-1000/-home-Chetan559-github-io/46761bbb-a0bb-430d-9ea5-aac461aa7920/scratchpad/next.log &)
sleep 3
for r in / /blog /blog/rag-pipelines-that-dont-hallucinate /contact /guestbook /gallery /utilities /nope; do
  echo "$r -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:4321$r)"
done   # expect 200s, /nope -> 404 (current slugs: grep -n 'slug:' data/blogs.ts)
fuser -k 4321/tcp
```

Design audit (both must be true after build):

```bash
grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" .next/static/css/*.css   # expect NO output
grep -oE "localStorage[^<]{0,80}" .next/server/app/index.html                       # expect the next-themes bootstrap snippet
```

## Pitfalls

1. Build fails with `PageNotFoundError` for a random route → stale `.next` from a killed server: `rm -rf .next && npm run build`.
2. Passing a react-icons component (or any function) as a prop from a server component to a client component fails the build — the client component must import the data module directly (pattern: `components/utilities/ToolGrid.tsx`).
3. `cn("p-8", "p-0")` does not make `p-0` win — never merge conflicting Tailwind utilities; use a replacement default like `SpotlightCard`'s `innerClassName ?? "p-8"`.
4. Any component calling `useTheme()` must be mounted-gated (`ThemeToggle.tsx`, `Guestbook.tsx` are the reference implementations) or it will hydration-mismatch.
5. ContactForm payload keys (`from_name`, `reply_to`, `phone`, `message`) and the giscus props are external contracts — changing them breaks integrations with zero build-time errors.
