"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Clock, Globe, Cpu, Users, ShieldCheck } from "lucide-react";

const reasons = [
  {
    num: "01",
    icon: Award,
    title: "German Engineering",
    desc: "Every profile manufactured to DIN standards with precision CNC cutting and fusion welding",
    color: "#00C2FF",
  },
  {
    num: "02",
    icon: Clock,
    title: "48hr Quote Turnaround",
    desc: "Receive a detailed, itemised quote within 48 hours of your site survey — guaranteed",
    color: "#7DFFD1",
  },
  {
    num: "03",
    icon: Globe,
    title: "Pan-India Delivery",
    desc: "Manufacturing and delivery network covering 200+ cities across India",
    color: "#00C2FF",
  },
  {
    num: "04",
    icon: Cpu,
    title: "Smart Manufacturing",
    desc: "ISO 9001 certified facility with automated quality control and real-time production tracking",
    color: "#7DFFD1",
  },
  {
    num: "05",
    icon: Users,
    title: "Expert Installation",
    desc: "500+ certified installation professionals trained to our exacting standards",
    color: "#00C2FF",
  },
  {
    num: "06",
    icon: ShieldCheck,
    title: "Lifetime Support",
    desc: "25-year warranty backed by a dedicated aftercare team and annual maintenance visits",
    color: "#7DFFD1",
  },
];

export default function UPVCWhyIMS() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "#040810" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,194,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Topo background */}
      <div className="absolute inset-0 topo-bg opacity-100 pointer-events-none" />

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
            <span
              className="text-[10px] font-mono uppercase tracking-[0.5em]"
              style={{ color: "#00C2FF" }}
            >
              Why Choose IMS
            </span>
            <div className="h-px w-8" style={{ background: "#00C2FF" }} />
          </div>
          <h2
            className="font-black tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#E8F4FF",
              letterSpacing: "-0.03em",
            }}
          >
            Six Reasons to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Trust IMS
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "rgba(232,244,255,0.45)" }}
          >
            Three decades of precision. Six pillars that set us apart from every
            competitor in the market.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  border: "1px solid rgba(0,194,255,0.1)",
                  background: "rgba(10,22,40,0.6)",
                  backdropFilter: "blur(20px)",
                  transition:
                    "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
                }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(0,194,255,0.4)",
                  boxShadow: "0 0 40px rgba(0,194,255,0.1)",
                }}
              >
                {/* Large background number */}
                <div
                  className="absolute bottom-0 right-4 font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "120px",
                    opacity: 0.04,
                    color: "#00C2FF",
                    lineHeight: 1,
                  }}
                >
                  {reason.num}
                </div>

                {/* Card content */}
                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      border: `1px solid ${reason.color}30`,
                      background: `${reason.color}10`,
                    }}
                  >
                    <Icon size={26} style={{ color: reason.color }} />
                  </div>

                  {/* Number label */}
                  <div
                    className="text-[10px] font-mono uppercase tracking-[0.4em] mb-3"
                    style={{ color: `${reason.color}60` }}
                  >
                    {reason.num}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#E8F4FF" }}
                  >
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(232,244,255,0.45)" }}
                  >
                    {reason.desc}
                  </p>
                </div>

                {/* Glowing bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)`,
                    boxShadow: `0 0 12px ${reason.color}80`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
