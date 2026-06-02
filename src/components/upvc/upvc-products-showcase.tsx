"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredUPVCDoorProducts, upvcDoorCount } from "@/lib/upvc-product-data";

const BADGE_COLORS: Record<string, string> = {
  security: "#FF6B35",
  thermal: "#00C2FF",
  acoustic: "#7DFFD1",
  weather: "#00C2FF",
  energy: "#7DFFD1",
  design: "#FF6B35",
};

export default function UPVCProductsShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: "#040810" }}>
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="prod-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00C2FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prod-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#00C2FF" }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
                Curated Selection
              </span>
            </div>
            <h2 className="font-black tracking-tight leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
              {upvcDoorCount}+ Door{" "}
              <span style={{
                background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Styles
              </span>
              {" "}& Variants
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(232,244,255,0.45)" }}>
              Designer entry systems, sliders, French sets, pivots, folding systems, acoustic doors, and more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href="/upvc/products"
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] pb-3 transition-all duration-300"
              style={{ color: "rgba(232,244,255,0.4)", borderBottom: "1px solid rgba(0,194,255,0.15)" }}>
              View Full Collection
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredUPVCDoorProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden transition-all duration-700"
              style={{
                border: "1px solid rgba(0,194,255,0.1)",
                background: "rgba(10,22,40,0.5)",
              }}
            >
              {/* Image */}
              <div className="relative h-[360px] overflow-hidden">
                <Image src={p.img} alt={p.title} fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110" />

                {/* Overlay */}
                <div className="absolute inset-0 transition-all duration-700"
                  style={{ background: "linear-gradient(to top, rgba(4,8,16,0.95) 0%, rgba(4,8,16,0.2) 60%, transparent 100%)" }} />

                {/* Hover reveal */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-10"
                  style={{ background: "rgba(4,8,16,0.85)", backdropFilter: "blur(4px)" }}>
                  <div className="text-center">
                    <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(232,244,255,0.7)" }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {p.specs.map((spec, si) => (
                        <span key={si} className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest"
                          style={{ border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", background: "rgba(0,194,255,0.08)" }}>
                          {spec}
                        </span>
                      ))}
                    </div>
                    <Link href="/upvc/products"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ember">
                      View Details <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Tag */}
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest"
                  style={{
                    border: "1px solid rgba(255,107,53,0.4)",
                    background: "rgba(255,107,53,0.15)",
                    color: "#FF6B35",
                    backdropFilter: "blur(10px)",
                  }}>
                  {p.tag}
                </div>

                {/* Arrow */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ border: "1px solid rgba(0,194,255,0.4)", background: "rgba(0,194,255,0.15)", color: "#00C2FF" }}>
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Info */}
              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-black mb-1 group-hover:text-[#00C2FF] transition-colors duration-300"
                      style={{ color: "#E8F4FF", letterSpacing: "-0.02em" }}>
                      {p.title}
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(0,194,255,0.4)" }}>
                      Premium UPVC Series
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      border: "1px solid rgba(0,194,255,0.15)",
                      color: "rgba(0,194,255,0.4)",
                    }}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Badge keys */}
                <div className="flex flex-wrap gap-2">
                  {p.badgeKeys.map(key => (
                    <span key={key} className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest"
                      style={{
                        border: `1px solid ${BADGE_COLORS[key]}25`,
                        color: BADGE_COLORS[key],
                        background: `${BADGE_COLORS[key]}08`,
                      }}>
                      {key}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, #00C2FF, #7DFFD1)" }}
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
              />
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <Link href="/upvc/products">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] btn-ember"
            >
              View All {upvcDoorCount}+ Products <ArrowUpRight size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
