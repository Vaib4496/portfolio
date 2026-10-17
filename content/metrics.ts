export interface MetricItem {
  id: string;
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  source?: string;
}

export const HERO_METRICS: MetricItem[] = [
  {
    id: "tbt",
    prefix: "−",
    value: 60,
    suffix: "%",
    decimals: 0,
    label: "Total Blocking Time via Web Worker offloading",
    source: "Happiest Minds",
  },
  {
    id: "availability",
    prefix: "",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Checkout availability during high-traffic launches",
    source: "Publicis Sapient",
  },
  {
    id: "velocity",
    prefix: "+",
    value: 25,
    suffix: "%",
    decimals: 0,
    label: "Feature velocity via AI-assisted workflows",
    source: "Publicis Sapient",
  },
  {
    id: "dependency",
    prefix: "−",
    value: 80,
    suffix: "%",
    decimals: 0,
    label: "Engineering dependency via Zeus Admin Engine",
    source: "Mosaic Wellness",
  },
];
