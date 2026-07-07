---
name: verify-and-ship
description: Use when asked to "verify", "smoke test", "run the pre-ship checks", "ship", "push", "deploy", or commit any change to this portfolio — the mechanical pre-push pipeline (clean build, route smoke test, design audit, manual checks, commit conventions, Vercel ship) with exact commands and expected output for each step.
---

# Verify and Ship

Run this full pipeline before every push of the Next.js 15 portfolio at `/home/Chetan559.github.io`
(branch `next-rewrite`, deploys automatically to Vercel). Every step has an expected output —
if you see something else, stop and fix before proceeding.

Run all commands from the repo root: `cd /home/Chetan559.github.io`.

## 1. Clean build

Delete `.next` first if ANY of these are true (a stale `.next` — e.g. after a killed
`next start` — causes builds to fail with `PageNotFoundError` for random routes):

- a previous `next start` was killed rather than exited cleanly
- the previous build failed
- you see `PageNotFoundError` or missing-manifest errors
- in doubt (it costs ~30s)

```bash
rm -rf /home/Chetan559.github.io/.next
cd /home/Chetan559.github.io && npm run build
```

**Expected output** — the build must end with a route table where EVERY route is
`○` (Static) or `●` (SSG). There must be NO `ƒ` (Dynamic) routes — the site is fully
static and a `ƒ` means someone accidentally introduced runtime dynamism:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /blog
├ ● /blog/[slug]          ← SSG via generateStaticParams (3 posts from data/blogs.ts)
├ ○ /contact
├ ○ /gallery
├ ○ /guestbook
├ ○ /sitemap.xml
└ ○ /utilities
```

Exit code must be 0 and there must be no type errors. Known static params come from
`generateStaticParams()` in `app/blog/[slug]/page.tsx`, backed by `data/blogs.ts`
(slugs: `rag-pipelines-that-dont-hallucinate`, `from-prompt-to-product`,
`what-origami-taught-me-about-debugging`). If you add/remove a blog post, the `●` count changes.

## 2. Smoke test (production server)

**CRITICAL PROCESS WARNING:** NEVER stop the server with `pkill -f "next"` or any
`pkill -f <pattern>` where the pattern appears in your own command line — `pkill -f`
matches its own invoking shell and kills it (exit code 144, your session dies).
Always stop by port: `fuser -k 3999/tcp`.

```bash
cd /home/Chetan559.github.io
(npm run start -- -p 3999 &> /tmp/claude-1000/next-smoke.log &)
sleep 3

for route in / /blog /blog/rag-pipelines-that-dont-hallucinate /contact /gallery /guestbook /utilities /sitemap.xml /this-route-does-not-exist; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3999$route")
  echo "$code  $route"
done
```

**Expected output** — every real route returns `200`; the deliberate bad route MUST
return `404` (proves the custom `app/not-found.tsx` is wired, not a crash):

```
200  /
200  /blog
200  /blog/rag-pipelines-that-dont-hallucinate
200  /contact
200  /gallery
200  /guestbook
200  /utilities
200  /sitemap.xml
404  /this-route-does-not-exist
```

Then content greps — status codes alone don't prove pages rendered their copy:

```bash
curl -s http://localhost:3999/ | grep -c "Product"            # ≥ 1 (hero headline "Product Guy.")
curl -s http://localhost:3999/ | grep -c "Chetan Sharma"      # ≥ 1 (title + img alt)
curl -s http://localhost:3999/this-route-does-not-exist | grep -c "404"   # ≥ 1
curl -s http://localhost:3999/sitemap.xml | grep -c "<url>"   # ≥ 9 (6 pages + 3 blog posts)
```

If a page you changed has a distinctive new string, grep for it here too.

Stop the server **by port**:

```bash
fuser -k 3999/tcp
```

If port 3999 is busy before you start, pick another spare port and substitute it everywhere.

## 3. Design audit (post-build greps)

The site owner has BANNED purple/magenta/violet (the original Design.md palette).
Approved accents are royal blue `#2557A7` (`accent`) and amber `#F5A623` (`amber`),
defined in `tailwind.config.ts`. Audit the *built* CSS, not the source — this catches
anything smuggled in via arbitrary values or third-party styles:

