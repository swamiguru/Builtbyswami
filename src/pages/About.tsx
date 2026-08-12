/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  MapPin,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  MessageSquare,
  X,
  Globe,
  Code2,
  ArrowUp,
  Timer,
  Award,
  ShieldCheck,
  Rocket,
  BookOpen
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { askAssistant } from "../services/geminiService";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

// --- Types ---

interface Highlight {
  title: string;
  detail: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  website: string;
  context?: string;
  current?: boolean;
  impact: string[];
  highlights: Highlight[];
  technologies: string[];
}

interface BuildItem {
  name: string;
  status: string;
  detail: string;
  url?: string;
  icon: any;
}

// --- Data ---

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "BuiltBySwami",
    role: "Independent Product Builder",
    location: "Bengaluru",
    period: "May 2026 – Present",
    website: "https://www.builtbyswami.com",
    context: "Solo, AI-native product building — strategy through shipped code",
    current: true,
    impact: [
      "Shipped three live products solo — BuiltBySwami.com, Free Word Tool and Adda.",
      "Took a full task-management engine from empty repo to working app in 24 hours.",
      "Built and instrumented a daily-publishing content platform end to end.",
      "Ran a self-initiated portfolio audit for a major global media brand."
    ],
    highlights: [
      {
        title: "End-to-End Product Ownership",
        detail:
          "Conceived and shipped BuiltBySwami.com from scratch post–Condé Nast — defining audience, content, and distribution strategy across site, newsletter, and social before writing code. Built with React, TypeScript, Vite and Tailwind using AI tools as build partners, then instrumented GA4, GTM and Search Console to drive an ongoing publish-measure-iterate loop."
      },
      {
        title: "Solo AI-Native Build",
        detail:
          "Took Free Word Tool from brief to live production in a single one-day sprint — scoping six target user segments from editorial and platform experience, directing AI tools through execution, and catching and reversing mid-build scope creep to ship one focused, privacy-first tool (fully client-side, no data upload) instead of an unfocused bundle."
      },
      {
        title: "24-Hour AI-Native Sprint",
        detail:
          "Took a full task-management engine — data modeling, state, persistence, UI — from empty repo to a working app in 24 hours, solo. Wrote the product context and brief upfront, then directed AI tools through execution in tight build-review loops."
      },
      {
        title: "Portfolio Audit",
        detail:
          "Conducted a self-initiated portfolio audit across Editorial, Audience, Commerce and SEO for a major global media brand."
      }
    ],
    technologies: ["React", "TypeScript", "AI-Native Delivery", "GA4 / GTM", "Technical SEO", "Content Strategy"]
  },
  {
    company: "Condé Nast",
    role: "Senior Product Manager",
    location: "Bengaluru",
    period: "May 2022 – Apr 2026",
    website: "https://www.condenast.com",
    context: "Vogue · GQ · Wired · Condé Nast Traveller · Architectural Digest — US, EMEA, LATAM, APAC, Middle East",
    impact: [
      "Built $20M+ in net-new revenue through new-market entries.",
      "Cut prototyping cycles 30% and time-to-market 50% with AI-native delivery.",
      "Drove a 30% audience lift and $800K incremental revenue via tentpole launches.",
      "Executed platform migrations with 100% SEO integrity and zero revenue loss."
    ],
    highlights: [
      {
        title: "Market Expansion",
        detail:
          "Launched Vogue, GQ and Wired in the Middle East and Condé Nast Traveller in Germany — new-market entries that were the core driver of the $20M+ net-new revenue build, opening new advertising, subscription and partnership channels in each market."
      },
      {
        title: "Revenue Growth & P&L",
        detail:
          "Owned the P&L for new revenue lines, directing the full-cycle launch of monetisation channels including the Architectural Digest Directory ($300K), the Condé Nast Traveller and Abercrombie & Kent booking partnership ($650K), and Traveller Secret Homestays with Airbnb and Booking.com."
      },
      {
        title: "AI-Native Product Delivery",
        detail:
          "Operationalised AI tools and solutions across the product lifecycle — from discovery to shipped MVP — cutting prototyping cycles 30% and time-to-market 50%, validating product bets with users before committing engineering."
      },
      {
        title: "Audience Growth & Engagement",
        detail:
          "Led global tentpole product launches — Vogue Met Gala and GQ Men of the Year — and A/B tested editorial storytelling formats to drive a 30% audience lift, a 24% increase in time on page, and $800K incremental revenue."
      },
      {
        title: "Frontend & Sponsor UX",
        detail:
          "Designed and shipped interactive sponsor modules and new editorial storytelling formats to elevate the reading experience — driving an 8% lift in sponsorship revenue and a 12% increase in time spent on site."
      },
      {
        title: "Platform Growth",
        detail:
          "Orchestrated the migration of Condé Nast Traveller Spain and LATAM onto a unified Spanish-language platform, growing reach to 56.6M unique users with projected revenue growth of $1.3M by 2027."
      },
      {
        title: "Technical SEO & Migration",
        detail:
          "Executed large-scale platform migrations for Vogue, GQ, Wired and Architectural Digest with 100% SEO integrity and zero revenue loss, leading cross-functional Agile squads across Engineering and Design."
      },
      {
        title: "Team Leadership & Mentorship",
        detail:
          "Managed and mentored two junior product managers, establishing shared discovery and delivery standards and growing their ownership of features across regional squads."
      }
    ],
    technologies: ["Enterprise CMS", "Generative AI", "Technical SEO", "Global Migrations", "P&L Ownership", "A/B Testing"]
  },
  {
    company: "Condé Nast",
    role: "Product Manager, GQ",
    location: "Bengaluru",
    period: "Oct 2020 – Apr 2022",
    website: "https://www.gq.com",
    context: "Promoted to Senior Product Manager, May 2022",
    impact: [
      "Owned the product roadmap for GQ's 10 global digital properties.",
      "Drove a 30% audience lift and $500K incremental revenue.",
      "Migrated GQ to a unified global CMS with zero SEO or ad-revenue loss.",
      "Lifted PLP click-through 7% and on-page engagement 6%."
    ],
    highlights: [
      {
        title: "Global Roadmap Ownership",
        detail:
          "Owned the product roadmap for GQ's 10 global digital properties — writing PRDs and user stories and defining feature priorities across Editorial, Commercial and Engineering."
      },
      {
        title: "Frontend & Editorial UX",
        detail:
          "Shaped shoppable-editorial and storytelling UX components across GQ's global properties and scaled affiliate commerce (Amazon Associates, Skimlinks) across PLPs — lifting on-page engagement 6% via recirculation component clicks, CTR 7% on redesigned PLP layouts, and opening new revenue channels through improved on-page monetisation."
      },
      {
        title: "Audience Growth & Engagement",
        detail:
          "Delivered GQ Men of the Year, GQ Sports and FIFA World Cup 2022 activations — driving a 30% audience lift and $500K incremental revenue."
      },
      {
        title: "Platform Migration",
        detail:
          "Led GQ's migration to a unified global CMS across four regional teams with zero SEO degradation and zero ad-revenue disruption."
      }
    ],
    technologies: ["Roadmap Ownership", "PRDs & User Stories", "Affiliate Commerce", "CMS Migration", "Shoppable Editorial"]
  },
  {
    company: "Newsweek",
    role: "Product Manager",
    location: "Bengaluru",
    period: "Jan 2018 – Oct 2020",
    website: "https://www.newsweek.com",
    context: "Digital properties reaching 50M+ monthly unique visitors",
    impact: [
      "Owned the roadmap for platforms serving 50M+ monthly unique visitors.",
      "Drove a 17% traffic lift through the Newsgeek brand redesign.",
      "Lifted article engagement 14% with a new on-page module.",
      "Delivered a zero-downtime CMS migration with 100% site authority preserved."
    ],
    highlights: [
      {
        title: "Brand Redesign & Engagement",
        detail:
          "Led the Newsgeek brand redesign end-to-end, from user research to launch, driving a 17% traffic lift and a 14% uplift in article engagement via a new on-page engagement module."
      },
      {
        title: "Platform Scale",
        detail:
          "Owned the roadmap for digital properties reaching 50M+ monthly unique visitors, balancing Editorial, Sales and Engineering priorities in an Agile environment."
      },
      {
        title: "Zero-Downtime CMS Migration",
        detail:
          "Directed an enterprise CMS migration with Technical SEO teams, preserving 100% site authority and ad-revenue continuity throughout the transition."
      }
    ],
    technologies: ["Enterprise CMS", "Technical SEO", "Ad Tech", "User Research", "Agile / Scrum"]
  },
  {
    company: "Metro International",
    role: "Global Product Manager",
    location: "Gurugram",
    period: "Apr 2015 – Dec 2017",
    website: "https://www.metro.lu",
    impact: [
      "Built and launched a new CMS from scratch in 3 months.",
      "Generated $850K in incremental revenue for Metro US.",
      "Delivered a 7% traffic increase through a global site redesign.",
      "Lifted article engagement 11% across international properties."
    ],
    highlights: [
      {
        title: "CMS Build & Revenue",
        detail:
          "Scoped, built and launched a brand-new CMS from scratch in three months using Agile delivery — generating $850K in incremental revenue for Metro US."
      },
      {
        title: "Website Redesign & Engagement",
        detail:
          "Led Metro International's global website redesign, delivering a 7% traffic increase and an 11% uplift in article engagement."
      },
      {
        title: "Roadmap & Discovery",
        detail:
          "Defined the product discovery process and roadmap with Editorial, Development and Commercial — translating business vision into shipped product."
      }
    ],
    technologies: ["CMS Architecture", "Agile Delivery", "Product Discovery", "Global Roadmap"]
  },
  {
    company: "Stigasoft",
    role: "Global Service Desk Manager",
    location: "Global",
    period: "Dec 2009 – Mar 2015",
    website: "https://www.stigasoft.com",
    context: "Global service desk operations for Metro International's online news portals",
    impact: [
      "Ran global service desk operations across 12 digital news portals.",
      "Supported a daily readership of 18.4M across US, LATAM and Europe.",
      "Maintained 99.9% uptime for core platform services.",
      "Trained editorial staff across markets on CMS and online news operations."
    ],
    highlights: [
      {
        title: "Global Service Desk Operations",
        detail:
          "Managed Global Service Desk Operations for Metro International, delivering exceptional service across its various online news portals."
      },
      {
        title: "Platform & App Management",
        detail:
          "Oversaw backend CMS, mobile sites and app management, ensuring seamless user experiences."
      },
      {
        title: "Stakeholder & Vendor Coordination",
        detail:
          "Coordinated with stakeholders and third-party vendors to implement social media integrations and advertisement management."
      },
      {
        title: "Editorial Enablement",
        detail:
          "Developed strong training programmes for editorial staff, enhancing their proficiency in CMS and online news operations."
      }
    ],
    technologies: ["Service Desk Operations", "Backend CMS", "Mobile & App Support", "Vendor Management", "Editorial Training"]
  }
];

