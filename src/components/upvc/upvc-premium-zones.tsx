"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Building2, Hotel, Landmark, Warehouse } from "lucide-react";

const zones = [
  {
    title: "Luxury Residences",
    desc: "UPVC systems that make apartments feel brighter, quieter, and architecturally premium.",
    image: "/images/upvc/hero.png",
    icon: Building2,
    stat: "42dB",
    label: "Acoustic Comfort",
    color: "#00C2FF",
  },
  {
    title: "Private Villas",
    desc: "Statement openings, elegant glazing, and a grander entrance feel for premium homes.",
    image: "/images/upvc/villa.png",
    icon: Landmark,
    stat: "25yr",
    label: "Warranty",
    color: "#7DFFD1",
  },
  {
    title: "Boutique Hospitality",
    desc: "Durable systems with premium sightlines for resorts, lounges, and high-touch experiences.",
    image: "/images/upvc/french-door.png",
    icon: Hotel,
    stat: "100%",
    label: "Weather Sealed",
    color: "#FF6B35",
  },
  {
    title: "Commercial Facades",
    desc: "Robust systems for offices and mixed-use developments that still feel modern and premium.",
    image: "/images/upvc/sliding-door.png",
    icon: Warehouse,
    stat: "30%",
    label: "Energy Saving",
    color: "#00C2FF",
  },
];

const marquee = [
  "Luxury Facades", "Designer Entrances", "German Engineering",
  "Soundproof Living", "Modern Villas", "Premium UPVC",
  "A+ Energy Rating", "ISO 9001 Certified",
];

export default function UPVCPremiumZones() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#040810" }}>

      {/* Marquee ticker */}
      <div className="relative overflow-hidden py-4"
        style={{ borderTop: "1px solid rgba(0,194,255,0.1)", borderBottom: "1px solid rgba(0,194,255,0.1)" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex min-w-max items-center gap-8 whitespace-nowrap"
        >
          {[...marquee, ...marquee, ...marquee].map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em]"
                style={{ color: "rgba(0,194,255,0.5)" }}>
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00C2FF", boxShadow: "0 0 6px #00C2FF" }} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-32">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#00C2FF" }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
                Applications
              </span>
            </div>
            <h2 className="font-black tracking-tight leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
              Built for Spaces
              <br />
              That Need to Look{" "}
              <span style={{
                background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Expensive
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-md"
          >
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(232,244,255,0.45)" }}>
              Whether the goal is a premium villa entrance, a quieter apartment, or a polished commercial facade —
              the right UPVC system changes how the entire property is perceived.
            </p>
            <Link href="/upvc/contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ghost">
              Talk to Design Team <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Zone cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {zones.map((zone, i) => {
            const Icon = zone.icon;
            return (
              <motion.div
                key={zone.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-3xl"
                style={{ border: "1px solid rgba(0,194,255,0.1)" }}
              >
                <div className="relative h-[400px] overflow-hidden">
                  <Image src={zone.image} alt={zone.title} fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110" />

                  {/* Overlay */}
                  <div className="absolute inset-0 transition-all duration-700"
                    style={{
                      background: "linear-gradient(to top, rgba(4,8,16,0.95) 0%, rgba(4,8,16,0.3) 50%, transparent 100%)",
                    }} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(ellipse at center, ${zone.color}15 0%, transparent 70%)` }} />

                  {/* Icon badge */}
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      border: `1px solid ${zone.color}40`,
                      background: `${zone.color}15`,
                      backdropFilter: "blur(10px)",
                      color: zone.color,
                    }}>
                    <Icon size={20} />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-6">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3"
                        style={{ color: `${zone.color}80` }}>
                        Usage Zone
                      </div>
                      <h3 className="text-2xl font-black mb-3" style={{ color: "#E8F4FF", letterSpacing: "-0.02em" }}>
                        {zone.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(232,244,255,0.55)" }}>
                        {zone.desc}
                      </p>
                    </div>
                    <div className="shrink-0 p-4 rounded-2xl text-right"
                      style={{
                        border: `1px solid ${zone.color}25`,
                        background: "rgba(4,8,16,0.7)",
                        backdropFilter: "blur(20px)",
                      }}>
                      <div className="text-3xl font-black" style={{ color: zone.color }}>{zone.stat}</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest mt-1"
                        style={{ color: "rgba(232,244,255,0.4)" }}>
                        {zone.label}
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${zone.color}, transparent)` }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
