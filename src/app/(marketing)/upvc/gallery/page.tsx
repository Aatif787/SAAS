"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const images = [
  { src: "/images/upvc/hero.png", alt: "Luxury Villa Installation", cat: "Residential" },
  { src: "/images/upvc/casement.png", alt: "Casement Window", cat: "Products" },
  { src: "/images/upvc/sliding-door.png", alt: "Panoramic Sliding Door", cat: "Commercial" },
  { src: "/images/upvc/french-door.png", alt: "French Door Terrace", cat: "Residential" },
  { src: "/images/upvc/villa.png", alt: "Modern Villa Exterior", cat: "Projects" },
  { src: "/images/upvc/soundproof.png", alt: "Acoustic Window System", cat: "Products" },
];
const categories = ["All", "Residential", "Commercial", "Products", "Projects"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filter === "All" ? images : images.filter((img) => img.cat === filter);

  return (
    <>
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-upvc-green">Gallery</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold text-upvc-dark tracking-tighter mb-6">
            Our <span className="text-upvc-green">Portfolio</span>
          </motion.h1>
        </div>
      </section>
      <section className="pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === c ? "bg-upvc-green text-white" : "bg-upvc-dark/[0.03] text-upvc-dark/40 hover:text-upvc-dark border border-upvc-dark/5"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <motion.div key={img.src + filter} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm" onClick={() => setLightbox(i)}>
                <Image src={img.src} alt={img.alt} width={800} height={i % 3 === 0 ? 600 : 500} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-upvc-lime">{img.cat}</span>
                    <h3 className="text-white font-bold text-lg">{img.alt}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {lightbox !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8" onClick={() => setLightbox(null)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={32} /></button>
          <Image src={filtered[lightbox].src} alt={filtered[lightbox].alt} width={1400} height={900} className="max-h-[85vh] w-auto object-contain rounded-xl" />
        </motion.div>
      )}
    </>
  );
}