const BUILDS: BuildItem[] = [
  {
    name: "BuiltBySwami.com",
    status: "Live",
    detail:
      "A daily-publishing tech platform built from scratch — strategy, site, newsletter and social. React, TypeScript, Vite, Tailwind, instrumented with GA4 and GTM.",
    url: "https://www.builtbyswami.com",
    icon: Globe
  },
  {
    name: "Free Word Tool",
    status: "Live",
    detail:
      "A privacy-first, fully client-side writing utility taken from brief to production in a single one-day sprint. Six user segments scoped; scope creep caught and reversed mid-build.",
    url: "https://freewordtool.com",
    icon: Code2
  },
  {
    name: "अड्डा — Adda",
    status: "Live",
    detail:
      "Pick a city and hear its songs, under its own sky and its own clock. Delhi first — 31 tracks at India Gate, golden hour.",
    url: "https://adda.builtbyswami.com",
    icon: Sparkles
  },
  {
    name: "Task Management Engine",
    status: "24-hour sprint",
    detail:
      "Data modeling, state, persistence and UI from empty repo to working app in 24 hours, solo. Private build — not published to the Play Store.",
    icon: Timer
  }
];

const COMPETENCIES = [
  "Product Vision & Strategy",
  "AI/ML Product Strategy",
  "Generative AI",
  "Audience Growth & Engagement",
  "P&L / Revenue Ownership",
  "Monetisation Strategy",
  "Product Discovery",
  "Experimentation & A/B Testing",
  "MVP Definition",
  "Roadmap Planning",
  "Go-to-Market Strategy",
  "KPIs & Product Metrics",
  "PRDs & User Stories",
  "CMS Architecture",
  "Technical SEO",
  "Core Platform",
  "Cross-Functional Leadership",
  "Stakeholder Management",
  "Agile / Scrum / OKRs",
  "Localisation & Market Expansion"
];

