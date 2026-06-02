"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHIPS = [
  { label: "99.2%", sub: "Thermal Efficiency" },
  { label: "50yr", sub: "Warranty" },
  { label: "ISO 9001", sub: "Certified" },
  { label: "42dB", sub: "Noise Reduction" },
];

// Animated particle field
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,194,255,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

// Animated window frame SVG
function WindowFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateY: ["-5deg", "5deg", "-5deg"] }}
      transition={{
        opacity: { duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
        rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 },
      }}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[520px] mx-auto animate-float"
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl blur-[60px] opacity-30"
        style={{ background: "radial-gradient(ellipse, #00C2FF 0%, transparent 70%)" }} />

      {/* Frame */}
      <div className="relative rounded-2xl overflow-hidden"
        style={{
          border: "1.5px solid rgba(0,194,255,0.4)",
          background: "rgba(10,22,40,0.6)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 80px rgba(0,194,255,0.15), inset 0 0 40px rgba(0,194,255,0.05)",
        }}>

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid rgba(0,194,255,0.15)", background: "rgba(0,194,255,0.05)" }}>
          <div className="flex gap-2">
            {["#FF6B35", "#7DFFD1", "#00C2FF"].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
            ))}
          </div>
          <span className="text-[10px] font-mono" style={{ color: "rgba(0,194,255,0.6)" }}>IMS_UPVC_SYSTEM_v2.0</span>
          <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: "#7DFFD1" }} />
        </div>

        {/* Glass panel simulation */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Interior blur */}
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(0,194,255,0.08) 0%, rgba(125,255,209,0.04) 50%, rgba(4,8,16,0.9) 100%)",
            }} />

          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,194,255,0.4)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Mullion cross */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-[1.5px]" style={{ background: "rgba(0,194,255,0.5)", boxShadow: "0 0 10px rgba(0,194,255,0.5)" }} />
            <div className="absolute h-full w-[1.5px]" style={{ background: "rgba(0,194,255,0.5)", boxShadow: "0 0 10px rgba(0,194,255,0.5)" }} />
          </div>

          {/* Refraction shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)" }}
          />

          {/* Corner accents */}
          {[["top-2 left-2", "border-t border-l"], ["top-2 right-2", "border-t border-r"],
            ["bottom-2 left-2", "border-b border-l"], ["bottom-2 right-2", "border-b border-r"]].map(([pos, border], i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 ${border}`}
              style={{ borderColor: "rgba(0,194,255,0.6)" }} />
          ))}

          {/* Center data */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[10px] font-mono mb-2" style={{ color: "rgba(0,194,255,0.5)" }}>THERMAL_SCAN</div>
              <div className="text-4xl font-black" style={{ color: "#00C2FF", textShadow: "0 0 30px rgba(0,194,255,0.8)" }}>
                U=0.6
              </div>
              <div className="text-[10px] font-mono mt-1" style={{ color: "rgba(125,255,209,0.7)" }}>W/m²K · TRIPLE GLAZED</div>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: "1px solid rgba(0,194,255,0.15)", background: "rgba(0,194,255,0.03)" }}>
          <span className="text-[9px] font-mono" style={{ color: "rgba(0,194,255,0.5)" }}>FRAME: UPVC_MULTI_CHAMBER</span>
          <div className="flex items-center gap-2">
            <div className="h-1 w-16 rounded-full overflow-hidden" style={{ background: "rgba(0,194,255,0.15)" }}>
              <motion.div className="h-full rounded-full" style={{ background: "#00C2FF" }}
                animate={{ width: ["0%", "92%"] }} transition={{ duration: 2, delay: 1.5 }} />
            </div>
            <span className="text-[9px] font-mono" style={{ color: "#7DFFD1" }}>92%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UPVCHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // GSAP parallax on scroll
    gsap.to(containerRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: "#040810" }}>

      {/* Particle field */}
      <ParticleField />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,194,255,0.08) 0%, transparent 70%)" }} />

      {/* Topographic lines */}
      <div className="absolute inset-0 topo-bg opacity-100 pointer-events-none" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.4), transparent)" }}
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div ref={containerRef} className="relative z-20 max-w-[1600px] mx-auto px-6 md:px-12 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-10" style={{ background: "#00C2FF" }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
                IMS UPVC Systems · Est. 1996
              </span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                ref={headlineRef}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-black tracking-tight leading-[0.88]"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6.5rem)",
                  color: "#E8F4FF",
                  letterSpacing: "-0.03em",
                }}
              >
                The Future
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #00C2FF 0%, #7DFFD1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Looks Through
                </span>
                <br />
                Our Windows
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="text-base font-mono italic mb-4"
              style={{ color: "rgba(0,194,255,0.5)" }}
            >
              Where Light Lives
            </motion.p>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(232,244,255,0.55)" }}
            >
              Ultra-Performance UPVC Systems. Engineered for Eternity.
              Every profile, every seal, every pane is a statement of permanence.
            </motion.p>

            {/* Floating data chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {CHIPS.map((chip, i) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    border: "1px solid rgba(0,194,255,0.25)",
                    background: "rgba(0,194,255,0.06)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span className="text-sm font-black" style={{ color: "#00C2FF" }}>{chip.label}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "rgba(232,244,255,0.4)" }}>
                    {chip.sub}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                "Installed in Days",
                "Built for Generations",
                "ISO 9001 Certified",
              ].map((pill, i) => (
                <motion.div
                  key={pill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    border: "1px solid rgba(125,255,209,0.2)",
                    background: "rgba(125,255,209,0.04)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#7DFFD1", boxShadow: "0 0 6px #7DFFD1" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <span
                    className="text-[11px] font-mono uppercase tracking-wider"
                    style={{ color: "rgba(125,255,209,0.8)" }}
                  >
                    {pill}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/upvc/products"
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ember relative overflow-hidden">
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-full" />
                <span className="relative z-10">Explore Our Universe</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/upvc/get-quote"
                className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ghost">
                Get Free Quote
              </Link>
            </motion.div>
          </div>

          {/* Right — Window Frame */}
          <div className="relative">
            <WindowFrame />

            {/* Floating spec cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -right-4 top-1/4 px-4 py-3 rounded-xl"
              style={{
                border: "1px solid rgba(125,255,209,0.3)",
                background: "rgba(10,22,40,0.9)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="text-[9px] font-mono uppercase tracking-widest mb-1" style={{ color: "rgba(125,255,209,0.6)" }}>
                Energy Rating
              </div>
              <div className="text-2xl font-black" style={{ color: "#7DFFD1" }}>A+</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute -left-4 bottom-1/4 px-4 py-3 rounded-xl"
              style={{
                border: "1px solid rgba(255,107,53,0.3)",
                background: "rgba(10,22,40,0.9)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="text-[9px] font-mono uppercase tracking-widest mb-1" style={{ color: "rgba(255,107,53,0.6)" }}>
                Security
              </div>
              <div className="text-2xl font-black" style={{ color: "#FF6B35" }}>5-pt</div>
              <div className="text-[9px] font-mono" style={{ color: "rgba(232,244,255,0.4)" }}>Lock System</div>
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-24 left-0 right-0 overflow-hidden pointer-events-none"
        >
          <div className="flex whitespace-nowrap">
            <motion.div
              className="flex gap-0 text-[10px] font-mono uppercase tracking-[0.3em]"
              style={{ color: "#00C2FF", opacity: 0.2 }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="mr-0">
                  UPVC · DOORS · WINDOWS · GLAZING · THERMAL · ACOUSTIC · SECURITY · ENERGY · DESIGN ·&nbsp;
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.4em]" style={{ color: "rgba(0,194,255,0.4)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={16} style={{ color: "rgba(0,194,255,0.4)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
