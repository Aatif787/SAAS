"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, ShieldCheck, Zap, UserCheck } from 'lucide-react';

const steps = [
  {
    title: "Home Health Assessment",
    description: "Our experts perform a 50-point inspection of your home's systems to create a personalized maintenance plan.",
    icon: Search,
  },
  {
    title: "Preventative Care",
    description: "Scheduled quarterly visits to handle essential tasks, from filter changes to system tuning, preventing costly repairs.",
    icon: ShieldCheck,
  },
  {
    title: "On-Demand Services",
    description: "Need something fixed now? Use our app for priority booking on plumbing, electrical, and handyman tasks.",
    icon: Zap,
  },
  {
    title: "Dedicated Home Expert",
    description: "You'll have a single point of contact who knows your home inside and out, managing every project for you.",
    icon: UserCheck,
  }
];

export default function ProcessSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.06, scale: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-[#E8761A] to-[#F5A623] rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.04, scale: 1 } : {}}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-gradient-to-br from-[#0A1E3D] to-[#1A3A5C] rounded-full blur-[100px]"
      />

      <div className="container-xl relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <span className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
              How it Works
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair), serif' }}
            className="text-5xl md:text-7xl font-bold text-[#0A1E3D] tracking-tighter"
          >
            A Smarter Way to <br />
            <span className="text-gradient-animate">Manage Your Home</span>
          </motion.h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: 0.2 + index * 0.15, 
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ 
                    y: -16, 
                    scale: 1.02,
                    transition: { duration: 0.4 }
                  }}
                  className="relative h-full p-10 rounded-2xl bg-white border border-[#E8761A]/10 shadow-xl shadow-[#0A1E3D]/5 overflow-hidden"
                >
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-[#E8761A] via-[#F5A623] to-[#E8761A] animate-spin-slow" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-[2px] rounded-xl bg-white" />
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E8761A]/0 via-[#E8761A]/20 to-[#E8761A]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

                  {/* Shine sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-[#E8761A]/10 to-[#F5A623]/10 rounded-2xl flex items-center justify-center text-[#E8761A] mb-8 relative z-10 group-hover:from-[#E8761A] group-hover:to-[#F5A623] group-hover:text-white transition-all duration-500"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0A1E3D] mb-4 relative z-10 group-hover:text-[#E8761A] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#0A1E3D]/50 leading-relaxed relative z-10 group-hover:text-[#0A1E3D]/70 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Step number */}
                  <motion.div 
                    className="absolute -bottom-8 -right-4 text-[150px] font-black text-[#0A1E3D]/[0.02] group-hover:text-[#E8761A]/[0.05] transition-colors duration-500 select-none leading-none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
