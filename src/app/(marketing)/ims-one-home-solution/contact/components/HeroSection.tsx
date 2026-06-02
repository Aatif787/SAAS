"use client";

import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

export default function ContactHero({ scrollYProgress }: HeroSectionProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-[#FDFBF7] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FDFBF7]/60 via-[#FDFBF7] to-[#FDFBF7] z-0" />
      
      <motion.div 
        style={{ opacity }}
        className="container-xl relative z-20 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-ims-gold font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block"
        >
          Start Your Transformation
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
          className="text-6xl md:text-8xl font-bold text-[#0A1E3D] mb-8 tracking-tighter"
        >
          Connect <span className="gold-shimmer-text">With Us</span>
        </motion.h1>
        <div className="w-24 h-[2px] bg-ims-gold mx-auto" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent z-20" />
    </section>
  );
}
