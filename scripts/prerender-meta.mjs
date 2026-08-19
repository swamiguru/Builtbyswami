/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Post-build: emit per-route HTML shells with correct <title>/description/OG
 * so social crawlers get real metadata for a client-rendered SPA.
 * Vercel serves these static files before applying the SPA rewrite.
 *
 * Keep the NOTES list in sync with src/data/notes.ts.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { PAGE_SEO } from "../src/data/seo.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const BASE = "https://www.builtbyswami.com";
const template = readFileSync(join(DIST, "index.html"), "utf8");

const NOTES = [
  {
    slug: "what-got-faster-and-what-didnt",
    title: "What got faster when I started building with AI, and what didn't",
    description:
      "Producing code got faster. Deciding what to build and knowing when to stop did not. What eleven years of product work looks like when the execution barrier disappears — and the two rules I broke anyway.",
  },
  {
    slug: "what-a-cms-migration-actually-costs",
    title: "What a CMS migration actually costs you",
    description:
      "The business case prices the license, the build and the data move. The three costs that sink migrations aren't in it — editorial throughput, the redirect map, and ad integrations that break quietly.",
  },
  {
    slug: "adda-a-product-with-no-job",
    title: "I built a product with no job to do",
    description:
      "Adda plays a city's songs under its own sky and its own clock. Twenty-four deploys in four hours — and the only thing that broke loudly was the cheapest thing to fix.",
  },
  {
    slug: "why-i-built-builtbyswami-from-scratch",
    title:
      "Why I Built My Own Brand From Scratch — And What It Taught Me About Building Products in the AI Era",
    description:
      "After Condé Nast made my role redundant, I built a website, a newsletter, and a daily habit — and used AI as a real tool, not a buzzword, the whole way through.",
  },
  {
    slug: "24-hour-task-manager-sprint",
    title: "I built a task manager from zero in 24 hours with AI",
    description:
      "A solo, single-cycle build of a working task-management engine — the method, what broke, and why LLM context is the new foundational code.",
  },
  {
    slug: "freewordtool-one-day-sprint",
    title: "I built a word counter in one day — and it almost turned into five products",
    description:
      "A one-day, eight-commit build of a privacy-first word counter — the brief, the method, and the scope creep I had to catch mid-sprint.",
  },
];

// Daily social roundups are created by the automation — read them at build time.
let digests = [];
try {
  const socialDir = join(__dirname, "..", "src", "content", "social");
  digests = readdirSync(socialDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(socialDir, f), "utf8")));
} catch {
  /* no social content yet */
}

const routes = [
  { path: "work-with-me", ...PAGE_SEO.workWithMe },
  {
    path: "case-study/middle-east",
    title: "Launching global media brands into the Middle East | Case Study",
    description:
      "How Condé Nast's Middle East expansion shipped across three waves — five flagship titles live in the GCC, the $20M+ Year 1 revenue target exceeded, and a final launch that halved time-to-market.",
  },
  { path: "about", ...PAGE_SEO.about },
  { path: "notes", ...PAGE_SEO.notes },
  { path: "builds", ...PAGE_SEO.builds },
  { path: "weekly", ...PAGE_SEO.weekly },
  ...NOTES.map((n) => ({
    path: `notes/${n.slug}`,
    title: `${n.title} | Build Notes`,
    description: n.description,
  })),
  { path: "tech-roundup", ...PAGE_SEO.techRoundup },
  ...digests.map((d) => ({
    path: `tech-roundup/${d.date}`,
    title: `${d.title} | Tech Roundup`,
    description: d.intro,
  })),
];

const sub = (html, attr, value) =>
  html.replace(
    new RegExp(`(${attr}=")[^"]*(")`),
    (_m, a, b) => `${a}${value.replace(/"/g, "&quot;")}${b}`
  );

