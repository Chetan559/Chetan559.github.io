---
name: debug-playbook
description: Use when a build, dev server, or page in this portfolio breaks — e.g. "Functions cannot be passed directly to Client Components", PageNotFoundError during build, hydration mismatch warnings, a Tailwind class not applying, env var undefined in the browser, contact form not sending email, giscus guestbook error, images 404 in production, framer-motion errors in server components, or a shell command dying with exit 144.
---

# Debug Playbook

Symptom-indexed troubleshooting for this repo (`/home/Chetan559.github.io`, Next.js 15 App Router + Tailwind 3.4 + framer-motion 12, deployed to Vercel from branch `next-rewrite`). Find your exact error text below, apply the fix, then run the Verify section.

---

## 1. Build fails: "Functions cannot be passed directly to Client Components"

**SYMPTOM** — `npm run build` (or dev) fails with:
`Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".`

**CAUSE** — A server component (any page/component without `"use client"`) passed a function as a prop across the server→client boundary. In this repo the classic case is react-icons: every icon (`SiPython`, `FaChrome`, …) is a function (`IconType`), so `<ClientThing icon={SiPython} />` or passing a data array containing `icon:` fields from a server page into a client component blows up.

**FIX** — Do not pass the function/icon down. Instead, make the **client component import the data module itself**. Working example: `components/utilities/ToolGrid.tsx` is a client component that imports the icon-bearing data directly, and the server page (`app/utilities/page.tsx`) renders `<ToolGroups />` with no props:

```tsx
// components/utilities/ToolGrid.tsx
"use client";
import { toolGroups, type ToolGroup } from "@/data/tools";

export function ToolGroups() {
  return (
    <div className="mt-16">
      {toolGroups.map((group) => (
        <ToolGrid key={group.title} group={group} />
      ))}
    </div>
  );
}
```

Inside the client tree, render the icon component from the data: `{tool.icon ? <tool.icon className="h-8 w-8" aria-hidden /> : ...}` (see `data/tools.ts` — `icon?: IconType` is optional with a first-letter fallback tile).

**PREVENTION** — Server→client props must be serializable (strings, numbers, plain objects/arrays, no functions, no class instances). When a `data/*.ts` module contains icons or functions, only client components may import it and props stay primitive.

---

## 2. Build fails with PageNotFoundError for a route that exists

**SYMPTOM** — `npm run build` fails with `PageNotFoundError: Cannot find module for page: /<some-route>` (route varies between runs) even though the page file exists and was building fine before.

**CAUSE** — Stale `.next/` directory, typically left behind by a killed `next start` or an interrupted build. Next reuses corrupt incremental state.

**FIX**
```bash
cd /home/Chetan559.github.io && rm -rf .next && npm run build
```

**PREVENTION** — When a build or `next start` was killed mid-run, delete `.next` before the next build. Do this first whenever a build error names a route you did not touch.

---

## 3. Shell command dies with exit code 144 and no output

**SYMPTOM** — A command like `pkill -f "next"` exits 144 immediately; sometimes the whole shell/session dies with it.

**CAUSE** — `pkill -f <pattern>` matches full command lines, **including the shell that is running the pkill itself** (its command line contains the pattern). It kills its own parent — SIGTERM(15) → exit 128+16=144.

**FIX** — Kill test servers by port, never by name pattern:
```bash
fuser -k 3005/tcp   # replace 3005 with the port your server used
```

**PREVENTION** — Never run `pkill -f` (or `kill $(pgrep -f ...)`) with any pattern contained in your own command line ("next", "node", "npm"...). Always use `fuser -k <port>/tcp` for servers you started.

---

## 4. Hydration mismatch warnings in the console

**SYMPTOM** — `Warning: Prop 'className' did not match` / `Hydration failed because the initial UI does not match what was rendered on the server` / `Text content does not match server-rendered HTML`. Often theme icons or theme-dependent widgets flash or flip on load.

**CAUSE** — one of three, in order of likelihood here:

1. **`useTheme()` without a mounted-gate.** On the server, next-themes has no resolved theme; on the client it does. Any component that reads `resolvedTheme`/`theme` renders differently on first client paint.
2. **`Date.now()`, `new Date()`, `Math.random()`, or locale formatting executed during render** — server and client produce different output.
3. **`suppressHydrationWarning` scope confusion** — it exists only on `<html>` in `app/layout.tsx` (required by next-themes because it stamps the `class` attribute on `<html>` before hydration). It does NOT cover your components; do not sprinkle it elsewhere to hide real bugs.

**FIX** — For theme consumers, use the mounted-gate pattern from `components/theme/ThemeToggle.tsx`:

```tsx
const { resolvedTheme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) {
  return <div className="h-10 w-10" aria-hidden />; // placeholder with the same footprint
}
```

`components/guestbook/Guestbook.tsx` uses the same gate with a `min-h-[400px]` placeholder. For date/random values, compute them in `useEffect` and store in state, or compute once in a `data/*.ts` module (static at build time).

