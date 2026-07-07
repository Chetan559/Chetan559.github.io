---
name: design-system-ui
description: Use when building or extending a design system, component library, or styled UI from a design spec — triggers include "implement Design.md", "set up the design system", "add a new section/card/component", "make this match the design", "theme/dark mode setup", "the animations feel off", or any new-project UI build. Teaches the method (spec → tokens → foundation → motion → sections) with this repo as the worked example.
---

# Design System & UI Method

Use this when turning ANY design spec (a `Design.md`, a Figma dump, a brand PDF) into a production design system, or when adding UI to a project that already has one. The method is general; `/home/Chetan559.github.io` is the worked example throughout. Full quoted source for the signature components lives in [references/worked-example.md](references/worked-example.md).

## 1. Read and interrogate the spec

Before writing any code, extract from the spec — in a scratch note, not in your head:

1. **Palette + roles.** Not just hex values: which color is text, which is surface, which is border, which are accents, which are status-only. This repo's `Design.md` (repo root) lists black/white primaries, a neutral scale, and accent colors with explicit roles.
2. **Type hierarchy.** Font families and where each is allowed; the size ladder with line-heights (Design.md §3 has a table: Display 130px/117px → Body 20px/24px).
3. **Spacing base.** Find the base unit (here 8px, Design.md §5) and the named steps that recur (32px card padding, 96px section padding, 160px horizontal gutters).
4. **Radius scale.** Which radii exist and what each is FOR (here: buttons are a pill or 0/4px; cards are exactly 24px).
5. **Shadow/elevation levels.** How many exist and when they appear (here: cards ship shadowless; shadow appears only on hover and modals).
6. **Breakpoints and container max-width** (here 1440px).
7. **Do/don'ts and personality words** ("generous whitespace", "bold condensed typography", "minimal component styling") — these decide ties later.

**The precedence rule (learned the hard way here):**

> explicit user/owner constraints > the written spec > your taste defaults

This project's spec says magenta (`#FF7EF2`) is a primary accent. The owner banned purple/magenta outright. The build uses royal blue + amber instead. When the human and the document conflict, the human wins — and record the override somewhere greppable (here: the ban is enforced by a build-output grep, §8).

**When accents are unspecified**, extract them from the client's real assets — a logo, product screenshot, or (as here) the owner's profile photo: blue shirt → `#2557A7`, amber lanyard → `#F5A623`. Rules: **max 2 accents, one cool + one warm, used sparingly** (links, focus rings, small highlights — never large fills).

## 2. Token architecture

Encode the system into config so violations are impossible, not just discouraged.

- **Semantic names, never literal.** `bg`, `fg`, `muted`, `line`, `accent` — not `gray-200` or `blue-600`. Components then read as intent: `border-line`, `text-muted`.
- **Every token gets a dark variant** as a sibling key, so usage is mechanical: `bg-bg dark:bg-bg-dark text-fg dark:text-fg-dark border-line dark:border-line-dark`.
- **Encode discipline into the scale itself.** The strongest guardrail in this repo: the `borderRadius` map defines `sm: 2px`, `DEFAULT: 4px`, `card: 24px` — and nothing else. `rounded-lg`, `rounded-xl`, `rounded-2xl` simply do not compile to CSS, so nobody can put a 12px radius on a chip. Do the same for shadows: only `shadow-hover` and `shadow-modal` exist, so the flat aesthetic cannot erode.
- **Fluid type via clamp() fontSize tokens** so heroes scale without breakpoint soup.

The worked example, `tailwind.config.ts` (repo root, verbatim core):

```ts
darkMode: "selector",
theme: {
  extend: {
    fontFamily: {
      display: ["var(--font-oswald)", "Impact", "sans-serif"],
      sans: ["var(--font-inter)", "system-ui", "sans-serif"],
    },
    colors: {
      bg: { DEFAULT: "#FFFFFF", dark: "#111111" },
      fg: { DEFAULT: "#000000", dark: "#FFFFFF" },
      muted: { DEFAULT: "#444444", dark: "#D4D4D8" },
      line: { DEFAULT: "#E5E7EB", dark: "#333333" },
      accent: { DEFAULT: "#2557A7", soft: "#2557A71A" },  // soft = 10% alpha fill
      amber: { DEFAULT: "#F5A623", soft: "#F5A6231A" },
      cyan: "#00D1FF",   // secondary interactions only
      warn: "#FFF100",
    },
    borderRadius: { none: "0", sm: "2px", DEFAULT: "4px", card: "24px" },
    fontSize: {
      hero: ["clamp(48px, 9vw, 130px)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
      display: ["clamp(36px, 6vw, 80px)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
      h3: ["clamp(24px, 3vw, 40px)", { lineHeight: "1.05" }],
      "body-lg": ["20px", { lineHeight: "1.5" }],
    },
    boxShadow: {
      hover: "0 8px 30px rgba(0,0,0,0.12)",
      modal: "0 24px 60px rgba(0,0,0,0.25)",
    },
  },
},
```

