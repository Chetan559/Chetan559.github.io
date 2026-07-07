---
name: new-section-or-page
description: Use when adding UI surface area to this portfolio — "add a section to the home page", "add a new page/route", "add an Awards/Talks/Certifications section", "create a /books page", or any task that creates a new data module + component + route/nav entry. Covers the data-first convention, Section/Reveal composition, card choice, server/client boundary rules, nav vs footer placement, and the build/curl verification recipe.
---

# Add a Home Section or a New Route

Use this when creating any new visible surface: a section on `/` (path A) or a whole new route like `/books` (path B). Both follow the same iron rule: **all copy lives in a typed module under `data/`; components never hardcode content.**

Repo root: `/home/Chetan559.github.io`. Branch `next-rewrite` deploys to Vercel. Next.js 15 App Router + TypeScript + Tailwind 3.4 (`darkMode: "selector"`) + framer-motion 12.

## Shared step 0: the data module

Create `data/<thing>.ts` first. Export a type and a typed array/object. Real example, `data/hackathons.ts`:

```ts
export type Hackathon = {
  title: string;
  description: string;
  dates: string;
  location: string;
  link?: string;
  highlight?: string;
};

export const hackathonsIntro =
  "During my time in university I've attended hackathon after hackathon — ...";

export const hackathons: Hackathon[] = [
  {
    title: "Smart India Hackathon 2024",
    description: "The Government of India's nationwide innovation challenge — ...",
    dates: "Aug – Sept 2024",
    location: "Gujarat Technological University, Ahmedabad",
    link: "https://sih.gov.in/",
  },
  // ...
];
```

Rules:
- Any fact you drafted (dates, prize amounts, wording) that the owner has not confirmed gets a `// TODO: ...` or `// TODO(chetan): ...` comment on that line (see `data/hackathons.ts:57`).
- If an entry needs a react-icons icon, type it `icon?: IconType` (`import type { IconType } from "react-icons"`) as in `data/tools.ts` — and read the server/client boundary rule below before wiring it up.

## Path A: new home section

### 1. Create `components/home/<X>.tsx`

Compose `Section` (id + title + eyebrow) with `Reveal stagger` + `RevealItem` per animated block. Condensed real example, `components/home/Hackathons.tsx`:

```tsx
import { hackathons, hackathonsIntro } from "@/data/hackathons";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export function Hackathons() {
  return (
    <Section id="hackathons" title="Hackathons" eyebrow="I like building things">
      <Reveal stagger>
        <RevealItem>
          <p className="max-w-3xl text-body-lg text-muted dark:text-muted-dark">
            {hackathonsIntro}
          </p>
        </RevealItem>
        <div className="mt-12">
          {hackathons.map((h) => (
            <RevealItem key={h.title}>
              {/* row: border-t border-line ... dark:border-line-dark */}
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
```

Notes on the pieces (all verified in repo):
- `components/layout/Section.tsx` renders `<section id={id}>` with shell `mx-auto w-full max-w-[1440px] px-6 py-24 md:px-16 xl:px-40`, an uppercase eyebrow (`text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark`) and an Oswald title (`font-display text-display font-bold uppercase tracking-tight`). Never rebuild this shell by hand.
- `components/motion/Reveal.tsx`: `Reveal` with `stagger` uses `containerStagger` from `lib/motion.ts` (staggerChildren 0.08); `RevealItem` is a `fadeUpItem` child (opacity 0 → 1, y 32 → 0, ease `[0.22, 1, 0.36, 1]`). Reduced motion is already handled inside `Reveal` (`initial={reduce ? "visible" : "hidden"}`) — do not add your own `useReducedMotion` for reveals. Viewport is `{ once: true, margin: "-80px" }`.
- This file stays a **server component** (no `"use client"`) as long as it only composes `Section`, `Reveal`, `RevealItem`, and plain markup. Only add `"use client"` if the section itself needs hooks/handlers.

### 2. Insert into `app/page.tsx`

Current order (keep it; insert your section where it belongs narratively):