**PREVENTION** — Every new `useTheme()` call site gets a mounted-gate with a size-matched placeholder. Keep `suppressHydrationWarning` on `<html>` in `app/layout.tsx` only — never remove it (next-themes breaks), never add it to leaf components.

---

## 5. A Tailwind class has no visible effect

**SYMPTOM** — You add e.g. `p-0` via a `className` prop but the element keeps its old padding; DevTools shows both classes present but the other one wins.

**CAUSE** — Two causes, check both:

1. **Conflicting utilities are resolved by stylesheet order, not class-attribute order.** `cn("p-8", "p-0")` does NOT make `p-0` win — `cn` (in `lib/utils.ts`) just joins strings; there is no tailwind-merge in this repo. Whichever utility appears later in the generated CSS wins, which is effectively arbitrary from your point of view.
2. **The class is in a file not covered by the content globs.** `tailwind.config.ts` scans exactly:
   ```ts
   content: [
     "./app/**/*.{ts,tsx}",
     "./components/**/*.{ts,tsx}",
     "./data/**/*.ts",
   ],
   ```
   `data/**/*.ts` is globbed deliberately because data modules carry class names. A class used only in a new top-level directory (e.g. `lib/`, `content/`) is never generated.

**FIX** — For conflicts, use the **replacement-default pattern** instead of merging: accept a prop that *replaces* the default rather than appending to it. `components/cards/SpotlightCard.tsx` line 76:

```tsx
<div className={cn("relative", innerClassName ?? "p-8")}>{children}</div>
```

Callers pass `innerClassName="p-0"` and the default `p-8` is never emitted. For glob misses, add the new directory to `content` in `tailwind.config.ts` and restart the dev server.

**PREVENTION** — Never put two utilities targeting the same CSS property into one merged className. When a component needs an overridable default, model it as `prop ?? "default-classes"`. Fully dynamic class names (`` `p-${n}` ``) are never generated — always write complete literal class strings.

---

## 6. Environment variable is undefined in the browser

**SYMPTOM** — `process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID` (or similar) is `undefined` at runtime; the contact form throws or EmailJS rejects with a 400/invalid-key error. Works in one environment but not another.

**CAUSE** — All three conditions must hold; usually one is missing:

1. The variable name must start with `NEXT_PUBLIC_` — anything else is stripped from client bundles.
2. Values are **inlined at build/dev-server start**. Editing `.env.local` does nothing to a running dev server or an existing build.
3. Vercel does not read `.env.local` — production needs the variable set in the Vercel dashboard (Project → Settings → Environment Variables), then a redeploy.

The three keys this repo needs (see `/home/Chetan559.github.io/.env.local`, consumed in `components/contact/ContactForm.tsx`):
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.

**FIX** — Add/rename with the prefix, then restart: kill the dev server (`fuser -k <port>/tcp`), `npm run dev` again (or `rm -rf .next && npm run build` for prod checks). For Vercel, add the vars in the dashboard for Production+Preview and redeploy.

**PREVENTION** — Any new client-side env var: prefix it, add to `.env.local`, add to Vercel, restart. Server-only secrets must NOT get the prefix (they would ship to browsers).

---

## 7. Contact form silently fails (no email arrives)

**SYMPTOM** — Form submits, UI may even show "Sent ✓", but no email arrives. Or the button flips to "Try Again" with the red error line.

**CAUSE** — In order of likelihood:

1. **Payload keys were renamed.** The keys in `components/contact/ContactForm.tsx` are load-bearing — they must match the variables in EmailJS template `template_awl7mrt` exactly. EmailJS does NOT error on unknown keys; it sends an email with blank fields or drops content silently:
   ```tsx
   {
     from_name: form.name,
     reply_to: form.email,
     phone: form.phone,
     message: form.message,
   }
   ```
2. Env vars missing/stale (see symptom 6).
3. EmailJS monthly quota exhausted or network/CORS failure — these DO reject, driving `status` to `"error"`.

**FIX** — Diff the payload object against the four keys above and restore any renamed key. Then check DevTools Network tab for the `api.emailjs.com/api/v1.0/email/send` request: 200 = delivered (check spam / template config), 4xx = key/quota problem (response body says which). The UI reports failures via the `status` state and the `aria-live="polite"` paragraph at the bottom of the form — if you refactor, keep both.

**PREVENTION** — Treat `from_name` / `reply_to` / `phone` / `message` as an external API contract. If you must rename, change the template in the EmailJS dashboard in the same sitting and test an actual send.

---

## 8. Giscus guestbook shows an error instead of comments

**SYMPTOM** — On `/guestbook`, the widget renders "giscus is not installed on this repository", "Discussion not found", or an empty/error iframe.

**CAUSE / FIX** — The config lives in `components/guestbook/Guestbook.tsx`:

