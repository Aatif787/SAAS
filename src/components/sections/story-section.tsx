"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   STORY — Narrative focus on trust and legacy
   Matches the fromanother.love storytelling section
   ═══════════════════════════════════════════════════════════════ */

export default function StorySection() {
  return (
    <section className="py-40 px-6 md:px-16 lg:px-24 bg-[#121214]">
      <div className="container-xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Narrative */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C5A059] mb-8 block">Our Story</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#FAF6F0] leading-[1.1] mb-12">
              Driven by <br />
              <span className="italic font-normal text-[#C5A059]">Relentless Trust.</span>
            </h2>
            <div className="space-y-8 max-w-2xl">
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Since 1995, IMS Group has been more than a conglomerate; we are a legacy of excellence. 
                What began as a vision for quality healthcare has evolved into a powerhouse spanning infrastructure, 
                manufacturing, and lifestyle solutions.
              </p>
              <p className="text-base text-white/40 leading-relaxed">
                Our journey is defined by the lives we touch and the cities we help build. From life-saving hospital 
                interventions to the steel that supports our skyline, every vertical is united by a single purpose: 
                to build a future you can trust.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-12 border-t border-white/5 pt-12">
              <div>
                <span className="text-3xl font-serif text-[#FAF6F0] block mb-1">28+ Years</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Of Excellence</span>
              </div>
              <div>
                <span className="text-3xl font-serif text-[#FAF6F0] block mb-1">500+ Projects</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Delivered Worldwide</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Abstract Visual */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="aspect-[4/5] relative rounded-full overflow-hidden border border-white/10"
          >
            <Image 
              src="/images/corporate-hub-4k.png" 
              alt="IMS Impact" 
              fill 
              className="object-cover opacity-60 hover:scale-110 transition-transform duration-[3s]" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#121214] to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay" />
          </motion.div>
          
          {/* Floating Label */}
          <div className="absolute -right-8 top-1/2 -rotate-90 origin-right">
             <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-white/20 whitespace-nowrap">
               ESTABLISHED 1995 • LUCKNOW INDIA
             </span>
          </div>
        </div>
      </div>
    </section>
  );
}
