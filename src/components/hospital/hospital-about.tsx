"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, History, Target } from "lucide-react";
import Image from "next/image";
import { useHospital } from "@/lib/hospital-store";

export default function HospitalAbout() {
  const { cms } = useHospital();

  return (
    <section id="about" className="section-pad bg-[#F0F4F8] overflow-hidden relative">
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Neumorphic Image Frame */}
            <div className="relative z-10 p-6 bg-[#F0F4F8] shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] rounded-[60px] overflow-hidden group">
               <div className="relative aspect-square rounded-[40px] overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200" 
                    alt="Healthcare Expertise" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-ims-blue/10 group-hover:bg-transparent transition-colors duration-700" />
               </div>
            </div>
            
            {/* Neumorphic Floating Badge */}
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 bg-[#F0F4F8] p-10 shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] rounded-3xl z-20 border border-white/20"
            >
              <div className="text-5xl font-serif text-ims-red mb-1 drop-shadow-sm italic">A+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-ims-blue/40">Grade Healthcare</div>
              <div className="w-full h-1 bg-[#F0F4F8] shadow-[inset_1px_1px_2px_#d1d9e6,inset_-1px_-1px_2px_#ffffff] rounded-full mt-4" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-2 bg-[#F0F4F8] shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] rounded-full" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ims-blue/40 block font-mono">Legacy // Evolution</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-serif mb-10 leading-tight tracking-tighter text-[#F0F4F8] [text-shadow:3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]">
              Legacy of <span className="text-ims-red italic drop-shadow-sm">Excellence</span> <br />
              Future of Care
            </h2>
            
            <p className="text-ims-charcoal/50 text-lg leading-relaxed mb-12 p-8 bg-[#F0F4F8] shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] rounded-3xl font-medium">
               {cms?.aboutText || "IMS Hospital is Lucknow's premier multispecialty institution blending traditional compassion with futuristic digital-first care."}
            </p>

            <div className="grid sm:grid-cols-2 gap-10 mb-14">
               {[
                 { title: "Our Mission", desc: "To democratize elite healthcare through technology.", icon: <CheckCircle2 size={18} /> },
                 { title: "Our Vision", desc: "To be the apex center for medical innovation in India.", icon: <Target size={18} /> }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.5 + i * 0.1 }}
                     className="p-8 bg-[#F0F4F8] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] rounded-3xl flex gap-5 group hover:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] transition-all duration-500"
                  >
                     <div className="mt-1 text-ims-red">{item.icon}</div>
                     <div>
                        <h4 className="font-bold text-ims-blue/60 text-xs uppercase tracking-widest mb-2 font-mono">{item.title}</h4>
                        <p className="text-xs text-ims-charcoal/40 leading-relaxed font-medium">{item.desc}</p>
                     </div>
                  </motion.div>
               ))}
            </div>

            <div className="flex flex-wrap items-center gap-12 pt-10 border-t border-ims-blue/5">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#F0F4F8] shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] flex items-center justify-center text-ims-gold">
                     <Award size={28} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 max-w-[100px] leading-relaxed">ISO 9001:2015 Certified Quality</span>
               </div>
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#F0F4F8] shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] flex items-center justify-center text-ims-gold">
                     <History size={28} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 max-w-[100px] leading-relaxed">Pioneering Health Since 1999</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
