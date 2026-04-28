"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Phone } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-black pt-32 pb-20">
      {/* Corporate Building Background (Optimized) */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <Image 
          src="/images/corporate-hub.png" 
          alt="IMS Corporate Headquarters" 
          fill
          priority
          className="object-cover object-right opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Exact Content from Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif leading-none mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              <span className="text-ims-red">IMS</span> <span className="text-white">GROUP</span>
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-serif !text-green-500 font-bold leading-tight mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Building Trust Across Healthcare, <br />
              Infrastructure & Home Solutions
            </h2>
            
            <p className="text-sm md:text-base text-white/95 leading-relaxed max-w-xl mb-12 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Delivering excellence through diversified businesses in healthcare, 
              construction materials, infrastructure, and real estate across <span className="text-ims-red font-bold">Lucknow</span> and beyond.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-ims-red text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 hover:bg-white hover:text-ims-blue transition-all group shadow-xl">
                Explore Businesses <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-ims-blue transition-all">
                About Us
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 hover:bg-white hover:text-ims-blue transition-all">
                <Phone size={14} /> Call Now
              </button>
            </div>
          </motion.div>

          {/* Right Side: Empty to allow Background Image to show (as in reference image) */}
          <div className="hidden lg:block" />

        </div>
      </div>

      {/* Side Label */}
      <div className="absolute right-0 bottom-32 hidden lg:block translate-x-1/2 rotate-90 origin-left z-20">
         <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/20">LUCKNOW • DUBAI • SINGAPORE</span>
      </div>
    </section>
  );
}
