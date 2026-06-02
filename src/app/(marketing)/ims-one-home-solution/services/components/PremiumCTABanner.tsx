"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export function PremiumCTABanner() {
  return (
    <section className="py-20 bg-[#0A1E3D] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E3D] via-transparent to-[#0A1E3D] z-10" />
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container-xl relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Build Your <span className="text-ims-gold">Dream Home?</span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Consult with our expert team of architects and designers to bring your vision of luxury to life.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/ims-one-home-solution/contact"
              className="btn-premium px-12 py-5 bg-ims-gold text-[#0A1E3D] font-bold rounded-full hover:scale-105 transition-all"
            >
              Book Consultation
            </Link>
            <Link 
              href="/ims-one-home-solution/projects"
              className="px-12 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
