"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   LIQUID HERO — combining "First Design" with "Liquid Vertices"
   - Massive Typography (First Design Style)
   - Dark Navy Aesthetic (#051236)
   - Procedural Liquid Pool at bottom
   - 5-second cycle through 6 IMS Vertices
   ═══════════════════════════════════════════════════════════════ */

const VERTICALS = [
  { id: "01", name: "Hospital", label: "Healthcare", img: "/images/healthcare-4k.png" },
  { id: "02", name: "One Home", label: "Real Estate", img: "/images/home-solution-4k.png" },
  { id: "03", name: "Infra", label: "Infrastructure", img: "/images/corporate-hub-4k.png" },
  { id: "04", name: "Steel", label: "Manufacturing", img: "/images/steel-infra-4k.png" },
  { id: "05", name: "UPVC", label: "Industrial", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" },
  { id: "06", name: "Estate", label: "Lifestyle", img: "/images/estate-empire-4k.png" },
];

export default function LiquidHero() {
  const [index, setIndex] = useState(0);
  const bubbleMotion = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 5,
      left: `${15 + i * 15}%`,
    })),
  )[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % VERTICALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#121214] overflow-hidden flex flex-col items-center justify-center">
      {/* 1. Global Film Grain Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.15] mix-blend-overlay">
        <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 animate-grain" />
      </div>

      {/* 2. Morphing Teal Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#00dcc4]/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#00dcc4]/5 blur-[100px]" 
        />
      </div>

      {/* 3. Main Content Wrapper */}
      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 container-xl flex flex-col items-center text-center"
      >
        {/* Massive Typography - Line 1 */}
        <div className="overflow-hidden mb-[-2vw]">
          <motion.h1 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="text-[clamp(4rem,15vw,14rem)] font-serif font-bold uppercase tracking-tighter leading-[0.8] text-[#FFFDE2] drop-shadow-2xl"
          >
            Building
          </motion.h1>
        </div>

        {/* Massive Typography - Line 2 (Dynamic Vertex) */}
        <div className="flex items-center gap-[2vw] mb-[-2vw]">
          <div className="overflow-hidden">
             <motion.h1 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
              className="text-[clamp(4rem,15vw,14rem)] font-serif font-bold uppercase tracking-tighter leading-[0.8] text-[#FFFDE2] drop-shadow-2xl"
            >
              Trust
            </motion.h1>
          </div>
          
          {/* Inline Media Box (Morphing Image) */}
          <div className="w-[12vw] h-[8vw] rounded-full overflow-hidden relative border border-white/20 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ filter: "blur(20px) brightness(2)", scale: 1.5, opacity: 0 }}
                animate={{ filter: "blur(0px) brightness(1)", scale: 1, opacity: 1 }}
                exit={{ filter: "blur(20px) brightness(0)", scale: 0.8, opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image src={VERTICALS[index].img} alt={VERTICALS[index].name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#121214]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Massive Typography - Line 3 */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="text-[clamp(4rem,15vw,14rem)] font-serif font-bold uppercase tracking-tighter leading-[0.8] text-[#FFFDE2] drop-shadow-2xl"
          >
            Across —
          </motion.h1>
        </div>

        {/* Vertex Details Reveal */}
        <div className="mt-12 h-20 relative w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C5A059]">0{VERTICALS[index].id}</span>
              <span className="h-px w-12 bg-white/20" />
              <span className="text-xl md:text-3xl font-serif text-[#FFFDE2] italic">{VERTICALS[index].name}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">{VERTICALS[index].label}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 4. LIQUID POOL EFFECT (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] z-20 pointer-events-none">
        {/* SVG Liquid Filter */}
        <svg className="hidden">
          <defs>
            <filter id="liquid">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
            </filter>
          </defs>
        </svg>

        {/* Liquid Surface */}
        <div className="absolute inset-0 w-full" style={{ filter: 'url(#liquid)' }}>
           <motion.div 
            animate={{ 
              height: ["15vh", "20vh", "15vh"],
              borderRadius: ["50% 50% 0 0", "60% 40% 0 0", "50% 50% 0 0"] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-[-10%] w-[120%] bg-[#121214] border-t border-[#00dcc4]/30"
          />
          {/* Bubbles / Drips */}
          {bubbleMotion.map((bubble, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: [null, 400],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: "easeIn"
              }}
              className="absolute top-0 w-4 h-4 rounded-full bg-[#00dcc4]/20"
              style={{ left: bubble.left }}
            />
          ))}
        </div>

        {/* Vertex Selector Labels (Vertical Text on sides) */}
        <div className="absolute left-10 bottom-20 z-30 hidden xl:flex flex-col gap-4">
           {VERTICALS.map((v, i) => (
             <button 
              key={v.id} 
              onClick={() => setIndex(i)}
              className={`text-[9px] font-bold uppercase tracking-[0.4em] transition-all ${index === i ? 'text-[#00dcc4]' : 'text-white/20'}`}
             >
               {v.name}
             </button>
           ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform:translate(0, 0) }
          10% { transform:translate(-5%, -10%) }
          20% { transform:translate(-15%, 5%) }
          30% { transform:translate(7%, -25%) }
          40% { transform:translate(-5%, 25%) }
          50% { transform:translate(-15%, 10%) }
          60% { transform:translate(15%, 0) }
          70% { transform:translate(0, 15%) }
          80% { transform:translate(3%, 35%) }
          90% { transform:translate(-10%, 10%) }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </section>
  );
}
