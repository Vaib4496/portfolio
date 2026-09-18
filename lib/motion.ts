"use client";

import { useReducedMotion, type Variants } from "motion/react";

/**
 * Common motion animation variants for portfolio sections
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Custom hook to safely wrap motion variants.
 * Automatically disables animations if prefers-reduced-motion is true.
 */
export function useAccessibleVariants(variants: Variants): Variants {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: { duration: 0 },
      },
    };
  }

  return variants;
}
