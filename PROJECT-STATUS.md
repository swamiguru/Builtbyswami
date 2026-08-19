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
| Repo | `swamiguru/Swami-Guru-Portfolio` (local folder is `Builtbyswami-website`) |
| Vercel project | `swami-guru-portfolio`, team `swami2580-9441's projects` |
| Vercel plan | **Pro** (moved off Hobby 19 Aug 2026 — the `/work-with-me` page is commercial use and breached Hobby terms) |
| Newsletter | beehiiv, publication "Builtbyswami Weekly", free tier |
| Analytics | GTM-TQFTQXB6 → GA4 `G-L3LGY5D8B0` |

---

## Site structure

| Route | What it is |
|---|---|
| `/` | Router homepage — positioning hero, then a fork to the daily or to consulting |
| `/tech-roundup` + `/tech-roundup/:date` | The Daily Five. 47+ dated issues. **These URLs never move.** |
| `/weekly` | The Weekly archive, read live from beehiiv |
| `/notes` + `/notes/:slug` | Build notes |
| `/builds` | Four products shipped solo |
| `/about` | The Work — story, recent roles, condensed toolkit |
| `/case-study/middle-east` | Condé Nast GCC expansion |
| `/work-with-me` | Consulting |

Nav is five items plus Subscribe. The YouTube channel is deliberately **not**
in the nav — it sent every visitor off-domain. It lives as a homepage carousel
and a footer link.

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
- `/api/latest-videos` pulls the YouTube channel RSS feed for the homepage
  carousel. Degrades to a CTA card when the feed fails.
- The build prints a **warning** when the newest daily digest carries no Hot
  Take or Myth-Buster. It never blocks a publish.

## What I still do by hand

- **CONFIRM** — how the daily `src/content/social/YYYY-MM-DD.json` files get
  created. Curation and writing are clearly manual; whether anything automates
  the feed pull or card generation (`scripts/social/*.py`) isn't documented.
- Writing and publishing each weekly issue in beehiiv (free tier, no API).
- **CONFIRM** — "Builtbyswami daily social": what runs it, on what platform, at
  what time, and to which networks.
- Merging PRs to `main` to deploy.

---

## Open problems

| Problem | Notes | Priority |
|---|---|---|
| Opinion slot is being skipped | The build warning fired on 17, 18 and 19 Aug — three consecutive roundups with no Hot Take or Myth-Buster. Those are the two formats that carry a point of view and the ones worth clipping for the channel. The check works; the habit doesn't. | high |
| Daily cadence not decided | 47+ issues since 12 July, solo, alongside the channel, the job search and consulting. Declaring a cadence that holds beats an archive that shows gaps. | high |
| Daily JSON doesn't set `featured` | Homepage hero card falls back to `posts[0]` when no post has `featured: true` — works, but the lead story is whatever's first in the array, not a deliberate pick. Add `"featured": true` when writing the day's JSON. | low |
| YouTube RSS feed is flaky | `feeds/videos.xml` returned HTTP 500 for about an hour on 19 Aug, 502ing `/api/latest-videos`. Recovered on its own; channel ID verified correct. The homepage degrades gracefully, so cosmetic. YouTube Data API would be steadier if outages lengthen. | low |
| Own traffic isn't filtered from GA4 | Deliberately skipped. The public IP resolves to Google LLC / Data Center / Mumbai — a shared proxy, not a home address — so an IP rule would be unreliable and could filter real traffic. Read reports from ranges that exclude testing days. | low |
| Repo / folder / project names disagree | `Builtbyswami-website` (local) vs `Swami-Guru-Portfolio` (GitHub) vs `swami-guru-portfolio` (Vercel). | low |
| Git through the Cowork bridge leaves lockfiles | The mounted-folder bridge allows writes and renames but not `unlink`, so every git command leaves an `index.lock` that blocks the next one. Run git in Terminal, not through an agent session. | low |

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

*Debug note: you can't verify dataLayer events by watching `window.dataLayer`
grow — GTM overrides `push` and consumes entries. Use GTM Preview or GA4
DebugView.*

---

## Gotchas worth remembering

- `/api/latest-weekly` returns **403 from a generic cloud container** but 200
  from Vercel — beehiiv sits behind Cloudflare, which blocks datacenter IPs. A
  local 403 doesn't mean the endpoint is broken.
- Local `node_modules` holds the macOS rollup binary, so `npm run build` fails
  inside a Linux agent VM with `Cannot find module '@rollup/rollup-linux-arm64-gnu'`.
  That's environmental, not a code problem.
- Adding a static route means adding it to `src/data/seo.mjs` once — the build
  script and the page both read from there.

---

## Changelog

- **2026-08-19** — Analytics: GTM trigger, variables and GA4 event tag for
  `cta_click`; GA4 custom dimensions registered. Verified live.
- **2026-08-19** — SEO: single source of truth for static-route metadata
  (`src/data/seo.mjs` + `usePageSeo()`), fixing three title/description drifts.
- **2026-08-19** — Phase 2: `/builds` page and nav item, homepage builds
  module, `/about` cut from ~4,000 to ~1,460 words, availability signal removed
  from the site, Point of View rewritten as a note.
- **2026-08-19** — Phase 3: `/weekly` archive, byline card on roundup issues,
  Notes promise narrowed, opinion-slot build warning, GA4 CTA events.
- **2026-08-19** — Weekly auto-sync: `/api/latest-weekly` reads beehiiv
  directly; no repo change needed per issue.
- **2026-08-19** — Phase 1: router homepage, five-item nav, channel collapsed
  to one carousel, weekly ungated, footer rebuilt, newsletter promise
  centralised, browse chips reordered.
- **2026-08-19** — Vercel moved from Hobby to Pro.
- **2026-08-19** — This file filled in from the template it had been sitting at
  since creation.
