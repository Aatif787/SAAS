"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Box, Shield, Activity } from "lucide-react";
import gsap from "gsap";
import { useSplitTextReveal, useMagneticHover } from "./steel-scroll-engine";
import { steelAudio } from "./steel-audio-engine";

export default function SteelHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useSplitTextReveal(titleRef, { stagger: 0.03, delay: 0.8 });
  useMagneticHover(buttonRef, 0.4);

  useEffect(() => {
    // Reveal subtitle and CTA with delay
    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, delay: 1.8, ease: "power3.out" }
    );

    gsap.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 2.2, ease: "power4.out" }
    );
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">

      {/* Extreme Vignette for Cinematic Focus - Now White */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(255,255,255,1)_100%)]" />

      {/* Futuristic HUD overlays */}
      <div className="pointer-events-none absolute bottom-10 left-10 hidden items-center gap-6 md:flex">
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#009966]">
          <Activity size={12} className="animate-pulse" />
          Neural Engine Active
        </div>
        <div className="h-px w-12 bg-[#009966]/30" />
        <div className="text-[9px] font-bold tracking-[0.2em] text-[#050505]/50">SYS_OP: NOMINAL</div>
      </div>

      <div className="pointer-events-none absolute bottom-10 right-10 hidden flex-col items-end gap-2 md:flex">
        <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FF6B1A]">Structural Integrity: 100%</div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-1.5 w-4 bg-[#FF6B1A]" style={{ opacity: i * 0.2 }} />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="mb-6 flex items-center gap-3 rounded-full border border-[#050505]/10 bg-white/80 px-5 py-2.5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <Shield size={14} className="text-[#00C853]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#050505]">
            Next-Generation Architectural Steel
          </span>
        </div>

        <h1
          ref={titleRef}
          className="mx-auto max-w-6xl text-4xl font-black leading-[1.1] tracking-[-0.04em] text-[#050505] sm:text-5xl md:text-6xl lg:text-[5.5rem] md:leading-none"
          style={{ perspective: "1000px" }}
        >
          Precision <span className="text-[#00C853] drop-shadow-[0_0_20px_rgba(0,200,83,0.1)]">Steel Architecture</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-10 max-w-2xl text-lg font-medium leading-relaxed tracking-wide text-[#111111]/80"
        >
          IMS Steel pioneers hyper-premium structural systems and luxury architectural doors. Designed with absolute CNC precision for the world's most advanced commercial environments.
        </p>

        <div ref={ctaRef} className="mt-14 flex flex-col items-center gap-8 sm:flex-row">
          <Link
            ref={buttonRef}
            href="/ims-steel/contact"
            onClick={() => steelAudio.playClick()}
            onMouseEnter={() => steelAudio.playHover()}
            className="group relative flex h-16 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#050505] px-10 text-xs font-bold uppercase tracking-[0.2em] text-[#F5F5F5] transition-all hover:scale-105 hover:bg-[#FF6B1A] hover:text-[#050505] hover:shadow-[0_0_40px_rgba(255,107,26,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Initiate Project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="#systems"
            onClick={() => steelAudio.playClick()}
            onMouseEnter={() => steelAudio.playHover()}
            className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#050505] transition-colors hover:text-[#00C853]"
          >
            <Box size={16} className="text-[#00C853] transition-transform group-hover:rotate-12" />
            Explore Systems
          </Link>
        </div>
      </div>
    </section>
  );
}
