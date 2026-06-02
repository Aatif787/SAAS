"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Boxes, Building2, DoorOpen, Landmark, Maximize, ScanSearch, Sparkles, SquareStack, WandSparkles, ArrowRight } from "lucide-react";
import SmoothScroll from "@/components/ui/smooth-scroll";

const systems = [
  {
    slug: "structural-steel",
    title: "Structural Steel",
    description: "High-performance structural frameworks optimized for commercial spaces, retail towers, and large-span architectural structures.",
    icon: <Boxes size={22} />,
    tag: "Heavy engineering",
  },
  {
    slug: "stainless-steel",
    title: "Stainless Steel Systems",
    description: "Refined stainless steel profiles designed for clean interior details, elevator portals, and luxury entrance statements.",
    icon: <Sparkles size={22} />,
    tag: "Luxury profiles",
  },
  {
    slug: "architectural-steel",
    title: "Architectural Steel",
    description: "Design-led facades, structural fins, and customized window grids crafted specifically for elite villa properties.",
    icon: <Landmark size={22} />,
    tag: "Facade finery",
  },
  {
    slug: "industrial-steel-solutions",
    title: "Industrial Steel Solutions",
    description: "Engineered solutions for industrial facilities combining high load resilience with long-term assembly durability.",
    icon: <Building2 size={22} />,
    tag: "Industrial load",
  },
  {
    slug: "fabrication-systems",
    title: "Fabrication Systems",
    description: "CNC-controlled processing workflows with sub-millimeter tolerances, seamless welds, and multi-stage quality checks.",
    icon: <SquareStack size={22} />,
    tag: "CNC execution",
  },
  {
    slug: "luxury-steel-interiors",
    title: "Luxury Steel Interiors",
    description: "Handcrafted interior staircases, room dividers, feature screen assemblies, and furniture framing systems.",
    icon: <WandSparkles size={22} />,
    tag: "Bespoke design",
  },
  {
    slug: "steel-doors",
    title: "Steel Doors",
    description: "Thermal-break architectural steel entry doors featuring premium safety hardware and massive visual weight.",
    icon: <DoorOpen size={22} />,
    tag: "Secure entries",
  },
  {
    slug: "steel-windows",
    title: "Steel Windows",
    description: "Ultra-slim steel casement assemblies presenting minimal frame profile and clean, classical sightlines.",
    icon: <Maximize size={22} />,
    tag: "Slim casements",
  },
  {
    slug: "modern-facade-systems",
    title: "Modern Facade Systems",
    description: "Custom metallic curtain walls, sun shades, and textured cladding envelopes engineered for global landmarks.",
    icon: <ScanSearch size={22} />,
    tag: "Commercial envelopes",
  },
];

export default function SteelSystemsIndex() {
  return (
    <SmoothScroll>
      <div className="relative z-10 pt-28 pb-16">
        {/* Systems Header Section */}
        <section className="relative overflow-hidden py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#00C853]/20 bg-[#00C853]/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.36em] text-[#00C853]">
                IMS Systems Catalog
              </div>
              <h1 className="mt-8 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#F5F5F5] md:text-7xl xl:text-[6.5rem]">
                Heavy structural
                <br />
                and facade systems
                <br />
                <span className="text-[#FF6B1A] drop-shadow-[0_0_20px_rgba(255,107,26,0.3)]">engineered for strength</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9A9A9A] md:text-xl">
                Explore our full spectrum of modular architectural components. Click on any system grid panel below to inspect specific profile specifications, structural tolerances, dynamic load charts, and interactive custom tools.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Grid Layout */}
        <section className="relative overflow-hidden py-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {systems.map((system, index) => (
                <motion.div
                  key={system.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[2.3rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-8 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#00C853]/30 hover:shadow-xl hover:bg-[#111111]/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C853]/10 text-[#00C853]">
                        {system.icon}
                      </div>
                      <span className="rounded-full border border-[#D9D9D9]/10 bg-[#050505] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#00C853]">
                        {system.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#F5F5F5]">{system.title}</h3>
                    <p className="mt-3 text-xs leading-6 text-[#9A9A9A]">{system.description}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#D9D9D9]/10">
                    <Link
                      href={`/ims-steel/systems/${system.slug}`}
                      className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-[#00C853] hover:text-[#00C853]/90"
                    >
                      Technical specs <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic CTA */}
        <section className="relative overflow-hidden py-10 mt-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="rounded-[2.8rem] border border-[#D9D9D9]/10 bg-[#111111]/60 p-8 backdrop-blur-md md:p-12 text-center shadow-[0_0_80px_rgba(5,5,5,0.8)]">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F5] md:text-5xl">
                Need a fully customized engineering setup?
              </h3>
              <p className="mt-4 mx-auto max-w-xl text-sm leading-6 text-[#9A9A9A]">
                Our CAD specialists can customize sizing, load profiles, finish types, and coordinate alignments for any commercial scope.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row max-w-md mx-auto sm:max-w-none">
                <Link
                  href="/ims-steel/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FF6B1A] px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] hover:bg-[#00C853] shadow-lg hover:shadow-xl transition-all"
                >
                  Schedule technical consultation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
