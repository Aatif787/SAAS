"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, Compass, Landmark, Activity } from "lucide-react";
import SmoothScroll from "@/components/ui/smooth-scroll";

const categories = ["All", "Heavy Infrastructure", "Corporate Facades", "Residential Systems", "Interior Sculpting"];

const projects = [
  {
    title: "Luxury Hillside Villas",
    category: "Residential Systems",
    image: "/images/estate-empire-4k.png",
    volume: "18 Tons",
    grade: "S275 Structural Steel",
    wind: "3.8 kPa certified",
    desc: "Sleek architectural steel door grids, slim thermal casements, and custom exterior structural fins framing mountain horizons.",
  },
  {
    title: "Metro Terminal Portal",
    category: "Heavy Infrastructure",
    image: "/images/corporate-hub-4k.png",
    volume: "850 Tons",
    grade: "S355JR High-Strength",
    wind: "5.2 kPa certified",
    desc: "Massive curved overhead structural frames and load support columns fabricated using robotic welding coordinates.",
  },
  {
    title: "Corporate Skyline Towers",
    category: "Corporate Facades",
    image: "/images/corporate-hub.png",
    volume: "420 Tons",
    grade: "S355 Structural Steel",
    wind: "4.8 kPa certified",
    desc: "Modular facade backing channels and structural panels carrying thousands of square meters of glazing frames.",
  },
  {
    title: "Grand Lobby Sculptures",
    category: "Interior Sculpting",
    image: "/images/home-solution-4k.png",
    volume: "8.5 Tons",
    grade: "SS316L Stainless Steel",
    wind: "Standard acoustic tolerance",
    desc: "Polished satin structural staircases, double-height privacy screens, and customized mirror-finished metal portal doors.",
  },
];

export default function SteelProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <SmoothScroll>
      <div className="relative z-10 pt-28 pb-16">
        {/* Editorial Subpage Header */}
        <section className="relative overflow-hidden py-16">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#00C853]/20 bg-[#00C853]/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.36em] text-[#00C853]">
                IMS Featured Portfolio
              </div>
              <h1 className="mt-8 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#F5F5F5] md:text-7xl xl:text-[6.5rem]">
                Engineering that
                <br />
                shapes modern skylines
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9A9A9A] md:text-xl">
                Explore how we bring heavy industrial precision to modern landmark architecture. Every project in this showcase has been executed with tight sub-millimeter coordinates, standard EN welding protocols, and premium epoxy curing.
              </p>
            </div>
          </div>
        </section>

        {/* Filter controls */}
        <section className="relative overflow-hidden py-6">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="flex flex-wrap gap-2 pb-6 border-b border-[#D9D9D9]/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] transition-all ${
                    filter === cat
                      ? "bg-[#00C853] text-[#050505] shadow-md"
                      : "bg-[#111111]/40 text-[#9A9A9A] border border-[#D9D9D9]/10 hover:bg-[#111111]/80 hover:text-[#F5F5F5]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects list */}
        <section className="relative overflow-hidden py-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="grid gap-10 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.article
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group overflow-hidden rounded-[2.6rem] border border-[#D9D9D9]/10 bg-[#111111]/40 shadow-2xl transition-all hover:border-[#FF6B1A]/20"
                  >
                    <div className="relative h-56 sm:h-[360px] overflow-hidden bg-[#050505]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width:1280px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
                      <div className="absolute left-6 top-6 rounded-full border border-[#FF6B1A]/20 bg-[#FF6B1A] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#050505] backdrop-blur-md shadow-lg font-medium">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-5 sm:p-7">
                      <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F5]">{project.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-[#9A9A9A]">{project.desc}</p>
                      
                      {/* Project specific structural metrics */}
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mt-6 pt-6 border-t border-[#D9D9D9]/10 text-xs">
                        <div className="rounded-xl border border-[#D9D9D9]/10 bg-[#050505]/40 p-3 text-center">
                          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A] block mb-1">Steel Volume</span>
                          <span className="font-semibold text-[#F5F5F5]">{project.volume}</span>
                        </div>
                        <div className="rounded-xl border border-[#D9D9D9]/10 bg-[#050505]/40 p-3 text-center">
                          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A] block mb-1">Metal Grade</span>
                          <span className="font-semibold text-[#F5F5F5]">{project.grade}</span>
                        </div>
                        <div className="rounded-xl border border-[#D9D9D9]/10 bg-[#050505]/40 p-3 text-center">
                          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A] block mb-1">Wind tolerance</span>
                          <span className="font-semibold text-[#F5F5F5]">{project.wind}</span>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 flex items-center justify-between">
                        <Link
                          href="/ims-steel/contact"
                          className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00C853]"
                        >
                          Inquire about this scope <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative overflow-hidden py-10 mt-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="rounded-[2.8rem] border border-[#D9D9D9]/10 bg-[#111111]/60 p-8 backdrop-blur-md md:p-12 text-center shadow-[0_0_80px_rgba(5,5,5,0.8)]">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F5] md:text-5xl">
                Have a similar landmark layout in mind?
              </h3>
              <p className="mt-4 mx-auto max-w-xl text-sm leading-6 text-[#9A9A9A]">
                Contact our estimations engineering desk to run custom loading checks, dimension shortlists, and structural volume reports.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row max-w-md mx-auto sm:max-w-none">
                <Link
                  href="/ims-steel/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FF6B1A] px-7 py-4 text-xs font-bold uppercase tracking-[0.26em] text-[#050505] hover:bg-[#00C853] shadow-lg hover:shadow-xl transition-all"
                >
                  Schedule technical consultation <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
