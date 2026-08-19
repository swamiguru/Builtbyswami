# The Daily Tech Roundup — Current State

**Last updated:** 2026-08-19

> Snapshot of what's actually built and running. Everything here is subject to
> change; if this file looks more than a couple of weeks stale, ask me rather
> than assuming it's current.
>
> Lines marked **CONFIRM** are ones I haven't verified — fill them in or
> correct them.

---

## Status at a glance

| | |
|---|---|
| Live and publishing | Yes |
| Publishing since | 2026-07-12 |
| Current cadence | Daily in practice. **Not a decided commitment** — see Open problems. |
| Site URL | https://www.builtbyswami.com |
| Repo | `swamiguru/Swami-Guru-Portfolio` — pending rename to `builtbyswami` |
| Local folder | `Builtbyswami-website` |
| Vercel project | `builtbyswami` (renamed 19 Aug; `swami-guru-portfolio.vercel.app` stays attached as a legacy alias) |
| Vercel plan | **Pro** (moved off Hobby 19 Aug 2026 — the `/work-with-me` page is commercial use and breached Hobby terms) |
| Newsletter | beehiiv, publication "Builtbyswami Weekly", free tier |
| Analytics | GTM-TQFTQXB6 → GA4 `G-L3LGY5D8B0` |

---

## Site structure

| Route | What it is |
|---|---|
| `/` | Router homepage — positioning hero, then a fork to the daily or to consulting |
| `/tech-roundup` + `/tech-roundup/:date` | The Daily Five. 38 dated issues. **These URLs never move.** |
| `/weekly` | The Weekly archive, read live from beehiiv |
| `/notes` + `/notes/:slug` | Build notes |
| `/builds` | Four products shipped solo |
| `/about` | The Work — story, recent roles, condensed toolkit |
| `/case-study/middle-east` | Condé Nast GCC expansion |
| `/work-with-me` | Consulting |

Nav is five items plus Subscribe. The YouTube channel is deliberately **not**
in the nav, and as of 19 Aug it's off the homepage entirely — it's the one
module that sent visitors off-domain, and it doesn't move either audience
(readers or hiring/consulting) toward anything. It survives as a text link in
the footer.

---

## The Daily Five — format

| Slot | Pillar | Fixed? |
|---|---|---|
| 1 | Commentary — the lead story, with a point of view | Yes, every day |
| 2 | News | Yes |
| 3 | Tips & Tricks | Yes |
| 4 | Variable — Comparison, AI Tool Spotlight, AI Workflow / Prompt, Community / Poll | No |
| 5 | **A standalone Hot Take or Myth-Buster** | Yes — this is the rule |

Slot 1 carries commentary every day and always has. Slot 5 is the one that
slips, usually to Community / Poll, and it's the piece that gets quoted and
clipped for the channel. The build prints the rolling rate at which slot 5
holds; it warns and never blocks.

Pillar strings are written freely and normalised in `src/data/social.ts`. Keep
"Commentary", "Hot Take" or "Myth-Buster" in the string and categorisation
takes care of itself — casing and suffixes like "Hot Take / Global Tech" are
fine.

---

## What runs on its own

- Push to `main` → Vercel builds and deploys to production. Branch pushes get
  preview deployments.
- `npm run build` runs `scripts/prerender-meta.mjs`, which writes per-route
  HTML shells with correct title/description/OG, rewrites `dist/index.html`
  from the same source, and regenerates `sitemap.xml` from the live route list.
  New roundup dates and notes can't fall out of the sitemap.
- Page titles and descriptions for static routes come from `src/data/seo.mjs`,
  read by both the build script and the pages via `usePageSeo()`. They can't
  drift apart.
- `/api/latest-weekly` reads the beehiiv publication page and returns the
  newest issues. **Publishing on beehiiv is the only step** — the homepage card
  and `/weekly` update on their own within 30 minutes. Committed
  `src/content/weekly/issue-N.json` files are a fallback floor, not required.
- Social card generation is automated — `scripts/social/make_card.py` renders
  the five `public/social/YYYY-MM-DD/card_N.png` images from the day's pillars
  and hooks.
