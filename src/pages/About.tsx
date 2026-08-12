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
  TrendingUp, 
  Layers, 
  ChevronRight,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  MessageSquare,
  X,
  Target,
  Database,
  Globe,
  BookOpen,
  Code2,
  Search,
  ArrowUp,
  LineChart,
  Users,
  Monitor,
  Palette,
  CreditCard,
  Share2,
  Activity,
  Brain,
  Timer,
  Layout,
  BarChart3,
  MousePointer2,
  ZapOff,
  Rocket
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { askAssistant } from "../services/geminiService";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

// --- Types ---

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  website: string;
  highlights: string[];
  keyInitiatives: string[];
  technologies: string[];
  deepDive?: {
    challenge: string;
    action: string;
    outcome: string;
    projects: { name: string; impact: string }[];
  };
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: (string | { name: string; detail: string; icon?: any; isHeader?: boolean })[];
}

// --- Data ---

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Condé Nast",
    role: "Senior Product Manager",
    location: "Bengaluru",
    period: "Oct 2020 – Apr 2026",
    website: "https://www.condenast.com",
    highlights: [
      "Strategic Growth & Revenue Scaling: Directed and executed the full-cycle launch of major global brands (Vogue, GQ, Wired, Condé Nast Traveler), successfully establishing new monetization channels projected to generate $20M in net-new revenue.",
      "AI-Native Velocity Excellence: Leveraged Google AI Studio, Cursor, and Gemini to compress product cycles from ideation to launch, achieving a verified 50% T.T.M (Time-to-Market) reduction for global property deployments.",
      "New Revenue Line Diversification: Spearheaded the launch of the Architectural Digest Directory service ($300K revenue), integrated a new booking partnership with Abercrombie & Kent for Condé Nast Traveler ($650K revenue) and launched Condé Nast Traveler Secret Homestays in partnership with AirBnB and Booking.com to boost affiliate revenue.",
      "Global Platform Consolidation & Reach: Orchestrated the strategic migration of Condé Nast Traveler Spain and LATAM onto a unified Spanish-language site, targeting a global addressable market of 56.6M unique users and a revenue growth of $1.3M by 2027.",
      "Interdisciplinary Governance: Unified global squads across Engineering and Design to execute large-scale platform migrations for Vogue, GQ, Wired, and Architectural Digest, ensuring 100% technical SEO integrity and zero revenue loss during critical transitions."
    ],
    keyInitiatives: [
      "Secured $20M+ in projected net-new revenue through global brand launches.",
      "Cut Time-to-Market (TTM) by 50% using AI-native workflows (Gemini, Cursor).",
      "Launched $950K+ in new revenue streams via the AD Directory and premium partnerships.",
      "Consolidated Spanish-language platforms to target a market of 56.6M unique users."
    ],
    technologies: ["Enterprise CMS", "Google AI Studio", "Gemini", "Technical SEO", "Global Migrations", "Headless Arch"],
    deepDive: {
      challenge: "Legacy fragmentation across 30+ global markets created massive operational overhead and slowed down product parity.",
      action: "I led the 'Unified Platform' initiative, moving distinct codebases into a shared micro-frontend architecture powered by a headless CMS and AI-accelerated dev tools.",
      outcome: "Successfully unified Global Search and Content Distribution, reducing infrastructure costs by 22% while increasing content velocity.",
      projects: [
        { name: "AD Directory Implementation", impact: "$300K ARR via partner listings." },
        { name: "CNT Global Migration", impact: "Unified 5 international markets onto one SEO-dominant domain." }
      ]
    }
  },
  {
    company: "Newsweek",
    role: "Product Manager",
    location: "Bengaluru",
    period: "Jan 2018 – Oct 2020",
    website: "https://www.newsweek.com",
    highlights: [
      "Global Stakeholder Management: Directed the roadmap for digital properties reaching 50M+ monthly unique visitors, balancing competing priorities from Editorial, Sales, and Tech leads.",
      "Strategic Brand Pivot: Led the 'Newsgeek' rebranding by aligning Design aesthetics with Data-driven audience insights, resulting in a 17% increase in overall traffic.",
      "Technical Governance: Directed seamless enterprise CMS migration in collaboration with Technical SEO teams, ensuring zero degradation in site authority and Ad revenue."
    ],
    keyInitiatives: [
      "Scaled digital roadmap to serve over 50M+ monthly unique visitors.",
      "Achieved a 17% traffic surge through the strategic 'Newsgeek' rebranding.",
      "Delivered a zero-downtime CMS migration preserving $XM in ad revenue."
    ],
    technologies: ["Digital Transformation", "Stakeholder Management", "GA4", "Ad Tech", "GTM Strategy", "Newsgeek Rebrand"],
    deepDive: {
      challenge: "Declining organic reach and aging brand perception among the younger demographic (Gen Z/Millennial).",
      action: "I conceptualized and steered the 'Newsgeek' rebrand, pivoting the editorial presentation towards a high-fidelity, data-viz heavy format that resonated with tech-fluent audiences.",
      outcome: "Direct correlation to a 17% traffic uplift and a 25% increase in dwell time on deep-dive long-form content.",
      projects: [
        { name: "Newsgeek Pivot", impact: "Re-engineered UI/UX for high-impact science & tech storytelling." },
        { name: "Enterprise CMS Audit", impact: "Identified and resolved 40+ high-priority Core Web Vital bottlenecks." }
      ]
    }
  },
  {
    company: "Stigasoft / Metro International",
    role: "Product & Project Manager",
    location: "Global",
    period: "Dec 2009 – Dec 2017",
    website: "https://www.stigasoft.com",
    highlights: [
      "Global Product Strategy: Directed the end-to-end product lifecycle for 12 digital portals across the US, LatAm, and Europe, successfully serving a daily readership of 18.4M.",
      "Cross-Functional Translation: Bridged communication between C-suite Commercial stakeholders and distributed Engineering pods, accelerating project delivery by translating business objectives into detailed technical specifications.",
      "Platform Stability & Governance: Led global support operations for core platform tools and services, ensuring high availability and performance across 12+ international digital portals."
    ],
    keyInitiatives: [
      "Managed product lifecycle for 12 global portals serving 18.4M daily readers.",
      "Accelerated complex project delivery by 25%+ through cross-functional technical specifications.",
      "Maintained 99.9% uptime for core platform services across international markets."
    ],
    technologies: ["Global Strategy", "Multi-portal Management", "Jira/Confluence", "Technical Specs", "Service Monitoring"],
    deepDive: {
      challenge: "Coordinating product updates across 12+ international variants with varying local commercial requirements.",
      action: "Developed a standardized 'Global Tech Spec' framework that bridged the gap between commercial desires and engineering capacity.",
      outcome: "Reduced spec-to-delivery time by 25% and halved the number of regression defects in monthly releases.",
      projects: [
        { name: "Portal Harmonization", impact: "Unified tracking and ad-insertion logic across US, LATAM, and EU." },
        { name: "System Uptime Initiative", impact: "Achieved 99.9% availability during peak traffic events (International Elections)." }
      ]
    }
  }
];

