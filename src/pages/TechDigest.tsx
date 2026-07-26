/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DIGESTS, getDigest, formatDigestDate } from "../data/social";
import { SOCIALS } from "../data/socials";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

export default function TechDigest() {
  const { date } = useParams<{ date: string }>();
  const digest = date ? getDigest(date) : undefined;

  // DIGESTS is sorted newest-first, so the older roundup sits at index + 1
  // and the newer one at index - 1.
  const index = digest ? DIGESTS.findIndex((d) => d.date === digest.date) : -1;
  const older = index >= 0 ? DIGESTS[index + 1] : undefined;
  const newer = index > 0 ? DIGESTS[index - 1] : undefined;

  useEffect(() => {
    if (digest) {
      document.title = `${digest.title} | Tech Roundup`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", digest.intro);
    }
  }, [digest]);

  if (!digest) return <Navigate to="/tech-roundup" replace />;

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <SiteHeader />

        {/* Contextual sub-nav: sits just under the sticky site header,
            so it stacks rather than overlaps when both are pinned. */}
        <div className="h-12 md:h-14 border-b border-m3-outline/20 flex items-center justify-between px-6 md:px-10 bg-m3-surface/80 backdrop-blur-md sticky top-[70px] md:top-[88px] z-20">
          <Link to="/tech-roundup" className="font-display font-bold text-sm text-m3-on-surface hover:text-m3-primary transition-colors">
            ← Tech Roundup
          </Link>
          <div className="flex items-center gap-1">
            {older ? (
              <Link
                to={`/tech-roundup/${older.date}`}
                aria-label={`Previous roundup: ${formatDigestDate(older.date)}`}
                title={`Previous: ${formatDigestDate(older.date)}`}
                className="w-9 h-9 rounded-full flex items-center justify-center text-m3-on-surface-variant hover:text-m3-primary hover:bg-m3-surface-variant/60 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            ) : (
              <span className="w-9 h-9 flex items-center justify-center text-m3-on-surface-variant/20">
                <ArrowLeft className="w-4 h-4" />
              </span>
            )}
            {newer ? (
              <Link
                to={`/tech-roundup/${newer.date}`}
                aria-label={`Next roundup: ${formatDigestDate(newer.date)}`}
                title={`Next: ${formatDigestDate(newer.date)}`}
                className="w-9 h-9 rounded-full flex items-center justify-center text-m3-on-surface-variant hover:text-m3-primary hover:bg-m3-surface-variant/60 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="w-9 h-9 flex items-center justify-center text-m3-on-surface-variant/20">
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>

        <article className="max-w-[820px] mx-auto px-6 md:px-14 py-10 md:py-16">
          <div className="text-[11px] font-bold uppercase tracking-widest text-m3-primary mb-5">
            {formatDigestDate(digest.date)} · {digest.posts.length} stories
          </div>
          <h1 className="display text-3xl md:text-5xl font-extrabold tracking-tighter text-m3-on-surface leading-[1.02] mb-6">
            {digest.title}
          </h1>
          <p className="text-base md:text-lg text-m3-on-surface-variant font-medium leading-relaxed mb-12">
            {digest.intro}
          </p>

          {digest.cover && (
            <img
              src={digest.cover}
              alt=""
              loading="lazy"
              className="w-full rounded-[24px] border border-m3-outline/10 mb-12"
            />
          )}

          <div className="flex flex-col gap-8">
            {digest.posts.map((p) => (
              <div
                key={p.n}
                id={`post-${p.n}`}
                className="bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 scroll-mt-24 md:scroll-mt-28"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="w-full max-w-[420px] rounded-[16px] border border-m3-outline/10 mb-5"
                  />
                )}
                <div className="mb-4">
                  <span className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-m3-primary">
                    {String(p.n).padStart(2, "0")} · {p.pillar}
                  </span>
                </div>
                <h2 className="display text-xl md:text-2xl font-extrabold tracking-tight text-m3-on-surface mb-3 leading-snug">
                  {p.hook}
                </h2>
                {p.problem && p.breakthrough && p.catch && p.forYou ? (
                  <div className="flex flex-col gap-4 text-[15px] md:text-base leading-relaxed text-m3-on-surface-variant font-medium">
                    <p><strong className="text-m3-on-surface">The problem:</strong> {p.problem}</p>
                    <p><strong className="text-m3-on-surface">The breakthrough:</strong> {p.breakthrough}</p>
                    <p><strong className="text-m3-on-surface">The catch:</strong> {p.catch}</p>
                    <p><strong className="text-m3-on-surface">For you:</strong> {p.forYou}</p>
                  </div>
                ) : (
                  <p className="text-[15px] md:text-base leading-relaxed text-m3-on-surface-variant font-medium">
                    {p.body}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-m3-on-surface-variant">Catch these live as I post them:</span>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`@builtbyswami on ${s.name}`}
                className="w-10 h-10 bg-m3-surface text-m3-on-surface-variant rounded-full flex items-center justify-center hover:bg-m3-primary hover:text-m3-on-primary transition-colors shadow-sm border border-m3-outline/10"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </article>

        {(older || newer) && (
          <nav
            aria-label="Roundup navigation"
            className="max-w-[820px] mx-auto px-6 md:px-14 pb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {older ? (
              <Link
                to={`/tech-roundup/${older.date}`}
                className="group bg-m3-surface rounded-[20px] border border-m3-outline/5 p-5 md:p-6 hover:border-m3-primary/30 hover:shadow-lg transition-all flex flex-col gap-2"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous · {formatDigestDate(older.date)}
                </span>
                <span className="font-display font-bold text-sm md:text-base text-m3-on-surface line-clamp-2 group-hover:text-m3-primary transition-colors">
                  {older.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {newer ? (
              <Link
                to={`/tech-roundup/${newer.date}`}
                className="group bg-m3-surface rounded-[20px] border border-m3-outline/5 p-5 md:p-6 hover:border-m3-primary/30 hover:shadow-lg transition-all flex flex-col gap-2 md:items-end md:text-right"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant flex items-center gap-1.5 md:flex-row-reverse">
                  Next · {formatDigestDate(newer.date)} <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-display font-bold text-sm md:text-base text-m3-on-surface line-clamp-2 group-hover:text-m3-primary transition-colors">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}

        <SiteFooter />
      </div>
    </div>
  );
}
