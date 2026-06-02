"use client";

import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroSection({ scrollYProgress }: HeroSectionProps) {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#FDFBF7]/90 z-10" />
        <img 
          src="/images/about-hero.jpg" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000';
          }}
        />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="container-xl relative z-20 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-ims-gold font-bold tracking-[0.4em] uppercase text-xs mb-6 block"
        >
          Our Legacy & Future
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0A1E3D] mb-8 tracking-tighter"
        >
          Crafting <span className="gold-shimmer-text">Perfection</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-24 h-1 bg-ims-gold mx-auto"
        />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent z-20" />
    </section>
  );
}
