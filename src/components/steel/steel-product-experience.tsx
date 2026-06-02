"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Building2, DoorOpen, Landmark, Maximize, ScanSearch, Sparkles, SquareStack, WandSparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitTextReveal, useScrollSkew, useMagneticHover } from "./steel-scroll-engine";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  { title: "Structural Steel", description: "High-performance structural frameworks optimized for commercial spaces, retail towers, and large-span architectural structures.", image: "/images/steel-infra-4k.png", icon: <Boxes size={18} />, specs: ["Large-span capability", "High-load engineering", "Fabrication precision", "Site execution support"] },
  { title: "Stainless Steel Systems", description: "Refined stainless steel profiles designed for clean interior details, elevator portals, and luxury entrance statements.", image: "/images/corporate-hub-4k.png", icon: <Sparkles size={18} />, specs: ["Premium surface finish", "Corrosion resistance", "Luxury detailing", "Interior-exterior use"] },
  { title: "Architectural Facades", description: "Design-led facades, structural fins, and customized window grids crafted specifically for elite villa properties.", image: "/images/estate-empire-4k.png", icon: <Landmark size={18} />, specs: ["Facade-ready language", "Custom profiles", "Design-driven finish", "Visual precision"] },
  { title: "Industrial Solutions", description: "Engineered solutions for industrial facilities combining high load resilience with long-term assembly durability.", image: "/images/corporate-hub.png", icon: <Building2 size={18} />, specs: ["Operational resilience", "High-strength assemblies", "Scalable detailing", "Maintenance planning"] },
  { title: "Precision Fabrication", description: "CNC-controlled processing workflows with sub-millimeter tolerances, seamless welds, and multi-stage quality checks.", image: "/images/steel-infra-4k.png", icon: <SquareStack size={18} />, specs: ["CNC workflow", "Tolerance control", "Assembly logic", "Execution consistency"] },
  { title: "Luxury Interiors", description: "Handcrafted interior staircases, room dividers, feature screen assemblies, and furniture framing systems.", image: "/images/home-solution-4k.png", icon: <WandSparkles size={18} />, specs: ["Interior detailing", "Luxury finishes", "Custom geometry", "Material contrast"] },
  { title: "Security Doors", description: "Thermal-break architectural steel entry doors featuring premium safety hardware and massive visual weight.", image: "/images/upvc/french-door.png", icon: <DoorOpen size={18} />, specs: ["Security hardware", "Premium frame depth", "Designer entry options", "Long-life finish"] },
  { title: "Steel Windows", description: "Ultra-slim steel casement assemblies presenting minimal frame profile and clean, classical sightlines.", image: "/images/upvc/casement.png", icon: <Maximize size={18} />, specs: ["Minimal sightlines", "Architectural profiles", "Facade integration", "Luxury glazing"] },
  { title: "Cladding Envelopes", description: "Custom metallic curtain walls, sun shades, and textured cladding envelopes engineered for global landmarks.", image: "/images/corporate-hub-4k.png", icon: <ScanSearch size={18} />, specs: ["Envelope engineering", "Layered facade depth", "Visual rhythm", "System integration"] },
];

