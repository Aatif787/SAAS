"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Thermometer, Volume2, CloudRain, Shield, Zap, Eye, Wind, Layers } from "lucide-react";

const features = [
  {
    icon: Thermometer,
    title: "Multi-Chamber Thermal",
    desc: "Advanced multi-chamber UPVC profiles with galvanised steel reinforcement reduce thermal transfer by up to 70%.",
    stat: "70%", statLabel: "Heat Reduction",
    color: "#FF6B35",
  },
  {
    icon: Volume2,
    title: "Acoustic Insulation",
    desc: "Triple-glazed options with laminated glass deliver up to 42dB noise reduction — silence engineered in.",
    stat: "42dB", statLabel: "Noise Reduction",
    color: "#00C2FF",
  },
  {
    icon: CloudRain,
    title: "Weatherproof Seal",
    desc: "Fusion-welded corners and multi-point compression seals create an impenetrable barrier against rain and wind.",
    stat: "100%", statLabel: "Leak Proof",
    color: "#7DFFD1",
  },
  {
    icon: Shield,
    title: "Security Engineering",
    desc: "German-engineered 5-point locking systems with anti-drill, anti-pick, and anti-snap cylinders.",
    stat: "5-pt", statLabel: "Lock System",
    color: "#FF6B35",
  },
  {
    icon: Zap,
    title: "A+ Energy Rating",
    desc: "Low-E coated glass with argon fill achieves U-values as low as 0.6 W/m²K — reducing energy bills by 30%.",
    stat: "A+", statLabel: "Energy Rating",
    color: "#00C2FF",
  },
  {
    icon: Eye,
    title: "UV Stabilised",
    desc: "UV-stabilised outer skin blocks 99% of harmful rays while maintaining colour integrity for decades.",
    stat: "99%", statLabel: "UV Blocked",
    color: "#7DFFD1",
  },
  {
    icon: Wind,
    title: "Thermal Break Tech",
    desc: "Polyamide thermal break strips eliminate cold bridging, maintaining consistent interior temperatures.",
    stat: "0.6", statLabel: "U-Value W/m²K",
    color: "#FF6B35",
  },
  {
    icon: Layers,
    title: "316 Marine Hardware",
    desc: "Anti-corrosion 316 marine-grade stainless steel hardware — engineered to outlast coastal environments.",
    stat: "316", statLabel: "Marine Grade",
    color: "#00C2FF",
  },
];

export default function UPVCFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: "#040810" }}>
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="feat-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00C2FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#feat-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#00C2FF" }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
                Material Technology
              </span>
            </div>
            <h2 className="font-black tracking-tight leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
              Engineering
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Excellence
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg leading-relaxed"
            style={{ color: "rgba(232,244,255,0.45)" }}
          >
            Every component precision-engineered to deliver unmatched thermal performance,
            acoustic comfort, and structural integrity — tested to BS 6375 British Standards.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-7 rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  border: "1px solid rgba(0,194,255,0.1)",
                  background: "rgba(10,22,40,0.5)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Hover state */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `${f.color}08`, border: `1px solid ${f.color}30` }} />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${f.color}15`, color: f.color }}>
                  <Icon size={22} />
                </div>

                {/* Laser underline on hover */}
                <motion.div
                  className="absolute left-7 h-px"
                  style={{ background: f.color, top: "4.5rem" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                />

                <h3 className="text-base font-bold mb-3 relative z-10" style={{ color: "#E8F4FF" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 relative z-10" style={{ color: "rgba(232,244,255,0.4)" }}>
                  {f.desc}
                </p>

                {/* Stat */}
                <div className="flex items-baseline gap-2 pt-5 relative z-10"
                  style={{ borderTop: "1px solid rgba(0,194,255,0.08)" }}>
                  <span className="text-3xl font-black" style={{ color: f.color, letterSpacing: "-0.04em" }}>
                    {f.stat}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "rgba(232,244,255,0.3)" }}>
                    {f.statLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