const TOOLS = [
  {
    group: "AI / LLM",
    items: ["Gemini", "ChatGPT", "Claude", "Claude Code", "Claude Design", "Cursor", "NotebookLM", "Atlassian Rovo", "Figma"]
  },
  {
    group: "Analytics & Data",
    items: ["GA4", "Google Tag Manager", "Snowplow", "Databricks", "A/B Testing"]
  },
  {
    group: "Platforms & CMS",
    items: ["WordPress VIP", "Drupal", "Proprietary CMS", "Android Studio", "Kotlin / Jetpack Compose"]
  },
  {
    group: "Monetisation & Ad Tech",
    items: ["Google Ad Manager", "Affiliate Revenue", "Subscriptions", "Commerce Partnerships"]
  },
  {
    group: "Collaboration",
    items: ["Jira", "Confluence", "Figma", "Notion", "Trello", "Slack"]
  }
];

const AI_PROOF = [
  {
    metric: "50%",
    label: "Time-to-market",
    detail:
      "Operationalised AI across the product lifecycle at Condé Nast — from discovery to shipped MVP — halving time-to-market on global property deployments.",
    icon: Zap
  },
  {
    metric: "30%",
    label: "Prototyping cycles",
    detail:
      "Cut prototyping cycles by validating product bets with users before committing engineering resource, not after.",
    icon: Rocket
  },
  {
    metric: "24 hrs",
    label: "Repo to working app",
    detail:
      "A full task-management engine built solo in a single day by writing the product context upfront and directing AI tools in tight build-review loops.",
    icon: Timer
  }
];

