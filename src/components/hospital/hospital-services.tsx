"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Activity, 
  Zap, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Microscope,
  Baby,
  Bone,
  Eye,
  Ear,
  ShieldAlert,
  Dna,
  Syringe,
  ClipboardCheck,
  Stethoscope,
  BrainCircuit,
  X
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { useHospital } from "@/lib/hospital-store";
import type { Service } from "@/lib/hospital-data";
import { useIsClient } from "@/hooks/use-is-client";

const ICON_MAP: Record<string, ReactNode> = {
  Activity: <Activity size={24} />,
  Zap: <Zap size={24} />,
  Heart: <Heart size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Microscope: <Microscope size={24} />,
  Baby: <Baby size={24} />,
  Bone: <Bone size={24} />,
  Eye: <Eye size={24} />,
  Ear: <Ear size={24} />,
  ShieldAlert: <ShieldAlert size={24} />,
  Dna: <Dna size={24} />,
  Syringe: <Syringe size={24} />,
  ClipboardCheck: <ClipboardCheck size={24} />,
  Stethoscope: <Stethoscope size={24} />,
  BrainCircuit: <BrainCircuit size={24} />,
};

const IMSLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover:opacity-100 transition-opacity duration-700">
    <path d="M20 5V35M5 20H35M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"/>
    <rect x="15" y="15" width="10" height="10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function HospitalServices() {
  const { services } = useHospital();
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for spotlight
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const mounted = useIsClient();

  const floatingParticles = useState(() =>
    Array.from({ length: 15 }, () => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      opacity: 0.1,
      scale: Math.random() * 0.5 + 0.5,
      driftY: Math.random() * -100 - 100,
      duration: Math.random() * 20 + 20,
      size: Math.random() * 20 + 10,
    })),
  )[0];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} id="services" className="section-pad bg-[#F0F4F8] relative overflow-hidden group/section">
      {/* Hyper Spotlight Follow (Subtle for Neumorphism) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover/section:opacity-40 transition-opacity duration-1000"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.8), transparent 80%)`
          )
        }}
      />

      {/* Floating Medical Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
         {mounted && floatingParticles.map((particle, i) => (
           <motion.div
             key={i}
             initial={{ 
               x: particle.x, 
               y: particle.y,
               opacity: particle.opacity,
               scale: particle.scale
             }}
             animate={{ 
               y: [null, particle.driftY],
               rotate: [0, 360]
             }}
             transition={{ 
               duration: particle.duration, 
               repeat: Infinity, 
               ease: "linear" 
             }}
             className="absolute text-ims-blue"
           >
             <X size={particle.size} />
           </motion.div>
         ))}
      </div>

      {/* Large Institutional Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-white/40 pointer-events-none select-none whitespace-nowrap z-0 uppercase tracking-tighter mix-blend-overlay">
         IMS Medical
      </div>

      <div className="container-xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-2 bg-[#F0F4F8] shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] rounded-full" />
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-ims-blue/60 block font-mono">Clinical // Soft UI</span>
            </div>
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-6xl md:text-8xl font-serif text-ims-blue leading-[0.95] tracking-tighter"
            >
              The <span className="text-white drop-shadow-md">Specialist</span> <br />
              Nexus.
            </motion.h2>
          </div>
          <div className="max-w-md p-8 bg-[#F0F4F8] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] rounded-3xl">
            <p className="text-ims-charcoal/60 text-lg leading-relaxed font-medium">
               A hyper-integrated ecosystem of 21 medical disciplines, engineered with tactile precision and clinical intelligence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group p-12 relative flex flex-col justify-between h-[450px] transition-all duration-500 rounded-[40px]
        ${isHovered 
          ? "bg-[#F0F4F8] shadow-[inset_10px_10px_20px_#d1d9e6,inset_-10px_-10px_20px_#ffffff]" 
          : "bg-[#F0F4F8] shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff]"}
      `}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
         <div>
            <div className="flex justify-between items-start mb-10">
               <motion.div 
                  animate={isHovered ? { scale: 0.95 } : { scale: 1 }}
                  className={`
                    w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-500
                    ${isHovered 
                      ? "bg-[#F0F4F8] shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] text-ims-red" 
                      : "bg-[#F0F4F8] shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] text-ims-blue"}
                  `}
               >
                  {ICON_MAP[service.icon] || <Activity size={24} />}
               </motion.div>
               <div className="px-3 py-1 bg-[#F0F4F8] shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] rounded-full">
                  <span className="text-[8px] font-mono font-bold text-ims-blue/40">
                     UNIT_{service.id.toUpperCase()}
                  </span>
               </div>
            </div>

            <h3 className="text-3xl font-serif text-ims-blue mb-6 group-hover:text-ims-red transition-colors tracking-tight leading-none uppercase italic">
               {service.title}
            </h3>
            <p className="text-sm text-ims-charcoal/50 leading-relaxed line-clamp-4 font-medium">
               {service.description}
            </p>
         </div>
         
         <div className="space-y-8">
            <div className="flex items-center gap-4 p-4 bg-[#F0F4F8] shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] rounded-2xl">
               <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
               />
               <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-ims-charcoal/40">Diagnostic Sync: 99.8%</span>
            </div>
            
            <Link 
               href={service.path}
               className={`
                  flex items-center justify-between px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500
                  ${isHovered 
                    ? "bg-ims-red text-white shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]" 
                    : "bg-[#F0F4F8] text-ims-gold shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]"}
               `}
            >
               Enter Unit <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
         </div>
      </div>
    </motion.div>
  );
}
