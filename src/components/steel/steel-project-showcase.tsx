"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitTextReveal, useMagneticHover } from "./steel-scroll-engine";
import { steelAudio } from "./steel-audio-engine";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Alpha Tower", location: "New York", category: "Heavy Structural", image: "/images/corporate-hub-4k.png", stats: "14,000 Tons" },
  { title: "Lumina Facade", location: "Dubai", category: "Architectural Envelopes", image: "/images/estate-empire-4k.png", stats: "Precision < 0.5mm" },
  { title: "Quantum Hub", location: "London", category: "Industrial Solutions", image: "/images/steel-infra-4k.png", stats: "2.1M Sq.Ft" },
  { title: "Oasis Villa", location: "Miami", category: "Luxury Windows & Doors", image: "/images/home-solution-4k.png", stats: "Thermal Break Profiles" },
  { title: "Zenith Core", location: "Singapore", category: "Structural Frameworks", image: "/images/corporate-hub.png", stats: "Automated Assembly" },
];

export default function SteelProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useSplitTextReveal(titleRef, { stagger: 0.02, duration: 1.2, y: 80, start: "top 80%" });
  useMagneticHover(buttonRef, 0.3);
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !scrollWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollWidth = scrollWrapperRef.current!.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxScroll = scrollWidth - viewportWidth;

        // Horizontal Scroll Timeline
        gsap.to(scrollWrapperRef.current, {
          x: -maxScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1.5,
            end: () => `+=${scrollWidth}`,
          },
        });

        // QuickSetter for cinematic velocity skewing during scroll
        let proxy = { skew: 0 };
        let skewSetter = gsap.quickSetter(scrollWrapperRef.current, "skewX", "deg");
        let clamp = gsap.utils.clamp(-8, 8);

        ScrollTrigger.create({
          onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -250);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 1.0,
                ease: "power3.out",
                overwrite: "auto",
                onUpdate: () => skewSetter(proxy.skew),
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#050505] text-[#F5F5F5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,200,83,0.03),transparent_50%)] pointer-events-none" />
      
      <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#00C853]">Global Implementations</div>
            <h2
              ref={titleRef}
              className="mt-6 text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white md:text-6xl xl:text-7xl"
              style={{ perspective: "800px" }}
            >
              <span className="text-[#00C853] drop-shadow-[0_0_20px_rgba(0,200,83,0.15)]">Cinematic structural</span> <br className="hidden md:block" />
              <span className="text-[#FF6B1A] drop-shadow-[0_0_20px_rgba(255,107,26,0.3)]">masterpieces</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-[#D0D0D0]">
            Review recent deployments of IMS Steel systems across international skyscrapers, luxury estates, and hyper-scale industrial hubs.
          </p>
        </div>
      </div>

      {/* Horizontal Pinned Scroll Container */}
      <div ref={containerRef} className="relative h-auto md:h-screen w-full overflow-x-auto md:overflow-hidden bg-[#050505] scrollbar-none">
        <div className="absolute left-10 top-10 z-10 hidden md:block">
          <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-[#FF6B1A]">
            <span className="h-2 w-2 rounded-full bg-[#FF6B1A] animate-pulse" />
            Horizontal Matrix Active
          </div>
        </div>

        <div
          ref={scrollWrapperRef}
          className="flex h-full w-fit md:w-[300vw] xl:w-[200vw] items-center gap-6 px-6 pb-16 pt-6 md:gap-10 md:px-10 md:pb-20 md:pt-10"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              onMouseEnter={() => steelAudio.playHover()}
              className="group relative h-[70vh] w-[85vw] shrink-0 overflow-hidden rounded-[3rem] border border-[#D9D9D9]/10 bg-[#111111] shadow-[0_0_80px_rgba(5,5,5,0.8)] md:w-[50vw] xl:w-[35vw]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                className="object-cover opacity-70 mix-blend-luminosity transition-transform duration-[2s] group-hover:scale-110 group-hover:mix-blend-normal group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
              
              <div className="absolute left-8 top-8 rounded-full border border-[#D9D9D9]/20 bg-[#050505]/60 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-xl">
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>

              <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00C853]">{project.category}</div>
                  <h3 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{project.title}</h3>
                  <div className="mt-4 flex items-center gap-4 text-xs font-semibold tracking-wider text-[#D0D0D0]">
                    <span>{project.location}</span>
                    <span className="h-1 w-1 rounded-full bg-[#FF6B1A]" />
                    <span>{project.stats}</span>
                  </div>
                </div>
                
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-all duration-500 group-hover:bg-[#FF6B1A] group-hover:text-[#050505] group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(255,107,26,0.5)]">
                  <MoveUpRight size={24} />
                </div>
              </div>
            </div>
          ))}

          {/* Final Call to action card */}
          <div className="flex h-[70vh] w-[85vw] shrink-0 items-center justify-center rounded-[3rem] border border-[#FF6B1A]/30 bg-[radial-gradient(ellipse_at_center,rgba(255,107,26,0.1),transparent_70%)] bg-[#050505] p-10 md:w-[50vw] xl:w-[35vw]">
            <div className="text-center">
              <h3 className="text-4xl font-bold tracking-[-0.04em] text-white">Ready to architect the future?</h3>
              <p className="mt-6 text-lg text-[#D0D0D0]">Our engineering teams are standing by.</p>
              <Link
                ref={buttonRef}
                href="/ims-steel/contact"
                className="mx-auto mt-10 flex h-16 max-w-[280px] items-center justify-center gap-3 rounded-full bg-[#F5F5F5] px-8 text-xs font-bold uppercase tracking-[0.25em] text-[#050505] transition-all hover:bg-[#FF6B1A] hover:text-[#050505] hover:shadow-[0_0_50px_rgba(255,107,26,0.5)]"
              >
                Initiate Project <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
