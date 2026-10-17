"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  enabled?: boolean;
}

/**
 * Custom hook to animate count-up numbers.
 * Respects accessibility: Instantly renders the final value if `prefers-reduced-motion` is active.
 */
export function useCountUp({
  end,
  start = 0,
  duration = 1800,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions): string {
  const shouldReduceMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState<number>(() =>
    shouldReduceMotion ? end : start
  );

  useEffect(() => {
    // Instantly commit the final target value if reduced motion is requested
    if (shouldReduceMotion) {
      setCurrentValue(end);
      return;
    }

    if (!enabled) {
      setCurrentValue(start);
      return;
    }

    let animationFrameId: number;
    let startTime: number | null = null;

    // Smooth exponential ease-out curve for premium fluid feel
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const nextVal = start + (end - start) * easedProgress;
      setCurrentValue(nextVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrentValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, start, duration, enabled, shouldReduceMotion]);

  return currentValue.toFixed(decimals);
}