const SKILLS = [
  {
    title: "AI/LLM Tools",
    icon: Cpu,
    skills: [
      { name: "Google AI Studio", detail: "Rapidly build, test, and refine applications using Google's Gemini AI models.", icon: Zap },
      { name: "Gemini", detail: "Compressed MVP build-time by 50% by bridging structural design with AI-accelerated code generation.", icon: Sparkles },
      { name: "NotebookLM", detail: "Synthesized 100+ stakeholder sources into a single unified roadmap, cutting discovery time by 3 weeks.", icon: BookOpen },
      { name: "Claude", detail: "Brainstorming, drafting product requirements documents (PRDs), and summarizing user feedback.", icon: MessageSquare },
      { name: "Cursor", detail: "AI-powered technical partner to bridge product strategy and engineering, querying product logic, generating technical documentation, and building rapid prototypes using natural language.", icon: Code2 },
      { name: "Rovo", detail: "Accelerated knowledge discovery by 30% by unifying fragmented data clusters across Jira and Confluence.", icon: Search }
    ]
  },
  {
    title: "Product Strategy",
    icon: Target,
    variant: "strategy",
    skills: [
      { name: "Accelerated GTM", detail: "Defining clear launch sequences and localizing value propositions to ensure rapid market adoption.", icon: Rocket },
      { name: "Revenue Diversification", detail: "Identifying and piloting new monetization models to build resilient, multi-stream income.", icon: LineChart },
      { name: "Iterative Prototyping", detail: "Implementing 'build-measure-learn' cycles to validate high-risk features and reduce R&D waste.", icon: Layout },
      { name: "Usability Audits", detail: "Finding and fixing the 'clutter' to make the design feel natural and intuitive.", icon: MousePointer2 },
      { name: "Behavioral Engagement", detail: "Moving beyond passive notifications to a value-driven model that rewards frequent interaction.", icon: Users },
      { name: "SEO Authority", detail: "Transitioning to a 'Content-First' model optimized for intent-based search.", icon: Globe }
    ]
  },
  {
    title: "Platform & Toolkit",
    icon: Globe,
    variant: "platform",
    skills: [
      { name: "Enterprise CMS", detail: "Designing scalable, headless architectures for multi-channel distribution and editorial efficiency.", icon: Layers },
      { name: "FEX Experience", detail: "Building mobile-first presentation layers focused on Core Web Vitals and lightning-fast load times.", icon: Monitor },
      { name: "Design Systems", detail: "Centralizing reusable components to ensure visual consistency and brand integrity across touchpoints.", icon: Palette },
      { name: "Ad Technology", detail: "Integrated serving ecosystems supporting programmatic bidding and privacy-compliant data targeting.", icon: ZapOff },
      { name: "Affiliate Commerce", detail: "Automated link management and conversion tracking for contextual product integration.", icon: CreditCard },
      { name: "CRM Automation", detail: "Sophisticated email delivery platforms for automated journey mapping and personalized content.", icon: Mail }
    ]
  },
  {
    title: "Data & Analytics",
    icon: TrendingUp,
    variant: "analytics",
    skills: [
      { name: "Event Tracking", detail: "Implementing first-party data collection using Snowplow to capture granular behavioral events.", icon: Activity },
      { name: "GA4 Ecosystem", detail: "Leveraging advanced property configurations to track the end-to-end journey from acquisition to retention.", icon: BarChart3 },
      { name: "Tag Governance", detail: "Centralizing management (GTM) for accuracy, performance, and compliant privacy workflows.", icon: Target },
      { name: "Data Intelligence", detail: "Utilizing Databricks Lakehouse for real-time processing and complex AI-driven data modeling.", icon: Database }
    ]
  }
];

