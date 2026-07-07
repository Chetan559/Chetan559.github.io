---
name: motion-and-cards
description: Use when working on this portfolio's animation/interaction layer — "make X animate", "add a scroll reveal", "add a card effect / spotlight / tilt", "the custom cursor is broken", "reveal doesn't fire", "tilt feels wrong", "hydration mismatch in theme toggle", or any change touching lib/motion.ts, components/motion/*, components/cards/*, or framer-motion usage.
---

# Motion & Cards — the animation/interaction layer

When to use: any task that adds, changes, or debugs animation, hover effects, the custom cursor, scroll reveals, or card interactions in this Next.js 15 + framer-motion 12 portfolio (repo root `/home/Chetan559.github.io`).

## Non-negotiable rules

1. **Reduced motion is a contract.** Every animated component calls `useReducedMotion()` from framer-motion and degrades gracefully. Content must NEVER be hidden from reduced-motion users (no stuck `opacity: 0`). Patterns in use:
   - `components/motion/Reveal.tsx` → `initial={reduce ? "visible" : "hidden"}`
   - `components/cards/TiltCard.tsx` → early-returns a plain `SpotlightCard`
   - `components/cards/SpotlightCard.tsx` → skips the mousemove handler and glow layers
   - `components/motion/CustomCursor.tsx` → renders `null`
2. **Animate `transform` and `opacity` only.** No `width`/`height`/`top`/`left`/layout animation, especially not on scroll. Use motion values (`useMotionValue`, `useSpring`, `useTransform`, `useMotionTemplate`) for pointer-driven effects — never React state (state re-renders every mousemove; motion values bypass React).
3. **`"use client"` only on the leaf that needs it.** Pages stay server components composing client leaves. Importing anything from `framer-motion` (or `lib/motion.ts` into a component that renders `motion.*`) requires `"use client"` at the top of that file — otherwise the build fails with hook errors like `useReducedMotion only works in a Client Component`.
4. **Every interactive element gets `data-cursor="hover"`** so the custom cursor ring reacts (see cursor section). Plain `<a>` and `<button>` are auto-detected, but add it anyway for consistency and for non-anchor interactive wrappers.
5. **No purple/magenta anywhere.** Glow/accent colors come only from `#2557A7` (royal blue, token `accent`) and `#F5A623` (amber, token `amber`).
6. **Radius discipline:** `rounded-card` (24px, in `tailwind.config.ts`) is reserved for feature cards/containers. Buttons/chips use `rounded`/`rounded-sm` (≤4px).

## lib/motion.ts — shared variants

The whole file (`lib/motion.ts`, 29 lines):

```ts
export const EASE = [0.22, 1, 0.36, 1] as const;

export const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const heroLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

export const viewport = { once: true, margin: "-80px" } as const;
```

Where each is used:
- `containerStagger` + `fadeUpItem`: via `Reveal`/`RevealItem` in `components/home/{About,Experience,Hackathons,Projects,ResumeSection}.tsx`, `components/utilities/{ToolGrid,GearGrid}.tsx`, `app/blog/page.tsx`. Also directly in `components/home/Hero.tsx`.
- `heroLine`: only in `components/home/Hero.tsx` — a clip-reveal where each headline line sits inside a `<span className="block overflow-hidden">` and the inner `motion.span` slides from `y: "110%"` to `0%`. The overflow-hidden parent is what makes it a "clip" reveal; remove it and the effect becomes a plain slide.
- `viewport`: `once: true` means an element animates in exactly once (no re-trigger on scroll-up); `margin: "-80px"` shrinks the intersection root by 80px so the animation starts when the element is 80px INSIDE the viewport, not at the very edge.
- Add new shared variants to this file (typed `Variants`, using `EASE`), not inline in components, if used in more than one place.

## Reveal / RevealItem — scroll-in animation

`components/motion/Reveal.tsx` is the standard way to animate content on scroll:

```tsx
export function Reveal({ children, variants, stagger = false, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  const v = variants ?? (stagger ? containerStagger : fadeUpItem);
  return (
    <motion.div
      variants={v}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewport}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

`RevealItem` is a bare `motion.div` with `variants={fadeUpItem}` and no `initial`/`animate` of its own — it inherits the `hidden`/`visible` state from the nearest `Reveal stagger` parent (framer-motion variant propagation).

Usage recipe (from `components/home/Projects.tsx`):

```tsx
<Reveal stagger>
  <div className="grid gap-6 md:grid-cols-2">
    {projects.map((project) => (
      <RevealItem key={project.slug} className="h-full">
        <ProjectCard project={project} />
      </RevealItem>
    ))}
  </div>
