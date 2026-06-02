"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const WORDS = ["Impact", "Stories", "Future", "Legacy", "Trust"];

export default function CTAHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(prev => (prev + 1) % WORDS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-48 px-6 md:px-16 lg:px-24 bg-[#121214] relative overflow-hidden">
      {/* Background Liquid Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00dcc4]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#FFFDE2] leading-[0.9] tracking-tighter mb-16">
            Let&apos;s build <br />
            something <br />
            <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom">
              <motion.span
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="block italic font-normal text-[#C5A059]"
              >
                {WORDS[index]}
              </motion.span>
            </span> <br />
            together.
          </h2>

          <Link 
            href="/contact" 
            className="group relative inline-flex items-center gap-6 px-12 py-6 border border-white/10 hover:border-[#00dcc4]/50 transition-all duration-500 overflow-hidden"
          >
            {/* Liquid Fill Hover */}
            <div className="absolute inset-0 bg-[#00dcc4] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.76, 0, 0.24, 1]" />
            
            <span className="relative text-[11px] font-bold uppercase tracking-[0.5em] text-[#FFFDE2] group-hover:text-[#121214] transition-colors">
              Get in Touch
            </span>
            <ArrowRight size={18} className="relative text-[#00dcc4] group-hover:text-[#121214] group-hover:translate-x-2 transition-all" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