export default function SteelProductExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = systems[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useSplitTextReveal(titleRef, { stagger: 0.018, duration: 1.0, y: 70, start: "top 80%" });
  useScrollSkew(panelRef, 6);
  useMagneticHover(buttonRef, 0.25);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Selector buttons stagger
      if (selectorRef.current) {
        gsap.fromTo(
          selectorRef.current.children,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out",
            scrollTrigger: { trigger: selectorRef.current, start: "top 78%" },
          }
        );
      }

      // Panel cinematic entrance
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { y: 80, opacity: 0, scale: 0.94, rotateX: 10 },
          {
            y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.6, ease: "power4.out",
            scrollTrigger: { trigger: panelRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate panel transition on system change
  useEffect(() => {
    if (!panelRef.current) return;
    
    gsap.fromTo(
      panelRef.current,
      { opacity: 0.2, scale: 0.98, filter: "blur(12px) contrast(150%)" },
      { opacity: 1, scale: 1, filter: "blur(0px) contrast(100%)", duration: 1.2, ease: "power4.out" }
    );
  }, [activeIndex]);

  return (
    <section id="systems" ref={sectionRef} className="relative overflow-hidden bg-transparent py-40 text-[#F5F5F5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,200,83,0.06),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(255,107,26,0.05),transparent_25%)]" />
      
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
        <div className="mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#FF6B1A]">Impossible Product Showcase</div>
            <h2
              ref={titleRef}
              className="mt-6 text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white md:text-6xl xl:text-7xl"
              style={{ perspective: "800px" }}
            >
              Steel systems engineered like <span className="text-[#00C853] drop-shadow-[0_0_20px_rgba(0,200,83,0.3)]">supercars</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-[#D0D0D0]">
            Explore a curated selection of architectural steel portals. Interact with the system categories below to review technical specifications and cinematic configurations.
          </p>
        </div>

        {/* Laser Progress bar */}
        <div className="mb-10 h-px w-full bg-[#D9D9D9]/10 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#00C853] to-[#FF6B1A] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,107,26,0.5)]"
            style={{ width: `${((activeIndex + 1) / systems.length) * 100}%` }}
          />
        </div>

        <div className="grid gap-10 xl:grid-cols-[340px_minmax(0,1fr)]">
          <div ref={selectorRef} className="space-y-4 max-h-[680px] overflow-y-auto pr-3 custom-scrollbar" style={{ perspective: "1000px" }}>
            {systems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group w-full rounded-[1.6rem] border px-6 py-6 text-left transition-all duration-500 ${
                  index === activeIndex
                    ? "border-[#FF6B1A]/50 bg-[#111111]/80 shadow-[0_0_40px_rgba(255,107,26,0.15)] translate-x-4"
                    : "border-[#D9D9D9]/10 bg-[#111111]/40 hover:border-[#00C853]/30 hover:bg-[#111111]/60"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${index === activeIndex ? "bg-[#FF6B1A] text-[#050505] shadow-[0_0_20px_rgba(255,107,26,0.4)] scale-110" : "bg-[#222222] text-[#CCCCCC] group-hover:text-[#00C853]"}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold tracking-[0.03em] transition-colors ${index === activeIndex ? "text-white" : "text-[#CCCCCC] group-hover:text-white"}`}>{item.title}</div>
                    <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#00C853]/70">
                      SYS_{String(index + 1).padStart(2, "0")} / {String(systems.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div ref={panelRef} className="overflow-hidden rounded-[2.8rem] border border-[#D9D9D9]/10 bg-[#111111]/60 backdrop-blur-xl shadow-[0_0_80px_rgba(5,5,5,0.8)]">
            <div className="grid gap-0 xl:grid-cols-[minmax(0,1.1fr)_400px]">
              <div className="relative min-h-[300px] sm:min-h-[450px] xl:min-h-[580px] overflow-hidden bg-[#050505]">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(max-width:1280px) 100vw, 65vw"
                  className="object-cover opacity-70 mix-blend-screen transition-transform duration-[2s] hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#050505_100%)]" />
                
                <div className="absolute left-8 top-8 rounded-full border border-[#FF6B1A]/40 bg-[#050505]/80 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.3em] text-[#FF6B1A] backdrop-blur-xl shadow-[0_0_20px_rgba(255,107,26,0.2)] animate-pulse">
                  Real-Time Engine Active
                </div>
                
                <div className="absolute inset-x-8 bottom-8 grid gap-4 grid-cols-3">
                  {["Cinematic Focus", "Carbon Depth", "Laser Tolerance"].map((label) => (
                    <div key={label} className="rounded-[1.2rem] sm:rounded-[1.4rem] border border-[#D9D9D9]/10 bg-[#050505]/60 px-2 py-3 sm:px-4 sm:py-4 text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.24em] text-[#00C853] backdrop-blur-xl text-center transition-colors hover:border-[#00C853]/50 hover:bg-[#00C853]/10">
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t xl:border-l xl:border-t-0 border-[#D9D9D9]/10 p-6 sm:p-10 bg-[#111111]/40 flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#FF6B1A]">
                  {active.icon}
                  Hyper-Realistic Category
                </div>
                <h3 className="mt-8 text-3xl font-bold tracking-[-0.04em] text-white">{active.title}</h3>
                <p className="mt-5 text-sm leading-7 text-[#D0D0D0]">{active.description}</p>

                <div className="mt-10 space-y-4">
                  {active.specs.map((spec, si) => (
                    <div
                      key={spec}
                      className="flex items-center justify-between rounded-[1.3rem] border border-[#D9D9D9]/10 bg-[#050505]/40 px-5 py-4 transition-all hover:border-[#00C853]/40 hover:bg-[#00C853]/5"
                      style={{ animationDelay: `${si * 80}ms` }}
                    >
                      <span className="text-xs font-medium text-white tracking-wide">{spec}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.8)]" />
                    </div>
                  ))}
                </div>

                <Link
                  ref={buttonRef}
                  href="/ims-steel/contact"
                  className="mt-12 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F5F5F5] px-6 py-5 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] transition-all hover:bg-[#FF6B1A] hover:text-[#050505] shadow-[0_0_40px_rgba(245,245,245,0.15)] hover:shadow-[0_0_50px_rgba(255,107,26,0.4)]"
                >
                  Initiate 3D Simulation <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