How each block generalizes: `fontFamily` maps roles (display/sans) to CSS variables set by `next/font`, so swapping fonts touches one file; `colors` maps roles to values with dark siblings; `borderRadius`/`boxShadow` are closed sets = enforced discipline; `fontSize` names the hierarchy from the spec's type table, with clamp() bounds taken from the spec's desktop size (max) and a readable mobile size (min).

## 3. Build order — foundation before sections, always

Never write a content section before the foundation is verified. The order:

1. **Tokens/config** — `tailwind.config.ts` as above. Set `darkMode: "selector"` (Tailwind 3.4) and include `./data/**/*.ts` in `content` if data modules carry class names.
2. **globals.css** — Tailwind directives, then only true globals. This repo's entire `app/globals.css` is ~28 lines: smooth scroll + `scroll-padding-top`, `body { @apply bg-bg text-fg antialiased dark:bg-bg-dark dark:text-fg-dark; }`, `::selection` in the accent, the cursor-none rule, and a `prefers-reduced-motion` override. If globals.css grows past ~60 lines, you are hiding component styles in it — stop.
3. **Fonts** — `next/font` with CSS variables, wired in `app/layout.tsx`:
   ```tsx
   const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400","500","600","700"] });
   const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
   // <html lang="en" suppressHydrationWarning className={`${oswald.variable} ${inter.variable}`}>
   ```
4. **Theme** — next-themes. Three non-negotiables, all in this repo:
   - Provider (`components/theme/ThemeProvider.tsx`): `attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange`.
   - `<html suppressHydrationWarning>` in `app/layout.tsx` — without it, hydration warnings on every load.
   - **Mounted-gate every `useTheme()` consumer** (`components/theme/ThemeToggle.tsx`): `useState(false)` + `useEffect(() => setMounted(true), [])`, render a same-size placeholder (`<div className="h-10 w-10" aria-hidden />`) until mounted. The server cannot know the theme; rendering theme-dependent output pre-mount is a guaranteed hydration mismatch.

   **Verify the toggle end-to-end (click, hard-refresh in dark, no flash) before writing a single section.** Theme bugs found later contaminate every component you built in between.
5. **Primitives** — `components/ui/Button.tsx` (variants as a lookup object: `primary` = inverted `bg-fg text-bg`, `ghost` = `border-line hover:border-accent`; height 48px, `rounded`, 14px/500 text) and the Section shell, `components/layout/Section.tsx`:
   ```tsx
   <section id={id} className={cn("mx-auto w-full max-w-[1440px] px-6 py-24 md:px-16 xl:px-40", className)}>
   ```
   plus optional eyebrow (`text-sm uppercase tracking-widest text-muted`) and Oswald `text-display` title. Every content section composes this; nobody re-derives the gutters.
6. **Motion library** — `lib/motion.ts` (§4). Named, shared variants; components import them, never inline magic numbers.
7. **Card language** — the signature interactive surface (§5).
8. **Only now: content sections**, composed from Section + cards + Reveal, with all copy imported from `data/*.ts`.

## 4. Motion taste — the exact values

From `lib/motion.ts` (repo, verbatim — full file in references):

```ts
export const EASE = [0.22, 1, 0.36, 1] as const;               // fast start, long luxurious settle
export const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
export const heroLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};
export const viewport = { once: true, margin: "-80px" } as const;
```

Why these numbers:
- **EASE `[0.22,1,0.36,1]`** — a strong ease-out; motion arrives quickly then decelerates gently. Linear or default easings read as cheap.
- **Stagger 0.08 / delay 0.1** — enough rhythm to be perceived as a cascade, not so slow the user waits. Above ~0.12 stagger, lists feel sluggish.
- **Fade-up `y: 32`, duration 0.6** — 32px is visible travel without "flying in"; 0.6s at this ease feels calm. Never exceed ~48px or ~0.8s for content reveals.
- **Hero clip-reveal** — wrap each headline line in `overflow-hidden`, animate the inner element `y: "110%" → "0%"` with `heroLine`. Text rises out of an invisible mask; the 110% start guarantees descenders are hidden.
- **`viewport { once: true, margin: "-80px" }`** — reveals fire once, 80px before the element actually enters, so content is already settling as the user reaches it. `once: true` because re-triggering on scroll-up is noise.

**Reduced motion is a contract, not a nice-to-have.** Every animated component checks `useReducedMotion()` and degrades to fully static. The pattern from `components/motion/Reveal.tsx`:

```tsx
const reduce = useReducedMotion();
const v = variants ?? (stagger ? containerStagger : fadeUpItem);
return (
  <motion.div variants={v} initial={reduce ? "visible" : "hidden"}
    whileInView="visible" viewport={viewport} ...>
```

