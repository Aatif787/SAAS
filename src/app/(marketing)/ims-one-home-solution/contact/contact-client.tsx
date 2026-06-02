"use client";

import { motion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSection from './components/HeroSection';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import CTASection from '../sections/CTASection';

export default function ContactClient() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-100px' });
  
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection scrollYProgress={scrollYProgress} />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: inView ? 0.3 : 0, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="py-24"
      >
        <div className="container-xl">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: inView ? 0.5 : 0, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-[#0A1E3D] mb-8 tracking-tighter"
            >
              Let&apos;s Start Your <span className="text-ims-gold italic">Legacy</span>
            </motion.h2>
          </div>
          
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: inView ? 0.9 : 0, duration: 0.8 }}
            >
              <ContactForm />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: inView ? 0.9 : 0, duration: 0.8 }}
              className="space-y-12"
            >
              <ContactInfo />
              {/* Futuristic Map Placeholder */}
              <div className="aspect-video bg-[#0A1E3D]/5 rounded-3xl overflow-hidden border border-[#0A1E3D]/10 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-[#0A1E3D]/40 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="text-[#0A1E3D]/20 font-bold tracking-widest uppercase">Interactive Map Coming Soon</span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ims-gold rounded-full animate-ping" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <CTASection />
    </div>
  );
}
