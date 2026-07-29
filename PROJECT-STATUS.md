# The Daily Tech Roundup — Current State

**Last updated:** [YYYY-MM-DD]

> Snapshot of what's actually built and running. Everything here is subject to
> change; if this file looks more than a couple of weeks stale, ask me rather
> than assuming it's current.

---

## Status at a glance

| | |
|---|---|
| Live and publishing | [yes / no] |
| Publishing since | [date] |
| Current cadence | [daily / weekdays / other] |
| Site URL | [url] |
| Vercel account/team it lives on | [which one of the several] |

---

## What runs on its own

- [e.g. Nightly cron pulls feeds at 05:00 IST and writes markdown to the repo]
- [e.g. Git push to `main` triggers Vercel build + deploy]
- [ ]

## What I still do by hand

- [e.g. Curating and editing the day's picks before publish]
- [e.g. Writing the social post copy]
- [ ]

---

## Open problems

| Problem | Notes | Priority |
|---|---|---|
| [e.g. Social auto-publish not wired up] | ["Builtbyswami daily social" runs but isn't connected to the site's publish step] | [high/med/low] |
| Daily JSON doesn't set `featured` | Homepage hero card falls back to `posts[0]` when no post has `featured: true` — works, but the "lead story" is currently whatever's first in the array, not a deliberate pick. Add `"featured": true` to whichever post should lead when writing the day's JSON. | low |
| | | |

---

## Usage against Hobby limits

Checked in Vercel dashboard → Settings → Usage, per team. Does not pool across accounts.

| Resource | Limit | Last checked | Reading |
|---|---|---|---|
| Blob storage | 1 GB/mo | [date] | [x MB] |
| Fast Data Transfer | 100 GB/mo | [date] | [x GB] |
| Edge requests | 1M/mo | [date] | [x] |

---

## Changelog

- **[YYYY-MM-DD]** — [what changed]
- **[YYYY-MM-DD]** — File created.
- **[YYYY-MM-DD]** — Copied from Claude.ai project knowledge into the repo (was read-only there) so it can actually be kept up to date; added the `featured` field open problem.
