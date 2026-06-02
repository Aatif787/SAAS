"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Zap, Shield, Microscope } from "lucide-react";

const TECH_FEATURES = [
  {
    title: "AI-Driven Diagnostics",
    desc: "Using advanced neural networks to detect anomalies in radiology scans with 99.9% precision.",
    icon: <Cpu size={24} />
  },
  {
    title: "Clinical Excellence",
    desc: "Advanced laparoscopic and minimally invasive procedures with faster recovery times.",
    icon: <Zap size={24} />
  },
  {
    title: "Quantum Imaging",
    desc: "Next-generation 3T MRI and 128-slice CT scans for crystalline clarity in visualization.",
    icon: <Microscope size={24} />
  },
  {
    title: "Cyber-Security",
    desc: "End-to-end encrypted patient data management systems compliant with global HIPPA standards.",
    icon: <Shield size={24} />
  }
];

export default function HospitalTech() {
  return (
    <section className="section-pad bg-ims-blue overflow-hidden relative">
      {/* Background HUD elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-ims-red mb-6 block">Innovation & Tech</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight">
              Where Science <br />
              <span className="text-ims-gold italic">Meets Humanity.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl">
              We don&apos;t just use technology; we pioneer it. Our facility is equipped with the 
              world&apos;s most advanced medical hardware to ensure that &ldquo;impossible&rdquo; is never a diagnosis.
            </p>

            <div className="grid sm:grid-cols-2 gap-10">
               {TECH_FEATURES.map((feature, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex flex-col gap-4"
                 >
                    <div className="text-ims-red">{feature.icon}</div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest">{feature.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{feature.desc}</p>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="relative z-10 aspect-square rounded-full overflow-hidden border-[20px] border-white/5 shadow-3xl">
              <Image 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200" 
                alt="Medical Technology" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ims-blue/40 to-transparent" />
            </div>
            
            {/* Pulsing rings */}
            <div className="absolute inset-0 border border-white/10 rounded-full animate-ping [animation-duration:3s]" />
            <div className="absolute -inset-10 border border-white/5 rounded-full animate-ping [animation-duration:4s]" />
            
            <div className="absolute -bottom-10 -right-10 bg-white p-10 shadow-3xl max-w-[240px]">
               <p className="text-4xl font-serif text-ims-blue mb-2">99.9%</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40">Diagnostic Accuracy across all imaging modalities.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
