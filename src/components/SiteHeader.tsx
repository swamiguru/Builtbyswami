/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import NewsletterSignup from "./NewsletterSignup";
import NewsletterStrip from "./NewsletterStrip";

const YOUTUBE = "https://www.youtube.com/@builtbyswami";

interface NavItem {
  label: string;
  to: string;
  external?: boolean;
}

const NAV: NavItem[] = [
  { label: "Tech Roundup", to: "/tech-roundup" },
  { label: "The Channel", to: YOUTUBE, external: true },
  { label: "Notes", to: "/notes" },
  { label: "The Work", to: "/about" },
];

/**
 * Shared, responsive site header: brand lockup + desktop nav on md+,
 * and a hamburger dropdown on small screens so nav is reachable on mobile.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const subscribeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!subscribeOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        subscribeRef.current &&
        !subscribeRef.current.contains(e.target as Node)
      ) {
        setSubscribeOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubscribeOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [subscribeOpen]);

  const renderItem = (item: NavItem, className: string) =>
    item.external ? (
      <a
        key={item.label}
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={close}
      >
        {item.label}
      </a>
    ) : (
      <Link key={item.label} to={item.to} className={className} onClick={close}>
        {item.label}
      </Link>
    );

  const desktopLink =
    "px-4 py-2.5 hover:bg-m3-surface-variant text-m3-on-surface rounded-m3-full transition-all";
  const mobileLink =
    "px-4 py-3 rounded-m3-lg hover:bg-m3-surface-variant text-m3-on-surface transition-all";

  return (
    <>
      <header className="sticky top-0 z-30 bg-m3-surface/80 backdrop-blur-md border-b border-m3-outline/20">
        <div className="h-[70px] md:h-[88px] flex items-center justify-between px-6 md:px-10">
          <BrandLogo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 md:gap-3 font-display font-bold text-sm">
            {NAV.map((item) => renderItem(item, desktopLink))}
            <div className="relative" ref={subscribeRef}>
              <button
                type="button"
                onClick={() => setSubscribeOpen((o) => !o)}
                aria-expanded={subscribeOpen}
                aria-haspopup="true"
                className="px-5 py-2.5 bg-m3-primary text-m3-on-primary rounded-m3-full hover:m3-elevation-1-shadow active:scale-95 transition-all shadow-sm"
              >
                Newsletter
              </button>
              {subscribeOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[320px] max-w-[calc(100vw-3rem)] bg-m3-surface border border-m3-outline/10 rounded-[20px] shadow-xl p-5 z-40">
                  <p className="font-display font-bold text-sm text-m3-on-surface mb-1">
                    Every day's five, one weekly digest
                  </p>
                  <p className="text-xs text-m3-on-surface-variant font-medium mb-4">
                    Weekly-ish, free. Unsubscribe anytime.
                  </p>
                  <NewsletterSignup stacked />
                </div>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-m3-surface-variant text-m3-on-surface transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <nav className="md:hidden border-t border-m3-outline/10 bg-m3-surface px-4 py-4 flex flex-col gap-1 font-display font-bold text-base">
            {NAV.map((item) => renderItem(item, mobileLink))}
            <div className="mt-3 pt-4 border-t border-m3-outline/10">
              <p className="px-4 font-display font-bold text-sm text-m3-on-surface mb-1">
                Every day's five, one weekly digest
              </p>
              <p className="px-4 text-xs text-m3-on-surface-variant font-medium mb-4">
                Weekly-ish, free. Unsubscribe anytime.
              </p>
              <div className="px-4">
                <NewsletterSignup stacked />
              </div>
            </div>
          </nav>
        )}
      </header>
      <NewsletterStrip />
    </>
  );
}
