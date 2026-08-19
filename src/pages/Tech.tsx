/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { DIGESTS, formatDigestDate, type Digest } from "../data/social";
import SiteHeader from "../components/SiteHeader";
import { usePageSeo } from "../hooks/usePageSeo";

const formatMonth = (key: string): string =>
  new Date(key + "-01T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

// Compact form used on the Older/Newer nav buttons, e.g. "Jul 2026".
const formatMonthShort = (key: string): string =>
  new Date(key + "-01T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

export default function Tech() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Group digests by month (YYYY-MM) for the archive view. DIGESTS is
  // already sorted newest-first, and Map preserves insertion order, so
  // months come out newest-first with no extra sorting needed.
  const monthGroups = useMemo(() => {
    const map = new Map<string, Digest[]>();
    for (const d of DIGESTS) {
      const key = d.date.slice(0, 7);
      const list = map.get(key);
      if (list) list.push(d);
      else map.set(key, [d]);
    }
    return Array.from(map.entries());
  }, []);

  // Which month is showing, driven by ?month=YYYY-MM. Falls back to the
  // newest month if the param is missing or doesn't match anything (e.g. a
  // stale or mistyped link) so the page never renders empty.
  const requestedMonth = searchParams.get("month");
  const activeIndex = useMemo(() => {
    if (!requestedMonth) return 0;
    const idx = monthGroups.findIndex(([month]) => month === requestedMonth);
    return idx === -1 ? 0 : idx;
  }, [monthGroups, requestedMonth]);

  const [activeMonth, activeItems] = monthGroups[activeIndex] ?? [null, [] as Digest[]];
  // monthGroups is newest-first: a lower index is more recent.
  const newerMonth = activeIndex > 0 ? monthGroups[activeIndex - 1][0] : null;
  const olderMonth =
    activeIndex < monthGroups.length - 1 ? monthGroups[activeIndex + 1][0] : null;

  const goToMonth = (month: string | null) => {
    if (!month) return;
    // Keep the URL clean when landing back on the newest month.
    setSearchParams(month === monthGroups[0]?.[0] ? {} : { month });
    window.scrollTo(0, 0);
  };
  usePageSeo("techRoundup");

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <SiteHeader />

        <section className="px-6 md:px-14 pt-12 md:pt-16 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-m3-primary" />
            <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
              The Daily Tech Roundup
            </span>
          </div>
          <h1 className="display text-3xl md:text-5xl font-extrabold uppercase tracking-tighter text-m3-on-surface max-w-2xl leading-[0.95]">
            Tech Roundup
          </h1>
          <p className="mt-5 text-base md:text-lg font-medium text-m3-on-surface-variant max-w-xl leading-relaxed">
            The day's biggest tech & AI stories — filtered, with honest takes. Five things worth your time, every day.
          </p>
        </section>

        <section className="px-6 md:px-14 pb-14 flex-1">
          {monthGroups.length > 0 && activeMonth ? (
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-xs font-black uppercase tracking-[0.25em] text-m3-on-surface-variant/60">
                  {formatMonth(activeMonth)}
                </h2>
                {(olderMonth || newerMonth) && (
                  <div className="flex items-center gap-2 bg-m3-surface rounded-full border border-m3-outline/10 px-1.5 py-1.5">
                    {olderMonth && (
                      <button
                        type="button"
                        onClick={() => goToMonth(olderMonth)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors px-2 py-1"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> {formatMonthShort(olderMonth)}
                      </button>
                    )}
                    {newerMonth && (
                      <button
                        type="button"
                        onClick={() => goToMonth(newerMonth)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface px-2 py-1"
                      >
                        {formatMonthShort(newerMonth)} <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              {activeItems.map((d) => (
                <Link
                  key={d.date}
                  to={`/tech-roundup/${d.date}`}
                  className="group bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 hover:border-m3-primary/30 hover:shadow-xl transition-all flex flex-col gap-3"
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                    {formatDigestDate(d.date)} · {d.posts.length} stories
                  </div>
                  <h3 className="display text-xl md:text-2xl font-extrabold tracking-tight text-m3-on-surface group-hover:text-m3-primary transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium max-w-2xl line-clamp-2">
                    {d.intro}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                    Read the roundup <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-m3-on-surface-variant font-medium">Roundups are on the way — check back soon.</p>
          )}
        </section>

        <footer className="px-6 md:px-14 py-8 bg-m3-surface flex items-center gap-4 justify-between border-t border-m3-outline/10 rounded-b-m3-xl md:rounded-b-[32px]">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-m3-primary flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-m3-primary animate-pulse" /> Live operational status — 2026
          </span>
          <span className="text-[10px] font-bold uppercase opacity-30 font-display">© builtbyswami</span>
        </footer>
      </div>
    </div>
  );
}