export default function About() {
  useEffect(() => {
    document.title = "Swami Guru | Product Builder Portfolio";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Portfolio of Swami Guru, a Product Builder with 11+ years leading digital strategy, platform transformation, and revenue growth for world-class media brands."
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

  const { scrollYProgress: skillsScrollProgressRaw } = useScroll({
    target: skillsSectionRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: workScrollProgressRaw } = useScroll({
    target: workSectionRef,
    offset: ["start start", "end end"]
  });

  const skillsScrollProgress = useSpring(skillsScrollProgressRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
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
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
      {/* 12px frame replaced with M3 shadow and rounded container */}
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
                <div className="flex justify-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-m3-primary opacity-20"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-m3-primary opacity-20"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-m3-primary opacity-20"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
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
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "var(--color-m3-secondary-container)",
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
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
                {/* Ephemeral Technical Accent */}
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
                    
                    {/* Hover Decoration: Code Fragments */}
                    <div className="absolute -left-4 top-0 h-full w-2 flex flex-col justify-around opacity-0 group-hover/title:opacity-100 transition-opacity">
                      <div className="w-1 h-1 bg-m3-primary rounded-full" />
                      <div className="w-1 h-1 bg-m3-primary rounded-full" />
                      <div className="w-1 h-1 bg-m3-primary rounded-full" />
                    </div>
                  </h2>
                  
                  <div className="mt-2 flex flex-col items-center">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.15, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="text-m3-primary relative"
                    >
                      <Layers className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(var(--color-m3-primary),0.4)]" />
                      
                      {/* Interactive building rings */}
                      <motion.div
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 border border-m3-primary rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scaleX: [1, 1.4, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-8 h-1.5 bg-m3-primary/20 rounded-full mt-2 blur-[2px]"
                    />
                  </div>
                </div>

                {/* Floating Meta-info */}
                <div className="absolute -bottom-6 left-0 font-mono text-[8px] text-m3-on-secondary-container/40 flex gap-4 uppercase font-bold">
                  <span>v.1.0.4</span>
                  <span>ready_to_scale</span>
                </div>
              </div>

              
              <div className="pt-4 space-y-6">
                <div className="flex flex-col">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-m3-primary/60">Location</span>
                  <span className="text-sm font-semibold flex items-center gap-2 group cursor-default">
                    <MapPin className="w-4 h-4 text-m3-primary" /> Bengaluru, India
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-m3-primary/60">Experience</span>
                  <span className="text-sm font-bold mb-2">Global Product Leadership</span>
                  <p className="text-[13px] leading-relaxed text-m3-on-secondary-container/70 font-medium">
                    Specialise in AI-native strategies and scaling digital media. Expert in navigating new market entries and delivering measurable growth in engagement and revenue for world-class brands.
                  </p>
                </div>
                
                <div className="flex flex-col pt-2">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-m3-primary/60 mb-4">Contact Gateway</span>
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
            {/* Hero Intro */}
            <section className="min-h-[300px] md:min-h-[340px] border-b border-m3-outline/10 p-6 md:p-10 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-m3-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="max-w-xl relative z-10">
                <span className="font-display text-[11px] md:text-[12px] font-bold uppercase tracking-[0.25em] md:tracking-[0.3em] text-m3-primary mb-4 md:mb-6 block">Strategic Philosophy</span>
                <span className="display font-medium text-2xl md:text-5xl block mb-6 md:mb-8 leading-tight tracking-tight text-m3-on-surface">
                  "Aligning <span className="text-m3-primary font-bold px-2 bg-m3-primary-container/30 rounded-lg">AI strategy</span> with human-centric leadership to collapse the gap between tech and business."
                </span>
                <p className="text-sm font-medium opacity-60 max-w-md">I build sustainable roadmaps that prioritize team culture and product growth for global entities.</p>
              </div>
              
              <div className="absolute right-10 top-10 hidden lg:block group/status">
                <div className="relative">
                  <motion.div 
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-40 h-40 border border-m3-outline/10 rounded-full flex items-center justify-center p-3 relative cursor-help transition-all hover:bg-m3-primary/5"
                  >
                    <div className="w-full h-full border border-dashed border-m3-primary/20 rounded-full flex items-center justify-center group-hover/status:border-m3-primary transition-colors duration-1000">
                      <div className="w-1/2 h-1/2 bg-m3-primary/5 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm">
                        <Sparkles className="w-5 h-5 text-m3-primary/40 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Relatable Messaging Label - Now Orbits the center while remaining upright */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-20 pointer-events-none"
                  >
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-m3-outline/15 px-4 py-1.5 rounded-full shadow-md whitespace-nowrap pointer-events-auto"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-m3-primary flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Strategy Mode: Active
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Impact Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 flex-1">
              {[
                { val: "$20M+", label: "REVENUE SCALED", icon: TrendingUp, container: "bg-m3-primary-container/20", text: "text-m3-on-primary-container" },
                { val: "50%", label: "T.T.M REDUCTION", icon: Zap, container: "bg-m3-secondary-container/20", text: "text-m3-on-secondary-container" },
                { val: "50M+", label: "MONTHLY USERS", icon: Clock, container: "bg-m3-tertiary-container/20", text: "text-m3-on-tertiary-container" }
              ].map((stat, i) => (
                <div key={i} className={`p-6 md:p-8 flex flex-col items-center justify-center text-center ${stat.container} ${i < 2 ? 'border-b md:border-b-0 md:border-r border-m3-outline/5' : ''} hover:bg-opacity-40 transition-all cursor-default`}>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${stat.container.replace('/20','/40')} flex items-center justify-center mb-3 md:mb-4`}>
                    <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.text}`} />
                  </div>
                  <span className={`display text-4xl md:text-5xl font-extrabold tracking-tighter ${stat.text}`}>{stat.val}</span>
                  <span className={`font-display text-[9px] md:text-[11px] font-bold uppercase tracking-widest opacity-60 mt-1 md:mt-2 ${stat.text}`}>{stat.label}</span>
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* Experience & Toolkit Sections (Full Width) */}
        <div className="flex flex-col">
          {/* Tools & Skills Section */}
          <section id="skills" ref={skillsSectionRef} className="flex flex-col bg-m3-surface-variant border-b border-m3-outline/10 shrink-0 overflow-hidden relative">
            {/* Scroll Progress Bar */}
            <div className="sticky top-0 left-0 right-0 h-1 z-50 pointer-events-none">
              <motion.div 
                style={{ scaleX: skillsScrollProgress, transformOrigin: "0%" }}
                className="h-full bg-m3-primary shadow-[0_0_8px_rgba(var(--color-m3-primary),0.3)]"
              />
            </div>
            <motion.div 
              style={{ y: skillsParallax }}
              className="py-8 px-6 md:py-12 md:px-10 bg-m3-primary text-m3-on-primary display text-[11px] md:text-sm uppercase tracking-[0.25em] md:tracking-[0.4em] font-bold text-center z-10 relative"
            >
              Technical & Transformation Toolkit
            </motion.div>
            <div className="p-6 md:p-16 lg:p-24 space-y-12 md:space-y-32">
              {SKILLS.map((cat, i) => {
                const CatIcon = cat.icon;
                return (
                  <div key={i} className="space-y-8 md:space-y-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 border-b border-m3-outline/10 pb-6 md:pb-8">
                       <div className="flex items-center gap-4 md:gap-6">
                          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center shadow-lg ${
                            cat.variant === 'strategy' ? 'bg-m3-secondary text-m3-on-secondary' : 
                            cat.variant === 'platform' ? 'bg-m3-tertiary text-m3-on-tertiary' : 
                            'bg-m3-primary text-m3-on-primary'
                          }`}>
                            <CatIcon className="w-7 h-7 md:w-8 md:h-8" />
                          </div>
                          <div>
                            <h4 className="display font-extrabold text-2xl md:text-3xl uppercase tracking-tighter text-m3-on-surface">{cat.title}</h4>
                            <p className="font-display text-[10px] md:text-sm font-bold text-m3-on-surface-variant/60 uppercase tracking-widest mt-1">Core Competency Node</p>
                          </div>
                       </div>
                       <div className="hidden lg:flex gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-m3-primary"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-m3-primary/60"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-m3-primary/30"></div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {cat.skills.map((skill: any, idx: number) => {
                        const SkillIcon = skill.icon;
                        return (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                              duration: 0.6, 
                              delay: (idx % 3) * 0.1, 
                              ease: [0.22, 1, 0.36, 1] 
                            }}
                            whileHover={{ 
                              y: -12, 
                              scale: 1.03,
                              transition: { type: "spring", stiffness: 300, damping: 15 }
                            }}
                            className="bg-m3-surface p-8 rounded-[32px] border border-m3-outline/5 hover:border-m3-primary/30 transition-shadow shadow-sm hover:shadow-xl group"
                          >
                            <div className="flex flex-col h-full">
                              <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-m3-primary-container text-m3-on-primary-container rounded-[16px] flex items-center justify-center group-hover:bg-m3-primary group-hover:text-m3-on-primary transition-colors overflow-hidden">
                                  {SkillIcon && (
                                    <motion.div
                                      animate={cat.title === "AI/LLM Tools" ? {
                                        scale: [1, 1.15, 1],
                                        opacity: [0.7, 1, 0.7],
                                        filter: ["drop-shadow(0 0 0px rgba(0,0,0,0))", "drop-shadow(0 0 8px rgba(0,109,59,0.3))", "drop-shadow(0 0 0px rgba(0,0,0,0))"]
                                      } : {}}
                                      transition={{
                                        duration: 3 + (idx % 2),
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: idx * 0.3
                                      }}
                                    >
                                      <SkillIcon className="w-6 h-6" />
                                    </motion.div>
                                  )}
                                </div>
                                <h5 className="font-display font-extrabold text-base uppercase tracking-tight text-m3-on-surface leading-tight">
                                  {skill.name}
                                </h5>
                              </div>
                              <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium">
                                {skill.detail}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Experience Section */}
          <section id="work" ref={workSectionRef} className="border-b border-m3-outline/10 flex flex-col shrink-0 bg-m3-surface overflow-hidden relative">
             {/* Scroll Progress Bar */}
             <div className="sticky top-0 left-0 right-0 h-1 z-50 pointer-events-none">
              <motion.div 
                style={{ scaleX: workScrollProgress, transformOrigin: "0%" }}
                className="h-full bg-m3-secondary shadow-[0_0_8px_rgba(var(--color-m3-secondary),0.3)]"
              />
            </div>
            <motion.div 
              style={{ y: workParallax }}
              className="py-8 px-6 md:py-12 md:px-10 bg-m3-secondary text-m3-on-secondary flex justify-center items-center overflow-hidden relative z-10"
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-8xl font-black opacity-5 select-none pointer-events-none display whitespace-nowrap">TIMELINE • TIMELINE • TIMELINE</span>
              <div className="flex items-center gap-4 relative z-10">
                <span className="display text-[11px] md:text-sm uppercase tracking-[0.25em] md:tracking-[0.4em] font-bold">Professional Trajectory</span>
              </div>
            </motion.div>
            
            <div className="flex-1 space-y-12 md:space-y-24 p-5 md:p-16 lg:p-24">
              {EXPERIENCE.map((exp, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-m3-surface-variant/40 rounded-[32px] md:rounded-[40px] p-6 md:p-12 border border-m3-outline/5 hover:bg-m3-surface hover:shadow-xl transition-all group"
                >
                  <div className="flex flex-col xl:flex-row gap-8 md:gap-10">
                    <div className="xl:w-1/3 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <motion.h3 
                            whileHover={{ scale: 1.05, originX: 0 }}
                            className="display font-bold text-3xl sm:text-5xl tracking-tighter uppercase leading-none text-m3-primary cursor-default"
                          >
                            {exp.company}
                          </motion.h3>
                          <motion.a 
                            whileHover={{ scale: 1.15, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            href={exp.website}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-12 h-12 bg-m3-primary-container text-m3-on-primary-container rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:bg-m3-primary hover:text-m3-on-primary"
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </motion.a>
                        </div>
                        <div className="text-xl font-bold text-m3-secondary italic">{exp.role}</div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <div className="px-4 py-1.5 bg-m3-secondary-container text-m3-on-secondary-container rounded-m3-full text-[11px] font-bold uppercase tracking-wider">{exp.period}</div>
                        <div className="px-4 py-1.5 bg-m3-surface border border-m3-outline/20 text-m3-on-surface rounded-m3-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4">
                        {exp.technologies.map((tech, ti) => (
                          <span key={ti} className="text-[10px] font-bold uppercase tracking-widest bg-m3-primary/5 text-m3-primary px-3 py-1 rounded-m3-md border border-m3-primary/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 space-y-8">
                      {/* Key Initiatives Card */}
                      <div className="bg-m3-primary-container/30 rounded-[20px] md:rounded-[24px] p-6 md:p-8 border border-m3-primary/10">
                        <div className="flex items-center gap-4 mb-4 md:mb-6">
                          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-m3-primary" />
                          <h4 className="display font-extrabold text-[10px] md:text-sm uppercase tracking-widest text-m3-primary">Quantifiable Impact</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          {exp.keyInitiatives.map((ki, kii) => (
                            <div key={kii} className="flex gap-3 md:gap-4 items-start">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-m3-primary mt-1.5 md:mt-2 shrink-0 animate-pulse" />
                              <p className="text-sm md:text-base font-bold text-m3-on-surface leading-snug">{ki}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                         <h4 className="display font-extrabold text-[11px] uppercase tracking-[0.4em] text-m3-outline">Strategic Mandates</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {exp.highlights.map((h, hi) => {
                              const [title, ...descParts] = h.split(':');
                              const description = descParts.join(':').trim();
                              return (
                                <div key={hi} className="bg-m3-surface p-6 rounded-[28px] border border-m3-outline/5 hover:border-m3-primary/20 transition-all shadow-sm">
                                  <h5 className="font-bold text-base uppercase mb-2 text-m3-on-surface">{title}</h5>
                                  <p className="text-sm leading-relaxed text-m3-on-surface-variant font-medium">{description || h}</p>
                                </div>
                              );
                            })}
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* AI Mindset Section */}
        <section className="bg-m3-primary text-m3-on-primary p-8 md:p-20 relative overflow-hidden rounded-t-[32px] md:rounded-t-[48px]">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Cpu className="w-64 h-64 md:w-96 md:h-96 -mr-16 -mt-16 md:-mr-20 md:-mt-20 rotate-12" />
          </div>
          
          <div className="max-w-4xl relative z-10">
            <span className="font-display text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-extrabold text-m3-on-primary/60 mb-4 md:mb-6 block">Strategic Manifesto</span>
            <h2 className="display text-3xl md:text-7xl font-bold tracking-tighter mb-8 md:mb-10 max-w-2xl leading-[0.9]">THE AI-NATIVE PRODUCT REVOLUTION</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
              <div className="space-y-8">
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  The barrier between <span className="bg-m3-primary-container text-m3-on-primary-container px-2 rounded-lg italic">Idea</span> and <span className="bg-m3-primary-container text-m3-on-primary-container px-2 rounded-lg italic">Execution</span> has collapsed. 
                </p>
                <p className="text-lg opacity-80 leading-relaxed font-medium">
                  As AI democratizes technical syntax, the product leader’s value shifts from management to <span className="underline decoration-white/30 underline-offset-8">contextual orchestration</span>.
                </p>
                <div className="pt-8">
                  <div className="border-l-4 border-m3-secondary-container pl-6 py-2">
                    <p className="text-base opacity-90 italic">
                      "I no longer just build products; I compose ecosystems by leveraging LLMs to handle the velocity while I handle the overarching strategy."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
              <div className="bg-m3-surface text-m3-on-surface p-10 rounded-[40px] shadow-2xl relative group">
                <div className="absolute top-6 right-6">
                  <Sparkles className="w-8 h-8 text-m3-tertiary opacity-30" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-m3-tertiary text-m3-on-tertiary rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="font-display text-[11px] uppercase font-black tracking-widest text-m3-tertiary">Proof of Concept</span>
                </div>
                <h4 className="display text-2xl font-bold mb-6 tracking-tight">The 24-Hour Solo Sprint</h4>
                <p className="text-base opacity-70 leading-relaxed mb-10 font-medium">
                  Built a functional Task Management engine from zero in a single cycle, proving that LLM context is the new foundational code for builders.
                </p>
                <motion.a 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.linkedin.com/pulse/ai-changing-game-product-builders-swami-guru-6xnnc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="m3-button-filled w-full flex justify-center py-4 text-sm font-bold tracking-widest shadow-lg hover:shadow-xl"
                >
                  Read Strategic Brief
                </motion.a>
              </div>

              {/* Live solo build — Adda */}
              <div className="bg-m3-surface text-m3-on-surface p-8 md:p-10 rounded-[40px] shadow-2xl relative">
                <div className="absolute top-6 right-6">
                  <Clock className="w-8 h-8 text-m3-primary opacity-20" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-m3-primary text-m3-on-primary rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="font-display text-[11px] uppercase font-black tracking-widest text-m3-primary">
                    Shipped &amp; Live
                  </span>
                </div>
                <h4 className="display text-2xl font-bold mb-6 tracking-tight">
                  अड्डा — Adda
                </h4>
                <p className="text-base opacity-70 leading-relaxed mb-10 font-medium">
                  Pick a city and hear its songs, under its own sky and its own clock. Delhi first &mdash; 31 tracks at India Gate, golden hour.
                </p>
                <motion.a
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://adda.builtbyswami.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-widest rounded-m3-full bg-m3-secondary-container text-m3-on-secondary-container shadow-lg hover:shadow-xl transition-shadow"
                >
                  Open Adda <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competencies Footer-like strip */}
        <section className="bg-m3-surface-variant overflow-hidden whitespace-nowrap py-6 md:py-8 print:hidden">
           <div className="flex animate-[scroll_80s_linear_infinite] gap-16">
             {[
               "Strategic Growth", "AI-Native Product", "Go-To-Market", "Platform Governance", 
               "Technical SEO", "Revenue Innovation", "Rapid Prototyping", "Stakeholder Management",
               "Data Discovery", "Enterprise CMS", "User Experience ROI", "Cross-Functional Leadership"
             ].map((comp, i) => (
               <div key={i} className="flex items-center gap-6 text-sm font-bold uppercase tracking-[0.25em] text-m3-on-surface-variant/70">
                 <Sparkles className="w-4 h-4 text-m3-primary" /> {comp}
               </div>
             ))}
             {/* Duplicate for seamless scroll */}
             {[
               "Strategic Growth", "AI-Native Product", "Go-To-Market", "Platform Governance", 
               "Technical SEO", "Revenue Innovation", "Rapid Prototyping", "Stakeholder Management",
               "Data Discovery", "Enterprise CMS", "User Experience ROI", "Cross-Functional Leadership"
             ].map((comp, i) => (
               <div key={`dup-${i}`} className="flex items-center gap-6 text-sm font-bold uppercase tracking-[0.25em] text-m3-on-surface-variant/70">
                 <Sparkles className="w-4 h-4 text-m3-primary" /> {comp}
               </div>
             ))}
           </div>
        </section>

        <SiteFooter />
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