```bash
grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" /home/Chetan559.github.io/.next/static/css/*.css
```

**Expected output: nothing** (exit code 1). Any match is a ship-blocker — find the
source class and replace with `accent`/`amber` tokens.

Radius discipline spot-check — `rounded-card` (24px) is reserved for feature
cards/containers ONLY; buttons and chips must use `rounded`/`rounded-sm` (≤4px):

```bash
grep -rn "rounded-card" /home/Chetan559.github.io/components /home/Chetan559.github.io/app | grep -iE "button|chip|badge|tag|pill"
```

**Expected output: nothing.** If it matches, someone put 24px radius on a small control.

No-flash check — the dark-mode bootstrap script (injected by next-themes, enabled by
`suppressHydrationWarning` on `<html>` in `app/layout.tsx`) must be inline in the
server-rendered HTML, otherwise dark-mode users get a white flash on load:

```bash
grep -oE "localStorage[^<]{0,80}" /home/Chetan559.github.io/.next/server/app/index.html
```

**Expected output: at least one line** containing a `localStorage.getItem`/theme read,
e.g. `localStorage.getItem('theme')`. Empty output = the ThemeProvider script is
missing — check `components/theme/ThemeProvider.tsx` (must render next-themes with
`attribute="class"`) and `app/layout.tsx` (must keep `suppressHydrationWarning`).

## 4. Manual checks (browser — do these when the change touches theme, motion, layout, or cursor)

Open `http://localhost:3999` (restart the server from step 2 if needed) and verify:

1. **Theme toggle + hard refresh in dark.** Toggle to dark via the navbar
   `ThemeToggle`, hard-refresh (Ctrl+Shift+R). Page must load dark with NO white flash
   and no hydration warning in the console. (`ThemeToggle.tsx` is mounted-gated —
   renders a placeholder until `useEffect` fires — any new component calling
   `useTheme()` needs the same gate.)
2. **Reduced motion.** DevTools → Rendering → "Emulate CSS media feature
   prefers-reduced-motion: reduce". Reload. All content must be instantly visible
   (no reveal animations, no hero clip-reveal), tilt cards must not tilt, the custom
   cursor must not render. This is a contract enforced by `useReducedMotion()` in
   `components/motion/Reveal.tsx`, `components/cards/TiltCard.tsx`,
   `components/motion/CustomCursor.tsx` — if it fails, one of those gates was broken.
3. **320px width.** DevTools responsive mode at 320px: no horizontal scroll, hero
   `text-hero` clamps down (clamp bottoms out at 48px), nav usable.
4. **Touch device emulation.** DevTools device toolbar (touch): the custom cursor
   must not appear (native cursor/tap only), and every link/button still works —
   `data-cursor="hover"` elements degrade cleanly.
5. **Guestbook.** `/guestbook` must load the giscus widget and it must follow the
   theme toggle (`noborder_light` / `noborder_dark`).

## 5. Commit

Conventions (match the existing history — run `git log -3` to see examples):

- **Summary line:** imperative mood, capitalized, no trailing period
  (e.g. `Add guestbook page backed by GitHub Discussions via giscus`).
- **Body:** wrapped `- ` bullets (~72 cols) explaining what and why.
- **Trailer (mandatory, last line after a blank line):**
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- **Branch:** commit on `next-rewrite`. NEVER force-push. NEVER commit to `main` directly.
- Only commit when the user asked you to ship/commit.

