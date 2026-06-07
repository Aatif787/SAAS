"use client";

import { motion } from "framer-motion";
import { Play, Shield } from "lucide-react";
import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="py-24 bg-[#0A1424] relative overflow-hidden border-t border-white/5">
      {/* Premium Background Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-ims-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-80 bg-ims-gold/5 blur-[120px] rounded-full pointer-events-none" />

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
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block">Corporate Excellence</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              A Legacy of <br className="hidden md:inline" />
              <span className="text-ims-gold italic">Trust & Impact</span>
            </h2>
            <p className="text-lg text-white/70 mb-12 leading-relaxed font-medium">
              Experience the scale and commitment of IMS Group through our corporate vision. 
              From precision healthcare to massive infrastructure, see how we are building 
              the future of Lucknow and beyond.
            </p>
            
            <div className="flex flex-wrap gap-12">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-ims-gold/20 flex items-center justify-center text-ims-gold">
                     <Shield size={24} />
                  </div>
                  <div>
                     <p className="text-white font-bold text-sm">Certified Quality</p>
                     <p className="text-white/40 text-[10px] uppercase tracking-widest">ISO 9001:2015</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-ims-gold/20 flex items-center justify-center text-ims-gold">
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
            className="relative order-1 lg:order-2 group cursor-pointer will-change-transform w-full max-w-lg lg:max-w-none mx-auto"
          >
            <div className="aspect-video bg-white/5 rounded-sm overflow-hidden premium-border relative">
              <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Corporate Video Thumbnail" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
              />
              
              {/* Glare Sweep Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-glare-sweep pointer-events-none z-10" />

              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative flex items-center justify-center">
                    {/* Pulsing Gold Ring */}
                    <span className="absolute h-32 w-32 animate-ping rounded-full bg-ims-gold/25 opacity-75 pointer-events-none" />
                    
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-ims-gold flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-ims-red transition-all duration-500 relative z-10">
                       <Play size={28} className="md:size-8" fill="currentColor" />
                    </div>
                 </div>
              </div>
               
              {/* Scanning Line */}
              <motion.div 
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[2px] bg-ims-gold/40 shadow-[0_0_12px_rgba(197,160,89,0.4)] z-20"
              />
            </div>
             
            {/* Decorative Dots */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-[radial-gradient(var(--color-ims-gold)_1px,transparent_1px)] bg-[size:10px_10px] opacity-30 pointer-events-none" />
          </motion.div>

          {/* Glare Sweep Custom Keyframe */}
          <style jsx>{`
            .animate-glare-sweep {
              animation: glare-sweep 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            @keyframes glare-sweep {
              0% { transform: translate3d(-100%, 0, 0) skewX(-20deg); }
              100% { transform: translate3d(100%, 0, 0) skewX(-20deg); }
            }
          `}</style>

        </div>
      </div>
    </section>
  );
}
