"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyCards = [
  {
    title: "Precision Fabrication",
    copy: "Digitally led manufacturing systems, premium finish control, and strict structural discipline for high-end architecture.",
    metric: "Heavy CAD & CNC",
  },
  {
    title: "Eco Durability",
    copy: "Material efficiency, lifecycle durability, and eco-friendly protective logic embedded into every structural grid.",
    metric: "Low-waste planning",
  },
  {
    title: "Structural Rigidity",
    copy: "Built for towers, luxury villas, facades, and business portals that require monumental presence with deep safety.",
    metric: "Architectural trust",
  },
];

export default function SteelBrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const floatingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, rotateX: 20 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
    }

    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { x: -40, opacity: 0, filter: "blur(8px)" },
        {
          x: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        }
      );
    }

    if (imageWrapperRef.current) {
      gsap.fromTo(
        imageWrapperRef.current,
        { scale: 0.85, opacity: 0, y: 80, rotateY: 15 },
        {
          scale: 1, opacity: 1, y: 0, rotateY: 0, duration: 1.6, ease: "power4.out",
          scrollTrigger: { trigger: imageWrapperRef.current, start: "top 80%" },
        }
      );
    }

    if (floatingCardsRef.current) {
      const cards = floatingCardsRef.current.querySelectorAll(".steel-story-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1.4, stagger: 0.15, ease: "power4.out",
            scrollTrigger: { trigger: floatingCardsRef.current, start: "top 80%" },
          }
        );
      }
    }
  }, []);

  return (
    <section id="story" ref={sectionRef} className="relative overflow-hidden bg-transparent py-40 text-[#F5F5F5]">
      {/* Volumetric Dark ambient reflections */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,107,26,0.08),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(0,200,83,0.05),transparent_35%)]" />
      
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
        <div className="grid gap-20 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="xl:sticky xl:top-32 h-fit">
            <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#00C853]">Dimensional Architectures</div>
            <h2
              ref={titleRef}
              className="mt-6 text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white md:text-6xl xl:text-7xl"
              style={{ perspective: "1000px" }}
            >
              Steel becomes
              <br />
              <span className="text-[#CCCCCC]">reality when</span>
              <br />
              engineering meets
              <span className="text-[#FF6B1A] drop-shadow-[0_0_30px_rgba(255,107,26,0.25)]"> absolute precision</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#D0D0D0]">
              We do not just supply material. We engineer heavy industrial capability into luxury-grade cinematic structures, creating architectural portals that feel impossible.
            </p>

            <div className="mt-12 rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/60 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(5,5,5,0.5)]">
              <div className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#00C853] font-medium">Timeline Execution</div>
              <div ref={listRef} className="mt-6 space-y-6">
                {[
                  "AI-driven design intelligence",
                  "Volumetric fabrication logic",
                  "Premium carbon-steel finish control",
                ].map((line, index) => (
                  <div key={line} className="flex items-center gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FF6B1A]/30 bg-[#FF6B1A]/10 text-[10px] font-bold text-[#FF6B1A] shadow-[0_0_20px_rgba(255,107,26,0.15)]">
                      0{index + 1}
                    </div>
                    <span className="text-sm text-white font-medium">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div
              ref={imageWrapperRef}
              className="relative overflow-hidden rounded-[2.8rem] border border-[#D9D9D9]/10 bg-[#050505] shadow-[0_0_80px_rgba(5,5,5,0.8)] p-6 md:p-0 flex flex-col md:block"
              style={{ perspective: "1000px" }}
            >
              <div className="relative h-[250px] sm:h-[350px] md:h-[600px] w-full overflow-hidden rounded-[2rem] md:rounded-none">
                <Image
                  src="/images/steel-infra-4k.png"
                  alt="IMS Steel architectural manufacturing story"
                  fill
                  sizes="(max-width:1280px) 100vw, 50vw"
                  className="object-cover opacity-60 mix-blend-luminosity transition-transform duration-[10s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,107,26,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,107,26,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
                
                <div className="absolute left-6 top-6 md:left-8 md:top-8 rounded-full border border-[#00C853]/30 bg-[#050505]/60 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#00C853] backdrop-blur-xl">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#00C853] animate-pulse" />
                  Dimensional Scan Active
                </div>
              </div>
              
              <div ref={floatingCardsRef} className="mt-6 md:mt-0 grid gap-5 grid-cols-1 sm:grid-cols-3 md:absolute md:inset-x-8 md:bottom-8">
                {storyCards.map((card) => (
                  <div
                    key={card.title}
                    className="steel-story-card relative rounded-[1.7rem] border border-[#D9D9D9]/10 bg-[#111111]/80 p-5 md:p-6 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-[#FF6B1A]/40 hover:shadow-[0_20px_40px_rgba(255,107,26,0.1)]"
                  >
                    <div className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FF6B1A]">{card.metric}</div>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">{card.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#CCCCCC]">{card.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  heading: "Liquid Carbon Philosophy",
                  body: "Every line, weld, and shadow is treated like a dynamic variable, achieving cinematic industrial precision beyond modern standards.",
                },
                {
                  heading: "AI Innovation Layer",
                  body: "Integrated estimation pipelines and load simulator nodes generate real-time structural blueprints with perfect mathematical confidence.",
                },
              ].map((item) => (
                <div key={item.heading} className="steel-story-card group rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-8 backdrop-blur-xl transition-all hover:bg-[#111111]/80 hover:border-[#00C853]/30">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00C853]">{item.heading}</div>
                  <p className="mt-4 text-sm leading-6 text-[#CCCCCC] transition-colors group-hover:text-white">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
