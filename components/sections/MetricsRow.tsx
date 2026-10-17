"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_METRICS, type MetricItem } from "@/content/metrics";
import { useCountUp } from "@/lib/hooks/useCountUp";

interface MetricCardProps {
  item: MetricItem;
  isVisible: boolean;
}

function MetricCard({ item, isVisible }: MetricCardProps) {
  const animatedNumber = useCountUp({
    end: item.value,
    start: 0,
    decimals: item.decimals ?? 0,
    duration: 1800,
    enabled: isVisible,
  });

  const fullDisplayValue = `${item.prefix ?? ""}${animatedNumber}${item.suffix ?? ""}`;
  const accessibleLabel = `${item.prefix ?? ""}${item.value}${item.suffix ?? ""} - ${item.label}`;

  return (
    <div
      className="text-left space-y-1.5 group select-none"
      role="group"
      aria-label={accessibleLabel}
    >
      {/* Metric Value */}
      <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 tabular-nums">
        <span aria-hidden="true">{fullDisplayValue}</span>
        <span className="sr-only">{accessibleLabel}</span>
      </div>

      {/* Metric Label */}
      <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-snug">
        {item.label}
      </p>

      {/* Metric Source Footnote */}
      {item.source && (
        <p className="font-mono text-[10px] text-neutral-500 pt-0.5">
          {item.source}
        </p>
      )}
    </div>
  );
}

interface MetricsRowProps {
  metrics?: MetricItem[];
}

export function MetricsRow({ metrics = HERO_METRICS }: MetricsRowProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="border-y border-white/10 py-10 sm:py-12 my-12 sm:my-16 relative"
      aria-label="Key Performance Architecture Metrics"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            item={metric}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}
