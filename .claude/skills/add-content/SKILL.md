---
name: add-content
description: Use when adding or editing site content on this portfolio — "add a blog post", "add a project", "add a hackathon", "update my experience", "add gear", "add a tool icon", "update my resume cards", "add gallery photos" — every recipe edits a typed module under data/ plus (sometimes) an asset in public/.
---

# Add / edit content

**When to use:** any content change to this portfolio (repo root `/home/Chetan559.github.io`, branch `next-rewrite`, deploys to Vercel). All copy lives in typed TypeScript modules under `data/`. Components never hardcode content — so a content change is almost always a data-file edit plus an asset drop, and never touches components or routes.

## Golden rules (apply to every recipe)

1. **Edit only `data/*.ts` and `public/`** unless the recipe says otherwise. If you find yourself editing a component to add content, stop — you're doing it wrong.
2. **Unverified facts get a TODO.** Any date, link, or claim you drafted rather than confirmed carries an inline comment: `// TODO(chetan): confirm start month`. Search `grep -rn "TODO" data/` to see existing ones. Never silently invent facts about the owner.
3. **Accents alternate.** Types with an `accent: "blue" | "amber"` field (projects, experience, blogs, resumes) alternate blue/amber down the list for visual rhythm. When appending, pick the opposite of the previous entry.
4. **No purple/magenta anywhere.** Banned by the owner. Accents are royal blue (`accent`, #2557A7) and amber (`amber`, #F5A623) only.
5. **Verify loop after every change** (~60 s): see the [Verify](#verify) section. Minimum: `npm run build` succeeds and the affected route returns 200.

---

## Recipe: add a blog post

**File:** `data/blogs.ts`. Nothing else needs touching — the post auto-appears on `/blog` (listing sorts by `date` descending in `app/blog/page.tsx`), gets its own SSG page via `generateStaticParams()` in `app/blog/[slug]/page.tsx`, and is added to the sitemap by `app/sitemap.ts` (`blogs.map((b) => ({ url: \`${BASE}/blog/${b.slug}\` ... }))`).

**Shape** (from `data/blogs.ts`):

```ts
export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "video";
      /** YouTube video id, e.g. "dQw4w9WgXcQ" — rendered as an embed */
      youtubeId?: string;
      /** Self-hosted video path under /public, e.g. "/videos/demo.mp4" */
      src?: string;
      caption?: string;
    }
  | { type: "quote"; text: string; by?: string };

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  /** Header background image for the post and its listing card */
  cover: string;
  date: string; // ISO yyyy-mm-dd
  readTime: string;
  tags: string[];
  accent: "blue" | "amber";
  blocks: BlogBlock[];
};
```

**Steps:**

1. Drop the cover image in `public/images/` (e.g. `public/images/blog-rag-cover.jpg`). Landscape, ≥1600px wide — it renders full-bleed (`fill` + `sizes="100vw"`) behind the post header with a dark gradient overlay, so white title text must stay readable; avoid very light images.
2. Append an object to the `blogs` array. Slug rules: lowercase, hyphen-separated, no spaces or special characters, unique (it becomes the URL `/blog/<slug>` — check `blogs.map(b => b.slug)` for collisions). Existing example: `"rag-pipelines-that-dont-hallucinate"`.
3. Build the body from blocks. Rendering (see `components/blog/BlogBlocks.tsx`): `heading` → uppercase Oswald `<h2>`; `paragraph` → plain text, **no markdown support** — links/bold will render literally; `image` → 1200×800 aspect card, put in-post images in `public/images/`; `video` with `youtubeId` → privacy-enhanced `youtube-nocookie.com` iframe, or with `src` → self-hosted `<video controls>` from `public/` (e.g. `public/videos/demo.mp4`); `quote` → amber-left-border blockquote, optional `by` attribution.
4. Set `date` in ISO `yyyy-mm-dd` (drives listing order and sitemap `lastModified`), estimate `readTime` (~200 words/min, e.g. `"5 min read"`), pick `accent` opposite the newest existing post.

**Filled example** (minimal, ready to adapt):

```ts
{
  slug: "shipping-my-first-fine-tune",
  title: "Shipping My First Fine-Tune",
  excerpt: "What broke, what worked, and the eval harness that saved the launch.",
  cover: "/images/blog-finetune-cover.jpg",
  date: "2026-07-07",
  readTime: "6 min read",
  tags: ["AI/ML", "LLMs"],
  accent: "amber",
  blocks: [
    { type: "paragraph", text: "Intro paragraph..." },
    { type: "heading", text: "The eval harness" },
    { type: "image", src: "/images/blog-finetune-evals.jpg", alt: "Eval dashboard", caption: "Recall@k over time." },
    { type: "video", youtubeId: "abc123XYZ", caption: "Two-minute demo." },
    { type: "quote", text: "Optimize the loop, not the shot." },
  ],
},
```

**Verify:** build, then `curl -s -o /dev/null -w '%{http_code}\n' http://localhost:4321/blog/shipping-my-first-fine-tune` → `200`. The build output should list the new slug under `/blog/[slug]` as ● (SSG).

---

## Recipe: add / edit a project

**File:** `data/projects.ts`. Renders on the home page (`app/page.tsx` → `components/home/Projects.tsx` → `ProjectCard`).

```ts
export type Project = {
  slug: string;
  title: string;
  tagline: string;      // short label under the title, e.g. "AI Web IDE"
  description: string;  // 1–2 sentences
  tech: string[];       // chip list
  github?: string;
  live?: string;
  mark: "smartsharma" | "documind" | "deepfake" | "mosdac";
  accent: "blue" | "amber";
};
```

**The `mark` field:** in `components/home/ProjectCard.tsx`, `mark === "documind"` renders the custom SVG logo `components/logos/DocuMindMark.tsx`; **every other value falls through to a letter tile** built from `project.title.charAt(0)`, tinted by `accent`. So for a new project: add its slug to the `mark` union in `data/projects.ts` and use it — you get a letter tile for free. Only build a component in `components/logos/` (and add a branch in `ProjectMark`) if the project has a real logo.

**Steps:** append to `projects` with `accent` opposite the previous entry (current order is blue, amber, blue, amber); omit `github`/`live` if none — icons render conditionally; if a link is a placeholder (e.g. profile URL instead of repo), mark it `// TODO(chetan): repo link` like the existing DocuMind entry.

---

## Recipe: add a hackathon

**File:** `data/hackathons.ts`. Renders as a bordered list row on the home page (`components/home/Hackathons.tsx`), newest entries are listed first (array order = display order — this file is manually ordered, prepend new ones).

```ts
export type Hackathon = {
  title: string;
  description: string;
  dates: string;       // freeform, e.g. "Sept 14 – 15, 2024"
  location: string;
  link?: string;       // makes the title an external link with ↗
  highlight?: string;  // optional amber badge next to the title
};
```

`highlight` renders as an amber-bordered chip — use it only for a concrete result (existing example: `highlight: "₹50,000 SSIP grant"` on the New India Vibrant Hackathon finale). Don't add empty-calorie highlights like "Participated".

---

## Recipe: add an experience entry

**File:** `data/experience.ts`. Renders on the home page via `components/home/Experience.tsx` / `ExperienceCard.tsx`. Order: most recent first.

```ts
export type Experience = {
  role: string;
  company: string;
  type: string;        // "Internship" | "Leadership" | "Full-time" — freeform label
  start: string;       // e.g. "Jan 2026"
  end: string;         // "Present" for current
  bullets: string[];   // 2–4 outcome-focused bullets
  tech: string[];
  accent: "blue" | "amber";
};
```

**TODO convention is mandatory here.** This file's header already says `// TODO(chetan): dates and some bullets below are drafted placeholders — review and correct.` Any bullet, date, or company name you write without the owner confirming it gets an inline `// TODO(chetan): ...` (see existing `start: "Jan 2026", // TODO: confirm start month`). Never remove an existing TODO without the owner's confirmation of the fact.

---

## Recipe: add gear

**Files:** `data/gear.ts` + image in `public/images/gear/`. Renders on `/utilities` (`components/utilities/GearGrid.tsx`).

```ts
export type Gear = {
  name: string;
  category: string;  // chip: "Laptop", "Mouse", "Display"...
  note: string;      // one line of specs/personality
  image: string;     // "/images/gear/<file>.png"
  link?: string;     // "Where to find it ↗" — optional, e.g. Amazon/Flipkart product page
};
```

**Image:** PNG with **transparent background** (existing files: `legion.png`, `mouse.png`, etc. — match the style). It renders inside a fixed 160px-tall tile at `width={200} height={140}` with `object-contain`, so any aspect ratio works but transparent product cutouts look right; a white-boxed JPEG will look wrong in dark mode.

---

## Recipe: add a tool icon

**File:** `data/tools.ts` — three `ToolGroup`s ("System", "Coding Tools", "Software & Applications"), rendered on `/utilities` by `components/utilities/ToolGrid.tsx`.

```ts
export type Tool = {
  name: string;
  href: string;
  /** Falls back to a first-letter tile when no icon is available */
  icon?: IconType;
};
```

**Step 1 — verify the react-icons export EXISTS before importing it.** react-icons 5.x removed several brand icons for licensing reasons (Canva is the canonical example — `SiCanva` does not exist). An import of a nonexistent export fails the build. Check first:

```bash
cd /home/Chetan559.github.io && node -e "console.log(!!require('react-icons/si').SiCanva, !!require('react-icons/si').SiFigma)"
# prints: false true   → SiCanva missing, SiFigma exists
```

Search across icon packs the repo already uses (`si` = Simple Icons brands, `fa6` = Font Awesome, `bi` = BoxIcons):

```bash
cd /home/Chetan559.github.io && node -e "for (const p of ['si','fa6','bi']) console.log(p, Object.keys(require('react-icons/'+p)).filter(k=>/canva/i.test(k)))"
```

**Step 2a — icon exists:** add it to the pack's existing import at the top of `data/tools.ts` (keep alphabetical) and set `icon: SiWhatever` on the entry.

**Step 2b — icon missing:** omit `icon` entirely. The grid renders a first-letter tile (`tool.name.charAt(0)` in an accent-tinted square) — this is the deliberate pattern, exactly how Canva is handled today: `{ name: "Canva", href: "https://www.canva.com/" }`. Do NOT import an off-brand lookalike icon or inline an SVG.

**Server/client note:** `data/tools.ts` exports icon *functions*, so it may only be imported by client components. `ToolGroups` in `components/utilities/ToolGrid.tsx` is `"use client"` and imports the data module itself — never lift `toolGroups` into a server page and pass it down as props, or the build fails with "Functions cannot be passed directly to Client Components".

---

## Recipe: resumes

**Files:** `data/resumes.ts` + PDF in `public/` (root, not `public/images/`). Renders on the home page (`components/home/ResumeSection.tsx`) as two download cards.

```ts
export type Resume = {
  label: string;
  file: string;        // "/<file>.pdf" — path from public/ root
  accent: "blue" | "amber";
  blurb: string;
  highlights: { label: string; featured?: boolean }[];
};
```

To **update a PDF**, overwrite the file in `public/` keeping the same filename (`public/Chetan_Sharma_Resume.pdf`, `public/Resume_ChetanSharma_DataScience.pdf`) — no data change needed. `featured: true` on a highlight renders it as an **amber-bordered chip** instead of the neutral gray one — at most one featured chip per resume (currently `"Citations in PDF generation"` on both). Verify the PDF serves: `curl -s -o /dev/null -w '%{http_code}' http://localhost:4321/Chetan_Sharma_Resume.pdf` → `200`.

---

## Recipe: gallery

**File:** `data/gallery.ts` — this one is **generated from a count, not a hand-written list**:

```ts
export const gallery: GalleryImage[] = Array.from({ length: 25 }, (_, i) => ({
  src: `/images/gallery/photo${i + 1}.jpg`,
  alt: `Gallery photo ${i + 1}`,
}));
```

To add photos: drop sequentially numbered `.jpg` files into `public/images/gallery/` continuing the sequence (next is `photo26.jpg`), then bump `length: 25` to match the file count. The two must agree — a `length` higher than the file count produces broken images on `/gallery`; check with `ls public/images/gallery | wc -l`. Filenames are strictly `photo<N>.jpg` with no gaps in N. Photos render in a masonry grid with a lightbox (`components/gallery/GalleryGrid.tsx`); any aspect ratio is fine. If a specific photo needs a meaningful alt text, refactor that entry out of the generator rather than editing the loop.

**Heads-up:** blog placeholder covers currently point into `/images/gallery/` (marked `// TODO: real cover image` in `data/blogs.ts`) — don't renumber or delete gallery files without grepping for references: `grep -rn "images/gallery" data/`.

---

## Image guidance (all recipes)

- `next/image` requires either `width`+`height` or `fill` — components in this repo already set these; you only supply files matching the expected shape (blog cover: wide landscape; blog inline: rendered at 1200×800 box, `object-cover`; gear: transparent PNG; gallery: any).
- `sizes` patterns already used here, for reference if you ever touch a component: full-bleed cover `sizes="100vw"`; blog body `sizes="(max-width: 768px) 100vw, 768px"`; gallery grid `sizes="(max-width: 768px) 50vw, 33vw"`.
- Assets go under `public/` and are referenced by root-relative path (`/images/...`). Keep files reasonably sized (< ~500 KB for photos); Next optimizes on Vercel but the source still ships to the repo.

---

## Verify

Run from `/home/Chetan559.github.io` after any content change (~60 s):

```bash
rm -rf .next            # only needed if a previous build/server died mid-run
npm run build           # must end with the route table, zero type errors
(npm run start -- -p 4321 &> /tmp/next-start.log &)
sleep 3
for r in / /blog /utilities /gallery /contact /guestbook /blog/<your-new-slug>; do
  echo -n "$r "; curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:4321$r";
done
fuser -k 4321/tcp       # NEVER pkill -f "next" — it kills its own shell (exit 144)
```

Expected: every route prints `200`. In the `npm run build` route table, every route is `○` (static) or `●` (SSG) — a `ƒ` (dynamic) route means something regressed. New blog slugs appear as ● children of `/blog/[slug]`.

Design audit (after build, should print nothing):

```bash
grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" .next/static/css/*.css
```

## Pitfalls

- **Build fails "Functions cannot be passed directly to Client Components"** → a server component is passing react-icons components (or any function from a data module) as props across the server→client boundary. Fix: make the client component import the data module itself (pattern: `ToolGroups` in `components/utilities/ToolGrid.tsx`).
- **Build fails `PageNotFoundError` for a random route** → stale `.next` from a killed server. `rm -rf .next` and rebuild; nothing is actually wrong with your change.
- **New blog post 404s** → slug mismatch between the URL you're curling and `data/blogs.ts`, or you edited while the old server was running — rebuild and restart.
- **Duplicate slug/title** → blog cards key on `slug`, hackathons on `title`, tools on `name`: duplicates cause React key collisions. Grep before adding.
- **Import of a nonexistent react-icons export** → `Attempted import error: 'SiX' is not exported` at build time. Run the node existence check first (see tool recipe); use the letter-tile fallback when missing.
- **External links** added inside data (project `github`/`live`, hackathon `link`, gear `link`, tool `href`) are rendered with `target="_blank" rel="noopener noreferrer"` and `data-cursor="hover"` by the components — data files carry bare URLs only; don't add markup to strings.
