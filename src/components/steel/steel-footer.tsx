"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steelAudio } from "./steel-audio-engine";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "Heavy Structural Steel", href: "/ims-steel/systems/structural-steel" },
  { label: "Architectural Facades", href: "/ims-steel/systems/architectural-steel" },
  { label: "Featured Commercial Work", href: "/ims-steel/projects" },
  { label: "AI Sizing Lab", href: "/ims-steel/ai-lab" },
];

export default function SteelFooter() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer id="contact" ref={footerRef} className="relative overflow-hidden bg-[#050505] pt-24 text-[#F5F5F5]">
      {styleTag}
      {/* Volumetric background green and orange ambient highlights and grid overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,200,83,0.04),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(0,153,102,0.05),transparent_20%),linear-gradient(90deg,rgba(0,200,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(0,200,83,0.02)_1px,transparent_1px)] bg-[size:auto,auto,110px_110px,110px_110px]" />
      
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#00C853]">Get In Touch</div>
            <h2 className="mt-8 max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.05em] text-[#F5F5F5] md:text-7xl xl:text-8xl">
              Build the next
              <br />
              <span className="text-[#FF6B1A] drop-shadow-[0_0_30px_rgba(255,107,26,0.15)]">iconic steel</span> landmark
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#D0D0D0]">
              IMS Steel combines architectural design support, heavy CNC fabrication capabilities, and seamless installation coordination for landmark projects. Partner with us to execute your visual envelope.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/ims-steel/contact"
                onMouseEnter={() => steelAudio.playHover()}
                onClick={() => steelAudio.playClick()}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#00C853] px-8 py-5 text-xs font-bold uppercase tracking-[0.26em] text-[#050505] transition-all hover:bg-[#FF6B1A] hover:shadow-[0_20px_60px_rgba(255,107,26,0.3)]"
              >
                <div className="absolute inset-0 bg-[#050505]/10 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0" />
                <span className="relative z-10">Request Private Consultation</span>
                <ArrowUpRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-end space-y-6">
            <div className="rounded-[2.4rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-10 backdrop-blur-xl shadow-2xl transition-all hover:border-[#00C853]/30 hover:shadow-[0_20px_50px_rgba(0,200,83,0.06)]">
              <div className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#00C853]">Direct Contact</div>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00C853]/10 text-[#00C853]">
                    <MapPin size={18} />
                  </div>
                  <span className="mt-2 text-sm leading-7 text-[#D0D0D0] font-medium">IMS Steel Division, Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00C853]/10 text-[#00C853]">
                    <Phone size={18} />
                  </div>
                  <a href="tel:+919699858212" className="text-sm text-[#F5F5F5] hover:text-[#00C853] font-semibold transition-colors">+91 9699 858 212</a>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00C853]/10 text-[#00C853]">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:steel@imsgroup.co.in" className="text-sm text-[#F5F5F5] hover:text-[#00C853] font-semibold transition-colors">steel@imsgroup.co.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Giant IMS STEEL Text with interactive Steel Rod conversion hover animation */}
      <div className="relative mt-20 flex w-full flex-col items-center justify-center overflow-hidden border-t border-[#D9D9D9]/10 bg-[#050505]/50 py-24 backdrop-blur-md">
        
        {/* Interactive Logo Container */}
        <div 
          className="relative flex w-full items-center justify-center cursor-pointer group py-8 select-none"
          onMouseEnter={() => {
            steelAudio.playWarp();
          }}
        >
          {/* Main Giant Text */}
          <div 
            className="text-[13vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#F5F5F5] via-[#888888] to-[#222222] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-[0.02] group-hover:opacity-0 group-hover:tracking-[1.2em]"
          >
            IMS STEEL
          </div>

          {/* Super-Realistic Metallic Steel Rod Morph */}
          <div 
            className="absolute left-1/2 top-1/2 h-[12px] w-0 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 bg-gradient-to-b from-[#FFFFFF] via-[#8E8E93] to-[#1C1C1E] shadow-[0_0_30px_rgba(255,255,255,0.8),inset_0_2px_3px_rgba(255,255,255,0.9),0_0_40px_rgba(0,200,83,0.3)] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-[85%] group-hover:opacity-100"
            style={{
              background: "linear-gradient(to bottom, #ffffff 0%, #a2a2a2 35%, #505050 50%, #2a2a2a 70%, #151515 100%)",
            }}
          >
            {/* Super reflection shine sweep animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover:animate-[steelsweep_2s_infinite_ease-in-out]" />
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto flex max-w-[1600px] flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10 xl:px-14">
          <div className="flex flex-wrap gap-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B8B8B8]">
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-[#00C853]">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#B8B8B8]">IMS Steel Platform © 2026</div>
        </div>
      </div>
    </footer>
  );
}

const styleTag = (
  <style>{`
    @keyframes steelsweep {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `}</style>
);
