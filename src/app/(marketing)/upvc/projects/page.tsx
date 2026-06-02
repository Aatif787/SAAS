"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";

const projects = [
  { title: "Skyline Residences", location: "Gomti Nagar, Lucknow", type: "Apartments", units: "120 Units", img: "/images/upvc/hero.png" },
  { title: "Greenwood Villas", location: "Sahara City, Lucknow", type: "Villas", units: "45 Villas", img: "/images/upvc/villa.png" },
  { title: "IMS Corporate Tower", location: "Hazratganj, Lucknow", type: "Commercial", units: "22 Floors", img: "/images/upvc/sliding-door.png" },
  { title: "Palm Gardens", location: "Aliganj, Lucknow", type: "Apartments", units: "80 Units", img: "/images/upvc/french-door.png" },
  { title: "Royal Orchid Estate", location: "Faizabad Road", type: "Villas", units: "32 Villas", img: "/images/upvc/casement.png" },
  { title: "Metro Business Park", location: "Kanpur Road", type: "Commercial", units: "15 Floors", img: "/images/upvc/soundproof.png" },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-upvc-green">Projects</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold text-upvc-dark tracking-tighter mb-6">
            Our <span className="text-upvc-green">Projects</span>
          </motion.h1>
        </div>
      </section>
      <section className="pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group relative rounded-3xl overflow-hidden bg-white border border-upvc-dark/5 hover:border-upvc-green/20 transition-all duration-700 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-upvc-green/5">
                <div className="relative h-72 overflow-hidden">
                  <Image src={p.img} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center text-upvc-green opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-upvc-green">{p.type} • {p.units}</span>
                  <h3 className="text-xl font-bold text-upvc-dark mt-2 mb-2">{p.title}</h3>
                  <div className="flex items-center gap-2 text-upvc-dark/30 text-sm"><MapPin size={12} /> {p.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
