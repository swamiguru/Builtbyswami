/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Search, X, Tag } from "lucide-react";
import { DIGESTS, formatDigestDate, getTopCategories, normalizeCategory, type Digest } from "../data/social";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ScrollProgress from "../components/ScrollProgress";
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

  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || searchParams.get("tag") || "";
  const requestedMonth = searchParams.get("month") || "";

  const [query, setQuery] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const topCategories = useMemo(() => getTopCategories(10), []);

  // Synchronize state if URL params change externally
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Update URL search params cleanly
  const updateFilters = (newQuery: string, newCat: string) => {
    const params: Record<string, string> = {};
    if (newQuery.trim()) params.q = newQuery.trim();
    if (newCat.trim()) params.category = newCat.trim();
    setSearchParams(params, { replace: true });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateFilters(val, activeCategory);
  };

  const handleCategoryClick = (cat: string) => {
    const nextCat = activeCategory.toLowerCase() === cat.toLowerCase() ? "" : cat;
    setActiveCategory(nextCat);
    updateFilters(query, nextCat);
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("");
    setSearchParams({}, { replace: true });
  };

  const isFiltered = Boolean(query.trim() || activeCategory);

  // Filter digests across all dates
  const filteredDigests = useMemo(() => {
    const q = query.toLowerCase().trim();
    const cat = activeCategory.toLowerCase().trim();

    return DIGESTS.filter((d) => {
      // Category / Tag check
      if (cat) {
        const hasCategory = d.posts.some((p) => {
          const norm = normalizeCategory(p.pillar).toLowerCase();
          const raw = p.pillar.toLowerCase();
          return norm === cat || raw.includes(cat);
        });
        if (!hasCategory) return false;
      }

      // Keyword search check
      if (!q) return true;

      const inTitle = d.title.toLowerCase().includes(q);
      const inIntro = d.intro.toLowerCase().includes(q);
      const inDate = d.date.includes(q) || formatDigestDate(d.date).toLowerCase().includes(q);

      if (inTitle || inIntro || inDate) return true;

      // Check within individual posts
      return d.posts.some((p) => {
        return (
          p.hook.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          p.pillar.toLowerCase().includes(q) ||
          (p.problem && p.problem.toLowerCase().includes(q)) ||
          (p.breakthrough && p.breakthrough.toLowerCase().includes(q)) ||
          (p.catch && p.catch.toLowerCase().includes(q)) ||
          (p.forYou && p.forYou.toLowerCase().includes(q))
        );
      });
    });
  }, [query, activeCategory]);

  // Group filtered digests by month (YYYY-MM)
  const monthGroups = useMemo(() => {
    const map = new Map<string, Digest[]>();
    for (const d of filteredDigests) {
      const key = d.date.slice(0, 7);
      const list = map.get(key);
      if (list) list.push(d);
      else map.set(key, [d]);
    }
    return Array.from(map.entries());
  }, [filteredDigests]);

  // Active month index for browsing when not filtering
  const activeIndex = useMemo(() => {
    if (!requestedMonth || isFiltered) return 0;
    const idx = monthGroups.findIndex(([month]) => month === requestedMonth);
    return idx === -1 ? 0 : idx;
  }, [monthGroups, requestedMonth, isFiltered]);

  const [activeMonth, activeItems] = monthGroups[activeIndex] ?? [null, [] as Digest[]];
  const newerMonth = !isFiltered && activeIndex > 0 ? monthGroups[activeIndex - 1][0] : null;
  const olderMonth =
    !isFiltered && activeIndex < monthGroups.length - 1 ? monthGroups[activeIndex + 1][0] : null;

  const goToMonth = (month: string | null) => {
    if (!month) return;
    setSearchParams(month === monthGroups[0]?.[0] ? {} : { month });
    window.scrollTo(0, 0);
  };

  usePageSeo("techRoundup");

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <ScrollProgress />
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
            The day&rsquo;s biggest tech & AI stories — filtered, with honest takes. Five things worth your time, every day.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-m3-on-surface-variant/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search stories, AI tools, companies, or news..."
                className="w-full bg-m3-surface text-m3-on-surface placeholder:text-m3-on-surface-variant/50 text-sm font-medium rounded-full pl-11 pr-10 py-3 border border-m3-outline/20 focus:border-m3-primary focus:outline-hidden transition-all shadow-xs"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  aria-label="Clear search input"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-m3-on-surface-variant/60 hover:text-m3-on-surface p-1 rounded-full hover:bg-m3-surface-variant transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category / Topic pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleCategoryClick("")}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  !activeCategory
                    ? "bg-m3-primary text-m3-on-primary shadow-xs"
                    : "bg-m3-surface text-m3-on-surface-variant hover:text-m3-on-surface hover:bg-m3-surface-variant/80 border border-m3-outline/10"
                }`}
              >
                All Roundups ({DIGESTS.length})
              </button>

              {topCategories.map(({ category, count }) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    activeCategory.toLowerCase() === category.toLowerCase()
                      ? "bg-m3-primary text-m3-on-primary shadow-xs"
                      : "bg-m3-surface text-m3-on-surface-variant hover:text-m3-on-surface hover:bg-m3-surface-variant/80 border border-m3-outline/10"
                  }`}
                >
                  <Tag className="w-3 h-3 opacity-60" />
                  {category} <span className="opacity-70 font-semibold">({count})</span>
                </button>
              ))}

              {isFiltered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-m3-primary hover:underline ml-1 cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Status line when filtered */}
            {isFiltered && (
              <div className="text-xs font-bold uppercase tracking-wider text-m3-on-surface-variant/70">
                Found {filteredDigests.length} {filteredDigests.length === 1 ? "roundup" : "roundups"}
                {query && <span> matching &ldquo;{query}&rdquo;</span>}
                {activeCategory && <span> in category &ldquo;{activeCategory}&rdquo;</span>}
              </div>
            )}
          </div>
        </section>

        <section className="px-6 md:px-14 pb-14 flex-1">
          {monthGroups.length > 0 ? (
            <div className="flex flex-col gap-6 md:gap-8">
              {isFiltered ? (
                // When filtered, display all matching month groups directly
                monthGroups.map(([month, items]) => (
                  <div key={month} className="flex flex-col gap-4 md:gap-5">
                    <h2 className="font-display text-xs font-black uppercase tracking-[0.25em] text-m3-on-surface-variant/60">
                      {formatMonth(month)} ({items.length})
                    </h2>
                    {items.map((d) => {
                      // If querying, identify matching posts for extra context
                      const matchingPosts = query
                        ? d.posts.filter(
                            (p) =>
                              p.hook.toLowerCase().includes(query.toLowerCase()) ||
                              p.body.toLowerCase().includes(query.toLowerCase()) ||
                              p.pillar.toLowerCase().includes(query.toLowerCase())
                          )
                        : [];

                      return (
                        <Link
                          key={d.date}
                          to={`/tech-roundup/${d.date}`}
                          className="group bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 hover:border-m3-primary/30 hover:shadow-xl transition-all flex flex-col gap-3"
                        >
                          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                            <span>{formatDigestDate(d.date)}</span>
                            <span>·</span>
                            <span>{d.posts.length} stories</span>
                            {matchingPosts.length > 0 && (
                              <span className="bg-m3-primary-container text-m3-on-primary-container px-2 py-0.5 rounded-full text-[10px] font-extrabold normal-case">
                                {matchingPosts.length} matching {matchingPosts.length === 1 ? "story" : "stories"}
                              </span>
                            )}
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
                      );
                    })}
                  </div>
                ))
              ) : activeMonth ? (
                // When browsing unfiltered, preserve month pagination
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
                            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors px-2 py-1 cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" /> {formatMonthShort(olderMonth)}
                          </button>
                        )}
                        {newerMonth && (
                          <button
                            type="button"
                            onClick={() => goToMonth(newerMonth)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface hover:text-m3-primary transition-colors px-2 py-1 cursor-pointer"
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
              ) : null}
            </div>
          ) : isFiltered ? (
            <div className="bg-m3-surface rounded-[24px] border border-m3-outline/10 p-8 md:p-12 text-center max-w-lg mx-auto flex flex-col items-center gap-4 my-6">
              <div className="w-12 h-12 rounded-full bg-m3-surface-variant flex items-center justify-center text-m3-primary">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-m3-on-surface">
                  No matching roundups found
                </h3>
                <p className="text-sm text-m3-on-surface-variant mt-1">
                  We couldn&rsquo;t find any stories or roundups matching your search. Try another keyword or clear the active category filter.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-2 bg-m3-primary text-m3-on-primary font-display font-bold text-xs px-5 py-2.5 rounded-full hover:m3-elevation-1 transition-all cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <p className="text-m3-on-surface-variant font-medium">Roundups are on the way — check back soon.</p>
          )}
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
