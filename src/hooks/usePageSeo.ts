/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
// Plain .mjs data module, shared verbatim with scripts/prerender-meta.mjs.
import { PAGE_SEO } from "../data/seo.mjs";

interface PageSeo {
  title: string;
  description: string;
}

const SEO = PAGE_SEO as Record<string, PageSeo>;

/**
 * Set the document title and meta description for a static route, from the
 * same file the build script uses to write the prerendered shells.
 *
 * Every page used to do this inline with its own hardcoded strings, which is
 * how /about ended up serving one title to crawlers and a different one to
 * readers. Passing a key here instead means the two can't disagree.
 *
 * Pages whose metadata comes from content — a note, a roundup issue, the case
 * study — still set it themselves; there's nothing static to share.
 */
export function usePageSeo(key: keyof typeof PAGE_SEO | string): void {
  useEffect(() => {
    const seo = SEO[key as string];
    if (!seo) return;

    document.title = seo.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", seo.description);
  }, [key]);
}
