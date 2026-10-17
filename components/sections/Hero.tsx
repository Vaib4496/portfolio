import { RoleTicker } from "@/components/sections/RoleTicker";
import { HeroPolaroids } from "@/components/sections/HeroPolaroids";
import { DocSenseChat } from "@/components/sections/DocSenseChat";

interface HeroProps {
  chatWidget?: React.ReactNode;
}

export function Hero({ chatWidget }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-center py-12 lg:py-20"
      aria-label="Introduction & Hero"
    >
      {/* Ambient Polaroid Snapshots (Desktop Floating Accents) */}
      <HeroPolaroids />

      {/* Split Hero Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Copy & Positioning */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-neutral-300 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Tech Lead @ Happiest Minds · Hyderabad</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-400">
              Architecting frontend systems.
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-300">
              Shipping production AI.
            </span>
          </h1>

          {/* Dynamic Role Ticker Badge */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-neutral-400">
            <span className="text-purple-400 font-bold">Focus:</span>
            <RoleTicker />
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="text-neutral-400 hidden sm:inline">6+ Years Exp</span>
          </div>

          {/* Lead Paragraph */}
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl">
            Tech Lead with 6+ years architecting React, Next.js 15, and micro-frontend platforms at scale — and building end-to-end RAG pipelines and production LLM applications. Both halves, in production.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-900/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              <span>See the work</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-neutral-200 font-semibold text-sm transition-all hover:border-purple-500/40 active:scale-95"
            >
              Get in touch
            </a>
          </div>

          {/* Social Links Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-neutral-400">
            <a
              href="https://github.com/Vaib4496"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center gap-1 group"
            >
              <span>GitHub</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <span className="text-neutral-700">•</span>
            <a
              href="https://linkedin.com/in/vaibhav-chhajer-3b450a113"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center gap-1 group"
            >
              <span>LinkedIn</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-400 selection:bg-purple-900">
              vaibhavchhajer44@gmail.com
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Live DocSense AI Chat Widget */}
        <div className="lg:col-span-5">
          {chatWidget ?? <DocSenseChat />}
        </div>
      </div>
    </section>
  );
}
