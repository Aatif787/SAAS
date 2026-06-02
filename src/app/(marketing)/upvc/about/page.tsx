"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Award, Users, Globe } from "lucide-react";

const values = [
  { icon: <Target size={24} />, title: "Precision Engineering", desc: "Every product is CNC-machined and fusion-welded with German engineering standards." },
  { icon: <Award size={24} />, title: "Quality Certified", desc: "ISO 9001:2015 certified manufacturing with rigorous 100-point quality inspections." },
  { icon: <Users size={24} />, title: "Customer First", desc: "5000+ happy customers served with a 98% satisfaction rate." },
  { icon: <Globe size={24} />, title: "Global Standards", desc: "Materials sourced from leading European suppliers for world-class durability." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-upvc-green">About Us</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold text-upvc-dark tracking-tighter mb-6">
            Building Trust <span className="text-upvc-green">Since 1996</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-upvc-dark/40 max-w-2xl text-lg leading-relaxed">
            IMS UPVC Doors & Windows is a division of the IMS Group — a diversified conglomerate with over 25 years of excellence.
          </motion.p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative h-64 sm:h-[500px] rounded-3xl overflow-hidden shadow-lg">
                <Image src="/images/upvc/villa.png" alt="IMS Factory" fill sizes="50vw" className="object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-upvc-dark tracking-tight mb-6">Redefining <span className="text-upvc-green">Modern Architecture</span></h2>
              <div className="space-y-4 text-upvc-dark/50 leading-relaxed">
                <p>Our state-of-the-art manufacturing facility combines German CNC technology with Indian craftsmanship to produce UPVC profiles that exceed international standards.</p>
                <p>We source raw materials from leading European suppliers — including multi-chamber profiles from Germany, hardware from Turkey, and glass from Saint-Gobain.</p>
                <p>From luxury villas to commercial high-rises, our fenestration solutions have transformed over 200 projects across Uttar Pradesh and beyond.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 pb-32 bg-upvc-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-upvc-dark/5 text-center shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-upvc-green/10 text-upvc-green flex items-center justify-center mx-auto mb-6">{v.icon}</div>
                <h3 className="text-lg font-bold text-upvc-dark mb-3">{v.title}</h3>
                <p className="text-upvc-dark/40 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
