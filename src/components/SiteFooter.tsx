/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "../data/socials";

interface SiteFooterProps {
  className?: string;
}

/**
 * Shared, site-wide footer: signoff + subscribe CTA, Explore nav,
 * and a status/social baseline bar. Used identically on every page
 * so navigation and branding stay consistent across the site.
 */
export default function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer className={`bg-m3-surface border-t border-m3-outline/10 rounded-b-m3-xl md:rounded-b-[32px] ${className}`}>
      {/* Top tier — signoff, subscribe & nav */}
      <div className="px-6 md:px-14 pt-10 pb-8 flex flex-col md:flex-row md:items-start gap-8 md:gap-12 justify-between">
        <div className="max-w-sm">
          <p className="font-display text-base font-bold leading-snug text-m3-on-surface">
            The Daily Tech Roundup, distilled.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-m3-on-surface-variant font-medium">
            Build notes and the week&rsquo;s best tech, in one email. Free.
          </p>
          <a
            href="#build-notes"
            className="mt-4 inline-flex items-center gap-2 bg-m3-primary text-m3-on-primary font-display font-bold px-5 py-2.5 rounded-m3-full hover:m3-elevation-2 active:scale-95 transition-all text-sm tracking-wide"
          >
            Subscribe <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <nav className="flex flex-col gap-3">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] font-extrabold text-m3-on-surface-variant/50">
            Explore
          </span>
          <Link to="/tech-roundup" className="text-sm font-display font-bold text-m3-on-surface-variant hover:text-m3-primary transition-colors w-fit">
            Tech Roundup
          </Link>
          <Link to="/notes" className="text-sm font-display font-bold text-m3-on-surface-variant hover:text-m3-primary transition-colors w-fit">
            Notes
          </Link>
          <Link to="/about" className="text-sm font-display font-bold text-m3-on-surface-variant hover:text-m3-primary transition-colors w-fit">
            About
          </Link>
        </nav>
      </div>
      {/* Baseline bar — status, copyright & socials */}
      <div className="px-6 md:px-14 py-5 border-t border-m3-outline/10 flex flex-col md:flex-row items-center gap-5 justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-m3-primary animate-pulse" />
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-m3-primary">
              Live — shipping daily
            </span>
          </span>
          <span className="text-[10px] font-bold uppercase opacity-40 font-display">
            © 2026 builtbyswami
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {SOCIALS.map((s) => (
            <motion.a
              key={s.name}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`@builtbyswami on ${s.name}`}
              className="w-9 h-9 md:w-10 md:h-10 bg-m3-surface-variant text-m3-on-surface-variant rounded-full flex items-center justify-center hover:bg-m3-primary hover:text-m3-on-primary transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-[18px] md:h-[18px]" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
