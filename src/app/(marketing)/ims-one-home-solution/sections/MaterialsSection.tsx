"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    title: "Italian Statuario Marble",
    subtitle: "Sourced from Carrara, each slab is a unique piece of earth's history, hand-polished to a mirror finish.",
    image: "/images/materials/italian-marble.jpg",
  },
  {
    title: "Obsidian Smart Glass",
    subtitle: "Electrochromic glass that tints on demand, providing instant privacy and heat regulation.",
    image: "/images/materials/smart-glass.jpg",
  },
  {
    title: "Acoustic Walnut Paneling",
    subtitle: "Sustainable walnut with integrated sound-dampening technology for perfect room acoustics.",
    image: "/images/materials/walnut-panel.jpg",
  }
];

import { useGSAP } from '@gsap/react';

export default function MaterialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!triggerRef.current) return;
    
    const mm = gsap.matchMedia();
    const sections = gsap.utils.toArray('.material-section');
    
    mm.add("(min-width: 1024px)", () => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => `+=${triggerRef.current?.offsetWidth}`,
        }
      });
    });
    
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section className="bg-[#FDFBF7] overflow-hidden">
      <div ref={containerRef}>
        <div ref={triggerRef} className="flex flex-col lg:flex-row w-full lg:w-[300vw] h-auto lg:h-screen relative">
          {materials.map((material, index) => (
            <div 
              key={index} 
              className="material-section w-full lg:w-screen h-auto lg:h-screen flex items-center justify-center relative py-16 lg:py-0 px-6 sm:px-12 lg:px-20"
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={material.image} 
                  alt={material.title} 
                  fill
                  className="object-cover opacity-30" 
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#FDFBF7] via-transparent to-[#FDFBF7]" />
              </div>

              <div className="container-xl grid lg:grid-cols-2 gap-10 lg:gap-20 relative z-10">
                <div className="flex flex-col justify-center">
                  <span className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-6 lg:mb-8 block">
                    The Craft: Part 0{index + 1}
                  </span>
                  <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-[#0A1E3D] mb-6 lg:mb-10 tracking-tighter leading-none">
                    {material.title}
                  </h2>
                  <p className="text-[#0A1E3D]/60 text-lg sm:text-xl max-w-lg leading-relaxed">
                    {material.subtitle}
                  </p>
                  
                  <div className="mt-10 lg:mt-16 flex items-center gap-6">
                    <div className="h-[1px] w-24 bg-[#E8761A]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0A1E3D]/40">Excellence in Materiality</span>
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] max-w-md lg:max-w-none mx-auto w-full">
                  <Image 
                    src={material.image} 
                    alt={material.title} 
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />
                </div>
              </div>

              {/* Background Text */}
              <div className="absolute bottom-10 left-10 text-[20vw] font-bold text-[#0A1E3D]/[0.02] pointer-events-none select-none uppercase tracking-tighter leading-none whitespace-nowrap">
                {material.title.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