const CREDENTIALS = [
  { title: "Certified Scrum Product Owner® (CSPO)", issuer: "Scrum Alliance", icon: Award },
  { title: "Advanced Diploma in Software Engineering", issuer: "APTECH Education", icon: BookOpen }
];

export default function About() {
  useEffect(() => {
    document.title = "Swami Guru | Senior Product Leader & AI-Native Product Builder";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Swami Guru — Senior Product Leader and independent product builder. 11+ years in product scaling audience, engagement and revenue for Vogue, GQ, Wired, Condé Nast Traveller, Architectural Digest and Newsweek. $20M+ net-new revenue built."
      );
  }, []);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrambledTitle, setScrambledTitle] = useState("PRODUCT");
  const [scrambledBuilder, setScrambledBuilder] = useState("BUILDER");

  useEffect(() => {
    const triggerScramble = (target: string, setter: (val: string) => void) => {
      let iterations = 0;
      const chars = "01/_*<>[]{}$&#!%";
      const interval = setInterval(() => {
        setter(target.split("").map((_, i) => {
            if (i < Math.floor(iterations)) return target[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        iterations += 0.3;
        if (iterations > target.length) clearInterval(interval);
      }, 40);
    };

    const interval = setInterval(() => {
      triggerScramble("PRODUCT", setScrambledTitle);
      setTimeout(() => triggerScramble("BUILDER", setScrambledBuilder), 150);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hi! I'm Swami's AI surrogate. I can dive deep into his 'Product Builder' methodology—how he pairs AI-native speed with relationship-first leadership to scale global brands. What's on your mind?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: skillsScroll } = useScroll({
    target: skillsSectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: workScroll } = useScroll({
    target: workSectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: workScrollProgressRaw } = useScroll({
    target: workSectionRef,
    offset: ["start start", "end end"]
  });

  const workScrollProgress = useSpring(workScrollProgressRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const skillsParallax = useTransform(skillsScroll, [0, 1], [0, 60]);
  const workParallax = useTransform(workScroll, [0, 1], [0, 60]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-m3-surface md:p-8 selection:bg-m3-primary selection:text-m3-on-primary relative">
      <div className="max-w-[1100px] mx-auto min-h-[90vh] flex flex-col relative bg-m3-surface-variant overflow-hidden shadow-xl rounded-m3-xl md:rounded-[32px] border border-m3-outline/10">

        <SiteHeader />

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-0 md:bottom-32 right-0 md:right-8 w-full md:w-[400px] max-w-full md:max-w-[90vw] h-[100dvh] md:h-[600px] bg-m3-surface border-x md:border border-m3-outline/20 z-50 flex flex-col shadow-2xl rounded-none md:rounded-[32px] print:hidden overflow-hidden"
            >
              <div className="p-5 md:p-6 bg-m3-primary text-m3-on-primary flex justify-between items-center shadow-lg shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-black tracking-wide">AI SURROGATE</span>
                    <span className="text-[10px] font-bold opacity-60">Strategic Context Engine</span>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-m3-surface">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 text-sm font-bold leading-relaxed shadow-sm ${
                      msg.role === 'user'
                      ? 'bg-m3-primary text-m3-on-primary rounded-[28px] rounded-br-[4px]'
                      : 'bg-m3-secondary-container text-m3-on-secondary-container rounded-[28px] rounded-bl-[4px]'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-m3-surface-variant text-m3-on-surface-variant p-4 rounded-[24px] rounded-bl-[4px] flex items-center gap-3">
                       <div className="flex gap-1.5">
                         <span className="w-2 h-2 bg-m3-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                         <span className="w-2 h-2 bg-m3-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                         <span className="w-2 h-2 bg-m3-primary rounded-full animate-bounce"></span>
                       </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-m3-surface flex flex-col gap-4 border-t border-m3-outline/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Inquire about methodology..."
                    className="flex-1 bg-m3-surface-variant rounded-m3-full py-3.5 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-m3-primary/10 transition-all placeholder:text-m3-on-surface/30 text-m3-on-surface shadow-inner"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="w-14 h-14 bg-m3-primary text-m3-on-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-30 disabled:scale-100 active:scale-95 group"
                  >
                    <ArrowUpRight className="w-6 h-6 rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? "Close AI surrogate" : "Open AI surrogate"}
          className="fixed bottom-8 right-8 w-16 h-16 bg-m3-primary text-m3-on-primary rounded-[20px] flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all z-50 group print:hidden"
        >
          {isChatOpen ? <X className="w-7 h-7" /> : (
            <div className="relative">
              <MessageSquare className="w-7 h-7 group-hover:opacity-0 transition-opacity" />
              <Sparkles className="w-7 h-7 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity scale-110" />
            </div>
          )}
        </button>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-28 w-16 h-16 bg-m3-surface-variant text-m3-on-surface-variant rounded-[24px] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all z-50 group print:hidden"
              title="Back to Top"
            >
              <ArrowUp className="w-8 h-8 group-hover:-translate-y-1.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Top Section: Sidebar + Hero */}
        <div className="flex flex-col md:flex-row border-b border-m3-outline/10">
          {/* Sidebar: Identity */}
          <aside className="w-full md:w-[360px] border-b md:border-b-0 md:border-r border-m3-outline/10 p-6 md:p-10 flex flex-col justify-between bg-m3-secondary-container shrink-0">
            <div className="space-y-8">
              <div className="w-16 h-2 bg-m3-primary rounded-full"></div>
              <div className="flex flex-col gap-1 relative group/title select-none">
                <div className="font-mono text-[9px] text-m3-primary/60 font-bold tracking-[0.2em] h-4 overflow-hidden relative">
                  <motion.div
                    animate={{ x: [-20, 0], opacity: [0, 1] }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-m3-primary animate-pulse" />
                    SYSTEM_INITIALIZED: RUN_BUILD
                  </motion.div>
                </div>

                <div className="flex items-start gap-4">
                  <h2 className="display text-4xl md:text-5xl leading-[0.85] font-bold tracking-tighter uppercase text-m3-on-secondary-container relative">
                    <span className="block relative group-hover/title:text-m3-primary transition-colors duration-500">
                      {scrambledTitle}
                    </span>
                    <span className="block text-m3-primary/90">
                      {scrambledBuilder}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-[12px] h-[36px] bg-m3-primary ml-1 align-middle translate-y-[-2px]"
                      />
                    </span>
                  </h2>

                  <div className="mt-2 flex flex-col items-center">
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="text-m3-primary relative"
                    >
                      <Layers className="w-6 h-6" />
                      <motion.div
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 border border-m3-primary rounded-full"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-6">
                <div className="flex flex-col">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-m3-primary/60">Currently</span>
                  <span className="text-sm font-bold mb-1">Independent Product Builder</span>
                  <p className="text-[13px] leading-relaxed text-m3-on-secondary-container/70 font-medium">
                    Building and shipping products solo, AI-native, in public.
                  </p>
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-m3-primary/60">Previously</span>
                  <span className="text-sm font-semibold">Condé Nast · Newsweek · Metro</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-m3-primary/60">Location</span>
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-m3-primary" /> Bengaluru, India
                  </span>
                </div>

                <div className="flex flex-col pt-2">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-m3-primary/60 mb-4">Get in touch</span>
                  <div className="space-y-3">
                    <motion.a
                      whileHover={{ scale: 1.03, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://www.linkedin.com/in/swaminathanguru/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-m3-surface/60 border border-m3-outline/10 rounded-m3-lg hover:bg-m3-primary hover:text-m3-on-primary transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="w-10 h-10 bg-m3-surface-variant rounded-full flex items-center justify-center shrink-0 group-hover:bg-white/20">
                        <Linkedin className="w-5 h-5 text-m3-primary group-hover:text-white" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-tight">LinkedIn</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.03, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      href="mailto:swami.2580@gmail.com"
                      className="flex items-center gap-4 p-4 bg-m3-surface/60 border border-m3-outline/10 rounded-m3-lg hover:bg-m3-secondary hover:text-m3-on-secondary transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="w-10 h-10 bg-m3-surface-variant rounded-full flex items-center justify-center shrink-0 group-hover:bg-white/20">
                        <Mail className="w-5 h-5 text-m3-secondary group-hover:text-white" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-tight">Email</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content: Hero + Stats */}
          <div className="flex-1 flex flex-col shrink-0 bg-m3-surface">
            <section className="min-h-[300px] md:min-h-[340px] border-b border-m3-outline/10 p-6 md:p-10 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-m3-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="max-w-2xl relative z-10">
                <span className="font-display text-[11px] md:text-[12px] font-bold uppercase tracking-[0.25em] md:tracking-[0.3em] text-m3-primary mb-4 md:mb-6 block">
                  Senior Product Leader · AI-Native Product
                </span>
                <span className="display font-medium text-2xl md:text-[2.75rem] block mb-6 leading-[1.15] tracking-tight text-m3-on-surface">
                  I turn complex platforms into <span className="text-m3-primary font-bold px-2 bg-m3-primary-container/30 rounded-lg">growth engines</span> — lifting engagement, accelerating revenue, and shipping at half the time-to-market.
                </span>
                <p className="text-sm font-medium text-m3-on-surface-variant max-w-xl leading-relaxed">
                  11+ years in product across Vogue, GQ, Wired, Condé Nast Traveller, Architectural Digest and Newsweek — including new brand launches in the Middle East and Germany.
                </p>
              </div>
            </section>

            {/* Impact Grid */}
            <section className="grid grid-cols-2 lg:grid-cols-4 flex-1">
              {[
                { val: "$20M+", label: "NET-NEW REVENUE", container: "bg-m3-primary-container/20", text: "text-m3-on-primary-container" },
                { val: "30%+", label: "ENGAGEMENT LIFT", container: "bg-m3-secondary-container/20", text: "text-m3-on-secondary-container" },
                { val: "50%", label: "TIME-TO-MARKET", container: "bg-m3-tertiary-container/20", text: "text-m3-on-tertiary-container" },
                { val: "100%", label: "SEO RETAINED", container: "bg-m3-primary-container/20", text: "text-m3-on-primary-container" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-5 md:p-6 flex flex-col items-center justify-center text-center ${stat.container} border-m3-outline/5 border-t lg:border-t-0 ${i % 2 === 0 ? "border-r" : ""} ${i < 3 ? "lg:border-r" : "lg:border-r-0"}`}
                >
                  <span className={`display text-3xl md:text-4xl font-extrabold tracking-tighter ${stat.text}`}>{stat.val}</span>
                  <span className={`font-display text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1.5 ${stat.text}`}>{stat.label}</span>
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* ============ EXPERIENCE ============ */}
        <section id="work" ref={workSectionRef} className="border-b border-m3-outline/10 flex flex-col shrink-0 bg-m3-surface overflow-hidden relative">
          <div className="sticky top-0 left-0 right-0 h-1 z-40 pointer-events-none">
            <motion.div
              style={{ scaleX: workScrollProgress, transformOrigin: "0%" }}
              className="h-full bg-m3-secondary"
            />
          </div>
          <motion.div
            style={{ y: workParallax }}
            className="py-8 px-6 md:py-12 md:px-10 bg-m3-secondary text-m3-on-secondary flex justify-center items-center overflow-hidden relative z-10"
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-8xl font-black opacity-5 select-none pointer-events-none display whitespace-nowrap">
              TIMELINE • TIMELINE • TIMELINE
            </span>
            <span className="display text-[11px] md:text-sm uppercase tracking-[0.25em] md:tracking-[0.4em] font-bold relative z-10">
              Professional Trajectory
            </span>
          </motion.div>

          <div className="flex-1 space-y-10 md:space-y-16 p-5 md:p-12 lg:p-16">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className={`rounded-[28px] md:rounded-[36px] p-6 md:p-10 border transition-all ${
                  exp.current
                    ? "bg-m3-primary-container/25 border-m3-primary/25 shadow-md"
                    : "bg-m3-surface-variant/40 border-m3-outline/5 hover:bg-m3-surface hover:shadow-xl"
                }`}
              >
                <div className="flex flex-col xl:flex-row gap-8 md:gap-10">
                  {/* Left rail: company meta */}
                  <div className="xl:w-[32%] space-y-5 shrink-0">
                    {exp.current && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-m3-primary text-m3-on-primary rounded-m3-full text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-m3-on-primary animate-pulse" />
                        Current
                      </span>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="display font-bold text-2xl sm:text-4xl tracking-tighter uppercase leading-none text-m3-primary">
                          {exp.company}
                        </h3>
                        <motion.a
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${exp.company} website`}
                          className="w-10 h-10 bg-m3-primary-container text-m3-on-primary-container rounded-full flex items-center justify-center transition-all shadow-sm hover:bg-m3-primary hover:text-m3-on-primary shrink-0"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                      <div className="text-lg font-bold text-m3-secondary">{exp.role}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-3.5 py-1.5 bg-m3-secondary-container text-m3-on-secondary-container rounded-m3-full text-[11px] font-bold uppercase tracking-wider">
                        {exp.period}
                      </span>
                      <span className="px-3.5 py-1.5 bg-m3-surface border border-m3-outline/20 text-m3-on-surface rounded-m3-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    </div>

                    {exp.context && (
                      <p className="text-[13px] leading-relaxed text-m3-on-surface-variant font-medium">
                        {exp.context}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((tech, ti) => (
                        <span key={ti} className="text-[10px] font-bold uppercase tracking-wider bg-m3-primary/5 text-m3-primary px-2.5 py-1 rounded-m3-md border border-m3-primary/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: impact + detail */}
                  <div className="flex-1 space-y-7 min-w-0">
                    <div className="bg-m3-primary-container/30 rounded-[20px] md:rounded-[24px] p-5 md:p-7 border border-m3-primary/10">
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="w-5 h-5 text-m3-primary shrink-0" />
                        <h4 className="display font-extrabold text-[10px] md:text-xs uppercase tracking-widest text-m3-primary">
                          Quantifiable Impact
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {exp.impact.map((ki, kii) => (
                          <div key={kii} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-m3-primary mt-2 shrink-0" />
                            <p className="text-sm font-bold text-m3-on-surface leading-snug">{ki}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-5">
                      <h4 className="display font-extrabold text-[10px] uppercase tracking-[0.35em] text-m3-outline">
                        What I owned
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {exp.highlights.map((h, hi) => (
                          <div key={hi} className="bg-m3-surface p-5 rounded-[22px] border border-m3-outline/5 hover:border-m3-primary/20 transition-all shadow-sm">
                            <h5 className="font-bold text-[15px] mb-2 text-m3-on-surface leading-snug">{h.title}</h5>
                            <p className="text-[13px] leading-relaxed text-m3-on-surface-variant font-medium">{h.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ SELECTED WORK ============ */}
        <section id="builds" className="bg-m3-surface-variant border-b border-m3-outline/10 px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.35em] text-m3-primary block mb-3">
                Selected Work
              </span>
              <h3 className="display text-2xl md:text-4xl font-extrabold tracking-tighter uppercase text-m3-on-surface">
                Shipped solo
              </h3>
            </div>
            <p className="text-sm text-m3-on-surface-variant font-medium max-w-sm">
              Products taken from brief to production single-handedly — AI tools as build partners, not autocomplete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {BUILDS.map((b, i) => {
              const BuildIcon = b.icon;
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 bg-m3-primary-container text-m3-on-primary-container rounded-[16px] flex items-center justify-center shrink-0 group-hover:bg-m3-primary group-hover:text-m3-on-primary transition-colors">
                      <BuildIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-m3-primary bg-m3-primary/5 border border-m3-primary/15 px-3 py-1 rounded-m3-full shrink-0">
                      {b.status}
                    </span>
                  </div>
                  <h4 className="display text-xl font-extrabold tracking-tight text-m3-on-surface mb-2 flex items-center gap-2">
                    {b.name}
                    {b.url && <ArrowUpRight className="w-4 h-4 text-m3-primary opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-m3-on-surface-variant font-medium">{b.detail}</p>
                </>
              );

              return b.url ? (
                <motion.a
                  key={i}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6 }}
                  className="bg-m3-surface p-6 md:p-7 rounded-[28px] border border-m3-outline/5 hover:border-m3-primary/30 shadow-sm hover:shadow-xl transition-all group block"
                >
                  {inner}
                </motion.a>
              ) : (
                <div
                  key={i}
                  className="bg-m3-surface p-6 md:p-7 rounded-[28px] border border-m3-outline/5 shadow-sm group"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ TOOLKIT (condensed) ============ */}
        <section id="skills" ref={skillsSectionRef} className="flex flex-col bg-m3-surface border-b border-m3-outline/10 shrink-0 overflow-hidden relative">
          <motion.div
            style={{ y: skillsParallax }}
            className="py-8 px-6 md:py-12 md:px-10 bg-m3-primary text-m3-on-primary display text-[11px] md:text-sm uppercase tracking-[0.25em] md:tracking-[0.4em] font-bold text-center z-10 relative"
          >
            How I Work
          </motion.div>

          <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 space-y-14">
            {/* AI-native proof — the three claims that carry numbers */}
            <div>
              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.35em] text-m3-primary block mb-6">
                AI-Native Delivery
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {AI_PROOF.map((p, i) => {
                  const PIcon = p.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="bg-m3-surface-variant/50 p-6 rounded-[26px] border border-m3-outline/5 hover:border-m3-primary/25 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-m3-primary text-m3-on-primary rounded-[13px] flex items-center justify-center shrink-0">
                          <PIcon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="display text-2xl font-extrabold tracking-tighter text-m3-primary leading-none">{p.metric}</div>
                          <div className="font-display text-[9px] font-bold uppercase tracking-widest text-m3-on-surface-variant/70 mt-1">{p.label}</div>
                        </div>
                      </div>
                      <p className="text-[13px] leading-relaxed text-m3-on-surface-variant font-medium">{p.detail}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Core competencies — chips */}
            <div>
              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.35em] text-m3-primary block mb-5">
                Core Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {COMPETENCIES.map((c, i) => (
                  <span
                    key={i}
                    className="text-[12px] font-bold text-m3-on-surface bg-m3-surface-variant/60 border border-m3-outline/10 px-3.5 py-2 rounded-m3-full hover:border-m3-primary/30 hover:text-m3-primary transition-colors"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools — grouped chips */}
            <div>
              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.35em] text-m3-primary block mb-5">
                Tools
              </span>
              <div className="space-y-5">
                {TOOLS.map((t, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-5 py-3 border-t border-m3-outline/10">
                    <span className="font-display text-[10px] font-bold uppercase tracking-widest text-m3-on-surface-variant/60 md:w-[190px] shrink-0 pt-1">
                      {t.group}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {t.items.map((item, ii) => (
                        <span
                          key={ii}
                          className="text-[12px] font-semibold text-m3-on-surface-variant bg-m3-surface-variant/50 px-3 py-1.5 rounded-m3-md border border-m3-outline/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.35em] text-m3-primary block mb-5">
                Certifications & Education
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CREDENTIALS.map((c, i) => {
                  const CIcon = c.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 bg-m3-surface-variant/50 p-5 rounded-[22px] border border-m3-outline/5">
                      <div className="w-11 h-11 bg-m3-secondary-container text-m3-on-secondary-container rounded-full flex items-center justify-center shrink-0">
                        <CIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-m3-on-surface leading-snug">{c.title}</div>
                        <div className="text-[12px] text-m3-on-surface-variant font-medium mt-0.5">{c.issuer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ MANIFESTO ============ */}
        <section className="bg-m3-primary text-m3-on-primary p-8 md:p-16 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Cpu className="w-64 h-64 md:w-96 md:h-96 -mr-16 -mt-16 md:-mr-20 md:-mt-20 rotate-12" />
          </div>

          <div className="max-w-4xl relative z-10">
            <span className="font-display text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-extrabold text-m3-on-primary/60 mb-5 block">
              Point of View
            </span>
            <h2 className="display text-3xl md:text-6xl font-bold tracking-tighter mb-10 max-w-2xl leading-[0.95]">
              THE AI-NATIVE PRODUCT REVOLUTION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <div className="space-y-6">
                <p className="text-lg md:text-xl font-medium leading-relaxed">
                  The barrier between{" "}
                  <span className="bg-m3-primary-container text-m3-on-primary-container px-2 rounded-lg italic">Idea</span> and{" "}
                  <span className="bg-m3-primary-container text-m3-on-primary-container px-2 rounded-lg italic">Execution</span> has collapsed.
                </p>
                <p className="text-base opacity-80 leading-relaxed font-medium">
                  As AI democratises technical syntax, the product leader&rsquo;s value shifts from management to{" "}
                  <span className="underline decoration-white/30 underline-offset-8">contextual orchestration</span>.
                </p>
                <div className="border-l-4 border-m3-secondary-container pl-6 py-2">
                  <p className="text-base opacity-90 italic leading-relaxed">
                    &ldquo;I no longer just build products; I compose ecosystems by leveraging LLMs to handle the velocity while I handle the overarching strategy.&rdquo;
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/pulse/ai-changing-game-product-builders-swami-guru-6xnnc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-m3-surface text-m3-primary font-display font-bold px-6 py-3 rounded-m3-full text-sm tracking-wide hover:shadow-xl transition-shadow"
                >
                  Read the strategic brief <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-m3-surface text-m3-on-surface p-8 md:p-10 rounded-[32px] shadow-2xl self-start">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-m3-tertiary text-m3-on-tertiary rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="font-display text-[11px] uppercase font-black tracking-widest text-m3-tertiary">
                    What that looks like
                  </span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Write the product context and brief before any code exists.",
                    "Direct AI tools in tight build-review loops, not one-shot prompts.",
                    "Validate bets with users before committing engineering resource.",
                    "Catch and reverse scope creep mid-build — ship one focused thing."
                  ].map((line, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-m3-primary mt-2 shrink-0" />
                      <span className="text-sm font-medium leading-relaxed text-m3-on-surface-variant">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CONTACT CTA ============ */}
        <section className="bg-m3-surface px-6 md:px-12 lg:px-16 py-12 md:py-16 border-t border-m3-outline/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="display text-2xl md:text-4xl font-extrabold tracking-tighter uppercase text-m3-on-surface mb-3">
                Let&rsquo;s build something
              </h3>
              <p className="text-sm md:text-base text-m3-on-surface-variant font-medium leading-relaxed">
                Open to product leadership roles and interesting problems. Bengaluru-based, working globally.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="mailto:swami.2580@gmail.com"
                className="inline-flex items-center gap-2 bg-m3-primary text-m3-on-primary font-display font-bold px-6 py-3.5 rounded-m3-full text-sm tracking-wide hover:m3-elevation-1-shadow active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4" /> Email me
              </a>
              <a
                href="https://www.linkedin.com/in/swaminathanguru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-m3-secondary-container text-m3-on-secondary-container font-display font-bold px-6 py-3.5 rounded-m3-full text-sm tracking-wide hover:m3-elevation-1 active:scale-95 transition-all"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <Link
                to="/notes"
                className="inline-flex items-center gap-2 border border-m3-outline/30 text-m3-on-surface font-display font-bold px-6 py-3.5 rounded-m3-full text-sm tracking-wide hover:bg-m3-surface-variant transition-all"
              >
                <BookOpen className="w-4 h-4" /> Build notes
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