```tsx
repo="Chetan559/Chetan559.github.io"
repoId="R_kgDOIX1yWA"
category="Announcements"
categoryId="DIC_kwDOIX1yWM4DArww"
mapping="specific"
term="Guestbook"
strict="1"
```

Check in order:
1. **App not installed** — the giscus GitHub App must be installed on `Chetan559/Chetan559.github.io` (manual web step at https://github.com/apps/giscus; only the repo owner can do it). Also Discussions must be enabled on the repo.
2. **Category mismatch** — `category`/`categoryId` must name an existing Discussions category. Regenerate correct IDs at https://giscus.app.
3. **Strict-hash mismatch** — `strict="1"` binds the discussion to a hash of the `term`. Changing `term="Guestbook"` (even case) orphans the existing discussion and giscus reports it missing. Revert the term or accept a fresh discussion thread.

Theme note: the widget theme is `resolvedTheme === "dark" ? "noborder_dark" : "noborder_light"` behind a mounted-gate — keep that pattern (see symptom 4) or the iframe loads with the wrong colors.

**PREVENTION** — Never edit `repoId`/`categoryId`/`term` by hand; copy them from giscus.app output.

---

## 9. Images load in dev but 404 in production

**SYMPTOM** — `<img>`/`<Image>` shows in `npm run dev` but 404s after deploy, or the resume PDF link is dead.

**CAUSE** — Static assets are only served from `public/`. This repo keeps them at `public/images/...` (plus `public/Chetan_Sharma_Resume.pdf`, `public/Resume_ChetanSharma_DataScience.pdf`, `public/vcard.vcf`). A path is wrong if it does not start with `/`, if it includes `public/` in the URL, or if the file sits outside `public/`. Filenames are case-sensitive in production (Linux) even when dev on a case-insensitive FS works.

**FIX** — Move the file under `/home/Chetan559.github.io/public/` and reference it root-relative, e.g. `/images/photo.png` — never `public/images/photo.png` or `./images/photo.png`. Verify case matches exactly (`ls public/images`).

**PREVENTION** — When adding entries to `data/gallery.ts`/`data/gear.ts` etc., add the file to `public/` in the same commit and keep the `/...` prefix convention.

---

## 10. framer-motion crashes in a server component

**SYMPTOM** — Build or render fails with errors like `createContext is not a function`, `createContext only works in Client Components`, or `Attempted to call motion() from the server`.

**CAUSE** — `framer-motion` (and anything importing it, like `lib/motion.ts` consumers using `motion.div`) is client-only. A page or component without `"use client"` imported `motion`/`useMotionValue`/`AnimatePresence` directly.

**FIX** — Either add `"use client"` to the top of the file, or (preferred, keeps pages as server components) move the animated markup into an existing client leaf: `components/motion/Reveal.tsx` wraps children in viewport-triggered variants, `components/cards/SpotlightCard.tsx` / `TiltCard.tsx` handle card effects. Note `lib/motion.ts` itself is safe to import anywhere — it only exports plain `Variants` objects and `EASE`/`viewport` constants, no React.

**PREVENTION** — Pages under `app/` stay server components that compose client leaves. Before importing framer-motion into a new file, check whether `Reveal`/`RevealItem`, `SpotlightCard`, or `TiltCard` already does what you need. All new animation must respect `useReducedMotion()` (see any of those components).

---

## General triage order

1. **Read the exact error text** — top-most error, not the last stack frame. Copy it verbatim.
2. **Check this playbook** for a matching symptom.
3. **Suspect stale state**: `rm -rf .next && npm run build` costs 30 seconds and clears symptom 2 plus assorted ghosts.
4. **Check recent history**: `git log --oneline -10` and `git log -p -- <suspect-file>` — was the failing area touched recently?
5. **Bisect with stash**: `git stash` → does the error persist on clean HEAD? If yes it's environmental (node_modules, .next, env vars); if no, `git stash pop` and split your diff.

## Verify (run after any fix)

```bash
cd /home/Chetan559.github.io
rm -rf .next && npm run build
```
Expect exit 0 and every route marked `○` (static) or `●` (SSG) — no `ƒ` (dynamic).

Smoke test (server on a scratch port, then kill by port — see symptom 3):
```bash
(npm run start -- -p 3117 &> /tmp/claude-1000/-home-Chetan559-github-io/46761bbb-a0bb-430d-9ea5-aac461aa7920/scratchpad/start.log &)
sleep 3
for r in / /blog /blog/rag-pipelines-that-dont-hallucinate /contact /gallery /guestbook /utilities; do
  printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3117$r)" "$r"
done
fuser -k 3117/tcp
```
Expect `200` for every route.

Design + no-flash audits (both greps run against the fresh build):
```bash
grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" .next/static/css/*.css
# expected: NO output (purple/magenta are banned)
grep -oE "localStorage[^<]{0,80}" .next/server/app/index.html | head -1
# expected: one line showing the next-themes localStorage bootstrap (theme no-flash)
```
