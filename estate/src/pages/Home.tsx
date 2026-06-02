import HeroSection from '@/sections/HeroSection'
import SearchBarSection from '@/sections/SearchBarSection'
import StatsSection from '@/sections/StatsSection'
import FeaturedListingsSection from '@/sections/FeaturedListingsSection'
import NeighborhoodsSection from '@/sections/NeighborhoodsSection'
import WorkflowSection from '@/sections/WorkflowSection'
import ServicesSection from '@/sections/ServicesSection'
import MortgageCalculatorSection from '@/sections/MortgageCalculatorSection'
import AgentSpotlightSection from '@/sections/AgentSpotlightSection'
import BlogSection from '@/sections/BlogSection'

export default function Home() {
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
  )
}
