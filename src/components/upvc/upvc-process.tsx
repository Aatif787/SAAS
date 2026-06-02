"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Ruler, Cpu, Wrench, CheckCircle, HeartHandshake } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Consultation",
    desc: "Our experts assess your requirements, architectural style, and performance needs. Free site visit included.",
    color: "#00C2FF",
  },
  {
    num: "02",
    icon: Ruler,
    title: "Survey & Design",
    desc: "Precision laser measurement and CAD-based custom design. 200+ RAL colour options available.",
    color: "#7DFFD1",
  },
  {
    num: "03",
    icon: Cpu,
    title: "Manufacturing",
    desc: "German-engineered profiles CNC-cut and fusion-welded at our ISO 9001 certified facility.",
    color: "#00C2FF",
  },
  {
    num: "04",
    icon: Wrench,
    title: "Installation",
    desc: "Certified technicians install with precision. Typically completed in 1–3 days.",
    color: "#7DFFD1",
  },
  {
    num: "05",
    icon: CheckCircle,
    title: "Quality Check",
    desc: "100-point quality inspection. Every seal, lock, and hinge tested before handover.",
    color: "#FF6B35",
  },
  {
    num: "06",
    icon: HeartHandshake,
    title: "Aftercare",
    desc: "25-year warranty. Annual maintenance visits. Dedicated support line for all clients.",
    color: "#7DFFD1",
  },
];

export default function UPVCProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040810 0%, #0A1628 50%, #040810 100%)" }}>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(0,194,255,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
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
              Our Process
            </span>
            <div className="h-px w-8" style={{ background: "#00C2FF" }} />
          </div>
          <h2 className="font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
            From Vision to{" "}
            <span style={{
              background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Reality
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-12 left-[8.33%] right-[8.33%] h-px"
            style={{ background: "rgba(0,194,255,0.1)" }}>
            <motion.div className="h-full" style={{
              width: lineWidth,
              background: "linear-gradient(90deg, #00C2FF, #7DFFD1)",
              boxShadow: "0 0 10px rgba(0,194,255,0.5)",
            }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-center group"
                >
                  {/* Node */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${step.color}` }}
                      animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <div className="absolute inset-0 rounded-full flex items-center justify-center"
                      style={{
                        border: `1px solid ${step.color}40`,
                        background: `${step.color}10`,
                        backdropFilter: "blur(10px)",
                      }}>
                      <Icon size={28} style={{ color: step.color }} />
                    </div>

                    {/* Number badge — appears on hover */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: step.color,
                        boxShadow: `0 0 12px ${step.color}80`,
                      }}
                    >
                      <span className="text-[9px] font-black" style={{ color: "#040810" }}>
                        {step.num}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono mb-2" style={{ color: `${step.color}80` }}>
                    STEP {step.num}
                  </div>
                  <h3 className="text-base font-bold mb-3" style={{ color: "#E8F4FF" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(232,244,255,0.4)" }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Promise bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,194,255,0.12)",
            background: "rgba(10,22,40,0.8)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: "rgba(0,194,255,0.1)" }}>
            {[
              { icon: "⚡", label: "Installed in 1–3 Days", sub: "Fast, clean, professional", color: "#00C2FF" },
              { icon: "✓", label: "100-Point QC Check", sub: "Every seal, lock & hinge tested", color: "#7DFFD1" },
              { icon: "🛡", label: "25-Year Warranty", sub: "Backed by dedicated aftercare", color: "#FF6B35" },
            ].map((promise, i) => (
              <div
                key={promise.label}
                className="flex items-center gap-5 px-8 py-7"
                style={{ borderColor: "rgba(0,194,255,0.1)" }}
              >
                {/* Glowing icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{
                    border: `1px solid ${promise.color}30`,
                    background: `${promise.color}10`,
                    boxShadow: `0 0 20px ${promise.color}20`,
                  }}
                >
                  {promise.icon}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: "#E8F4FF" }}>
                    {promise.label}
                  </div>
                  <div
                    className="text-[11px] font-mono mt-0.5"
                    style={{ color: "rgba(232,244,255,0.4)" }}
                  >
                    {promise.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
