"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Installations", sub: "Across India" },
  { value: 25, suffix: "+", label: "Years Experience", sub: "Since 1996" },
  { value: 500, suffix: "+", label: "Product Variants", sub: "Doors & Windows" },
  { value: 98, suffix: "%", label: "Client Satisfaction", sub: "Verified Reviews" },
];

const featuredStat = { value: 42, suffix: "dB", label: "Noise Reduction", sub: "Acoustic Performance" };

function Counter({ value, suffix, trigger }: { value: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 2200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [trigger, value]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function UPVCStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: "#040810" }}>
      {/* Topographic background */}
      <div className="absolute inset-0 topo-bg opacity-100 pointer-events-none" />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,194,255,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Large background IMS text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <span
            className="font-black"
            style={{
              fontSize: "20vw",
              color: "#00C2FF",
              opacity: 0.02,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            IMS
          </span>
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#00C2FF" }} />
            <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
              By The Numbers
            </span>
            <div className="h-px w-8" style={{ background: "#00C2FF" }} />
          </div>
          <h2 className="font-black tracking-tight" style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#E8F4FF",
            letterSpacing: "-0.03em",
          }}>
            Precision at{" "}
            <span style={{
              background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Scale
            </span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  border: "1px solid rgba(0,194,255,0.12)",
                  background: "rgba(10,22,40,0.6)",
                  backdropFilter: "blur(20px)",
                }}>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: "rgba(0,194,255,0.04)", boxShadow: "inset 0 0 40px rgba(0,194,255,0.08)" }} />

                {/* Animated line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #00C2FF, #7DFFD1)" }}
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Number */}
                <div className="text-5xl md:text-6xl font-black mb-3 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.04em",
                  }}>
                  <Counter value={stat.value} suffix={stat.suffix} trigger={inView} />
                </div>

                <div className="text-sm font-bold relative z-10" style={{ color: "#E8F4FF" }}>
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest mt-1 relative z-10"
                  style={{ color: "rgba(0,194,255,0.5)" }}>
                  {stat.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured 5th stat — Acoustic */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 group z-10"
        >
          <div
            className="relative rounded-2xl overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-center gap-10"
            style={{
              border: "1px solid rgba(125,255,209,0.15)",
              background: "rgba(10,22,40,0.7)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{
                background: "rgba(125,255,209,0.03)",
                boxShadow: "inset 0 0 60px rgba(125,255,209,0.06)",
              }}
            />

            {/* Animated bottom line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] rounded-full"
              style={{ background: "linear-gradient(90deg, #7DFFD1, #00C2FF)" }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Big number */}
            <div
              className="text-[6rem] md:text-[8rem] font-black leading-none relative z-10 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #7DFFD1, #00C2FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.05em",
              }}
            >
              <Counter value={featuredStat.value} suffix={featuredStat.suffix} trigger={inView} />
            </div>

            {/* Text */}
            <div className="relative z-10 flex-1">
              <div
                className="text-[10px] font-mono uppercase tracking-[0.5em] mb-2"
                style={{ color: "rgba(125,255,209,0.6)" }}
              >
                {featuredStat.sub}
              </div>
              <div
                className="text-3xl md:text-4xl font-black mb-3"
                style={{ color: "#E8F4FF", letterSpacing: "-0.02em" }}
              >
                {featuredStat.label}
              </div>
              <p
                className="text-sm max-w-md"
                style={{ color: "rgba(232,244,255,0.45)" }}
              >
                Our triple-glazed UPVC systems reduce external noise by up to 42dB —
                turning the loudest street into a whisper inside your home.
              </p>
            </div>

            {/* Waveform SVG */}
            <div className="relative z-10 flex-shrink-0 hidden md:block">
              <svg width="180" height="60" viewBox="0 0 180 60">
                {inView && (
                  <motion.polyline
                    points="0,30 15,10 30,50 45,20 60,40 75,5 90,55 105,15 120,45 135,25 150,35 165,20 180,30"
                    fill="none"
                    stroke="#7DFFD1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: "drop-shadow(0 0 4px rgba(125,255,209,0.6))" }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  />
                )}
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
