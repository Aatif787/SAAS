"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { number: 10000, suffix: "+", label: "Projects", description: "Completed Excellence", icon: "🏗️" },
  { number: 25, suffix: "+", label: "Years", description: "Industry Leadership", icon: "⏱️" },
  { number: 98, suffix: "%", label: "Rating", description: "Client Satisfaction", icon: "⭐" },
  { number: 500, suffix: "+", label: "Experts", description: "Craftsmen & Designers", icon: "👷" },
];

function AnimatedCounter({ target, suffix = '', duration = 2.5, trigger }: { target: number; suffix?: string; duration?: number; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Premium easing
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [trigger, target, duration]);
  
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function StatisticsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ opacity }}
      className="py-32 relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(#E8761A 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        initial={{ opacity: 0, x: -150, y: -50 }}
        animate={isInView ? { opacity: 0.12, x: 0, y: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-10 w-[300px] h-[300px] bg-gradient-to-br from-[#E8761A] to-[#F5A623] rounded-full blur-[100px] animate-float-gentle"
      />
      <motion.div
        initial={{ opacity: 0, x: 150, y: 50 }}
        animate={isInView ? { opacity: 0.08, x: 0, y: 0 } : {}}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-20 right-10 w-[250px] h-[250px] bg-gradient-to-br from-[#0A1E3D] to-[#1A3A5C] rounded-full blur-[80px] animate-float-rotate"
      />

      <div className="container-xl relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
          style={{ fontFamily: 'var(--font-playfair), serif' }} 
          className="text-5xl md:text-7xl font-bold text-[#0A1E3D] mb-24 text-center tracking-tight"
        >
          Trusted by <span className="text-gradient-animate">5,000+</span> Homeowners
        </motion.h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 80, scale: 0.85 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.3 + index * 0.15, 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center group"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  y: -8
                }}
                transition={{ duration: 0.5 }}
                className="relative w-28 h-28 flex items-center justify-center mb-8"
              >
                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E8761A] via-[#F5A623] to-[#E8761A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ padding: '3px' }}
                >
                  <div className="w-full h-full bg-[#FDFBF7] rounded-2xl" />
                </motion.div>

                {/* Main container */}
                <div className="relative w-full h-full bg-gradient-to-br from-[#0A1E3D]/5 to-[#0A1E3D]/10 rounded-2xl flex items-center justify-center border border-[#0A1E3D]/10 group-hover:from-[#E8761A] group-hover:to-[#F5A623] group-hover:border-transparent transition-all duration-500 overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>

                  <span className="text-3xl md:text-4xl font-bold text-[#E8761A] group-hover:text-white transition-colors duration-500 relative z-10">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} trigger={isInView} />
                  </span>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E8761A]/0 via-[#E8761A]/30 to-[#E8761A]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-xl font-bold text-[#0A1E3D] mb-2 group-hover:text-[#E8761A] transition-colors duration-300"
              >
                {stat.label}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-[#0A1E3D]/40 text-sm font-medium"
              >
                {stat.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
