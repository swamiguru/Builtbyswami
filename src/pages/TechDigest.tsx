/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DIGESTS, getDigest, formatDigestDate } from "../data/social";
import { SOCIALS } from "../data/socials";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ScrollProgress from "../components/ScrollProgress";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

// Compact date for the sub-nav pills — "Jul 27" rather than formatDigestDate's
// full "July 27, 2026", so "Previous · Jul 27" still fits a 48px-tall bar.
const formatShortDate = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export default function TechDigest() {
  const { date } = useParams<{ date: string }>();
  const digest = date ? getDigest(date) : undefined;
  const shouldReduceMotion = useReducedMotion();

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
      <ScrollProgress />
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <SiteHeader />

        {/* Contextual sub-nav */}
        <div className="h-12 md:h-14 border-b border-m3-outline/20 flex items-center justify-between px-6 md:px-10 bg-m3-surface/60">
          <Link to="/tech-roundup" className="font-display font-bold text-sm text-m3-on-surface hover:text-m3-primary transition-colors">
            ← Tech Roundup
          </Link>
          <div className="flex items-center gap-1">
            {older ? (
              <Link
                to={`/tech-roundup/${older.date}`}
                aria-label={`Previous roundup: ${formatDigestDate(older.date)}`}
                title={`Previous roundup: ${formatDigestDate(older.date)}`}
                className="h-9 pl-2 pr-3 rounded-full flex items-center gap-1 text-m3-on-surface-variant hover:text-m3-primary hover:bg-m3-surface-variant/60 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
                  Previous · {formatShortDate(older.date)}
                </span>
                <span className="text-xs font-bold whitespace-nowrap sm:hidden">
                  {formatShortDate(older.date)}
                </span>
              </Link>
            ) : (
              <span className="h-9 pl-2 pr-3 flex items-center gap-1 text-m3-on-surface-variant/20">
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">Previous</span>
              </span>
            )}
            {newer ? (
              <Link
                to={`/tech-roundup/${newer.date}`}
                aria-label={`Next roundup: ${formatDigestDate(newer.date)}`}
                title={`Next roundup: ${formatDigestDate(newer.date)}`}
                className="h-9 pr-2 pl-3 rounded-full flex items-center gap-1 text-m3-on-surface-variant hover:text-m3-primary hover:bg-m3-surface-variant/60 transition-colors"
              >
                <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
                  Next · {formatShortDate(newer.date)}
                </span>
                <span className="text-xs font-bold whitespace-nowrap sm:hidden">
                  {formatShortDate(newer.date)}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            ) : (
              <span className="h-9 pr-2 pl-3 flex items-center gap-1 text-m3-on-surface-variant/20">
                <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">Next</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
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
            {digest.posts.map((p, i) => (
              <motion.div
                key={p.n}
                id={`post-${p.n}`}
                className="bg-m3-surface rounded-[24px] border border-m3-outline/5 p-6 md:p-8 scroll-mt-24 md:scroll-mt-28"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.3, 1] }}
              >
                {p.image && (
                  <div
                    className="group relative w-full max-w-[420px] overflow-hidden rounded-[16px] border border-m3-outline/10 mb-5"
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
                      e.currentTarget.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
                    }}
                  >
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Vignette — darkens the corners so the card reads as a
                        lit editorial frame rather than a flat crop. Always on. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(130% 130% at 50% 35%, transparent 45%, rgba(0,0,0,.5) 100%)",
                      }}
                    />
                    {/* Film grain — faint noise over the dark panel for texture. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        backgroundSize: "140px 140px",
                      }}
                    />
                    {/* Cursor-follow spotlight — desktop only. */}
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,.35), transparent 60%)",
                        mixBlendMode: "overlay",
                      }}
                    />
                    {/* Twinkling sparkles — aligned to the icon tile icons.py
                        bakes into this same corner of the card art. */}
                    <span
                      aria-hidden="true"
                      className="absolute text-cyan-400 text-[13px] leading-none pointer-events-none animate-[sparkle-twinkle_2.6s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-60"
                      style={{ left: "62%", top: "60%" }}
                    >
                      ✦
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute text-white text-[9px] leading-none pointer-events-none animate-[sparkle-twinkle_2.6s_ease-in-out_infinite] [animation-delay:0.9s] motion-reduce:animate-none motion-reduce:opacity-60"
                      style={{ left: "91%", top: "73%" }}
                    >
                      ✦
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute text-cyan-400 text-[8px] leading-none pointer-events-none animate-[sparkle-twinkle_2.6s_ease-in-out_infinite] [animation-delay:1.7s] motion-reduce:animate-none motion-reduce:opacity-60"
                      style={{ left: "73%", top: "92%" }}
                    >
                      ✦
                    </span>
                  </div>
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
              </motion.div>
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

        {/* Who writes this.
            The daily roundup is read by consumer-tech readers, not by anyone
            shopping for a product lead, so a consulting CTA here would convert
            nothing and cheapen the piece. This is curiosity instead: it says
            who wrote it and gets out of the way. /about carries the consulting
            link for the small share who follow it. */}
        <aside className="max-w-[820px] mx-auto px-6 md:px-14 pb-8">
          <Link
            to="/about"
            className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 bg-m3-surface rounded-[24px] border border-m3-outline/5 p-5 md:p-6 hover:border-m3-primary/30 hover:shadow-lg transition-all"
          >
            <span className="w-12 h-12 shrink-0 rounded-full bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center font-display font-black text-lg">
              S
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-display font-bold text-sm md:text-base text-m3-on-surface">
                Written by Swami
              </span>
              <span className="block text-sm text-m3-on-surface-variant font-medium leading-relaxed">
                11 years in product at Vogue, GQ and Wired. Now building and
                shipping solo from Bengaluru.
              </span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant group-hover:text-m3-primary transition-colors flex items-center gap-1 shrink-0">
              More <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </aside>

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
