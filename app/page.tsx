import { Hero } from "@/components/sections/Hero";
import { MetricsRow } from "@/components/sections/MetricsRow";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <Hero />
      <MetricsRow />
    </div>
  );
}
