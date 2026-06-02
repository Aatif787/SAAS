"use client";

import Image from 'next/image';
import HeroContent from './components/HeroContent';
import StatisticsSection from './sections/StatisticsSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ProcessSection from './sections/ProcessSection';
import MembershipSection from './sections/MembershipSection';
import ComparisonSection from './sections/ComparisonSection';
import HomeBreakdown from './sections/HomeBreakdown';
import MaterialsSection from './sections/MaterialsSection';
import MobileAppPreview from './sections/MobileAppPreview';
import SustainabilitySection from './sections/SustainabilitySection';
import WhyIMSSection from './sections/WhyIMSSection';
import TransformationSection from './sections/TransformationSection';
import AwardsSection from './sections/AwardsSection';
import TeamSection from './sections/TeamSection';
import FAQSection from './sections/FAQSection';
import FinalCTASection from './sections/FinalCTASection';
import Footer from './components/Footer';
import PremiumNavbar from './components/PremiumNavbar';
import Preloader from './components/Preloader';
import { ScrollProgressBar, ScrollToTop, CursorGlow } from './components/ScrollEffects';
import CustomCursor from './components/CustomCursor';

import './styles/animations.css';

export default function IMSOneHomeClient() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-[#E8761A] selection:text-white relative overflow-x-hidden grain-overlay">
      {/* Global Premium Effects */}
      <CustomCursor />
      <CursorGlow />
      <ScrollProgressBar />
      <ScrollToTop />

      <Preloader />
      <PremiumNavbar />

      {/* ═══ CINEMATIC HERO ═══ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/one-home/hero.png"
            alt="IMS One Luxury Villa"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/50 to-[#0A1E3D]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E3D]/70 to-transparent" />
        </div>

        <div className="relative z-20 h-full flex flex-col justify-center">
          <HeroContent />
        </div>

        <div className="absolute bottom-12 right-12 z-30 flex flex-col items-end gap-6">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#E8761A]/70">Scroll to Explore</span>
          <div className="w-[2px] h-28 bg-white/10 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#E8761A] to-[#F5A623] animate-scroll-line shadow-[0_0_20px_rgba(232,118,26,0.6)]" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E8761A]/20 to-transparent z-30" />
      </section>

      {/* ═══ ALL SECTIONS ═══ */}
      <div className="relative z-30 bg-[#FDFBF7]">

        {/* 1 — How it Works */}
        <ProcessSection />
        <div className="section-divider-glow" />

        {/* 2 — Why IMS (dark section) */}
        <WhyIMSSection />
        <div className="section-divider-glow" />

        {/* 3 — Smart Home Breakdown (3D) */}
        <HomeBreakdown />
        <div className="section-divider-glow" />

        {/* 4 — Statistics */}
        <StatisticsSection />
        <div className="section-divider-glow" />

        {/* 5 — Before/After Transformations */}
        <TransformationSection />
        <div className="section-divider-glow" />

        {/* 6 — Materials (horizontal scroll) */}
        <MaterialsSection />
        <div className="section-divider-glow" />

        {/* 7 — Core Services (sticky scroll) */}
        <ServicesSection />
        <div className="section-divider-glow" />

        {/* 8 — Sustainability */}
        <SustainabilitySection />
        <div className="section-divider-glow" />

        {/* 9 — Awards & Press */}
        <AwardsSection />
        <div className="section-divider-glow" />

        {/* 10 — Membership Plans */}
        <MembershipSection />
        <div className="section-divider-glow" />

        {/* 11 — Comparison Table */}
        <ComparisonSection />
        <div className="section-divider-glow" />

        {/* 12 — Mobile App */}
        <MobileAppPreview />
        <div className="section-divider-glow" />

        {/* 13 — Team */}
        <TeamSection />
        <div className="section-divider-glow" />

        {/* 14 — Projects Portfolio */}
        <ProjectsSection />
        <div className="section-divider-glow" />

        {/* 15 — Testimonials */}
        <TestimonialsSection />
        <div className="section-divider-glow" />

        {/* 16 — FAQ */}
        <FAQSection />
        <div className="section-divider-glow" />

        {/* 17 — Final CTA (full-bleed) */}
        <FinalCTASection />

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line { animation: scroll-line 3s linear infinite; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>
    </div>
  );
}
