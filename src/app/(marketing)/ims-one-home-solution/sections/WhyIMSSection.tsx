"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Clock, Award, Headphones, Wrench, Star } from 'lucide-react';

const pillars = [
  {
    icon: Shield,
    number: "01",
    title: "Fully Insured & Certified",
    body: "Every technician carries ₹50L liability insurance. All work is backed by our 2-year service guarantee — no asterisks, no fine print.",
    stat: "₹50L",
    statLabel: "Liability Cover",
  },
  {
    icon: Clock,
    number: "02",
    title: "90-Minute Response",
    body: "Our emergency concierge dispatches a certified expert to your door within 90 minutes, 365 days a year — including holidays.",
    stat: "90 min",
    statLabel: "Emergency SLA",
  },
  {
    icon: Award,
    number: "03",
    title: "ISO 9001 Certified",
    body: "Our processes are audited annually against international quality standards. You get the same precision as a five-star hotel — in your home.",
    stat: "ISO",
    statLabel: "9001 Certified",
  },
  {
    icon: Headphones,
    number: "04",
    title: "Dedicated Home Manager",
    body: "One expert who knows every pipe, wire, and wall of your home. No repeating yourself. No strangers. Just seamless continuity.",
    stat: "1:1",
    statLabel: "Dedicated Expert",
  },
  {
    icon: Wrench,
    number: "05",
    title: "500+ Skilled Craftsmen",
    body: "Architects, interior designers, electricians, plumbers, smart-home engineers — all vetted, background-checked, and IMS-certified.",
    stat: "500+",
    statLabel: "Vetted Experts",
  },
  {
    icon: Star,
    number: "06",
    title: "4.9★ Average Rating",
    body: "Across 10,000+ completed projects, our clients rate us 4.9 out of 5. We don't just meet expectations — we architect them.",
    stat: "4.9★",
    statLabel: "Client Rating",
  },
];

export default function WhyIMSSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={containerRef} className="py-36 bg-[#0A1E3D] relative overflow-hidden">
      <motion.div
        style={{ y: bgY, backgroundImage: `radial-gradient(#E8761A 1px, transparent 1px)`, backgroundSize: '50px 50px' }}
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
      />

      {/* Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-[#E8761A] to-[#F5A623] rounded-full blur-[150px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.08, scale: 1 } : {}}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#F5A623] rounded-full blur-[120px]"
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
            The IMS Standard
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter"
            >
              Why 5,000 Families <br />
              <span className="text-gradient-animate">Choose IMS</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/40 text-lg max-w-2xl mx-auto mt-6"
          >
            Six non-negotiable pillars that separate IMS One Home from every other service in the market.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80, scale: 0.92 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                  className="relative p-10 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm overflow-hidden h-full"
                >
                  {/* Hover fill */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8761A]/20 to-[#F5A623]/10 scale-y-0 group-hover:scale-y-100 transition-transform duration-600 origin-bottom rounded-2xl" />

                  {/* Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E8761A]/0 via-[#E8761A]/20 to-[#E8761A]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

                  {/* Shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Number */}
                  <div className="absolute top-6 right-8 text-6xl font-black text-white/[0.04] group-hover:text-[#E8761A]/10 transition-colors duration-500 select-none">
                    {p.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 bg-gradient-to-br from-[#E8761A]/20 to-[#F5A623]/10 rounded-xl flex items-center justify-center text-[#E8761A] mb-8 group-hover:from-[#E8761A] group-hover:to-[#F5A623] group-hover:text-white transition-all duration-500 relative z-10"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  {/* Stat badge */}
                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <span className="text-2xl font-black text-[#E8761A] group-hover:text-[#F5A623] transition-colors duration-300">
                      {p.stat}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors duration-300">
                      {p.statLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 relative z-10 group-hover:text-[#F5A623] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm relative z-10 group-hover:text-white/60 transition-colors duration-300">
                    {p.body}
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
      </div>
    </section>
  );
}
