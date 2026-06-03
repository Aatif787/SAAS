"use client";

import { motion } from "framer-motion";
import { Play, Shield } from "lucide-react";
import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden border-t border-white/5">
      {/* Cyberpunk Background Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-[#00E676]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-80 bg-[#E8761A]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-pulse" />
      </div>

      <div className="container-xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="order-2 lg:order-1"
          >
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-[#E8761A] mb-6 block">Corporate Excellence</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              A Legacy of <br className="hidden md:inline" />
              <span className="text-[#E8761A] italic">Trust & Impact</span>
            </h2>
            <p className="text-lg text-white/70 mb-12 leading-relaxed font-medium">
              Experience the scale and commitment of IMS Group through our corporate vision. 
              From precision healthcare to massive infrastructure, see how we are building 
              the future of Lucknow and beyond.
            </p>
            
            <div className="flex flex-wrap gap-12">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#E8761A]/20 flex items-center justify-center text-[#E8761A]">
                     <Shield size={24} />
                  </div>
                  <div>
                     <p className="text-white font-bold text-sm">Certified Quality</p>
                     <p className="text-white/40 text-[10px] uppercase tracking-widest">ISO 9001:2015</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#00E676]/20 flex items-center justify-center text-[#00E676]">
                     <Play size={24} fill="currentColor" />
                  </div>
                  <div>
                     <p className="text-white font-bold text-sm">Corporate Vision</p>
                     <p className="text-white/40 text-[10px] uppercase tracking-widest">Brand Film 2024</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative order-1 lg:order-2 group cursor-pointer will-change-transform"
          >
            <div className="aspect-video bg-white/5 rounded-sm overflow-hidden premium-border relative">
              <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Corporate Video Thumbnail" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="h-24 w-24 rounded-full bg-[#E8761A] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={32} fill="currentColor" />
                 </div>
              </div>
              
              {/* Scanning Effect */}
              <motion.div 
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-px bg-[#E8761A]/50 shadow-[0_0_15px_rgba(232,118,26,0.5)] z-20"
              />
            </div>
            
            {/* Decorative Dots */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-[radial-gradient(#E8761A_1px,transparent_1px)] bg-[size:10px_10px] opacity-30" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
