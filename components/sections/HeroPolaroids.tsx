"use client";

import { motion, useReducedMotion } from "motion/react";

interface PolaroidProps {
  initialRotate: number;
  hoverRotate?: number;
  className: string;
  floatYRange?: [number, number];
  caption: string;
  children: React.ReactNode;
}

function PolaroidCard({
  initialRotate,
  hoverRotate = 0,
  className,
  floatYRange = [-4, 4],
  caption,
  children,
}: PolaroidProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute pointer-events-auto select-none rounded-xl p-2 pb-3 bg-neutral-900/90 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/80 transition-colors duration-300 hover:border-purple-500/60 ${className}`}
      initial={
        shouldReduceMotion
          ? { opacity: 1, rotate: initialRotate }
          : { opacity: 0, scale: 0.9, rotate: initialRotate, y: 12 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1, rotate: initialRotate, y: 0 }
          : {
              opacity: 1,
              scale: 1,
              rotate: initialRotate,
              y: [floatYRange[0], floatYRange[1], floatYRange[0]],
              transition: {
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                y: {
                  repeat: Infinity,
                  duration: 5 + Math.abs(initialRotate) * 0.2,
                  ease: "easeInOut",
                },
              },
            }
      }
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.08,
              rotate: hoverRotate,
              zIndex: 40,
              boxShadow:
                "0 25px 50px -12px rgba(124, 58, 237, 0.35), 0 0 25px rgba(124, 58, 237, 0.2)",
              transition: { type: "spring", stiffness: 350, damping: 22 },
            }
      }
      tabIndex={0}
      role="region"
      aria-label={caption}
    >
      <div className="rounded-lg bg-neutral-950/90 border border-neutral-800/80 p-2.5 overflow-hidden">
        {children}
      </div>
      <p className="font-mono text-[9px] text-neutral-400 text-center mt-2 tracking-wide font-medium">
        {caption}
      </p>
    </motion.div>
  );
}

export function HeroPolaroids() {
  return (
    <div
      className="hidden lg:block absolute inset-0 pointer-events-none z-20 overflow-visible"
      aria-hidden="true"
    >
      {/* Top Left Snapshot: RAG Pipeline */}
      <PolaroidCard
        initialRotate={-11}
        className="-top-8 -left-8 xl:-left-12 w-44"
        floatYRange={[-5, 5]}
        caption="DocSense Pipeline"
      >
        <div className="h-28 flex flex-col justify-center items-center text-center px-1">
          <span className="font-mono text-[10px] text-purple-400 mb-1 font-semibold tracking-tight">
            RAG Architecture
          </span>
          <span className="text-[11px] font-semibold text-neutral-200 leading-tight">
            500w Chunking · Cosine 0.78
          </span>
          <div className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Supabase pgvector</span>
          </div>
        </div>
      </PolaroidCard>

      {/* Bottom Left Snapshot: Happiest Minds DSM Metrics */}
      <PolaroidCard
        initialRotate={6}
        className="bottom-4 -left-10 xl:-left-16 w-48"
        floatYRange={[4, -4]}
        caption="DSM Analytics Pod"
      >
        <div className="h-28 flex flex-col justify-between p-0.5">
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400">
            <span className="font-semibold text-neutral-300">Happiest Minds</span>
            <span className="text-emerald-400">Module Lead</span>
          </div>
          <div className="font-mono text-2xl font-bold text-white tracking-tight">
            +35%
          </div>
          <p className="text-[10px] text-neutral-300 leading-tight">
            Delivery performance visibility with DSM Engineering Dashboard
          </p>
        </div>
      </PolaroidCard>

      {/* Top Right Snapshot: Mosaic Wellness / Zeus Admin */}
      <PolaroidCard
        initialRotate={12}
        className="-top-6 -right-6 xl:-right-10 w-44"
        floatYRange={[-6, 4]}
        caption="Zeus Admin Engine"
      >
        <div className="h-28 flex flex-col justify-center items-center text-center p-1">
          <span className="font-mono text-xs font-bold text-purple-400 tracking-tight">
            Mosaic Wellness
          </span>
          <span className="font-mono text-2xl font-extrabold text-white mt-1 tracking-tight">
            −80%
          </span>
          <span className="text-[10px] text-neutral-300 leading-tight mt-1">
            Content dependency via Zeus Admin Engine
          </span>
        </div>
      </PolaroidCard>
    </div>
  );
}
