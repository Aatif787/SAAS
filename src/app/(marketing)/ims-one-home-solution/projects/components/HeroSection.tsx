"use client";

import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

export default function ProjectsHero({ scrollYProgress }: HeroSectionProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-[#FDFBF7] flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Portfolio" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="container-xl relative z-20 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-ims-gold font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block"
        >
          Architectural Masterpieces
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
          className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
        >
          Our <span className="italic gold-shimmer-text">Portfolio</span>
        </motion.h1>
        <div className="w-24 h-[2px] bg-ims-gold mx-auto" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent z-20" />
    </section>
  );
}
