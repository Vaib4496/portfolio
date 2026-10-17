"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const ROLES: readonly string[] = [
  "Frontend Architect",
  "Production AI Engineer",
  "Tech Lead (6+ Yrs Exp)",
  "RAG Systems Builder",
  "Next.js & React Specialist",
] as const;

const TICKER_INTERVAL_MS = 3000;

export function RoleTicker() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, TICKER_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="inline-flex items-center min-w-[210px] sm:min-w-[240px] h-7"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="px-2.5 py-1 rounded bg-purple-950/40 border border-purple-800/50 text-purple-300 font-mono text-xs sm:text-[13px] font-medium tracking-tight shadow-sm shadow-purple-950/30 whitespace-nowrap"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