let count = 0;
for (const r of routes) {
  const url = `${BASE}/${r.path}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${r.title}</title>`);
  html = sub(html, '<meta name="description" content', r.description);
  html = sub(html, '<meta property="og:title" content', r.title);
  html = sub(html, '<meta property="og:description" content', r.description);
  html = sub(html, '<meta property="og:url" content', url);
  html = sub(html, '<meta name="twitter:title" content', r.title);
  html = sub(html, '<meta name="twitter:description" content', r.description);
  html = sub(html, '<meta name="twitter:url" content', url);
  html = sub(html, '<link rel="canonical" href', url);

  const outDir = join(DIST, r.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  count += 1;
  console.log(`  prerendered /${r.path}`);
}
console.log(`prerender-meta: wrote ${count} route shell(s).`);

// The homepage shell is dist/index.html itself, written by Vite from the
// source index.html. Rewrite its metadata from PAGE_SEO too, so the one page
// that doesn't get a generated shell can't drift either.
{
  const home = `${BASE}/`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${PAGE_SEO.home.title}</title>`);
  html = sub(html, '<meta name="description" content', PAGE_SEO.home.description);
  html = sub(html, '<meta property="og:title" content', PAGE_SEO.home.title);
  html = sub(html, '<meta property="og:description" content', PAGE_SEO.home.description);
  html = sub(html, '<meta property="og:url" content', home);
  html = sub(html, '<meta name="twitter:title" content', PAGE_SEO.home.title);
  html = sub(html, '<meta name="twitter:description" content', PAGE_SEO.home.description);
  html = sub(html, '<meta name="twitter:url" content', home);
  html = sub(html, '<link rel="canonical" href', home);
  writeFileSync(join(DIST, "index.html"), html, "utf8");
  console.log("  rewrote / from PAGE_SEO.home");
}


// Regenerate sitemap.xml from this same route list so new tech-roundup dates
// and notes can never fall out of sync with what's actually published.
const HUB_PATHS = new Set(["about", "notes", "weekly", "builds", "tech-roundup", "work-with-me"]);
const changefreqFor = (path) =>
  path === "" ? "weekly" : path === "tech-roundup" ? "daily" : HUB_PATHS.has(path) ? "monthly" : "monthly";
const priorityFor = (path) => (path === "" ? "1.0" : HUB_PATHS.has(path) ? "0.8" : "0.6");

const sitemapEntries = [{ path: "" }, ...routes];
const urlsXml = sitemapEntries
  .map(
    (r) => `  <url>
    <loc>${BASE}/${r.path}</loc>
    <changefreq>${changefreqFor(r.path)}</changefreq>
    <priority>${priorityFor(r.path)}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;

writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf8");
console.log(`prerender-meta: regenerated sitemap.xml with ${sitemapEntries.length} url(s).`);

// The daily five is meant to carry one opinionated slot every day — a Hot Take
// or a Myth-Buster. Those are the two formats with a point of view, and they
// were the two rarest (6 and 15 posts against 57 News and 37 Tips), which is
// how a publication quietly turns into an aggregator.
//
// This warns; it never fails. A format rule that can block a 6am publish is a
// rule that gets deleted the first morning it fires.
const OPINION_PILLARS = ["myth", "hot take"];
const newest = [...digests].sort((a, b) => b.date.localeCompare(a.date))[0];
if (newest) {
  const hasOpinion = (newest.posts ?? []).some((p) =>
    OPINION_PILLARS.some((k) => String(p.pillar ?? "").toLowerCase().includes(k))
  );
  if (!hasOpinion) {
    const pillars = (newest.posts ?? []).map((p) => p.pillar).join(", ");
    console.warn(
      `\nprerender-meta: WARNING — the ${newest.date} roundup has no Hot Take or Myth-Buster.` +
        `\n  Pillars today: ${pillars || "none"}` +
        `\n  Shipping anyway. The opinion slot is what makes the daily five yours rather than a feed.\n`
    );
  }
}