```tsx
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Experience } from "@/components/home/Experience";
import { Hackathons } from "@/components/home/Hackathons";
import { Projects } from "@/components/home/Projects";
import { ResumeSection } from "@/components/home/ResumeSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Hackathons />
      <Projects />
      <ResumeSection />
    </>
  );
}
```

### 3. Navigation: prefer the footer

`site.nav` in `data/site.ts` already has **9 links** rendered at `gap-6 lg:flex xl:gap-8` in `components/layout/Navbar.tsx` — the desktop nav is at capacity. Adding a 10th link will crowd or wrap it. Default decision: **do not add to `site.nav`**; add a link in `components/layout/Footer.tsx` instead (follow the existing `Link`/`a` pattern there: `data-cursor="hover"`, `text-sm text-muted transition-colors hover:text-fg dark:text-muted-dark dark:hover:text-fg-dark`). Only touch `site.nav` if the owner explicitly asks, and note the crowding when you do. Home-section anchors use the `/#<id>` form (e.g. `{ label: "Resume", href: "/#resume" }`) — the `id` must match your `<Section id="...">`. Note `site` is `as const`, so nav edits are compile-checked.

## Path B: new route

### 1. Create `app/<name>/page.tsx` — server component + metadata

Model it on `app/utilities/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { GearGrid } from "@/components/utilities/GearGrid";
import { ToolGroups } from "@/components/utilities/ToolGrid";

export const metadata: Metadata = {
  title: "Utilities",
  description: "The hardware, system, coding tools, and software behind the work.",
};

export default function UtilitiesPage() {
  return (
    <Section title="Gear / Utilities" eyebrow="Daily drivers">
      {/* server-rendered copy here */}
      <GearGrid />
      <ToolGroups />
    </Section>
  );
}
```

The page stays a server component. All interactivity lives in client leaves under `components/<name>/` (create the directory). The layout (`app/layout.tsx`) already provides Navbar, Footer, ThemeProvider, CustomCursor, and fonts — pages render content only.

### 2. Register the route

- **`app/sitemap.ts`**: add `"/<name>"` to the `pages` array (currently `"", "/contact", "/blog", "/guestbook", "/gallery", "/utilities"`).
- **Navigation**: same footer-first rule as Path A step 3. Route links use plain `"/<name>"` hrefs.

## Both paths: component decision rules

**Which card?**
- `components/cards/SpotlightCard.tsx` (mouse-tracked glow ring, no tilt) — default for lists, grids of static info, anything secondary. Props: `glow?: "blue" | "amber" | "dual"` (default `"dual"`), `className`, `innerClassName`.
- `components/cards/TiltCard.tsx` (spring tilt ±8°, wraps SpotlightCard) — reserve for hero-grade grids only; today that's Projects (`components/home/ProjectCard.tsx`). It self-degrades to a plain SpotlightCard under reduced motion.
- Plain bordered rows (no card) are fine and often best — Hackathons uses `border-t border-line py-6 ... last:border-b ... dark:border-line-dark` rows, not cards.

**Padding override on cards**: card padding is a *replacement* default, not a merge — `SpotlightCard.tsx:76` renders `cn("relative", innerClassName ?? "p-8")`. To change padding pass `innerClassName="flex h-full flex-col p-8"` (see ProjectCard) or `innerClassName="p-0"`. Never pass a conflicting padding via `className` and expect it to win: Tailwind resolves conflicts by stylesheet order, not class-attribute order.