`initial="visible"` — not "skip rendering the wrapper", not "shorter duration". The content simply starts in its final state. Likewise `TiltCard` returns a plain `SpotlightCard` when reduced, `SpotlightCard` skips its glow layers, and `CustomCursor` never enables (it also gates on `matchMedia("(pointer: fine)")` so touch devices keep the native cursor).

**Pointer tracking uses motion values/springs, never React state.** `useMotionValue` + `useSpring` update outside the render cycle — zero re-renders at 60fps. `useState` in a mousemove handler re-renders the whole subtree per frame; this is always wrong.

## 5. Signature card language

Two composable client components define "interactive card" for the whole site. Full source in [references/worked-example.md](references/worked-example.md); the techniques:

**SpotlightCard (`components/cards/SpotlightCard.tsx`) — the mask-ring glow.** A mouse-tracked gradient that lights up ONLY the 1.5px border ring:

```tsx
const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, ${c1}, ${c2} 45%, transparent 70%)`;
// ...
<motion.div style={{
  background: spotlight,
  padding: "1.5px",
  maskImage: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",           // + WebkitMaskImage / WebkitMaskComposite: "xor"
}} />
```

Line by line: `mx/my` are motion values set from `onMouseMove` (client coords minus `getBoundingClientRect()`), so the template string updates without re-render. The overlay div covers the card (`absolute inset-0 rounded-card`). `padding: 1.5px` makes its content-box 1.5px smaller than its border-box. The two-layer mask — one gradient clipped to `content-box`, one covering the full box — combined with `maskComposite: "exclude"` (Safari/Chrome: `WebkitMaskComposite: "xor"`) subtracts the inner region from the outer, leaving only the 1.5px ring painted. Result: the radial gradient is visible exclusively in the border. A second copy of the same gradient with `blur-xl` and `group-hover:opacity-20` provides a soft outer glow. Both layers are `pointer-events-none aria-hidden` and `opacity-0` until `group-hover`. Glow colors come from a `GLOWS` lookup (`blue` / `amber` / `dual`) built from the two accent tokens.

**TiltCard (`components/cards/TiltCard.tsx`) — the 3D tilt.** Wraps SpotlightCard:

```tsx
const px = useMotionValue(0.5); const py = useMotionValue(0.5);   // normalized 0..1
const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 200, damping: 20 });
const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 200, damping: 20 });
```

Pointer position is normalized against the card rect (0..1), mapped to ±8° (note the axis flip: mouse at top ⇒ positive rotateX ⇒ top tilts away), smoothed by a spring (stiffness 200 / damping 20 = responsive but never wobbly). Outer wrapper sets `perspective: 900`; the rotating div uses `transformStyle: "preserve-3d"` and `whileHover={{ scale: 1.02 }}` for a slight pop. `onMouseLeave` resets to (0.5, 0.5) so the spring animates the card flat. Under reduced motion it returns `<SpotlightCard {...props} />` — same visuals, no tilt.

These generalize to any "make the cards feel interactive" request: change the glow colors to the project's accents, tune `maxTilt` down for dense grids (4–6°), keep the spring constants.

## 6. Taste principles — think like the departing fellow

- **Typography carries the design; color is punctuation.** If a section looks flat, reach for scale/weight/case contrast before reaching for color.
- **Whitespace is a feature.** `py-24` between sections, `p-8` inside cards, and resist filling gaps. Cramped is the default failure mode; err spacious.
- **One accent per element.** A card may glow blue OR have an amber tag — not both. Dual gradients are reserved for the signature card glow.
- **Content lives in data modules; components stay dumb.** All copy in typed `data/*.ts` files (`data/site.ts`, `data/projects.ts`, …). A component receives or imports data and renders it — it never contains a sentence of copy. Unverified facts get `// TODO(chetan)` comments in the data file.
- **Ship flat; let shadows mean something.** Surfaces are borders + subtle translucency (`bg-white/60 backdrop-blur-md`, dark: `bg-white/[0.04]`). Shadow appears only on hover (`shadow-hover`) and modals (`shadow-modal`). If everything is elevated, nothing is.
- **Every interactive element must feel alive** — `data-cursor="hover"` (feeds `components/motion/CustomCursor.tsx`), spotlight, tilt, `hover:-translate-y-1` — **and degrade to fully static under reduced motion.** Both halves are the rule.
- **Contrast is non-negotiable.** AA minimum for all text, including muted-on-bg in both themes. That is why `muted.dark` is `#D4D4D8`, not a symmetric `#444444`.
- **External links:** `target="_blank" rel="noopener noreferrer"`, every time.
- **`"use client"` only on leaves.** Pages stay server components composing client leaves. Never pass component functions (e.g. react-icons) as props across the server→client boundary — the build fails with "Functions cannot be passed directly to Client Components". Instead the client component imports the data module itself (see `components/utilities/ToolGrid.tsx` importing `toolGroups` from `@/data/tools`).
- **Never merge conflicting Tailwind utilities.** `cn()` (`lib/utils.ts`) is a plain joiner — precedence comes from stylesheet order, not class order, so `cn("p-8", "p-0")` does NOT make `p-0` win. Use a replacement default instead: `innerClassName ?? "p-8"` (SpotlightCard's pattern).

## 7. Adapting to a different Design.md

| Changes per project (values) | NEVER changes (architecture) |
|---|---|
| Color values, accent choices | Semantic token names + dark siblings |
| Font families, type scale numbers | Roles-to-CSS-variable wiring, clamp() fluid type |
| Radius values, shadow recipes | Closed token sets that enforce discipline |
| Easing personality, durations, tilt degrees | Build order (§3), shared `lib/motion.ts` pattern |
| Light-default vs dark-default | Reduced-motion contract, mounted-gate rule |
| Section gutters, max-width | Section-shell primitive, data-layer separation |
| — | Verification greps (§8, with values swapped) |

**Worked micro-example — spec says "serif editorial brand, heavy shadows, dark-default":**
1. Spec read: extract the serif display face, the shadow recipes as a real elevation scale, note dark is primary.
2. Tokens: `bg: { DEFAULT: "#0E0E0E", dark: … }` flips — make dark the DEFAULT and light the variant (or keep names and set `defaultTheme="dark"`); `fontFamily.display` gets the serif via `--font-<name>`; `boxShadow` now has 3–4 named levels (`raised`, `overlay`, `modal`) because shadows ARE the language here — still a closed set.
3. Build order: identical. Theme step sets `defaultTheme="dark"` in the provider; verify toggle first, as always.
4. Motion: editorial = slower and softer — duration 0.7–0.8, smaller `y` (16–24px), maybe a gentler ease like `[0.25, 0.8, 0.25, 1]`; keep stagger ~0.08 and `viewport once`.
5. Cards: spotlight ring may fight heavy shadows — swap the hover treatment to a shadow-level promotion + subtle border lighten; keep the motion-value architecture.
6. Verification: banned-color grep now targets whatever the owner excluded; add a grep asserting no un-tokened `box-shadow` literals in components.
Everything in the right-hand column above is untouched.

## 8. Verification

Run after `npm run build`, from `/home/Chetan559.github.io`:

```bash
# 1. Banned colors must not appear in built CSS (expect: no output, exit 1)
grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" .next/static/css/*.css

# 2. Radius discipline: no non-token radius classes in source (expect: no output)
grep -rnE "rounded-(lg|xl|2xl|3xl)\b" app components

# 3. No-flash theme check: the next-themes bootstrap script must be inlined in the built HTML
grep -oE "localStorage[^<]{0,80}" .next/server/app/index.html
# expect output containing: localStorage.getItem('theme') ...
```

Smoke test (never `pkill -f next` — it matches its own shell and kills it with exit 144):

```bash
npm run build   # if it fails with PageNotFoundError on random routes: rm -rf .next && rebuild
(npm run start -- -p 4321 &> /tmp/next-start.log &)
sleep 3
for r in / /blog /gallery /utilities; do
  echo "$r $(curl -s -o /dev/null -w '%{http_code}' http://localhost:4321$r)"
done   # expect 200 for every route
fuser -k 4321/tcp
```

Manual checklist (browser):
1. Click the theme toggle — both directions, no flash, icon animates.
2. Hard-refresh while in dark mode — page must load dark with no white flash.
3. DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` — page fully static and fully readable: reveals visible, cards flat, native cursor back.
4. 320px viewport — no horizontal scroll, hero clamp() readable.
5. Touch device (or DevTools touch emulation) — custom cursor absent, hover-only affordances not required to reach content.

## Pitfalls

- **Hydration mismatch from `useTheme()`**: any component reading theme without the mounted-gate. Fix: `ThemeToggle.tsx` pattern — placeholder until `mounted`.
- **`cn("p-8", "p-0")` "override" silently losing**: conflicting utilities resolve by stylesheet order. Use replacement defaults (`innerClassName ?? "p-8"`) or the single source of truth.
- **Icons as props across server→client**: build error "Functions cannot be passed directly to Client Components". Client component imports the data module directly.
- **Stale `.next` after a killed server**: `PageNotFoundError` on random routes at build. `rm -rf .next` and rebuild.
- **Adding a radius/shadow "just this once"** via arbitrary values (`rounded-[12px]`): this defeats the closed token set. If a new value is genuinely needed, add it to `tailwind.config.ts` with a semantic name so the decision is recorded.
- **Animating with React state on pointer events**: per-frame re-renders. Always motion values + springs.
