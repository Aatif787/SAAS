"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';

const comparison = [
  { feature: "Single Point of Contact", oneHome: true, others: false },
  { feature: "24/7 Priority Emergency Support", oneHome: true, others: false },
  { feature: "Proactive Maintenance Visits", oneHome: true, others: false },
  { feature: "Verified & Background-Checked Staff", oneHome: true, others: "Sometimes" },
  { feature: "Digital Home Health Records", oneHome: true, others: false },
  { feature: "Fixed Quarterly Pricing", oneHome: true, others: false },
  { feature: "Insurance for Service Liability", oneHome: true, others: false },
];

export default function ComparisonSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-32 bg-[#FDFBF7] text-[#0A1E3D] relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `radial-gradient(#E8761A 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
      </div>

      {/* Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.06, scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#E8761A] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#E8761A] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            The IMS Advantage
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0A1E3D]"
            >
              One Solution vs.{" "}
              <span className="text-gradient-animate">The Rest</span>
            </motion.h2>
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] border border-[#0A1E3D]/8 overflow-hidden shadow-2xl shadow-[#0A1E3D]/5">
            {/* Table header */}
            <div className="grid grid-cols-3 border-b border-[#0A1E3D]/8">
              <div className="p-8 text-lg font-bold text-[#0A1E3D]">Service Feature</div>
              <div className="p-8 text-center bg-gradient-to-b from-[#E8761A]/5 to-transparent">
                <span className="text-[#E8761A] text-xl font-bold">IMS One Home</span>
              </div>
              <div className="p-8 text-center">
                <span className="text-[#0A1E3D]/40 font-bold">Standard Contractors</span>
              </div>
            </div>

            {/* Rows */}
            {comparison.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.6 }}
                className="grid grid-cols-3 border-b border-[#0A1E3D]/5 last:border-0 group hover:bg-[#E8761A]/3 transition-colors duration-300"
              >
                <div className="p-8 font-medium text-[#0A1E3D]/80 group-hover:text-[#0A1E3D] transition-colors flex items-center">
                  {item.feature}
                </div>
                <div className="p-8 text-center bg-[#E8761A]/3 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="inline-flex w-9 h-9 rounded-full bg-gradient-to-br from-[#E8761A] to-[#F5A623] items-center justify-center shadow-lg shadow-[#E8761A]/20"
                  >
                    <Check size={16} className="text-white" />
                  </motion.div>
                </div>
                <div className="p-8 text-center flex items-center justify-center">
                  {item.others === "Sometimes" ? (
                    <span className="text-[#0A1E3D]/40 text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#0A1E3D]/5 rounded-full">
                      Sometimes
                    </span>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex w-9 h-9 rounded-full bg-[#0A1E3D]/8 items-center justify-center"
                    >
                      <X size={16} className="text-[#0A1E3D]/25" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA below table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-[#0A1E3D]/60 mb-8 max-w-2xl mx-auto">
              Stop wasting time coordinating with multiple unreliable vendors. Join the elite membership and let us handle your home&apos;s legacy.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-12 py-5 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white font-bold rounded-full shadow-2xl shadow-[#E8761A]/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Get a Free Quote</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
