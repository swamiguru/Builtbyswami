/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Every "Builtbyswami Weekly" issue committed to the repo, loaded from
 * src/content/weekly/*.json at build time.
 *
 * These files are the site's floor, not its source of truth. The live source
 * is /api/latest-weekly, which reads the beehiiv publication page — see
 * useLatestWeekly(). Committing an issue here is therefore optional: it pins a
 * known-good issue that renders even if beehiiv is unreachable or changes its
 * page shape. Publishing on beehiiv is all that's required for the homepage to
 * update.
 */

export interface WeeklyIssue {
  /** Absent when the title carries no "#N" — the UI falls back to the date. */
  issueNumber?: number;
  title: string;
  teaser: string;
  /** Local /social/... card, or an absolute beehiiv image URL from the API. */
  thumbnail: string;
  url: string; // public beehiiv post URL
  publishedDate: string; // YYYY-MM-DD
  slug: string;
}

const modules = import.meta.glob<WeeklyIssue>("../content/weekly/*.json", {
  eager: true,
  import: "default",
});

/**
 * Sorted by publish date, not issue number: the date is the one field both
 * the committed files and the API always populate, so comparisons between the
 * two can't be thrown by a missing or re-used "#N".
 */
export const WEEKLY_ISSUES: WeeklyIssue[] = Object.values(modules).sort((a, b) =>
  b.publishedDate.localeCompare(a.publishedDate)
);

export const getLatestWeeklyIssue = (): WeeklyIssue | undefined => WEEKLY_ISSUES[0];

/** Where "The Weekly" and "All issues" point — always the current archive. */
export const WEEKLY_PUBLICATION_URL = "https://builtbyswami.beehiiv.com";