</Reveal>
```

Rules:
- Single block fading up → `<Reveal>…</Reveal>`. List/grid where children cascade → `<Reveal stagger>` wrapping `RevealItem`s (an intermediate plain `<div>` for grid layout between them is fine — variants propagate through non-motion elements).
- `RevealItem` outside a `Reveal stagger` never becomes visible for motion users (nothing drives it to `"visible"`). Symptom: content invisible except with reduced motion on.
- Because `Reveal` is a client component, the server page (e.g. `app/page.tsx`) can compose it without becoming a client component itself.

## SpotlightCard — mouse-tracked glow border

`components/cards/SpotlightCard.tsx`. Props: `{ children, className, innerClassName, glow?: "blue" | "amber" | "dual" }` (default `"dual"`).

How it works, layer by layer:

1. **Motion values track the pointer relative to the card:**
   ```tsx
   function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
     const r = e.currentTarget.getBoundingClientRect();
     mx.set(e.clientX - r.left);
     my.set(e.clientY - r.top);
   }
   ```
   `mx`/`my` are `useMotionValue(0)` — updates never re-render React.

2. **`useMotionTemplate` builds a live CSS gradient string:**
   ```tsx
   const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, ${c1}, ${c2} 45%, transparent 70%)`;
   ```
   `[c1, c2]` come from the `GLOWS` palette map — only blue `rgba(37,87,167,…)` and amber `rgba(245,166,35,…)` values. Add new glow colors ONLY from these two hues.

3. **The border-ring trick (double mask):** the first overlay `motion.div` paints the spotlight gradient as its `background`, then punches out everything except a 1.5px rim:
   ```tsx
   style={{
     background: spotlight,
     padding: "1.5px",
     maskImage: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
     WebkitMaskImage: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
     maskComposite: "exclude",
     WebkitMaskComposite: "xor",
   }}
   ```
   Two masks: one covering only the content-box (inset by the 1.5px padding), one covering the whole border-box. `maskComposite: "exclude"` (Safari/Chrome legacy: `WebkitMaskComposite: "xor"`) subtracts them, leaving only the 1.5px frame visible — a gradient border that follows the mouse. Both prefixed and unprefixed properties are required.

4. **Soft outer glow:** a second `motion.div` with the SAME `spotlight` background, `blur-xl`, `group-hover:opacity-20` — a blurred copy that bleeds a halo.

5. Both overlays are `pointer-events-none`, `aria-hidden`, `opacity-0` → `group-hover:opacity-100`/`20` via CSS transition; the outer wrapper has `group relative overflow-hidden rounded-card`.

6. **The `innerClassName ?? "p-8"` replacement pattern:**
   ```tsx
   <div className={cn("relative", innerClassName ?? "p-8")}>{children}</div>
   ```
   `cn` in `lib/utils.ts` is `classes.filter(Boolean).join(" ")` — a plain join, NOT tailwind-merge. Tailwind resolves conflicting utilities by STYLESHEET order, not class-attribute order, so `cn("p-8", "p-0")` does not make `p-0` win. Therefore the default padding is REPLACED when `innerClassName` is provided, never merged. Follow this pattern whenever a component has a default utility a caller may override: `prop ?? "default-classes"`. Never concatenate two classes that set the same CSS property.

Reduced motion: the mousemove handler becomes `undefined` and both glow layers are skipped (`{!reduce && …}`); the card remains a static bordered container with the hover shadow.

## TiltCard — 3D tilt wrapper

`components/cards/TiltCard.tsx` wraps `SpotlightCard` (spreads `SpotlightCardProps` through). Props add `maxTilt = 8` (degrees) and `scale = 1.02`.

Math:
- `px`/`py` are `useMotionValue(0.5)` — pointer position normalized 0→1 across the card (`(e.clientX - r.left) / r.width`). `0.5` = center = no tilt.
- ```tsx
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 200, damping: 20 });
  ```
  Note the sign flip: pointer at TOP (`py=0`) tilts the top away toward the viewer (`rotateX = +maxTilt`); pointer at LEFT (`px=0`) gives `rotateY = -maxTilt`. Springs (stiffness 200 / damping 20) smooth both movement and the `onMouseLeave` reset to `0.5/0.5`.
- Structure: outer `<div style={{ perspective: 900 }}>` (perspective must be on the PARENT of the rotating element), inner `motion.div` with `style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}` plus `whileHover={{ scale }}`.
- Reduced motion: `if (reduce) return <SpotlightCard {...spotlightProps} />;` — same visuals minus tilt. Keep this early-return when editing.

Used by `components/home/ProjectCard.tsx` (and `ExperienceCard.tsx`, `Hackathons.tsx` via SpotlightCard/TiltCard). Tune feel via `maxTilt`/`scale` props, not by editing spring constants, unless changing the sitewide feel.

## CustomCursor — sitewide custom pointer

`components/motion/CustomCursor.tsx`, mounted once in `app/layout.tsx` (line 46) inside `ThemeProvider`.

