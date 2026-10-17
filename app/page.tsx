import { Hero } from "@/components/sections/Hero";
import { MetricsRow } from "@/components/sections/MetricsRow";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { RagPipeline } from "@/components/sections/RagPipeline";
import { StackGrid } from "@/components/sections/StackGrid";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <Hero />
      <MetricsRow />
      <SelectedWork />
      <RagPipeline />
      <StackGrid />
    </div>
  );
}
