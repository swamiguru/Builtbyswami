/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Mail,
  BookOpen,
  Sparkles,
  Clock,
} from "lucide-react";
import { SOCIALS } from "../data/socials";
import { getLatestDigest, formatDigestDate, getTopCategories } from "../data/social";
import { getLatestWeeklyIssue } from "../data/weekly";
import { getLatestNotes, formatNoteDate } from "../data/notes";
import Carousel from "../components/Carousel";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import NewsletterSignup from "../components/NewsletterSignup";
import { useImageOrientation } from "../hooks/useImageOrientation";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

interface Video {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  thumbnail: string;
}

/**
 * The channel mixes landscape long-form videos and portrait Shorts, so
 * neither a fixed 16:9 nor 9:16 box is ever right for everything. This
 * measures the real thumbnail and sizes itself to match — and defers
 * mounting the YouTube iframe until the visitor actually clicks play, so
 * the embed's own chrome/loading weight isn't paid on every homepage visit.
 */
function FeaturedVideo({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const orientation = useImageOrientation(video.thumbnail);
  const isPortrait = orientation === "portrait";

  return (
    <div
      className={`rounded-[28px] overflow-hidden border border-m3-outline/10 bg-m3-surface shadow-sm ${
        isPortrait ? "max-w-[420px] mx-auto" : ""
      }`}
    >
      <div className={`relative bg-black ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}>
        {playing ? (
          <iframe
            className="w-full h-full"
            src={`${video.embedUrl}?autoplay=1`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className="group absolute inset-0 w-full h-full"
          >
            <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-1" />
              </div>
            </div>
          </button>
        )}
      </div>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 p-5 md:p-6 hover:bg-m3-surface-variant/40 transition-colors group"
      >
        <span className="flex-1 min-w-0 font-display font-bold text-sm md:text-base text-m3-on-surface line-clamp-2">
          {video.title}
        </span>
        <ArrowUpRight className="w-5 h-5 text-m3-on-surface-variant/50 group-hover:text-m3-primary shrink-0 transition-colors" />
      </a>
    </div>
  );
}

/** Rail card for the "Latest Videos" carousel — same orientation-matching
 * approach as FeaturedVideo, just sized down for a horizontal scroller. */
function VideoCard({ video }: { video: Video }) {
  const orientation = useImageOrientation(video.thumbnail);
  const isPortrait = orientation === "portrait";

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      role="listitem"
      className={`group snap-start shrink-0 bg-m3-surface rounded-[20px] border border-m3-outline/5 overflow-hidden hover:border-m3-primary/30 hover:shadow-xl transition-all ${
        isPortrait ? "w-[160px] md:w-[190px]" : "w-[240px] md:w-[280px]"
      }`}
    >
      <div className={`relative bg-black overflow-hidden ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}>
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-12 h-12 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="font-display font-bold text-sm text-m3-on-surface line-clamp-2 leading-snug">
          {video.title}
        </p>
      </div>
    </a>
  );
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/latest-videos")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("unavailable"))))
      .then((d) => {
        if (active && d && Array.isArray(d.videos)) setVideos(d.videos);
      })
      .catch(() => {
        /* fall back to the CTA card */
      });
    return () => {
      active = false;
    };
  }, []);

  const featured = videos[0] ?? null;
  const railVideos = videos.slice(1, 6);
  const latestDigest = getLatestDigest();
  const categories = getTopCategories();
  const latestIssue = getLatestWeeklyIssue();

  useEffect(() => {
    document.title = "Building products in public with AI | Swami Guru";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "11+ years scaling digital media products at world class brands, now building AI products solo, in public - Swami Guru"
      );
  }, []);

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        {/* 01 — Nav */}
        <SiteHeader />

        {/* 02 — The Daily Tech Roundup (LEAD) */}
        <section className="relative overflow-hidden px-6 md:px-14 pt-10 md:pt-16 pb-10 md:pb-14 bg-m3-surface">
          <div className="absolute top-0 right-0 w-96 h-96 bg-m3-primary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-m3-primary" />
                <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
                  The Daily Tech Roundup
                </span>
              </div>
              <Link
                to="/tech-roundup"
                className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
              >
                All roundups <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {latestDigest ? (
              <>
                <h1 className="display text-2xl md:text-4xl font-extrabold tracking-tighter text-m3-on-surface max-w-3xl leading-[1.05] mb-4">
                  {latestDigest.title}
                </h1>
                <p className="text-base md:text-lg text-m3-on-surface-variant font-medium max-w-2xl leading-relaxed mb-8">
                  {latestDigest.intro}
                </p>
                <div className="mb-5 text-[11px] font-bold uppercase tracking-widest text-m3-primary">
                  {formatDigestDate(latestDigest.date)} · today's five
                </div>
                <Carousel ariaLabel="Today's tech roundup">
                  {latestDigest.posts.map((p) => (
                    <Link
                      key={p.n}
                      to={`/tech-roundup/${latestDigest.date}#post-${p.n}`}
                      role="listitem"
                      className="group snap-start shrink-0 w-[280px] md:w-[340px] bg-m3-surface-variant/40 rounded-[24px] border border-m3-outline/5 overflow-hidden flex flex-col hover:bg-m3-surface hover:border-m3-primary/30 hover:shadow-xl transition-all"
                    >
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          className="w-full aspect-square object-cover"
                        />
                      )}
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-m3-primary">
                          {p.pillar}
                        </span>
                        <p className="text-[15px] leading-snug text-m3-on-surface font-bold line-clamp-4">
                          {p.hook}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-m3-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Read the take <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </>
            ) : (
              <div className="bg-m3-surface-variant/40 rounded-[24px] border border-m3-outline/5 p-8 flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <p className="font-display font-bold text-m3-on-surface mb-1">The daily roundup is coming online</p>
                  <p className="text-sm text-m3-on-surface-variant font-medium">
                    Fresh tech & AI stories will land here every day. In the meantime, follow along:
                  </p>
                </div>
                <div className="flex items-center gap-2">
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
              </div>
            )}

            {categories.length > 0 && (
              <div className="mt-8 pt-6 border-t border-m3-outline/10">
                <div
                  className="flex md:flex-wrap flex-nowrap items-center gap-2 overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0 pb-1 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  <span className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant/60 mr-1">
                    Browse
                  </span>
                  {categories.map(({ category, count }) => (
                    <Link
                      key={category}
                      to={`/tech-roundup?category=${encodeURIComponent(category)}`}
                      className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-m3-surface-variant/60 text-m3-on-surface hover:bg-m3-primary hover:text-m3-on-primary transition-colors"
                    >
                      {category} <span className="opacity-60">({count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 02b — Last Week's Tech Roundup (weekly issue teaser) */}
        <section className="px-6 md:px-14 py-10 md:py-12 bg-m3-surface border-t border-m3-outline/10">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-m3-primary" />
            <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
              Last Week's Tech Roundup
            </span>
          </div>

          {latestIssue ? (
            <a
              href="#build-notes"
              className="group flex flex-col md:flex-row bg-m3-secondary-container text-m3-on-secondary-container rounded-[28px] overflow-hidden hover:shadow-xl transition-all"
            >
              <img
                src={latestIssue.thumbnail}
                alt=""
                loading="lazy"
                className="w-full md:w-[320px] aspect-square object-cover shrink-0"
              />
              <div className="p-6 md:p-8 flex flex-col justify-center gap-3 flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-widest opacity-70">
                  Issue #{latestIssue.issueNumber} · {formatDigestDate(latestIssue.publishedDate)}
                </span>
                <h2 className="display text-xl md:text-2xl font-extrabold tracking-tight leading-snug">
                  {latestIssue.title}
                </h2>
                <p className="text-sm md:text-base font-medium opacity-80 leading-relaxed line-clamp-3 max-w-2xl">
                  {latestIssue.teaser}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                  Subscribe to read this issue <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ) : (
            <div className="bg-m3-surface-variant/40 rounded-[24px] border border-m3-outline/5 p-8">
              <p className="font-display font-bold text-m3-on-surface mb-1">First weekly issue coming soon</p>
              <p className="text-sm text-m3-on-surface-variant font-medium">
                Once the first Builtbyswami Weekly issue is live, the week's biggest stories will round up right here.
              </p>
            </div>
          )}
        </section>

        {/* 03 — Weekly digest (email capture) */}
        <section
          id="build-notes"
          className="bg-m3-secondary-container text-m3-on-secondary-container px-6 md:px-14 py-10 md:py-14"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-m3-primary" />
              <h2 className="display text-2xl md:text-3xl font-extrabold uppercase tracking-tight">
                Every day's five, one weekly digest
              </h2>
            </div>
            <p className="text-sm md:text-base font-medium opacity-80 mb-6 max-w-xl">
              I run Top 5 Daily all week — this is the distilled best of it, plus what I build in public as a solo founder. 11+ years building products at world class brands. Weekly-ish, free.
            </p>
            <NewsletterSignup />
          </div>
        </section>

        {/* 04 — Latest build (featured video) */}
        <section className="px-6 md:px-14 py-10 md:py-14 bg-m3-surface-variant border-y border-m3-outline/10">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-6">
            <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-primary">
              The Channel
            </span>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
            >
              All videos <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          {featured ? (
            <FeaturedVideo video={featured} />
          ) : (
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-[28px] overflow-hidden border border-m3-outline/10 bg-m3-secondary-container/40 aspect-video flex items-center justify-center shadow-sm hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-m3-primary/5 group-hover:bg-m3-primary/10 transition-colors" />
              <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                <div className="w-20 h-20 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <span className="font-display font-bold uppercase tracking-widest text-sm text-m3-on-surface">
                  Watch the latest drop on YouTube
                </span>
                <span className="text-xs font-medium text-m3-on-surface-variant/70 max-w-sm">
                  New teardown every week or two.
                </span>
              </div>
            </a>
          )}
        </section>

        {/* 05 — Latest Videos (carousel) */}
        {railVideos.length > 0 && (
          <section className="px-6 md:px-14 py-10 md:py-14 bg-m3-surface">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-8">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-m3-primary" />
                <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-on-surface">
                  Latest Videos
                </span>
              </div>
              <a
                href={YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
              >
                All videos <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <Carousel ariaLabel="Latest videos">
              {railVideos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </Carousel>
          </section>
        )}

        {/* 06 — Notes */}
        <section id="notes" className="px-6 md:px-14 py-12 md:py-16 bg-m3-surface-variant border-t border-m3-outline/10">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-m3-primary" />
              <span className="font-display text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-m3-on-surface">
                Notes
              </span>
            </div>
            <Link
              to="/notes"
              className="text-[11px] font-bold uppercase tracking-widest text-m3-on-surface-variant hover:text-m3-primary transition-colors flex items-center gap-1"
            >
              All notes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {getLatestNotes(3).map((note) => (
              <Link
                key={note.slug}
                to={`/notes/${note.slug}`}
                className="group bg-m3-surface rounded-[28px] border border-m3-outline/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-6 hover:border-m3-primary/30 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-[16px] bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-m3-primary mb-2">
                    {note.tag} · {note.readMinutes} min read · {formatNoteDate(note.date)}
                  </div>
                  <h3 className="display text-lg md:text-xl font-extrabold tracking-tight text-m3-on-surface mb-2 group-hover:text-m3-primary transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium max-w-xl line-clamp-2">
                    {note.description}
                  </p>
                </div>
                <span className="m3-button-tonal text-sm tracking-wide whitespace-nowrap flex items-center gap-2 shrink-0">
                  Read <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 09 — About teaser */}
        <section className="px-6 md:px-14 py-5 md:py-7 bg-m3-primary text-m3-on-primary">
          <div className="max-w-3xl">
            <span className="font-display text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-extrabold text-m3-on-primary/60 mb-2 block">
              The operator behind the builds
            </span>
            <h2 className="display text-xl md:text-[1.75rem] font-bold tracking-tighter leading-[0.95] mb-4">
              11 years, three global media companies, $20M+ scaled — now an AI product builder shipping solo from Bengaluru.
            </h2>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-m3-surface text-m3-on-surface font-display font-bold px-6 py-2.5 rounded-m3-full hover:m3-elevation-2 active:scale-95 transition-all text-sm tracking-wide"
            >
              The full story <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 10 — Footer */}
        <SiteFooter />
      </div>
    </div>
  );
}
