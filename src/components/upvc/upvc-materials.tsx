"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const specs = [
  { label: "Multi-chamber UPVC profiles", color: "#00C2FF" },
  { label: "Galvanised steel reinforcement", color: "#FF6B35" },
  { label: "UV-stabilised outer skin", color: "#7DFFD1" },
  { label: "Triple-glazed options (U-value 0.6 W/m²K)", color: "#00C2FF" },
  { label: "Thermal break technology", color: "#7DFFD1" },
  { label: "Acoustic insulation (up to 42dB)", color: "#FF6B35" },
  { label: "A+ energy rating", color: "#00C2FF" },
  { label: "Anti-corrosion 316 marine hardware", color: "#7DFFD1" },
];

function CrossSectionSVG({ inView }: { inView: boolean }) {
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.7, delay },
  });

  return (
    <svg
      viewBox="0 0 400 480"
      className="w-full max-w-[420px] mx-auto"
      style={{ filter: "drop-shadow(0 0 30px rgba(0,194,255,0.12))" }}
    >
      {/* ── Outer UPVC frame ── */}
      <motion.rect
        x="30" y="30" width="340" height="420" rx="6"
        stroke="#00C2FF" strokeWidth="2.5"
        fill="rgba(0,194,255,0.05)"
        {...fadeIn(0.1)}
      />

      {/* ── Inner frame rebate ── */}
      <motion.rect
        x="55" y="55" width="290" height="370" rx="4"
        stroke="rgba(0,194,255,0.35)" strokeWidth="1"
        fill="none"
        {...fadeIn(0.25)}
      />

      {/* ── Chamber 1 (left) ── */}
      <motion.rect
        x="30" y="30" width="60" height="420" rx="0"
        stroke="#7DFFD1" strokeWidth="1.2"
        fill="rgba(125,255,209,0.03)"
        {...fadeIn(0.35)}
      />
      {/* ── Chamber 2 (right) ── */}
      <motion.rect
        x="310" y="30" width="60" height="420" rx="0"
        stroke="#7DFFD1" strokeWidth="1.2"
        fill="rgba(125,255,209,0.03)"
        {...fadeIn(0.45)}
      />
      {/* ── Chamber 3 (top) ── */}
      <motion.rect
        x="30" y="30" width="340" height="60" rx="0"
        stroke="#7DFFD1" strokeWidth="1.2"
        fill="rgba(125,255,209,0.03)"
        {...fadeIn(0.55)}
      />

      {/* ── Glass pane ── */}
      <motion.rect
        x="90" y="90" width="220" height="300" rx="2"
        stroke="rgba(0,194,255,0.4)" strokeWidth="1.5"
        fill="rgba(0,194,255,0.08)"
        {...fadeIn(0.65)}
      />
      {/* Glass inner pane (triple glaze) */}
      <motion.rect
        x="100" y="100" width="200" height="280" rx="1"
        stroke="rgba(0,194,255,0.2)" strokeWidth="0.8"
        fill="rgba(0,194,255,0.04)"
        {...fadeIn(0.72)}
      />

      {/* ── Steel reinforcement bar ── */}
      <motion.rect
        x="38" y="200" width="44" height="20" rx="2"
        stroke="#FF6B35" strokeWidth="1.5"
        fill="rgba(255,107,53,0.1)"
        {...fadeIn(0.8)}
      />
      <motion.rect
        x="318" y="200" width="44" height="20" rx="2"
        stroke="#FF6B35" strokeWidth="1.5"
        fill="rgba(255,107,53,0.1)"
        {...fadeIn(0.85)}
      />

      {/* ── Shimmer on glass ── */}
      {inView && (
        <motion.rect
          x="90" y="90" width="30" height="300"
          fill="rgba(255,255,255,0.04)"
          initial={{ x: 90, opacity: 0 }}
          animate={{ x: [90, 310, 90], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />
      )}

      {/* ── Labels ── */}
      {/* Outer frame label */}
      <motion.g {...fadeIn(1.0)}>
        <line x1="30" y1="15" x2="200" y2="15" stroke="rgba(0,194,255,0.3)" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="205" y="19" fill="#00C2FF" fontSize="10" fontFamily="monospace">UPVC Outer Frame</text>
      </motion.g>

      {/* Chamber label */}
      <motion.g {...fadeIn(1.1)}>
        <line x1="60" y1="250" x2="10" y2="280" stroke="rgba(125,255,209,0.3)" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="-5" y="295" fill="#7DFFD1" fontSize="9" fontFamily="monospace" transform="rotate(-90, -5, 295)">Chambers</text>
      </motion.g>

      {/* Glass label */}
      <motion.g {...fadeIn(1.15)}>
        <line x1="200" y1="240" x2="320" y2="400" stroke="rgba(0,194,255,0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="322" y="404" fill="rgba(0,194,255,0.7)" fontSize="9" fontFamily="monospace">Triple Glaze</text>
      </motion.g>

      {/* Steel label */}
      <motion.g {...fadeIn(1.2)}>
        <line x1="82" y1="210" x2="140" y2="170" stroke="rgba(255,107,53,0.4)" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="142" y="168" fill="#FF6B35" fontSize="9" fontFamily="monospace">Steel Reinf.</text>
      </motion.g>
    </svg>
  );
}

export default function UPVCMaterials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #040810 0%, #0A1628 50%, #040810 100%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(0,194,255,0.05) 0%, transparent 70%)",
        }}
      />

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
              Material Technology
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
            Inside Every{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Profile
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "rgba(232,244,255,0.45)" }}
          >
            A cross-section of precision. Every layer engineered for
            performance, longevity, and beauty.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — SVG diagram */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="relative rounded-2xl p-8"
              style={{
                border: "1px solid rgba(0,194,255,0.12)",
                background: "rgba(10,22,40,0.6)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                className="text-[10px] font-mono uppercase tracking-[0.4em] mb-6 text-center"
                style={{ color: "rgba(0,194,255,0.5)" }}
              >
                UPVC_CROSS_SECTION · DIN_EN_12608
              </div>
              <CrossSectionSVG inView={inView} />
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {[
                  { color: "#00C2FF", label: "UPVC Frame" },
                  { color: "#7DFFD1", label: "Chambers" },
                  { color: "#FF6B35", label: "Steel Core" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 6px ${item.color}80`,
                      }}
                    />
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: "rgba(232,244,255,0.5)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Spec list */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "#E8F4FF" }}
              >
                Engineering Specifications
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(232,244,255,0.4)" }}
              >
                Every IMS profile meets or exceeds international standards for
                thermal, acoustic, and structural performance.
              </p>
            </motion.div>

            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                <div
                  className="flex items-center gap-4 py-4 px-5 rounded-xl"
                  style={{
                    border: "1px solid rgba(0,194,255,0.08)",
                    background: "rgba(10,22,40,0.4)",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                >
                  {/* Accent dot */}
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background: spec.color,
                      boxShadow: `0 0 8px ${spec.color}80`,
                    }}
                  />

                  {/* Label */}
                  <span
                    className="text-sm font-medium flex-1"
                    style={{ color: "#E8F4FF" }}
                  >
                    {spec.label}
                  </span>

                  {/* Color accent tag */}
                  <div
                    className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded"
                    style={{
                      color: spec.color,
                      background: `${spec.color}12`,
                      border: `1px solid ${spec.color}25`,
                    }}
                  >
                    IMS
                  </div>
                </div>

                {/* Laser-draw underline on scroll */}
                <motion.div
                  className="absolute bottom-0 left-5 right-5 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${spec.color}60, transparent)`,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
