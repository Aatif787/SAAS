"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/ui/smooth-scroll";

const SteelHero = dynamic(() => import("@/components/steel/steel-hero"));
const SteelBrandStory = dynamic(() => import("@/components/steel/steel-brand-story"));
const SteelStatsRibbon = dynamic(() => import("@/components/steel/steel-stats-ribbon"));
const SteelProductExperience = dynamic(() => import("@/components/steel/steel-product-experience"));
const SteelAISystems = dynamic(() => import("@/components/steel/steel-ai-systems"));
const SteelProjectShowcase = dynamic(() => import("@/components/steel/steel-project-showcase"));

export default function IMSteelPage() {
  return (
    <SmoothScroll>
      <div className="relative z-10">
        <SteelHero />
        <SteelBrandStory />
        <SteelStatsRibbon />
        <SteelProductExperience />
        <SteelAISystems />
        <SteelProjectShowcase />
      </div>
    </SmoothScroll>
  );
}
