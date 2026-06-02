"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   CAPABILITIES — High-Fidelity modular grid
   Matches the sophistication of fromanother.love
   ═══════════════════════════════════════════════════════════════ */

const VERTICALS = [
  { id: "01", title: "IMS Hospital", desc: "Advanced multispecialty care and trauma services.", accent: "#D32F2F", img: "/images/healthcare-4k.png" },
  { id: "02", title: "Real Estate", desc: "Premium residential and commercial developments.", accent: "#C5A059", img: "/images/estate-empire-4k.png" },
  { id: "03", title: "Infrastructure", desc: "Building the foundations of modern cities.", accent: "#4A90D9", img: "/images/corporate-hub-4k.png" },
  { id: "04", title: "Steel Engineering", desc: "Precision structural steel for industrial giants.", accent: "#7B8FA1", img: "/images/steel-infra-4k.png" },
  { id: "05", title: "UPVC Solutions", desc: "Energy-efficient window and door systems.", accent: "#00B8A9", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" },
  { id: "06", title: "One Home Solution", desc: "Luxury interior design and smart automation.", accent: "#9B59B6", img: "/images/home-solution-4k.png" },
];

export default function CapabilitiesSection() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#121214]">
      <div className="container-xl">
        <div className="mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00dcc4] mb-4 block">Our Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#FFFDE2] leading-tight">
            Six Verticals. <br />
            <span className="italic font-normal text-[#00dcc4]">Infinite Possibilities.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {VERTICALS.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[400px] overflow-hidden bg-black/20 border border-white/5"
            >
              <Image 
                src={v.img} 
                alt={v.title} 
                fill 
                className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1.5s] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 mb-2 uppercase">{v.id}</span>
                <h3 className="text-2xl font-serif font-bold text-[#FFFDE2] mb-3 group-hover:text-[#00dcc4] transition-colors">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-[240px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {v.desc}
                </p>
                <div className="mt-6 w-0 group-hover:w-12 h-[2px] bg-[#00dcc4] transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
