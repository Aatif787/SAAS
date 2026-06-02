"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CloudRain, Palette, Shield, Thermometer, Volume2, Zap } from "lucide-react";
import { upvcDoorCount, upvcDoorProducts, type UPVCBadgeKey } from "@/lib/upvc-product-data";

const badgeIcons: Record<UPVCBadgeKey, ReactElement> = {
  security: <Shield size={14} />,
  thermal: <Thermometer size={14} />,
  acoustic: <Volume2 size={14} />,
  weather: <CloudRain size={14} />,
  energy: <Zap size={14} />,
  design: <Palette size={14} />,
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-upvc-green">Our Products</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-upvc-dark tracking-tighter mb-6">
            20+ UPVC <span className="text-upvc-green">Door Types</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-upvc-dark/40 max-w-3xl text-lg leading-relaxed">
            Explore a much wider UPVC door collection with sliding, french, pivot, folding, terrace, security, designer,
            acoustic, villa-entry, and many more premium door systems built for modern homes and luxury projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <div className="rounded-full border border-upvc-green/15 bg-upvc-green/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-upvc-green">
              {upvcDoorCount}+ Door Variants
            </div>
            <div className="rounded-full border border-upvc-dark/8 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-upvc-dark/55">
              Sliding, Hinged, Pivot, Folding, Security
            </div>
          </motion.div>
        </div>
      </section>
      <section className="pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {upvcDoorProducts.map((p, i) => (
              <motion.div
                key={p.id}
                id={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (i % 6) * 0.04 }}
                className="group overflow-hidden rounded-[2rem] border border-upvc-dark/5 bg-upvc-white shadow-sm transition-all duration-700 hover:-translate-y-1 hover:border-upvc-green/20 hover:shadow-xl hover:shadow-upvc-green/5"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image src={p.img} alt={p.title} fill sizes="(max-width:1280px) 100vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute left-6 top-6 rounded-full bg-upvc-green/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.26em] text-white shadow-xl">
                    {p.tag}
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-5 flex gap-2">
                    {p.badgeKeys.map((badge) => (
                      <div key={badge} className="flex h-8 w-8 items-center justify-center rounded-lg bg-upvc-green/10 text-upvc-green">
                        {badgeIcons[badge]}
                      </div>
                    ))}
                  </div>
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-upvc-dark">{p.title}</h2>
                  <p className="mb-6 text-sm leading-7 text-upvc-dark/50">{p.desc}</p>
                  <div className="mb-8 grid grid-cols-2 gap-3">
                    {p.specs.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-upvc-dark/40">
                        <div className="h-1.5 w-1.5 rounded-full bg-upvc-green" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-upvc-dark/30">Premium UPVC Door System</span>
                    <Link href="/upvc/get-quote" className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-upvc-green px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-upvc-lime w-full sm:w-auto">
                      Get Quote <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
