"use client";

import { motion, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ServiceCard from './components/ServiceCard';
import ServiceDetail from './components/ServiceDetail';
import { servicesData } from './servicesData';
import { PremiumCTABanner } from './components/PremiumCTABanner';
import HeroSection from './components/HeroSection';

export default function ServicesClient() {
  const [selectedService, setSelectedService] = useState<null | typeof servicesData[0]>(null);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-100px' });

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <HeroSection scrollYProgress={scrollYProgress} />
      
      {/* Services Grid */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: inView ? 0.3 : 0, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="py-20"
      >
        <div className="container-xl">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: inView ? 0.5 : 0, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-[#0A1E3D] mb-8 tracking-tighter"
            >
              Mastering the <span className="text-ims-gold">Art of Living</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: inView ? 0.7 : 0, duration: 0.8 }}
              className="text-xl text-ims-charcoal/70 max-w-2xl mx-auto"
            >
              From architectural blueprints to smart home integration, our services define the pinnacle of modern luxury.
            </motion.p>
          </div>
          
          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: inView ? 0.5 + (index * 0.1) : 0, duration: 0.8 }}
                onClick={() => setSelectedService(service)}
                className="cursor-pointer"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#0A1E3D]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-6xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#0A1E3D]/10 flex items-center justify-center text-[#0A1E3D] hover:bg-[#0A1E3D]/20 transition-all z-50"
            >
              <span className="text-2xl">×</span>
            </button>
            <div className="h-full overflow-y-auto">
              <ServiceDetail service={selectedService} />
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Premium CTA Banner */}
      <PremiumCTABanner />
    </div>
  );
}
