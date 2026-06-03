"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import dynamic from "next/dynamic";

const SuperHexBackground = dynamic(() => import("@/components/ui/super-hex-background"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#FDFBF7]" />,
});

const VERTICALS = [
  { id: "01", name: "Hospital", label: "Healthcare", img: "/images/healthcare-4k.png", color: "#FF3B3B", href: "/hospital" },
  { id: "02", name: "One Home Solution", label: "Real Estate", img: "/images/home-solution-4k.png", color: "#C5A059", href: "/ims-one-home-solution" },
  { id: "03", name: "Infra", label: "Infrastructure", img: "/images/corporate-hub-4k.png", color: "#00dcc4", href: "/about" },
  { id: "04", name: "Steel", label: "Manufacturing", img: "/images/steel-infra-4k.png", color: "#4A90E2", href: "/ims-steel" },
  { id: "05", name: "UPVC", label: "Industrial", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200", color: "#F5A623", href: "/upvc" },
  { id: "06", name: "Estate Empire", label: "Lifestyle", img: "/images/estate-empire-4k.png", color: "#7ED321", href: "/estate" },
];

const getCharWidth = (char: string) => {
  if (char === "i" || char === "l" || char === "I" || char === "t" || char === "r") return "0.38em";
  if (char === "m" || char === "w" || char === "M" || char === "W") return "0.9em";
  // Lowercase characters
  if (char === char.toLowerCase()) {
    if (["f", "j"].includes(char)) return "0.45em";
    return "0.55em";
  }
  // Uppercase characters
  const c = char.toUpperCase();
  if (["O", "Q", "H", "D", "G", "A", "N", "U", "V", "C"].includes(c)) return "0.8em";
  return "0.72em";
};

export default function ExtraordinaryHero() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % VERTICALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ims-cream pt-20">
      {/* 1. Background Layer: Preserving the 3D Hex */}
      <div className="absolute inset-0 z-0">
        <SuperHexBackground />
        {/* Soft elegant vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(253,251,247,0.4)_100%)]" />
      </div>

      {/* 2. Main Hero Content - Classical Layout */}
      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="container-xl relative z-20 flex flex-col items-center text-center px-4"
      >
        {/* Classical Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-ims-gold mb-8 block">
            ESTABLISHED EXCELLENCE • SINCE 1996
          </span>
          
          <h1 className="text-[clamp(3.5rem,10vw,10rem)] font-serif leading-[0.85] text-ims-blue">
            <motion.span 
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 0.5, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 2, ease: [0.19, 1, 0.22, 1] }}
              className="block italic font-light text-[0.4em] mb-2 text-ims-gold"
            >
              The
            </motion.span>
            
            <span className="relative inline-block">
              <span className="flex flex-wrap justify-center md:flex-nowrap overflow-hidden gap-y-2">
                <span className="flex">
                  {"IMS".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "100%", opacity: 0, rotate: 10 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.8 + i * 0.1, 
                        ease: [0.19, 1, 0.22, 1] 
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                
                <span className="w-[0.2em] hidden md:inline-block" />

                <span className="flex">
                  {"GROUP".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "100%", opacity: 0, rotate: -10 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 1.1 + i * 0.1, 
                        ease: [0.19, 1, 0.22, 1] 
                      }}
                      className="inline-block text-ims-red font-black tracking-tighter"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </span>
              
              {/* Animated Shine Effect */}
              <motion.div 
                animate={{ 
                  left: ["-100%", "200%"],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none z-10"
              />

              {/* Elegant Flourish */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="absolute -bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ims-gold/60 to-transparent"
              />
            </span>
          </h1>
        </motion.div>

        {/* The Extraordinary Copy - Elegant Serif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="max-w-3xl mb-24"
        >
          <h2 className="text-2xl md:text-4xl font-serif text-ims-blue/70 italic leading-relaxed">
            &ldquo;Redefining the <span className="text-ims-blue font-bold not-italic border-b border-ims-gold/30 pb-1">EXTRAORDINARY</span> through 
            a legacy of precision and global vision.&rdquo;
          </h2>
        </motion.div>

        {/* Verticals Showcase - Classical Slide */}
        <div className="relative w-full max-w-6xl">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ims-blue/10 to-transparent" />
          
          <div className="py-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Image Side - Framing like a luxury portrait */}
                <div className="relative aspect-[4/3] group">
                   <div className="absolute inset-0 border border-ims-gold/20 -m-2 md:-m-4 transition-transform duration-1000 group-hover:scale-105" />
                   <div className="relative w-full h-full overflow-hidden shadow-2xl">
                      <Image 
                        src={VERTICALS[index].img} 
                        alt={VERTICALS[index].name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[5s] scale-110 group-hover:scale-100" 
                      />
                      <div className="absolute inset-0 bg-ims-blue/10 mix-blend-multiply" />
                   </div>
                   {/* Vertical Label Tag */}
                   <div className="absolute -right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center bg-ims-red text-white text-[9px] font-bold uppercase tracking-[0.4em] px-6 py-2 shadow-xl">
                      VERTICAL 0{VERTICALS[index].id}
                   </div>
                </div>

                {/* Text Side - Classical Typography with Realistic Liquid Effect */}
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-ims-gold block mb-6">
                    {VERTICALS[index].label}
                  </span>
                  <div className="relative mb-8 flex flex-row flex-wrap md:flex-nowrap justify-start items-baseline select-none overflow-visible w-full gap-x-[0.85em] gap-y-2">
                    {VERTICALS[index].name.split(" ").map((word, wIdx) => (
                      <div key={wIdx} className="relative flex flex-row flex-nowrap gap-x-[0.08em] select-none overflow-visible">
                        {word.split("").map((char, cIdx) => {
                          const flatIdx = VERTICALS[index].name.split(" ").slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0) + cIdx;
                          return (
                            <div 
                              key={flatIdx}
                              className="relative h-[1.2em] flex items-center justify-center liquid-water-wrapper"
                              style={{ 
                                "--char-index": flatIdx,
                                width: getCharWidth(char)
                              } as React.CSSProperties}
                            >
                              <svg className="absolute inset-0 w-full h-full overflow-visible">
                                <defs>
                                  <clipPath id={`clip-${index}-${flatIdx}`}>
                                    <text 
                                      x="50%" 
                                      y="65%" 
                                      textAnchor="middle" 
                                      className="font-serif italic font-semibold text-[0.95em]"
                                    >
                                      {char}
                                    </text>
                                  </clipPath>
                                </defs>
                                
                                <text 
                                  x="50%" 
                                  y="65%" 
                                  textAnchor="middle" 
                                  fill="none" 
                                  stroke="#C5A059" /* Matching Gold Stroke */
                                  strokeWidth="1.5"
                                  className="font-serif italic font-semibold text-[0.95em]"
                                >
                                  {char}
                                </text>

                                <g clipPath={`url(#clip-${index}-${flatIdx})`}>
                                   <foreignObject x="-50%" y="0" width="200%" height="100%">
                                      <div className="water-container">
                                        <div className="water-wave"></div>
                                        <div className="water-fill"></div>
                                      </div>
                                   </foreignObject>
                                 </g>
                              </svg>
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    {/* Reflection - Consistent style */}
                    <div className="absolute top-[95%] md:top-auto md:-bottom-24 left-0 right-0 flex flex-row flex-wrap md:flex-nowrap justify-start opacity-10 scale-y-[-1] blur-[1px] pointer-events-none select-none overflow-visible w-full gap-x-[0.85em] gap-y-2">
                      {VERTICALS[index].name.split(" ").map((word, wIdx) => (
                        <div key={`ref-word-${wIdx}`} className="relative flex flex-row flex-nowrap gap-x-[0.08em] select-none overflow-visible">
                          {word.split("").map((char, cIdx) => {
                            const flatIdx = VERTICALS[index].name.split(" ").slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0) + cIdx;
                            return (
                              <div 
                                key={`ref-${flatIdx}`} 
                                className="relative h-[1.2em]"
                                style={{ width: getCharWidth(char) }}
                              >
                                 <svg className="absolute inset-0 w-full h-full overflow-visible">
                                    <text 
                                      x="50%" y="65%" textAnchor="middle" 
                                      fill="none" stroke="#C5A059" strokeWidth="1"
                                      className="font-serif italic font-semibold text-[0.95em]"
                                    >
                                      {char}
                                    </text>
                                    <g clipPath={`url(#clip-${index}-${flatIdx})`}>
                                       <foreignObject x="-50%" y="0" width="200%" height="100%">
                                          <div className="water-container">
                                            <div className="water-wave"></div>
                                            <div className="water-fill"></div>
                                          </div>
                                       </foreignObject>
                                    </g>
                                 </svg>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-ims-charcoal/60 leading-relaxed font-medium text-lg max-w-md mb-10">
                    Our commitment to excellence in {VERTICALS[index].label.toLowerCase()} is reflected in every 
                    detail of our {VERTICALS[index].name.toLowerCase()} operations.
                  </p>
                  <Link href={VERTICALS[index].href} className="flex items-center gap-4 text-ims-blue font-bold uppercase tracking-[0.3em] text-[11px] hover:text-ims-red transition-colors group">
                    View Portfolio 
                    <div className="h-px w-12 bg-ims-blue/30 group-hover:w-16 group-hover:bg-ims-red transition-all" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ims-blue/10 to-transparent" />
        </div>

        {/* Progress Navigation - Elegant Dots */}
        <div className="mt-12 flex gap-8">
          {VERTICALS.map((v, i) => (
            <button 
              key={v.id}
              onClick={() => setIndex(i)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`h-1 transition-all duration-700 ${index === i ? 'w-12 bg-ims-red' : 'w-4 bg-ims-blue/10 group-hover:bg-ims-blue/30'}`} />
              <span className={`text-[9px] font-bold tracking-widest transition-opacity duration-500 ${index === i ? 'opacity-100 text-ims-blue' : 'opacity-0'}`}>
                {v.name}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Side Brand Accents */}
      <div className="absolute left-12 bottom-12 hidden lg:flex flex-col gap-4 z-30">
        <div className="h-20 w-[1px] bg-ims-gold/30" />
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-ims-gold vertical-text">
          ESTABLISHED 1996
        </span>
      </div>

      {/* Scroll Hint - Elegant */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-12 z-30 hidden lg:flex flex-col items-center gap-4 opacity-40"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-ims-blue vertical-text">Discover</span>
        <div className="h-12 w-[1px] bg-ims-blue/20" />
      </motion.div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .liquid-water-wrapper {
          font-size: clamp(2.2rem, 4vw, 3.0rem);
          cursor: pointer;
        }

        .water-container {
          width: 100%;
          height: 100%;
          position: relative;
          pointer-events: none;
        }

        .water-wave {
          position: absolute;
          top: 60%; 
          left: -50%;
          width: 200%;
          height: 200%;
          /* Gradient Mix: Orange to Lime to Dark Green */
          background: linear-gradient(180deg, #FF8C00 0%, #32CD32 50%, #013220 100%);
          border-radius: 40%;
          animation: water-flow 6s linear infinite;
          animation-delay: calc(var(--char-index, 0) * -0.5s);
          transition: top 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .water-fill {
          position: absolute;
          top: 60%;
          left: 0;
          width: 100%;
          height: 100%;
          /* Match the bottom part of the gradient */
          background: linear-gradient(180deg, #32CD32 0%, #013220 100%);
          transition: top 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .liquid-water-wrapper:hover .water-wave,
        .liquid-water-wrapper:hover .water-fill {
          top: 25%;
        }

        @keyframes water-flow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
