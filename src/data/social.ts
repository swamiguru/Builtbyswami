/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Loads every daily social digest from src/content/social/*.json at build time.
 * The daily automation just drops a new YYYY-MM-DD.json file — no index to edit.
 */

export interface SocialPost {
  n: number;
  pillar: string;
  platforms: string[];
  hook: string;
  body: string;
  url?: string;
  image?: string; // e.g. /social/2026-07-12/card_1.png
  // Marks this as the day's lead story — gets the wide hero treatment on the
  // homepage instead of a standard rail card. Optional and rare: at most one
  // post per day should set this. When no post has it, the homepage falls
  // back to posts[0] so nothing breaks for existing or not-yet-updated content.
  featured?: boolean;
  // Optional long-form breakdown for the website story view (/tech-roundup).
  // `body` stays short-form for social distribution; when these are present,
  // TechDigest renders the structured version instead of `body`.
  problem?: string;
  breakthrough?: string;
  catch?: string;
  forYou?: string;
}

export interface Digest {
  date: string; // YYYY-MM-DD
  title: string;
  intro: string;
  cover?: string; // optional hero image path
  posts: SocialPost[];
}

const modules = import.meta.glob<Digest>("../content/social/*.json", {
  eager: true,
  import: "default",
});

export const DIGESTS: Digest[] = Object.values(modules).sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const getDigest = (date: string): Digest | undefined =>
  DIGESTS.find((d) => d.date === date);

export const getLatestDigest = (): Digest | undefined => DIGESTS[0];

export const formatDigestDate = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Story pillars are written freely by the daily pipeline (e.g. "AI Update",
// "News / AI Update", "Tips & Tricks"), so there's more raw variety than is
// useful for browsing. This folds them into a small set of umbrella
// categories for the homepage chip row and the /tech-roundup filter — no
// hardcoded category list to maintain, just a normalization rule over
// whatever pillars the content actually contains.
export function normalizeCategory(pillar: string): string {
  const p = pillar.toLowerCase();
  if (p.includes("myth")) return "Myth-Buster";
  if (p.includes("hot take")) return "Hot Take";
  // "News & Commentary" is the daily lead: a story plus a point of view, every
  // day since 12 July. It was falling through to News because the string
  // contains "news", which is why News read 57 and Hot Take read 6 — the
  // browse row described an aggregator when the site is a daily column. This
  // has to be tested before the "news" rule below, not after.
  if (p.includes("commentary")) return "Commentary";
  if (p.includes("launch")) return "Launch Radar";
  if (p.includes("tips") || p.includes("trick")) return "Tips";
  if (p.includes("comparison")) return "Comparison";
  if (p.includes("security") || p.includes("privacy")) return "Security";
  if (p.includes("community") || p.includes("poll")) return "Community";
  if (p.includes("ai")) return "AI";
  if (p.includes("news")) return "News";
  return pillar;
}

export interface CategoryCount {
  category: string;
  count: number;
}

/**
 * Display order for the browse chips, most distinctive first.
 *
 * Volume alone put News and Tips at the front — the two categories every tech
 * site has and nobody chooses a site for — while the formats that actually
 * carry a point of view sat last. Count still decides *which* chips appear;
 * this decides the order they're read in. Anything not listed keeps its
 * volume rank, after these.
 */
const CATEGORY_DISPLAY_ORDER = [
  "Commentary",
  "Hot Take",
  "Myth-Buster",
  "Comparison",
  "AI",
  "Tips",
  "Security",
  "Launch Radar",
  "Community",
  "News",
];

/**
 * Categories that always appear in the browse row when they have any posts at
 * all, regardless of volume.
 *
 * These are the two standalone opinion formats. They are rare by design, so a
 * pure top-N-by-count selection drops them exactly because they're the thing
 * worth finding — adding the Commentary bucket pushed Hot Take (6 posts) off
 * the row entirely. Pinning them is the point of the row.
 */
const PINNED_CATEGORIES = ["Hot Take", "Myth-Buster"];

/** Umbrella categories, selected by volume and ordered by editorial value —
 * used for the homepage chip row and the /tech-roundup filter. */
export const getTopCategories = (limit = 9): CategoryCount[] => {
  const counts = new Map<string, number>();
  for (const d of DIGESTS) {
    for (const p of d.posts) {
      const cat = normalizeCategory(p.pillar);
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
  }

  const rank = (c: string) => {
    const i = CATEGORY_DISPLAY_ORDER.indexOf(c);
    return i === -1 ? CATEGORY_DISPLAY_ORDER.length : i;
  };

  const all = Array.from(counts.entries()).map(([category, count]) => ({
    category,
    count,
  }));

  const pinned = all.filter((c) => PINNED_CATEGORIES.includes(c.category));
  const rest = all
    .filter((c) => !PINNED_CATEGORIES.includes(c.category))
    // Which of the remaining chips make the cut is still a volume question…
    .sort((a, b) => b.count - a.count)
    .slice(0, Math.max(0, limit - pinned.length));

  return [...pinned, ...rest]
    // …but the order they're presented in is an editorial one.
    .sort((a, b) => rank(a.category) - rank(b.category) || b.count - a.count);
};

/** Digests containing at least one post that normalizes to `category`. */
export const getDigestsByCategory = (category: string): Digest[] =>
  DIGESTS.filter((d) => d.posts.some((p) => normalizeCategory(p.pillar) === category));
