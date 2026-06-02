"use client";

import { motion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Timeline from './components/Timeline';
import MissionVision from './components/MissionVision';
import AchievementCounters from './components/AchievementCounters';
import { HeroSection } from './components/HeroSection';
import CTASection from '../sections/CTASection';

export default function AboutClient() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-100px' });
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'values'>('overview');
  
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <HeroSection scrollYProgress={scrollYProgress} />
      
      {/* About Content */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: inView ? 0.3 : 0, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="py-20"
      >
        <div className="container-xl">
          <motion.div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: inView ? 0.5 : 0, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1E3D] mb-8"
            >
              Defining Luxury Living
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: inView ? 0.7 : 0, duration: 0.8 }}
              className="text-xl text-ims-charcoal/70 max-w-2xl mx-auto"
            >
              IMS One Home Solution is where craftsmanship meets innovation. We don&apos;t just build homes; we curate lifestyles.
            </motion.p>
          </motion.div>
          
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: inView ? 0.9 : 0, duration: 0.8 }}
            className="mb-12 flex justify-center px-4"
          >
            <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-4 p-2 bg-[#0A1E3D]/5 rounded-2xl w-full max-w-md sm:max-w-none mx-auto">
              {(['overview', 'history', 'values'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${activeTab === tab ? 'text-white bg-[#0A1E3D] shadow-lg' : 'text-[#0A1E3D]/60 hover:text-[#0A1E3D] transition-all'} flex-1 sm:flex-initial text-center px-4 sm:px-8 py-3 rounded-xl text-sm font-semibold capitalize whitespace-nowrap`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: inView ? 1.1 : 0, duration: 0.8 }}
            className="min-h-[400px]"
          >
            {activeTab === 'overview' && (
              <div className="space-y-20">
                <MissionVision />
                <AchievementCounters />
              </div>
            )}
            
            {activeTab === 'history' && (
              <Timeline />
            )}
            
            {activeTab === 'values' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-[#0A1E3D]">Our Core Values</h3>
                  <p className="text-ims-charcoal/70 leading-relaxed">
                    At IMS One Home Solution, we believe that luxury is in the details. Our commitment to quality, transparency, and innovation drives everything we do.
                  </p>
                  <ul className="space-y-4">
                    {['Excellence in Craftsmanship', 'Technological Innovation', 'Uncompromising Integrity', 'Client-Centric Approach'].map((value, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-ims-gold rounded-full" />
                        <span className="font-medium text-[#0A1E3D]">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="aspect-square bg-[#0A1E3D]/5 rounded-3xl overflow-hidden">
                   {/* Placeholder for value image */}
                   <div className="w-full h-full flex items-center justify-center text-ims-gold/20 font-bold text-4xl">QUALITY</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
