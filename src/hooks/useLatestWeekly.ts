/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { WEEKLY_ISSUES, type WeeklyIssue } from "../data/weekly";

/** What the archive page needs: the list plus whether it's still resolving. */
export interface WeeklyIssuesState {
  issues: WeeklyIssue[];
  loading: boolean;
  /** True once /api/latest-weekly answered — i.e. the list is live, not floor. */
  live: boolean;
}

/**
 * Every weekly issue, preferring what beehiiv currently reports over what was
 * committed to the repo.
 *
 * Publishing on beehiiv is a manual step and adding the matching JSON file was
 * a second one that kept getting missed — issue #2 never landed on the site at
 * all, and #5 sat unpublished here for three days. /api/latest-weekly removes
 * the second step by reading the publication page directly.
 *
 * The committed issues always render first, so there is no empty state and no
 * layout shift, and they stay if the endpoint fails. Remote entries merge in
 * by slug and win on conflict, because they're the fresher copy of the same
 * post. A broken or empty response can therefore never make the site look
 * emptier or staler than the repo already guarantees.
 */
export function useWeeklyIssues(): WeeklyIssuesState {
  const [remote, setRemote] = useState<WeeklyIssue[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/latest-weekly")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("unavailable"))))
      .then((d) => {
        if (!active || !Array.isArray(d?.issues)) return;
        const usable = (d.issues as WeeklyIssue[]).filter(
          (i) => i?.slug && i?.url && i?.publishedDate
        );
        if (usable.length) setRemote(usable);
      })
      .catch(() => {
        /* keep the committed issues */
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const bySlug = new Map<string, WeeklyIssue>();
  for (const issue of WEEKLY_ISSUES) bySlug.set(issue.slug, issue);
  for (const issue of remote ?? []) bySlug.set(issue.slug, issue);

  const issues = [...bySlug.values()].sort((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate)
  );

  return { issues, loading, live: remote !== null };
}

/** The newest issue — what the homepage card shows. */
export function useLatestWeekly(): WeeklyIssue | undefined {
  return useWeeklyIssues().issues[0];
}
