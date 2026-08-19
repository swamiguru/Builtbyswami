/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { NOTES_SORTED, formatNoteDate, type Note } from "../data/notes";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const formatMonth = (key: string): string =>
  new Date(key + "-01T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

export default function Notes() {
  // Group notes by month (YYYY-MM) for the archive view. NOTES_SORTED is
  // already newest-first, and Map preserves insertion order, so months
  // come out newest-first with no extra sorting needed.
  const monthGroups = useMemo(() => {
    const map = new Map<string, Note[]>();
    for (const n of NOTES_SORTED) {
      const key = n.date.slice(0, 7);
      const list = map.get(key);
      if (list) list.push(n);
      else map.set(key, [n]);
    }
    return Array.from(map.entries());
  }, []);

  useEffect(() => {
    document.title = "Build Notes | Swami Guru";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Build notes by Swami Guru — the brief, the method and what broke, written after each product ships. Building in public with AI as a real tool."
      );
  }, []);

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <SiteHeader />

        <section className="px-6 md:px-14 pt-12 md:pt-16 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-m3-primary" />
            <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
              Build Notes
            </span>
          </div>
          <h1 className="display text-3xl md:text-5xl font-extrabold uppercase tracking-tighter text-m3-on-surface max-w-2xl leading-[0.95]">
            The wiring behind the builds
          </h1>
          <p className="mt-5 text-base md:text-lg font-medium text-m3-on-surface-variant max-w-xl leading-relaxed">
            Build notes from shipping solo — the brief, the method, and what broke. Written after each thing goes live, while the decisions are still fresh.
          </p>
        </section>

        <section className="px-6 md:px-14 pb-14 flex-1">
          {monthGroups.length > 0 ? (
            <div className="flex flex-col gap-10">
              {monthGroups.map(([month, items]) => (
                <div key={month} className="flex flex-col gap-4 md:gap-5">
                  <h2 className="font-display text-xs font-black uppercase tracking-[0.25em] text-m3-on-surface-variant/60">
                    {formatMonth(month)}
                  </h2>
                  {items.map((n) => (
                    <Link
                      key={n.slug}
                      to={`/notes/${n.slug}`}
                      className="group bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 hover:border-m3-primary/30 hover:shadow-xl transition-all flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant/60">
                        <span className="text-m3-primary">{n.tag}</span>
                        <span>{formatNoteDate(n.date)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {n.readMinutes} min
                        </span>
                      </div>
                      <h3 className="display text-xl md:text-2xl font-extrabold tracking-tight text-m3-on-surface group-hover:text-m3-primary transition-colors">
                        {n.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium max-w-2xl">
                        {n.description}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-m3-on-surface-variant font-medium">Notes are on the way — check back soon.</p>
          )}
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