Architecture:
- **Gates:** the effect bails unless `window.matchMedia("(pointer: fine)").matches` AND not `useReducedMotion()`. Touch devices and reduced-motion users get the native cursor; component renders `null` (`if (!enabled) return null`).
- **Native cursor hiding:** the effect adds `document.body.classList.add("cursor-none-enabled")` (removed in cleanup). `app/globals.css` line 20 does the hiding, deliberately excluding text-editing controls:
  ```css
  body.cursor-none-enabled *:not(input):not(textarea):not(select) {
    cursor: none;
  }
  ```
- **Two elements, two speeds:** the 8px white dot uses raw motion values (`style={{ x, y }}`) for zero lag; the 36px ring uses `useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 })` so it trails elastically. Both are `fixed left-0 top-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 aria-hidden`.
- **Hover detection** is a single delegated listener, not per-element handlers:
  ```tsx
  const onOver = (e: MouseEvent) => {
    const target = (e.target as Element).closest?.("a, button, [data-cursor]");
    setHovered(Boolean(target));
  };
  ```
  This is why interactive elements need `data-cursor="hover"` (any value works; the selector only checks attribute presence). On hover: dot scales to 0.5, ring scales to 1.8 and `borderColor` flips `#2557A7` → `#F5A623`.
- The dot is `bg-white mix-blend-difference` so it stays visible over any background in both themes.
- Visibility toggles on `mouseleave`/`mouseenter` of `document.documentElement` so the cursor fades when the pointer exits the window. Motion values start at `-100` to keep it off-screen before first move.

If the cursor "disappears" over form fields, that is intentional (the CSS exclusion). If it never appears: check pointer type, OS reduced-motion setting, and that `CustomCursor` is still mounted in `app/layout.tsx`.

## ThemeToggle mounted-gate (pattern for any useTheme consumer)

`components/theme/ThemeToggle.tsx`: any client component calling `useTheme()` from next-themes will hydration-mismatch (server does not know the theme) unless it gates on mount:

```tsx
const { resolvedTheme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) {
  return <div className="h-10 w-10" aria-hidden />;  // size-matched placeholder, no layout shift
}
```

Also required: `<html suppressHydrationWarning>` in `app/layout.tsx` (line 41 — already present, do not remove). The icon swap uses `AnimatePresence mode="wait" initial={false}` with a `key` change (`"moon"`/`"sun"`) — `initial={false}` prevents an entrance animation on first paint. Copy this exact pattern for any new theme-aware client component (giscus theme sync, etc.).

## Pitfalls

- **Icon serialization across server→client boundary.** react-icons components are functions; passing them as props/data from a server component to a client component fails the build with `Functions cannot be passed directly to Client Components`. Fix: the CLIENT component imports the data module itself — see `components/utilities/ToolGrid.tsx`, which has `"use client"` and imports `toolGroups` from `@/data/tools` directly, then renders `<tool.icon className="h-8 w-8" />`. Never lift icon-bearing data into a server page and pass it down.
- **Missing `"use client"`** on a file importing framer-motion → build/runtime hook errors. Conversely, don't add it to pages; keep motion in leaves.
- **`cn` is not tailwind-merge** — never pass conflicting utilities expecting the later one to win; use the `?? "default"` replacement pattern (SpotlightCard section above).
- **`RevealItem` without a `Reveal stagger` ancestor** stays hidden for motion users.
- **New animations must be gated** on `useReducedMotion()` and must resolve to fully visible content when reduced. Repeating/infinite animations (like the Hero scroll chevron, `Hero.tsx` lines 83–96) must be wrapped in `{!reduce && …}`.
- **Stale `.next` dir** after a killed `next start` causes `PageNotFoundError` on random routes: `rm -rf /home/Chetan559.github.io/.next` and rebuild.
- **Never `pkill -f "next"`** — the pattern matches your own shell and kills it (exit 144). Stop a test server with `fuser -k <port>/tcp`.

## Verify

After any motion/card change, from `/home/Chetan559.github.io`:

```bash
npm run build
```
Expect: zero errors; every route listed as `○` (Static) or `●` (SSG).

```bash
grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" .next/static/css/*.css
```
Expect: no output (banned colors absent).

Smoke test:
```bash
(npm run start -- -p 3111 &> /tmp/claude-1000/-home-Chetan559-github-io/46761bbb-a0bb-430d-9ea5-aac461aa7920/scratchpad/next.log &)
sleep 3
for r in / /blog /contact; do curl -s -o /dev/null -w "$r %{http_code}\n" http://localhost:3111$r; done
fuser -k 3111/tcp
```
Expect: `200` for each route.

Manual checks (browser): card glow follows the mouse and shows a thin gradient rim; tilt resets smoothly on mouseleave; cursor ring turns amber over links/buttons/`[data-cursor]` and native cursor returns inside inputs; with OS "reduce motion" enabled, all content is visible immediately, cards are static, and the native cursor is used.
