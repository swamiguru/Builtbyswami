/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel serverless function: returns the most recently published
 * "Builtbyswami Weekly" issues, read from the public beehiiv publication page.
 *
 * Why read the page rather than call the API: beehiiv's v2 API is gated to
 * their paid Scale tier. The public publication page is a Remix app that ships
 * its post list as JSON inside a `window.__remixContext` assignment, and that
 * payload carries everything the site needs — title, subtitle, slug, publish
 * date and image — with no key and no plan upgrade.
 *
 * That shape is undocumented and beehiiv can change it without warning. This
 * is deliberately survivable: the site treats the committed
 * src/content/weekly/*.json files as its floor and only upgrades to what this
 * endpoint returns when it is genuinely newer. A parse failure therefore shows
 * the last known issue rather than an empty slot — the same lesson the
 * /api/latest-videos outage taught, applied up front.
 */

const PUBLICATION = "https://builtbyswami.beehiiv.com";
const LIMIT = 6;

/**
 * Pull the JSON object literal that follows `window.__remixContext =`.
 * Brace-matching rather than a regex, because the payload is large and
 * contains braces inside strings. Only `"` opens a string — it is JSON.
 */
function extractRemixContext(html) {
  const at = html.indexOf("__remixContext");
  if (at === -1) throw new Error("no __remixContext in page");

  const eq = html.indexOf("=", at);
  const start = html.indexOf("{", eq);
  if (eq === -1 || start === -1) throw new Error("malformed __remixContext");

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < html.length; i++) {
    const c = html[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inString = false;
      continue;
    }

    if (c === '"') inString = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      return JSON.parse(html.slice(start, i + 1));
    }
  }

  throw new Error("unterminated __remixContext");
}

/**
 * Walk the loader payload for post records. The posts sit at an unstable
 * depth, so this recurses and keys on shape rather than on a fixed path —
 * one less thing to break when beehiiv reorganises the tree.
 */
function collectPosts(node, found = new Map()) {
  if (!node || typeof node !== "object") return found;

  if (Array.isArray(node)) {
    for (const item of node) collectPosts(item, found);
    return found;
  }

  if (
    typeof node.slug === "string" &&
    typeof node.web_title === "string" &&
    node.scheduled_at &&
    !found.has(node.slug)
  ) {
    found.set(node.slug, node);
  }

  for (const value of Object.values(node)) collectPosts(value, found);
  return found;
}

/** "…Weekly #5: …" or "issue-5-…" → 5. Absent is fine; the UI copes. */
function issueNumberFrom(post) {
  const match =
    String(post.web_title).match(/#\s*(\d+)/) ||
    String(post.slug).match(/^issue-(\d+)/);
  return match ? Number(match[1]) : undefined;
}

function toIssue(post) {
  const issueNumber = issueNumberFrom(post);
  return {
    ...(issueNumber === undefined ? {} : { issueNumber }),
    title: post.web_title,
    teaser: post.web_subtitle || "",
    thumbnail: post.image_url || "",
    url: `${PUBLICATION}/p/${post.slug}`,
    publishedDate: String(post.scheduled_at).slice(0, 10),
    slug: post.slug,
  };
}

export default async function handler(req, res) {
  try {
    const r = await fetch(PUBLICATION, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; builtbyswami.com)" },
    });
    if (!r.ok) throw new Error(`publication responded ${r.status}`);

    const context = extractRemixContext(await r.text());

    const issues = [...collectPosts(context).values()]
      // Anything the author has hidden from the beehiiv feed stays hidden here
      // too, and premium issues are excluded because the site links straight
      // to the post — sending readers to a paywall would be worse than
      // showing the previous free issue.
      .filter((p) => !p.hide_from_feed && !p.is_premium)
      .map(toIssue)
      .filter((i) => i.publishedDate)
      .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
      .slice(0, LIMIT);

    if (!issues.length) throw new Error("no published issues found");

    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({ issues });
  } catch (err) {
    res.status(502).json({ error: String((err && err.message) || err) });
  }
}
