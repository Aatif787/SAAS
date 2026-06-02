"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

const transformations = [
  {
    id: 1,
    label: "Before",
    title: "Outdated Villa → Smart Sanctuary",
    location: "Gomti Nagar, Lucknow",
    duration: "4 Months",
    budget: "₹1.2 Cr",
    before: "/images/one-home/interior.png",
    after: "/images/one-home/kitchen.png",
    tags: ["Smart Automation", "Interior Overhaul", "Structural Upgrade"],
    quote: "We couldn't believe it was the same house. IMS turned our 20-year-old villa into a home that feels like the future.",
    client: "Rajesh & Priya Sharma",
  },
  {
    id: 2,
    label: "Before",
    title: "Bare Apartment → Curated Residence",
    location: "Hazratganj, Lucknow",
    duration: "6 Weeks",
    budget: "₹38 Lakh",
    before: "/images/projects/modern-apartment.png",
    after: "/images/projects/gourmet-kitchen.png",
    tags: ["Interior Design", "Custom Furniture", "Lighting Design"],
    quote: "Every corner tells a story. The attention to detail is something I've only seen in five-star hotels.",
    client: "Dr. Ananya Mehta",
  },
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 5), 95));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 5), 95));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none group"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full) */}
      <div className="absolute inset-0">
        <Image src={after} alt="After" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
          After
        </div>
      </div>

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <div className="absolute inset-0" style={{ width: `${100 / (sliderPos / 100)}%` }}>
          <Image src={before} alt="Before" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#0A1E3D]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
          Before
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8761A]">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-[#E8761A] rounded-full" />
            <div className="w-0.5 h-4 bg-[#E8761A] rounded-full" />
          </div>
        </div>
      </div>

      {/* Instruction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-full opacity-80 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
        ← Drag to Compare →
      </div>
    </div>
  );
}

export default function TransformationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section ref={containerRef} className="py-36 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#E8761A] to-transparent rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4 pointer-events-none"
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
            Real Transformations
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              className="text-5xl md:text-7xl font-bold text-[#0A1E3D] tracking-tighter"
            >
              See the{" "}
              <span className="text-gradient-animate">Difference</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[#0A1E3D]/50 text-lg max-w-2xl mx-auto mt-6"
          >
            Drag the slider to witness the IMS transformation — from ordinary to extraordinary.
          </motion.p>
        </div>

        {/* Transformations */}
        <div className="space-y-32">
          {transformations.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Slider */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <BeforeAfterSlider before={t.before} after={t.after} />
              </div>

              {/* Info */}
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {t.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-2 bg-[#E8761A]/10 text-[#E8761A] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#E8761A]/20 hover:bg-[#E8761A] hover:text-white transition-all duration-300 cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                    className="text-3xl md:text-4xl font-bold text-[#0A1E3D] mb-4 tracking-tight leading-tight"
                  >
                    {t.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    {[
                      { label: "Location", value: t.location },
                      { label: "Duration", value: t.duration },
                      { label: "Investment", value: t.budget },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A1E3D]/30">{m.label}</span>
                        <span className="text-sm font-bold text-[#0A1E3D]">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative p-8 bg-white rounded-2xl border border-[#E8761A]/10 shadow-lg shadow-[#0A1E3D]/5 mb-8 group hover:border-[#E8761A]/30 hover:shadow-xl hover:shadow-[#E8761A]/10 transition-all duration-500">
                    <div className="absolute -top-3 left-8 text-5xl text-[#E8761A] font-serif leading-none">"</div>
                    <p className="text-[#0A1E3D]/70 leading-relaxed italic mt-2">{t.quote}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#E8761A] mt-4">— {t.client}</p>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="/ims-one-home-solution/projects"
                    whileHover={{ x: 6 }}
                    className="inline-flex items-center gap-3 text-[#E8761A] font-bold uppercase tracking-widest text-xs group"
                  >
                    View Full Case Study
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="w-8 h-8 rounded-full border border-[#E8761A]/30 flex items-center justify-center group-hover:bg-[#E8761A] group-hover:border-[#E8761A] transition-all duration-300"
                    >
                      <ArrowRight size={14} className="group-hover:text-white transition-colors" />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
