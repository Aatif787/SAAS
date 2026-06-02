"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1200, suffix: "+", label: "Tons Monthly Output", detail: "Automated Fabrication" },
  { value: 145, suffix: "K", label: "Sq.Ft Facility", detail: "Cinematic Engineering" },
  { value: 25, suffix: " Yr", label: "Structural Warranty", detail: "Carbon-Steel Protection" },
  { value: 350, suffix: "+", label: "Portals Activated", detail: "Global Deployments" },
];

export default function SteelStatsRibbon() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal laser draw animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }

      // Counter animations
      stats.forEach((stat, index) => {
        const el = counterRefs.current[index];
        if (!el) return;

        const obj = { val: 0 };

        // Card entrance
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.9, rotateX: -20 },
          {
            y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.2, delay: index * 0.12, ease: "power4.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );

        // Number counter
        const numEl = el.querySelector(".stat-number");
        if (numEl) {
          gsap.to(obj, {
            val: stat.value,
            duration: 2.5,
            delay: index * 0.15 + 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              numEl.textContent = Math.round(obj.val).toLocaleString() + stat.suffix;
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-28 text-[#F5F5F5]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
        {/* Plasma laser line */}
        <div
          ref={lineRef}
          className="mb-20 h-px bg-gradient-to-r from-transparent via-[#00C853]/60 to-transparent origin-left shadow-[0_0_20px_rgba(0,200,83,0.4)]"
        />

        <div className="mb-14 text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#00C853]">
            Architectural Metrics
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            Numbers that define <span className="text-[#CCCCCC]">structural reality</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => { counterRefs.current[index] = el; }}
              className="group relative rounded-[2.2rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-10 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-[#FF6B1A]/40 hover:bg-[#111111]/80 hover:shadow-[0_30px_60px_rgba(255,107,26,0.15)]"
              style={{ perspective: "1000px" }}
            >
              {/* Energy Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,26,0.08),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="stat-number text-5xl font-black tracking-[-0.06em] text-[#FF6B1A] tabular-nums drop-shadow-[0_0_15px_rgba(255,107,26,0.4)]">
                  0
                </div>
                <div className="mt-4 text-sm font-semibold text-white">{stat.label}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#CCCCCC]">
                  {stat.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-[#FF6B1A]/40 to-transparent shadow-[0_0_20px_rgba(255,107,26,0.4)]" />
      </div>
    </section>
  );
}
