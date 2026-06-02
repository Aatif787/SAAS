"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Medal, Star, Globe, Building2, Leaf } from 'lucide-react';

const awards = [
  {
    icon: Trophy,
    year: "2024",
    title: "Best Luxury Home Service",
    body: "National Real Estate Excellence Awards — Recognised for redefining the premium home management category in India.",
    org: "NREA India",
    color: "#F5A623",
  },
  {
    icon: Medal,
    year: "2024",
    title: "Top Smart Home Integrator",
    body: "CEDIA India Chapter — Awarded for outstanding IoT and home automation deployments across 500+ residences.",
    org: "CEDIA India",
    color: "#E8761A",
  },
  {
    icon: Globe,
    year: "2023",
    title: "Asia Pacific Design Award",
    body: "Honoured for the Palatial Residence project — a landmark in blending classical architecture with modern intelligence.",
    org: "APDA Council",
    color: "#F5A623",
  },
  {
    icon: Building2,
    year: "2023",
    title: "Best Construction Company",
    body: "UP Real Estate Summit — Recognised for structural excellence, on-time delivery, and zero-defect construction standards.",
    org: "UP RE Summit",
    color: "#E8761A",
  },
  {
    icon: Leaf,
    year: "2023",
    title: "Green Building Pioneer",
    body: "Indian Green Building Council — Certified for integrating solar, water harvesting, and carbon-neutral systems at scale.",
    org: "IGBC",
    color: "#F5A623",
  },
  {
    icon: Star,
    year: "2022",
    title: "Customer Delight Award",
    body: "JD Power India — Ranked #1 in customer satisfaction among premium home service providers in North India.",
    org: "JD Power India",
    color: "#E8761A",
  },
];

const pressLogos = [
  { name: "Economic Times", abbr: "ET" },
  { name: "Times of India", abbr: "TOI" },
  { name: "Business Standard", abbr: "BS" },
  { name: "Forbes India", abbr: "Forbes" },
  { name: "Architectural Digest", abbr: "AD" },
  { name: "Hindustan Times", abbr: "HT" },
];

export default function AwardsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="py-36 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#E8761A 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Recognition & Trust
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              className="text-5xl md:text-7xl font-bold text-[#0A1E3D] tracking-tighter"
            >
              Award-Winning <br />
              <span className="text-gradient-animate">Excellence</span>
            </motion.h2>
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-28">
          {awards.map((award, i) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 70, scale: 0.93 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                  className="relative p-10 rounded-2xl bg-white border border-[#0A1E3D]/8 overflow-hidden h-full"
                >
                  {/* Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E8761A]/0 via-[#E8761A]/20 to-[#E8761A]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

                  {/* Shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-6 right-6 px-3 py-1 bg-[#E8761A]/10 text-[#E8761A] text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-[#E8761A] group-hover:text-white transition-all duration-300">
                    {award.year}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 relative z-10 transition-all duration-500"
                    style={{ background: `${award.color}18`, color: award.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  {/* Org */}
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E8761A]/60 mb-3 relative z-10">
                    {award.org}
                  </p>

                  <h3 className="text-xl font-bold text-[#0A1E3D] mb-4 relative z-10 group-hover:text-[#E8761A] transition-colors duration-300">
                    {award.title}
                  </h3>
                  <p className="text-[#0A1E3D]/50 leading-relaxed text-sm relative z-10 group-hover:text-[#0A1E3D]/70 transition-colors duration-300">
                    {award.body}
                  </p>

                  {/* Bottom accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#E8761A] to-[#F5A623] rounded-b-2xl"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Press Logos Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0A1E3D]/30">
            As Featured In
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center"
          >
            {[...pressLogos, ...pressLogos].map((logo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 px-8 py-4 bg-white rounded-xl border border-[#0A1E3D]/8 shadow-sm hover:border-[#E8761A]/30 hover:shadow-lg hover:shadow-[#E8761A]/10 transition-all duration-300 cursor-default"
              >
                <span className="text-lg font-black text-[#0A1E3D]/30 hover:text-[#E8761A] transition-colors duration-300 whitespace-nowrap">
                  {logo.abbr}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
