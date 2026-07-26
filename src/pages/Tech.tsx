/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { Mail } from "lucide-react";
import {
  DIGESTS,
  formatDigestDate,
  normalizeCategory,
  getTopCategories,
  type Digest,
} from "../data/social";
import SiteHeader from "../components/SiteHeader";
import NewsletterSignup from "../components/NewsletterSignup";

const formatMonth = (key: string): string =>
  new Date(key + "-01T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

export default function Tech() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const categories = useMemo(() => getTopCategories(), []);

  const filteredDigests = useMemo(() => {
    if (!activeCategory) return DIGESTS;
    return DIGESTS.filter((d) =>
      d.posts.some((p) => normalizeCategory(p.pillar) === activeCategory)
    );
  }, [activeCategory]);

  const clearFilter = () => setSearchParams({});

  // Group digests by month (YYYY-MM) for the archive view. DIGESTS is
  // already sorted newest-first, and Map preserves insertion order, so
  // months come out newest-first with no extra sorting needed.
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

  useEffect(() => {
    document.title = "Daily Tech & AI Roundup | Swami Guru";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Daily tech & AI roundups from Swami Guru — the biggest stories, honest takes, and practical tips, filtered so you only get what's worth your time."
      );
  }, []);

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
            Your daily AI news stop — today's tech roundup, and every one before it, filtered with honest takes. Five things worth your time, every day.
          </p>

          <div className="mt-8 flex md:flex-wrap flex-nowrap items-center gap-2 overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0 pb-1 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map(({ category, count }) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSearchParams(isActive ? {} : { category })}
                  className={
                    isActive
                      ? "shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-m3-primary text-m3-on-primary transition-colors"
                      : "shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-m3-surface text-m3-on-surface hover:bg-m3-primary hover:text-m3-on-primary transition-colors"
                  }
                >
                  {category} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
            {activeCategory && (
              <button
                type="button"
                onClick={clearFilter}
                className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
              >
                Clear <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        <section className="bg-m3-secondary-container text-m3-on-secondary-container px-6 md:px-14 py-10 md:py-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-m3-primary" />
              <h2 className="display text-xl md:text-2xl font-extrabold uppercase tracking-tight">
                Every day's five, one weekly digest
              </h2>
            </div>
            <p className="text-sm md:text-base font-medium opacity-80 mb-6 max-w-xl">
              I run Top 5 Daily all week — this is the distilled best of it, plus what I build in public as a solo founder. 11+ years building products at world class brands. Weekly-ish, free.
            </p>
            <NewsletterSignup />
          </div>
        </section>

        <section className="px-6 md:px-14 pb-14 flex-1">
          {monthGroups.length > 0 ? (
            <div className="flex flex-col gap-10">
              {monthGroups.map(([month, items]) => (
                <div key={month} className="flex flex-col gap-4 md:gap-5">
                  <h2 className="font-display text-xs font-black uppercase tracking-[0.25em] text-m3-on-surface-variant/60">
                    {formatMonth(month)}
                  </h2>
                  {items.map((d) => {
                    // Surface up to 4 distinct editorial pillars from that
                    // day's stories as tags — cheap visual differentiation
                    // pulled straight from data that's already there.
                    const tags = Array.from(new Set(d.posts.map((p) => p.pillar))).slice(0, 4);
                    return (
                    <Link
                      key={d.date}
                      to={`/tech-roundup/${d.date}`}
                      className="group bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 hover:border-m3-primary/30 hover:shadow-xl transition-all flex flex-col gap-3"
                    >
                      <div className="text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                        {formatDigestDate(d.date)} · {d.posts.length} stories
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-m3-primary/10 text-m3-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
              ))}
            </div>
          ) : activeCategory ? (
            <p className="text-m3-on-surface-variant font-medium">
              No roundups tagged "{activeCategory}" yet.{" "}
              <button type="button" onClick={clearFilter} className="text-m3-primary font-bold underline underline-offset-4">
                Clear the filter
              </button>
            </p>
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
