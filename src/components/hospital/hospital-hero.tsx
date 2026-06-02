"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, Activity, ShieldCheck, Heart, Zap, Globe, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MedicalBackground from "@/components/ui/medical-background";
import { useHospital } from "@/lib/hospital-store";

export default function HospitalHero({ onBook }: { onBook: () => void }) {
  const { cms } = useHospital();
  
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[#F0F4F8]">
      {/* Background with extraordinary Medical Nexus */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
         <MedicalBackground />
      </div>

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#F0F4F8] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] text-ims-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-12"
            >
              <div className="relative">
                 <Activity size={14} className="text-ims-red" />
                 <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-ims-red rounded-full"
                 />
              </div>
              Live Status: <span className="text-ims-red">Emergency Ready</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.95] mb-12 tracking-tighter text-[#F0F4F8] [text-shadow:1px_1px_0px_#ffffff,2px_2px_0px_#ffffff,3px_3px_0px_#ffffff,4px_4px_10px_#d1d9e6,8px_8px_20px_rgba(0,0,0,0.05)]">
               {(cms?.heroTitle || "The Future of Healing Starts Here").replace(/\.$/, "").split(' ').map((word, i) => (
                  <span key={i} className={i === 2 ? "text-ims-red italic drop-shadow-md" : ""}>
                     {word}{' '}
                  </span>
               ))}
            </h1>
            
            <p className="text-xl text-ims-charcoal/50 leading-relaxed max-w-xl mb-14 font-medium p-8 bg-[#F0F4F8] shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] rounded-3xl">
               {cms?.heroSub || "IMS Hospital is redefining tertiary healthcare through advanced clinical excellence and specialized medical care."}
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
               <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBook}
                  className="bg-[#F0F4F8] text-ims-blue px-12 py-8 rounded-[20px] font-bold uppercase tracking-[0.3em] text-[11px] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all flex items-center justify-center gap-4 group"
               >
                  <Calendar className="w-5 h-5 text-ims-red group-hover:rotate-12 transition-transform" />
                  Book Priority Appointment
               </motion.button>
              
               <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:9699858212" 
                className="bg-[#F0F4F8] text-ims-red px-12 py-8 rounded-[20px] font-bold uppercase tracking-[0.2em] text-[11px] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all flex items-center justify-center gap-4 group"
               >
                 <Phone size={18} className="group-hover:animate-bounce" /> Emergency 24/7
               </motion.a>
            </div>

            {/* Quick Metrics */}
            <div className="mt-20 grid grid-cols-3 gap-10">
               {[
                 { label: "Successful Surgeries", value: "25k+", icon: <Zap size={14} /> },
                 { label: "Expert Consultants", value: "150+", icon: <ShieldCheck size={14} /> },
                 { label: "Patient Satisfaction", value: "99%", icon: <Heart size={14} /> }
               ].map((stat, i) => (
                 <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-6 bg-[#F0F4F8] shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] rounded-2xl flex flex-col gap-3"
                 >
                    <div className="flex items-center gap-2 text-ims-gold">
                       {stat.icon}
                       <span className="text-2xl md:text-3xl font-serif text-ims-blue">{stat.value}</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-ims-charcoal/40 font-bold leading-tight">{stat.label}</span>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
               {/* Main Hero Image with Neumorphic Frame */}
               <div className="relative p-6 bg-[#F0F4F8] shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] rounded-[60px] overflow-hidden group">
                  <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[40px]">
                     <Image 
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                        alt="Advanced Healthcare" 
                        fill
                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-ims-blue/60 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Medical HUD Overlays (Neumorphic) */}
                  <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-12 right-12 bg-[#F0F4F8] p-6 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] rounded-3xl z-20 border border-white/20"
                  >
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#F0F4F8] shadow-[inset_2px_2px_5px_#d1d9e6,inset_-2px_-2px_5px_#ffffff] flex items-center justify-center text-ims-red">
                           <Activity size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-ims-blue/40 uppercase tracking-widest">Heart Rate</p>
                           <p className="text-xl font-serif text-ims-blue">72 BPM</p>
                        </div>
                     </div>
                     <div className="w-full h-1 bg-[#F0F4F8] shadow-[inset_1px_1px_3px_#d1d9e6,inset_-1px_-1px_3px_#ffffff] rounded-full overflow-hidden">
                        <motion.div 
                           animate={{ width: ["10%", "90%", "10%"] }}
                           transition={{ duration: 5, repeat: Infinity }}
                           className="h-full bg-ims-red shadow-[0_0_8px_rgba(191,10,48,0.5)]" 
                        />
                     </div>
                  </motion.div>

                  <motion.div 
                     animate={{ x: [0, 10, 0] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute bottom-12 -left-6 bg-[#F0F4F8] p-8 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] rounded-3xl z-20 hidden md:block"
                  >
                     <div className="flex flex-col gap-1 text-ims-blue">
                        <span className="text-3xl font-serif text-ims-red">A+</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 whitespace-nowrap">Clinical Grade Quality</span>
                        <div className="flex gap-2 mt-3">
                           {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-ims-red shadow-[1px_1px_2px_rgba(0,0,0,0.1)]" />)}
                        </div>
                     </div>
                  </motion.div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
         animate={{ y: [0, 10, 0] }}
         transition={{ duration: 2, repeat: Infinity }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
         <div className="w-10 h-16 bg-[#F0F4F8] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] rounded-full flex flex-col items-center justify-end pb-3">
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="w-1 h-3 bg-ims-red rounded-full"
            />
         </div>
      </motion.div>
    </section>
  );
}

