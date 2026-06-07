"use client";

import HeroSection from "./components/sections/HeroSection";
import SearchBarSection from "./components/sections/SearchBarSection";
import StatsSection from "./components/sections/StatsSection";
import FeaturedListingsSection from "./components/sections/FeaturedListingsSection";
import NeighborhoodsSection from "./components/sections/NeighborhoodsSection";
import WorkflowSection from "./components/sections/WorkflowSection";
import ServicesSection from "./components/sections/ServicesSection";
import MortgageCalculatorSection from "./components/sections/MortgageCalculatorSection";
import AgentSpotlightSection from "./components/sections/AgentSpotlightSection";
import BlogSection from "./components/sections/BlogSection";

export default function IMSEstateEmpireHome() {
  return (
    <div>
      <HeroSection />
      <SearchBarSection />
      <StatsSection />
      <FeaturedListingsSection />
      <NeighborhoodsSection />
      <WorkflowSection />
      <ServicesSection />
      <MortgageCalculatorSection />
      <AgentSpotlightSection />
      <BlogSection />
    </div>
  );
}