- The build prints a **warning** when the newest daily digest doesn't close on
  a standalone Hot Take or Myth-Buster, plus the rolling rate. Never blocks.

## What I still do by hand

- Writing and curating the day's five into
  `src/content/social/YYYY-MM-DD.json`.
- Writing and publishing each weekly issue in beehiiv (free tier, no API).
- Merging PRs to `main` to deploy.
- **CONFIRM** — where card generation is triggered from. It's automated, but
  there's no runner in this repo: no npm script, no `.github/workflows`, no
  Vercel cron. `make_card.py` is a CLI taking pillar/hook/subtitle/output, and
  its font path (`/usr/share/fonts/truetype/google-fonts/`) is Linux, not
  macOS, so it runs somewhere other than the Mac. `used-topics-log.md` and
  `used-tips-log.md` suggest an agent loop keeping state between runs.
- **CONFIRM** — "Builtbyswami daily social": what runs it, on what platform, at
  what time, and to which networks.

---

## Open problems

| Problem | Notes | Priority |
|---|---|---|
| Slot 5 keeps losing its standalone opinion | Held 2 of the last 7 days (29%) and 12 of the last 30 (40%), usually displaced by Community / Poll. The lead still carries commentary daily — this is specifically about the standalone Hot Take or Myth-Buster. Build prints the rate every deploy. | high |
| Daily cadence not decided | 38 issues in the 39 days since 12 July (one miss, 13 Aug), solo, alongside the channel, the job search and consulting. Declaring a cadence that holds beats an archive that shows gaps. | high |
| GitHub repo name is the last one out of line | Vercel is now `builtbyswami` and the domain is builtbyswami.com; GitHub is still `Swami-Guru-Portfolio`. Renaming is safe — GitHub redirects old URLs permanently and Vercel links by repo ID, not name. | low |
| Daily JSON doesn't set `featured` | Homepage hero card falls back to `posts[0]` when no post has `featured: true`. Add `"featured": true` when writing the day's JSON to pick the lead deliberately. | low |
| Own traffic isn't filtered from GA4 | Deliberately skipped. The public IP resolves to Google LLC / Data Center / Mumbai — a shared proxy, not a home address — so an IP rule would be unreliable. Read reports from ranges that exclude testing days. | low |
| Reading components ignore reduced motion | `ScrollProgress` and `TableOfContents` don't check `prefers-reduced-motion`, though `Home.tsx` and `TechDigest.tsx` do. Inconsistent with the rest of the codebase. | low |
| Sticky header isn't sticky | `SiteHeader` is `sticky top-0`, but the page wrapper's `overflow-hidden` defeats it, so the header scrolls away. Pre-existing. If anyone "fixes" the overflow, `scroll-mt-32` on headings becomes too tight and anchors will hide under the header. | low |

---

## Analytics

CTA clicks are tracked end to end: the site pushes `cta_click` to the
dataLayer with `cta_id` and `cta_location`, GTM picks it up via the
`CE - cta_click` trigger and `GA4 - cta_click` tag, and GA4 has both
registered as event-scoped custom dimensions (**CTA ID**, **CTA location**).

Tracked CTAs: `hero_read_daily`, `hero_work_with_me`, `fork_the_work`,
`fork_work_with_me`, `consulting_book_call`.

The question this exists to answer: does a meaningful share of homepage
visitors take the second door? Compare `hero_read_daily` against
`hero_work_with_me` over a week in Reports → Engagement → Events → `cta_click`
with **CTA ID** as the secondary dimension.

---

## Gotchas worth remembering

- **`public/og-image.png` has no import anywhere.** It's referenced only as a
  URL string in `index.html`, which `prerender-meta.mjs` copies into all 52
  route shells. Dependency-pruning tools see it as unused and delete it — this
  happened on 19 Aug and broke every social preview on the site. Keep it at
  1200×630 and under ~1MB: X and LinkedIn both reject OG images over 5MB, and
  the original was 5.8MB, so previews were probably already failing there.
- `/api/latest-weekly` returns **403 from a generic cloud container** but 200
  from Vercel — beehiiv sits behind Cloudflare, which blocks datacenter IPs. A
  local 403 doesn't mean the endpoint is broken.
