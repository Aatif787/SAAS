"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Users, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutIMS() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="about" className="section-pad bg-white w-full">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer"
          >
            {/* Floating ESTD Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -left-5 bg-white border border-[#C5A059] p-4 text-[#0A1E3D] shadow-2xl z-30 flex flex-col items-center justify-center rounded-sm min-w-[90px] border-b-4 pointer-events-none"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">ESTD</span>
              <span className="text-xl font-serif font-bold tracking-tight">1996</span>
            </motion.div>

            <div className="aspect-[4/3] rounded-sm overflow-hidden premium-border shadow-2xl relative">
              <Image 
                src="/images/corporate-hub.png" 
                alt="IMS Global Hub" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Image Spotlight Glow */}
              {isHovered && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-20"
                  style={{
                    background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(197, 160, 89, 0.12), transparent 80%)`,
                  }}
                />
              )}
            </div>
            <div className="absolute -bottom-8 -right-8 lg:-bottom-10 lg:-right-10 bg-[#9B1B30] p-8 lg:p-10 text-white shadow-2xl hidden xl:block">
              <h3 className="text-4xl lg:text-5xl font-serif mb-2 tracking-tighter">IMS</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">Technological Frontier</p>
            </div>
          </motion.div>

          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.5em] text-[#C5A059] mb-6 block"
            >
              Institutional Legacy
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#0A1E3D] mb-8 leading-[1.1] tracking-tight"
            >
              Pioneering the <br className="hidden md:inline" />
              <span className="text-[#9B1B30] italic">Infinite</span> Horizon
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-[#3B4252]/75 leading-relaxed mb-10 font-medium"
            >
              Since 1995, IMS Group has evolved into a diversified technological force. 
              We synergize healthcare, infrastructure, and digital ecosystems through 
              relentless innovation and uncompromising institutional integrity.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { title: "Quality Assurance", icon: <CheckCircle2 className="text-[#9B1B30]" />, desc: "We never compromise on quality in any of our verticals." },
                { title: "Experienced Team", icon: <Users className="text-[#9B1B30]" />, desc: "Skilled professionals with deep industry knowledge." },
                { title: "Customer Focus", icon: <Heart className="text-[#9B1B30]" />, desc: "Customer satisfaction is our top priority in every project." },
                { title: "Integrity & Trust", icon: <ShieldCheck className="text-[#9B1B30]" />, desc: "Honest practices and transparent dealings with every partner." }
              ].map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 group cursor-default p-2 rounded-md hover:bg-[#FAF6F0]/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="mt-1 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#0A1E3D] uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-[#3B4252]/55 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
