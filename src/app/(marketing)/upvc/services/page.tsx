"use client";

import { motion } from "framer-motion";
import { Wrench, Compass, Settings, Palette, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: <Compass size={32} />, title: "Expert Consultation", desc: "Our architects visit your site to understand requirements and provide detailed proposals.", features: ["Site visit", "3D mockups", "Material recommendations", "Budget planning"] },
  { icon: <Wrench size={32} />, title: "Professional Installation", desc: "Certified teams ensure every window and door is fitted to precision.", features: ["Certified technicians", "Precision fitting", "Waterproof sealing", "100-point QC"] },
  { icon: <Settings size={32} />, title: "Maintenance & Support", desc: "Annual maintenance programs keep your installations performing optimally.", features: ["Annual service", "Hardware adjustment", "Gasket replacement", "24hr support"] },
  { icon: <Palette size={32} />, title: "Custom Design Solutions", desc: "Bespoke fenestration solutions tailored to your architectural vision.", features: ["Custom shapes", "RAL color matching", "Woodgrain finishes", "Architectural support"] },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-upvc-green">Services</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold text-upvc-dark tracking-tighter mb-6">
            End-to-End <span className="text-upvc-green">Excellence</span>
          </motion.h1>
        </div>
      </section>
      <section className="pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-8">
          {services.map((s) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="group grid lg:grid-cols-3 gap-8 p-6 sm:p-10 lg:p-16 rounded-3xl bg-upvc-white border border-upvc-dark/5 hover:border-upvc-green/20 transition-all duration-700">
              <div className="lg:col-span-2">
                <div className="w-16 h-16 rounded-2xl bg-upvc-green/10 text-upvc-green flex items-center justify-center mb-8 group-hover:bg-upvc-green group-hover:text-white transition-all duration-500">{s.icon}</div>
                <h2 className="text-3xl font-bold text-upvc-dark mb-4 tracking-tight">{s.title}</h2>
                <p className="text-upvc-dark/50 leading-relaxed mb-8 max-w-xl">{s.desc}</p>
                <Link href="/upvc/get-quote" className="inline-flex items-center gap-2 text-upvc-green font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all">
                  Request Service <ArrowRight size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-upvc-dark/20 block mb-4">What&apos;s Included</span>
                {s.features.map((f) => <div key={f} className="flex items-center gap-3 text-sm text-upvc-dark/50"><div className="w-1.5 h-1.5 rounded-full bg-upvc-green" />{f}</div>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
