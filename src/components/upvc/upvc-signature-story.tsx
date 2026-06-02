"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Layers3, ShieldCheck, Castle } from "lucide-react";

const pillars = [
  {
    icon: Layers3,
    title: "Multi-Chamber Profiles",
    desc: "Slim modern sections with stronger chamber design and cleaner sightlines for contemporary facades.",
    color: "#00C2FF",
  },
  {
    icon: ShieldCheck,
    title: "Built For Performance",
    desc: "Weather-sealed construction, 5-point locking, and triple-glazing options for lasting comfort.",
    color: "#7DFFD1",
  },
  {
    icon: Castle,
    title: "Classical Luxury Feel",
    desc: "Finishes and form factors designed to elevate villas, premium homes, and grand entrances.",
    color: "#FF6B35",
  },
];

const signals = [
  { label: "Facade Impact", value: "Transformative" },
  { label: "Maintenance Need", value: "Near Zero" },
  { label: "Energy Saving", value: "Up to 30%" },
  { label: "Warranty Period", value: "25 Years" },
];

export default function UPVCSignatureStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040810 0%, #0A1628 50%, #040810 100%)" }}>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(0,194,255,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: "#00C2FF" }} />
                <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
                  Luxury Positioning
                </span>
              </div>

              <h2 className="font-black tracking-tight leading-[0.9] mb-8"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
                Crafted to Make
                <br />
                Every Entrance
                <br />
                Feel{" "}
                <span style={{
                  background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Signature
                </span>
              </h2>

              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(232,244,255,0.45)" }}>
                More than a utility product, premium UPVC shapes the first impression of architecture.
                Built around better proportions, calmer details, and a refined finish language.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/upvc/projects"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ember">
                  View Projects <ArrowRight size={14} />
                </Link>
                <Link href="/upvc/get-quote"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ghost">
                  Plan My Space
                </Link>
              </div>

              {/* Signals */}
              <div className="rounded-2xl p-6"
                style={{ border: "1px solid rgba(0,194,255,0.12)", background: "rgba(10,22,40,0.6)" }}>
                <div className="text-[10px] font-mono uppercase tracking-[0.4em] mb-5" style={{ color: "#00C2FF" }}>
                  Project Signals
                </div>
                <div className="space-y-4">
                  {signals.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex items-center justify-between pb-4 last:pb-0"
                      style={{ borderBottom: i < signals.length - 1 ? "1px solid rgba(0,194,255,0.06)" : "none" }}
                    >
                      <span className="text-sm" style={{ color: "rgba(232,244,255,0.4)" }}>{s.label}</span>
                      <span className="text-sm font-bold" style={{ color: "#E8F4FF" }}>{s.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl"
              style={{ border: "1px solid rgba(0,194,255,0.12)" }}
            >
              <div className="relative h-[480px] overflow-hidden">
                <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                  <Image src="/images/upvc/villa.png" alt="Luxury UPVC villa" fill
                    sizes="(max-width:1280px) 100vw, 50vw" className="object-cover" />
                </motion.div>
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(4,8,16,0.8) 0%, rgba(4,8,16,0.2) 50%, transparent 100%)" }} />

                {/* Top badge */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest"
                  style={{ border: "1px solid rgba(0,194,255,0.3)", background: "rgba(4,8,16,0.7)", color: "#00C2FF", backdropFilter: "blur(10px)" }}>
                  Villa-grade Presentation
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl"
                  style={{ border: "1px solid rgba(0,194,255,0.15)", background: "rgba(4,8,16,0.7)", backdropFilter: "blur(20px)" }}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "rgba(0,194,255,0.6)" }}>
                        Design Intent
                      </div>
                      <div className="text-xl font-bold" style={{ color: "#E8F4FF" }}>
                        Sharper facade rhythm with cleaner openings
                      </div>
                    </div>
                    <div className="text-right shrink-0 p-4 rounded-xl"
                      style={{ border: "1px solid rgba(0,194,255,0.15)", background: "rgba(0,194,255,0.08)" }}>
                      <div className="text-3xl font-black" style={{ color: "#00C2FF" }}>25yr</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest mt-1" style={{ color: "rgba(0,194,255,0.5)" }}>
                        Warranty
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pillar cards */}
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-7 rounded-2xl transition-all duration-500"
                  style={{
                    border: "1px solid rgba(0,194,255,0.08)",
                    background: "rgba(10,22,40,0.5)",
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                      style={{ background: `${pillar.color}15`, color: pillar.color }}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-2" style={{ color: "#E8F4FF" }}>{pillar.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(232,244,255,0.4)" }}>{pillar.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest shrink-0"
                      style={{ border: `1px solid ${pillar.color}30`, color: pillar.color, background: `${pillar.color}08` }}>
                      <BadgeCheck size={12} /> Certified
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