**Accent alternation**: items carry an accent in their data (`accent: "blue" | "amber"` in `data/projects.ts`) and the component maps it: `glow={project.accent === "amber" ? "amber" : "blue"}`, `bg-amber-soft text-amber` vs `bg-accent-soft text-accent`. Alternate blue/amber across a grid rather than making everything blue. **Purple/magenta/violet are banned site-wide.** Allowed accents: `accent` (#2557A7 royal blue), `amber` (#F5A623); `cyan`/`warn` only for minor secondary interactions.

**Dark variants are mandatory**: every color utility gets its dark twin in the same class string. Canonical pattern: `bg-bg dark:bg-bg-dark text-fg dark:text-fg-dark border-line dark:border-line-dark text-muted dark:text-muted-dark`. `accent`/`amber` have no `-dark` variant (same hex both modes).

**Radius discipline** (`tailwind.config.ts`): `rounded` = 4px, `rounded-sm` = 2px — use these for buttons, chips, tags, icon tiles. `rounded-card` = 24px is reserved for feature cards/containers (SpotlightCard already applies it).

**Type scale**: section titles come from `Section`; sub-headings use `font-display text-h3 font-bold uppercase tracking-tight`; lead paragraphs use `text-body-lg text-muted dark:text-muted-dark`.

**Interactivity contract**:
- Every interactive element (links, buttons, toggles) gets `data-cursor="hover"` — it feeds `components/motion/CustomCursor.tsx`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Buttons: use `components/ui/Button.tsx` (primary inverted / ghost variants), don't restyle.
- Any new client component with its own animation must gate on `useReducedMotion()` (see SpotlightCard: `onMouseMove={reduce ? undefined : onMouseMove}`).

## The server/client boundary trap (icons)

react-icons components are **functions**. Passing them as props from a server component to a client component fails the build with `Functions cannot be passed directly to Client Components`. The fix used in this repo: the **client component imports the data module itself**. `components/utilities/ToolGrid.tsx`:

```tsx
"use client";

import { toolGroups, type ToolGroup } from "@/data/tools";   // ← client imports data directly
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export function ToolGroups() { /* maps toolGroups, renders <tool.icon /> */ }
```

…and the server page (`app/utilities/page.tsx`) renders `<ToolGroups />` with **no props**. If your new section's data contains `IconType` (or any function), do the same: mark the leaf `"use client"`, import the data inside it, pass nothing across the boundary. Plain serializable data (strings, numbers, arrays) may cross freely — Hackathons' server component maps its data inline because there are no functions in it.

## Verify (run every time)

```bash
cd /home/Chetan559.github.io
rm -rf .next            # stale .next causes phantom PageNotFoundError; cheap insurance
npm run build
```

Expected: build succeeds; the route table lists your route as `○` (Static) or `●` (SSG). A new home section shows no new route — check `/` builds and move to smoke test.

```bash
(npm run start -- -p 4123 &> /tmp/claude-1000/-home-Chetan559-github-io/46761bbb-a0bb-430d-9ea5-aac461aa7920/scratchpad/start.log &)
sleep 3
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:4123/          # expect 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:4123/<name>    # path B: expect 200
curl -s http://localhost:4123/ | grep -io "some distinctive copy from your data module"   # expect a match
fuser -k 4123/tcp
```

Design audit (must return nothing / must match, respectively):

```bash
grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" .next/static/css/*.css
grep -oE "localStorage[^<]{0,80}" .next/server/app/index.html   # theme bootstrap must appear
```

## Pitfalls

- **Never** `pkill -f "next"` — the pattern matches your own shell's command line and kills it (exit 144). Stop test servers with `fuser -k <port>/tcp` only.
- Hardcoding copy in a component instead of `data/` will pass the build but violates the project's core convention; reviewers will bounce it.
- Forgetting `dark:` twins looks fine in your default theme and broken in the other. Grep your new file for color utilities and check each has a pair.
- `cn("p-8", "p-0")` does not make `p-0` win (stylesheet order decides). Use replacement-default props like `innerClassName` instead of merging conflicting utilities.
- Section `id` must match the nav anchor exactly (`id="hackathons"` ↔ `/#hackathons`); `app/layout.tsx` sets `<body id="top">` for the footer's back-to-top link — don't reuse `top`.
- Do not add `"use client"` to a page under `app/` — keep pages server components exporting `metadata`, push interactivity into `components/<name>/` leaves.
- `data/site.ts` is `as const`; if code narrows on nav labels/hrefs, TypeScript will surface breakage at build time — run the build after nav edits.
