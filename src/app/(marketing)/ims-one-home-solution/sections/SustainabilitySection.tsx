"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Sun, Wind, Droplets } from 'lucide-react';

const initiatives = [
  { icon: Sun, title: "Solar Integration", desc: "Nano-ceramic glass solar tiles that seamlessly merge with your architectural vision.", color: "#F5A623" },
  { icon: Wind, title: "Neural HVAC", desc: "Energy-harvesting ventilation that recycles 95% of thermal energy in real-time.", color: "#E8761A" },
  { icon: Droplets, title: "Atmospheric Water", desc: "Generating pure drinking water from humidity using sustainable molecular filters.", color: "#0A1E3D" },
  { icon: Leaf, title: "Carbon Positive", desc: "Every IMS estate is engineered to offset 120% of its operational footprint.", color: "#E8761A" },
];

export default function SustainabilitySection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Parallax Background Orb */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#E8761A]/8 to-transparent rounded-full blur-[120px] -z-10 translate-x-1/3"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0A1E3D]/5 to-transparent rounded-full blur-[100px] -z-10 -translate-x-1/3"
      />

      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-20 items-end mb-24">
          <div className="lg:w-3/5">
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block"
            >
              The Next Epoch
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
                className="text-5xl md:text-7xl font-bold text-[#0A1E3D] tracking-tight leading-[0.9]"
              >
                Luxury that <br />
                <span className="text-gradient-animate italic">Heals.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:w-2/5"
          >
            <p className="text-[#0A1E3D]/50 text-lg leading-relaxed font-light">
              We define the pinnacle of residential technology as a harmonious loop—where ultimate comfort and planetary health coexist in perfect equilibrium.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {initiatives.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.2 + index * 0.12,
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
                  className="relative p-10 rounded-2xl bg-white border border-[#0A1E3D]/8 overflow-hidden h-full"
                >
                  {/* Hover background fill */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8761A] to-[#F5A623] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom rounded-2xl" />

                  {/* Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E8761A]/0 via-[#E8761A]/25 to-[#E8761A]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

                  {/* Shine sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 bg-[#0A1E3D]/5 text-[#E8761A] rounded-xl flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition-all duration-500 relative z-10"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4 text-[#0A1E3D] group-hover:text-white transition-colors duration-300 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-[#0A1E3D]/50 leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-300 relative z-10">
                    {item.desc}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-[#E8761A]/20 group-hover:border-white/30 transition-colors duration-300 relative z-10" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