```bash
cd /home/Chetan559.github.io
git status && git diff --stat          # review what you're about to commit
git add <specific files>               # never `git add -A` blindly
git commit -m "$(cat <<'EOF'
<Imperative summary of the change>

- <what changed and why, wrapped>
- <second bullet if needed>

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

Do NOT commit `.env.local` (it holds `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`) or `.next/`.

## 6. Ship

```bash
cd /home/Chetan559.github.io && git push origin next-rewrite
```

Vercel auto-builds from `next-rewrite` on push. Deployment-environment checklist
(these live OUTSIDE the repo — pushing green code is not enough):

1. **EmailJS env vars in Vercel.** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
   `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` must be set in
   the Vercel dashboard (Project → Settings → Environment Variables), mirroring
   `.env.local`. They're inlined at build time — adding them later requires a redeploy.
   Also: the payload keys in `components/contact/ContactForm.tsx` (`from_name`,
   `reply_to`, `phone`, `message`) are load-bearing — they match the EmailJS template.
   Renaming any of them silently breaks email delivery (form still shows success).
2. **giscus GitHub App.** The guestbook (`components/guestbook/Guestbook.tsx`) needs
   the giscus app installed on `Chetan559/Chetan559.github.io` with Discussions
   enabled (config baked in: `repoId="R_kgDOIX1yWA"`, category Announcements
   `categoryId="DIC_kwDOIX1yWM4DArww"`, `mapping="specific"` `term="Guestbook"`).
   Check: `gh api repos/Chetan559/Chetan559.github.io --jq .has_discussions` → `true`,
   and load the deployed `/guestbook` — an error banner in the widget means the app
   was uninstalled (reinstall at https://github.com/apps/giscus — manual, web-only).
3. **Production domain TODO.** `app/sitemap.ts` line 4 hardcodes
   `const BASE = "https://chetansharma.co"; // TODO: confirm production domain on Vercel`.
   Once the real domain is known, update it (and remove the TODO) or sitemap/SEO URLs
   are wrong in production.

After push, watch the Vercel deployment (dashboard or `vercel ls` if the CLI is
linked) and spot-check the production URL for `/` and `/guestbook`.

## Full pipeline (copy-paste)

```bash
set -e
cd /home/Chetan559.github.io

# 1. clean build
rm -rf .next
npm run build

# 2. smoke test
(npm run start -- -p 3999 &> /tmp/claude-1000/next-smoke.log &)
sleep 3
for route in / /blog /blog/rag-pipelines-that-dont-hallucinate /contact /gallery /guestbook /utilities /sitemap.xml; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3999$route")
  [ "$code" = "200" ] && echo "OK  $route" || { echo "FAIL $code $route"; fuser -k 3999/tcp; exit 1; }
done
code=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3999/this-route-does-not-exist)
[ "$code" = "404" ] && echo "OK  404 page" || { echo "FAIL 404 check ($code)"; fuser -k 3999/tcp; exit 1; }
curl -s http://localhost:3999/ | grep -q "Product" || { echo "FAIL hero copy"; fuser -k 3999/tcp; exit 1; }
fuser -k 3999/tcp   # NEVER pkill -f "next" — it kills its own shell (exit 144)

# 3. design audit
if grep -rioE "#(FF7EF2|FFD5F8|3D0E35)|purple|magenta|violet" .next/static/css/*.css; then
  echo "FAIL banned color in built CSS"; exit 1; fi
grep -oE "localStorage[^<]{0,80}" .next/server/app/index.html | grep -q . \
  || { echo "FAIL no-flash theme bootstrap missing"; exit 1; }

echo "ALL CHECKS PASSED — do manual browser checks (step 4), then commit (step 5) and push (step 6)."
```

## Pitfalls

- `pkill -f "next"` kills your own shell (the pattern matches the pkill command
  itself). Exit 144 with no output = you did this. Use `fuser -k <port>/tcp`.
- Stale `.next` → `PageNotFoundError` on random routes at build/start. `rm -rf .next`.
- A `ƒ` in the route table means a page lost static rendering (e.g. `headers()`,
  `cookies()`, or a missing `generateStaticParams`). Treat as a regression.
- react-icons components cannot cross the server→client prop boundary
  ("Functions cannot be passed directly to Client Components" at build time) —
  the client component must import the data module itself
  (pattern: `ToolGroups` in `components/utilities/ToolGrid.tsx`).
- `cn("p-8", "p-0")` does NOT make `p-0` win — Tailwind conflicts resolve by
  stylesheet order. Use a replacement default instead
  (pattern: `innerClassName ?? "p-8"` in `components/cards/SpotlightCard.tsx`).
- Any component calling `useTheme()` without a mounted gate hydration-mismatches;
  `<html suppressHydrationWarning>` in `app/layout.tsx` must never be removed.
