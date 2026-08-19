/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import {
  getLatestWeeklyIssue,
  type WeeklyIssue,
} from "../data/weekly";

/**
 * The newest weekly issue, preferring what beehiiv currently reports over what
 * was committed to the repo.
 *
 * Publishing on beehiiv is a manual step and adding the matching JSON file was
 * a second one that kept getting missed — issue #2 never landed on the site at
 * all, and #5 sat unpublished here for three days. This removes the second
 * step: /api/latest-weekly reads the publication page directly.
 *
 * The committed issue always renders first, so there is no empty slot and no
 * layout shift on load, and it stays on screen if the endpoint fails. The
 * remote issue only replaces it when it is genuinely newer — meaning a broken
 * or empty API response can never make the homepage look emptier or staler
 * than the repo already guarantees.
 */
export function useLatestWeekly(): WeeklyIssue | undefined {
  const local = getLatestWeeklyIssue();
  const [remote, setRemote] = useState<WeeklyIssue | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/latest-weekly")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("unavailable"))))
      .then((d) => {
        const newest: WeeklyIssue | undefined = d?.issues?.[0];
        if (active && newest?.publishedDate && newest.url) setRemote(newest);
      })
      .catch(() => {
        /* keep the committed issue */
      });

    return () => {
      active = false;
    };
  }, []);

  if (!remote) return local;
  if (!local) return remote;

  return remote.publishedDate > local.publishedDate ? remote : local;
}
