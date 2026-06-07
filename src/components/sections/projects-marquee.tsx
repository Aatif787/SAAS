"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   PROJECTS MARQUEE — Dual-row infinite scroll
   High-fidelity showcase of IMS vertical excellence
   ═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  { id: 1, title: "IMS Hospital", cat: "Healthcare", img: "/images/healthcare-4k.png" },
  { id: 2, title: "The Royal Estate", cat: "Real Estate", img: "/images/estate-empire-4k.png" },
  { id: 3, title: "Central Infra", cat: "Infrastructure", img: "/images/corporate-hub-4k.png" },
  { id: 4, title: "IMS Steel Plant", cat: "Industrial", img: "/images/steel-infra-4k.png" },
  { id: 5, title: "Smart Home Hub", cat: "Lifestyle", img: "/images/home-solution-4k.png" },
];

export default function ProjectsMarquee() {
  const row1 = [...PROJECTS, ...PROJECTS];
  const row2 = [...PROJECTS].reverse().concat([...PROJECTS].reverse());

  return (
    <section id="gallery" className="py-32 bg-[#121214] overflow-hidden">
      <div className="container-xl mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-4 block">Portfolio</span>
        <h2 className="text-4xl md:text-5xl font-serif text-[#FAF6F0]">Impact Across Industries</h2>
      </div>

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="flex gap-6 w-max">
          <motion.div 
            animate={{ x: [0, -1500] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6"
          >
            {row1.map((p, i) => (
              <div key={i} className="relative w-[450px] h-[300px] rounded-xl overflow-hidden group">
                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">{p.cat}</span>
                  <h3 className="text-xl font-serif text-[#FAF6F0]">{p.title}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-6 w-max">
          <motion.div 
            animate={{ x: [-1500, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-6"
          >
            {row2.map((p, i) => (
              <div key={i} className="relative w-[350px] h-[250px] rounded-xl overflow-hidden group">
                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">{p.cat}</span>
                  <h3 className="text-lg font-serif text-[#FAF6F0]">{p.title}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
