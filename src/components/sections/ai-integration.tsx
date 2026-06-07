"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, MessageSquare, Binary } from "lucide-react";

const features = [
  {
    title: "Institutional AI",
    description: "Custom intelligent systems designed for healthcare and administrative efficiency.",
    icon: MessageSquare,
    color: "text-ims-red"
  },
  {
    title: "Process Automation",
    description: "Streamlining complex industrial and digital workflows through intelligent automation.",
    icon: Zap,
    color: "text-ims-gold"
  },
  {
    title: "Predictive Analytics",
    description: "Leveraging data to forecast market trends and optimize resource allocation.",
    icon: Binary,
    color: "text-ims-blue"
  }
];

function AIFeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-8 group p-6 border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300 bg-white/5 relative overflow-hidden cursor-default"
    >
      {/* Spotlight Radial Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-10"
          style={{
            background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, rgba(197, 160, 89, 0.08), transparent 80%)`,
          }}
        />
      )}

      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-white/10 ${f.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-20`}>
        <f.icon size={24} />
      </div>
      <div className="relative z-20">
        <h3 className="text-lg font-serif text-white group-hover:text-ims-gold transition-colors">{f.title}</h3>
        <p className="text-xs text-white/40 leading-relaxed font-medium mt-1">{f.description}</p>
      </div>
    </motion.div>
  );
}

export default function AIIntegration() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
          >
            Digital Transformation
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight"
          >
            Integrating <span className="italic text-ims-gold">Intelligence</span> into Every Venture.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-white/60 font-medium leading-relaxed mb-12"
          >
            We bridge the gap between traditional excellence and modern innovation. 
            Our AI solutions are designed to enhance human capability and drive 
            efficiency across all business sectors.
          </motion.p>
          
          <div className="grid gap-8">
             {features.map((f, i) => (
               <AIFeatureCard key={f.title} f={f} i={i} />
             ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="premium-border aspect-square w-full max-w-[500px] p-1 mx-auto relative group">
             <div className="w-full h-full bg-ims-blue overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" 
                  alt="AI Integration" 
                  fill
                  sizes="(max-width: 500px) 100vw, 500px"
                  className="object-cover grayscale opacity-40 mix-blend-screen group-hover:scale-105 transition-transform duration-[2s]"
                />
                
                {/* Tech Grid Wireframe Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,160,89,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,160,89,0.06)_1px,transparent_1px)] bg-[size:30px_30px] z-10 pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-ims-blue via-transparent to-transparent z-15" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 z-20">
                   <div className="h-20 w-20 rounded-full border-2 border-ims-gold/20 flex items-center justify-center mb-8">
                      <Cpu size={40} className="text-ims-gold animate-pulse" />
                   </div>
                   <h4 className="text-2xl font-serif text-white mb-2">IMS Intelligence</h4>
                   <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Real-time optimization active</p>
                </div>

                {/* Grid Scanning Line */}
                <motion.div 
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.5)] z-22 pointer-events-none"
                />
             </div>
             
             {/* Decorative Frames */}
             <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-ims-red" />
             <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-ims-red" />
          </div>
        </div>
      </div>
    </section>
  );
}
