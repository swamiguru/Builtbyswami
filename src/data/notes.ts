/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Raw markdown is imported at build time via Vite's ?raw suffix.
import sprintPost from "../content/notes/24-hour-task-manager-sprint.md?raw";
import freeWordToolPost from "../content/notes/freewordtool-one-day-sprint.md?raw";
import builtBySwamiOriginPost from "../content/notes/why-i-built-builtbyswami-from-scratch.md?raw";
import addaPost from "../content/notes/adda-a-product-with-no-job.md?raw";

export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  tag: string;
  videoUrl?: string;
  ctaUrl?: string;
  ctaLabel?: string;
  content: string;
}

export const NOTES: Note[] = [
  {
    slug: "adda-a-product-with-no-job",
    title: "I built a product with no job to do",
    description:
      "Adda plays a city's songs under its own sky and its own clock. Twenty-four deploys in four hours — and the only thing that broke loudly was the cheapest thing to fix.",
    date: "2026-08-11",
    readMinutes: 5,
    tag: "Build-in-public",
    ctaUrl: "https://adda.builtbyswami.com",
    ctaLabel: "Open Adda",
    content: addaPost,
  },
  {
    slug: "why-i-built-builtbyswami-from-scratch",
    title:
      "Why I Built My Own Brand From Scratch — And What It Taught Me About Building Products in the AI Era",
    description:
      "After Condé Nast made my role redundant, I built a website, a newsletter, and a daily habit — and used AI as a real tool, not a buzzword, the whole way through.",
    date: "2026-07-23",
    readMinutes: 5,
    tag: "Build-in-public",
    ctaUrl: "https://builtbyswami.beehiiv.com/",
    ctaLabel: "Subscribe to Builtbyswami Weekly",
    content: builtBySwamiOriginPost,
  },
  {
    slug: "24-hour-task-manager-sprint",
    title: "I built a task manager from zero in 24 hours with AI",
    description:
      "A solo, single-cycle build of a working task-management engine — the method, what broke, and why LLM context is the new foundational code.",
    date: "2026-07-12",
    readMinutes: 4,
    tag: "Build-in-public",
    videoUrl: "https://www.youtube.com/@builtbyswami",
    content: sprintPost,
  },
  {
    slug: "freewordtool-one-day-sprint",
    title: "I built a word counter in one day — and it almost turned into five products",
    description:
      "A one-day, eight-commit build of a privacy-first word counter — the brief, the method, and the scope creep I had to catch mid-sprint.",
    date: "2026-07-13",
    readMinutes: 4,
    tag: "Build-in-public",
    ctaUrl: "https://www.freewordtool.com/",
    ctaLabel: "Try Free Word Tool",
    content: freeWordToolPost,
  },
];

export const getNote = (slug: string): Note | undefined =>
  NOTES.find((n) => n.slug === slug);

// Newest-first, regardless of how NOTES is authored above — used for the
// archive listing and prev/next navigation on individual note pages.
export const NOTES_SORTED: Note[] = [...NOTES].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const getLatestNotes = (n = 3): Note[] =>
  [...NOTES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);

export const formatNoteDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
