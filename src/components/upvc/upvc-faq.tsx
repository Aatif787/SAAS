"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What is UPVC and why is it superior to aluminium?",
    a: "UPVC (Unplasticised Polyvinyl Chloride) is a rigid, high-performance polymer. Unlike aluminium, UPVC provides superior thermal insulation (no cold bridging), doesn't corrode or require painting, offers better acoustic performance, and delivers a lower lifetime cost. Our multi-chamber profiles achieve U-values as low as 0.6 W/m²K.",
  },
  {
    q: "How long do IMS UPVC windows and doors last?",
    a: "IMS UPVC products are engineered to last 25–50 years with minimal maintenance. We back every product with a comprehensive 25-year warranty covering frame integrity, hardware, and glazing seals. Our UV-stabilised profiles maintain colour and structural integrity for decades.",
  },
  {
    q: "What energy savings can I expect?",
    a: "Our triple-glazed systems with argon fill and Low-E coatings can reduce heating and cooling costs by up to 30% annually. Every IMS window achieves an A+ energy rating. The thermal break technology eliminates cold bridging — the primary cause of heat loss in conventional frames.",
  },
  {
    q: "Can IMS UPVC products be customised?",
    a: "Absolutely. We offer 200+ RAL colour options, woodgrain foil finishes, custom sizes up to 3m × 3m, and bespoke hardware selections. Every product is made-to-measure at our manufacturing facility. Our design team provides 3D visualisations before production begins.",
  },
  {
    q: "What is the installation timeline?",
    a: "Manufacturing takes 7–10 working days from approved design sign-off. Installation is typically completed in 1–3 days depending on project scale. Our certified installation teams work with minimal disruption and complete a 100-point quality inspection before handover.",
  },
  {
    q: "What security standards do your products meet?",
    a: "All IMS doors and windows feature German-engineered 5-point locking systems with anti-drill, anti-pick, and anti-snap cylinders. Our products meet PAS 24 enhanced security standards and are tested to BS 6375 for weather performance. Marine-grade 316 stainless steel hardware is standard.",
  },
  {
    q: "Do you provide after-sales service?",
    a: "Yes. Every IMS client receives a dedicated aftercare package including annual maintenance visits, hardware adjustment services, and a 24-hour emergency support line. Our warranty claims are processed within 48 hours with no-quibble replacement policy.",
  },
];

export default function UPVCFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="faq" className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040810 0%, #0A1628 100%)" }}>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="faq-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00C2FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 items-start">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: "#00C2FF" }} />
                <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
                  FAQ
                </span>
              </div>

              <h2 className="font-black tracking-tight leading-[0.9] mb-6"
                style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
                Got
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Questions?
                </span>
              </h2>

              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(232,244,255,0.45)" }}>
                Everything you need to know about our premium UPVC systems.
                Can&apos;t find your answer? Talk to our team directly.
              </p>

              <Link href="/upvc/contact">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ember"
                >
                  Ask Us Anything
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: open === i ? "1px solid rgba(0,194,255,0.3)" : "1px solid rgba(0,194,255,0.08)",
                  background: open === i ? "rgba(10,22,40,0.9)" : "rgba(10,22,40,0.4)",
                  boxShadow: open === i ? "0 0 30px rgba(0,194,255,0.06)" : "none",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <span className="text-sm font-semibold leading-relaxed" style={{ color: open === i ? "#E8F4FF" : "rgba(232,244,255,0.6)" }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      border: `1px solid ${open === i ? "rgba(0,194,255,0.5)" : "rgba(0,194,255,0.2)"}`,
                      background: open === i ? "rgba(0,194,255,0.15)" : "transparent",
                      color: open === i ? "#00C2FF" : "rgba(232,244,255,0.4)",
                    }}
                  >
                    <Plus size={16} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px mb-4" style={{ background: "rgba(0,194,255,0.1)" }} />
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(232,244,255,0.55)" }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