- You **cannot** verify dataLayer events by watching `window.dataLayer` grow —
  GTM overrides `push` and consumes entries. Use GTM Preview or GA4 DebugView.
- Local `node_modules` holds the macOS rollup binary, so `npm run build` fails
  inside a Linux agent VM with `Cannot find module '@rollup/rollup-linux-arm64-gnu'`.
  Environmental, not a code problem.
- Adding a static route means adding it to `src/data/seo.mjs` once — the build
  script and the page both read from there.
- Git run through the Cowork bridge leaves `index.lock` behind on every command
  (the mount allows writes and renames but not `unlink`), blocking the next
  one. Run git in Terminal.
- **`hidden sm:block` silently kills `line-clamp-N`.** Tailwind's line-clamp
  works by setting `display: -webkit-box`; any later `display` utility on the
  same element wins and the text renders in full. Use `max-sm:hidden` to hide
  something below a breakpoint when it also needs to clamp.
- **Never `git clone --depth 1` without naming the branch.** A shallow clone
  takes the *default* branch (`main`). If the work in progress is on a feature
  branch, editing a file from that clone and committing it back to the feature
  branch silently reverts every commit the branch had that main didn't — no
  conflict, no warning, just a diff that looks like a normal edit. This
  destroyed the Builds showcase on 19 Aug and PROJECT-STATUS.md twice. Always
  `git clone --branch <branch>` (or a full clone), and before committing, grep
  for a symbol you know the branch introduced.
- **zsh does not strip inline `#` comments in interactive mode.** Pasting
  `git add public/og-image.png    # keep our version` passes `#`, `keep`, `our`
  and `version` to git as pathspecs and the command fails — while the rest of a
  pasted block runs on regardless. Commands to paste must carry no trailing
  comments; put explanation on its own line above.
- **This file gets clobbered by tools working from a stale checkout.** It was
  reverted to its template twice on 19 Aug. If it looks empty, check
  `git log -- PROJECT-STATUS.md` before rewriting it.

---

## Changelog

- **2026-08-19** — The Weekly and the email capture merged into one tinted
  block. Two stacked full-bleed sections became one: 960px → 531px on mobile,
  741px → 384px at 1440px. Notes keeps surface-variant so the two read apart.
- **2026-08-19** — The Channel removed from the homepage. It doesn't win a gig
  or a job, and it was the only module pointing off-domain. Deleted with it:
  `api/latest-videos.js`, `src/hooks/useImageOrientation.ts`, and the video
  card / skeleton components in `Home.tsx`. YouTube stays as a footer link.
- **2026-08-19** — Restored `public/og-image.png` (deleted by a dependency
  prune), rebuilt to 1200×630 / 851KB from a 5.8MB original.
- **2026-08-19** — Reading experience: scroll progress bar, table of contents
  with scroll-spy across Notes, Case Study and Tech Digest.
- **2026-08-19** — Commentary surfaced as its own category; format check now
  measures whether slot 5 closes on a standalone opinion, and prints the rate.
- **2026-08-19** — Analytics: GTM trigger, variables and GA4 event tag for
  `cta_click`; GA4 custom dimensions registered. Verified live.
- **2026-08-19** — SEO: single source of truth for static-route metadata
  (`src/data/seo.mjs` + `usePageSeo()`), fixing three title/description drifts.
- **2026-08-19** — Phase 2: `/builds` page and nav item, homepage builds
  module, `/about` cut from ~4,000 to ~1,460 words, availability signal removed
  from the site, Point of View rewritten as a note.
- **2026-08-19** — Phase 3: `/weekly` archive, byline card on roundup issues,
  Notes promise narrowed, format check, GA4 CTA events.
- **2026-08-19** — Weekly auto-sync: `/api/latest-weekly` reads beehiiv
  directly; no repo change needed per issue.
- **2026-08-19** — Phase 1: router homepage, five-item nav, channel collapsed
  to one carousel, weekly ungated, footer rebuilt, newsletter promise
  centralised, browse chips reordered.
- **2026-08-19** — Vercel moved from Hobby to Pro.
