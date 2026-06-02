"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Vikram Malhotra",
    role: "CEO, TechSphere",
    comment: "The level of detail in the 3D planning phase alone was incredible. They didn't just build a home; they engineered a sanctuary.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Dr. Sarah D'Souza",
    role: "Leading Surgeon",
    comment: "As someone who values precision, IMS blew me away. Their smart automation is truly intuitive, not just a gimmick.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Rohan Kapoor",
    role: "Real Estate Developer",
    comment: "I've seen many luxury projects, but the craftsmanship IMS delivers is in a different league. The materials are museum-grade.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgSkew = useTransform(scrollYProgress, [0, 1], [15, 5]);

  return (
    <section ref={containerRef} className="py-28 overflow-hidden relative">
      {/* Animated skewed background */}
      <motion.div
        style={{ skewX: bgSkew }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#E8761A]/5 to-transparent -translate-y-20 pointer-events-none"
      />

      {/* Floating orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.06, scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-20 w-64 h-64 bg-[#E8761A] rounded-full blur-[100px] animate-float-gentle"
      />

      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="lg:w-2/3">
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#E8761A] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              Client Stories
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
                className="text-5xl md:text-6xl font-bold text-[#0A1E3D] tracking-tight"
              >
                The Verdict of <br />
                <span className="text-gradient-animate">Exceptional Living</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/3 flex items-center gap-4"
          >
            <div className="flex -space-x-4">
              {testimonials.map((t, i) => (
                <motion.img
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  src={t.image}
                  alt=""
                  className="w-12 h-12 rounded-full border-4 border-[#FDFBF7] object-cover hover:scale-110 hover:z-10 transition-transform duration-300 relative"
                />
              ))}
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#0A1E3D]/30">500+ Happy Families</span>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.2 + i * 0.15,
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative"
            >
              <motion.div
                whileHover={{
                  y: -12,
                  scale: 1.01,
                  transition: { duration: 0.4 }
                }}
                className="relative p-10 rounded-2xl bg-white border border-[#0A1E3D]/8 overflow-hidden h-full"
              >
                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#E8761A]/0 via-[#E8761A]/20 to-[#E8761A]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-[#E8761A]/0 group-hover:border-[#E8761A]/30 transition-colors duration-500 pointer-events-none" />

                {/* Shine sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Quote icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="absolute top-10 right-10"
                >
                  <Quote
                    className="text-[#E8761A]/15 group-hover:text-[#E8761A]/30 transition-colors duration-500"
                    size={60}
                  />
                </motion.div>

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 + j * 0.05 }}
                      whileHover={{ scale: 1.3, rotate: 20 }}
                    >
                      <Star size={14} className="fill-[#E8761A] text-[#E8761A]" />
                    </motion.div>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-lg font-medium leading-relaxed mb-10 text-[#0A1E3D]/80 group-hover:text-[#0A1E3D] transition-colors duration-300">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className="font-bold text-[#0A1E3D] group-hover:text-[#E8761A] transition-colors duration-300">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#0A1E3D]/40 font-bold uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#E8761A] to-[#F5A623] rounded-b-2xl"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
