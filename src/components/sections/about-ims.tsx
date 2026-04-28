"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Users, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutIMS() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative will-change-transform"
          >
            <div className="aspect-[4/3] rounded-sm overflow-hidden premium-border shadow-2xl relative">
              <Image 
                src="/images/corporate-hub.png" 
                alt="IMS Global Hub" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#D32F2F] p-10 text-white shadow-2xl hidden xl:block">
              <h3 className="text-5xl font-serif mb-2 tracking-tighter">IMS</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">Technological Frontier</p>
            </div>
          </motion.div>

          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
            >
              Institutional Legacy
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-ims-blue mb-8 leading-[1.1] tracking-tighter"
            >
              Pioneering the <br />
              <span className="text-ims-red italic">Infinite</span> Horizon
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg text-ims-charcoal/80 leading-relaxed mb-10 font-medium"
            >
              Since 1995, IMS Group has evolved into a diversified technological force. 
              We synergize healthcare, infrastructure, and digital ecosystems through 
              relentless innovation and uncompromising institutional integrity.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Quality Assurance", icon: <CheckCircle2 className="text-ims-red" />, desc: "We never compromise on quality in any of our verticals." },
                { title: "Experienced Team", icon: <Users className="text-ims-red" />, desc: "Skilled professionals with deep industry knowledge." },
                { title: "Customer Focus", icon: <Heart className="text-ims-red" />, desc: "Customer satisfaction is our top priority in every project." },
                { title: "Integrity & Trust", icon: <ShieldCheck className="text-ims-red" />, desc: "Honest practices and transparent dealings with every partner." }
              ].map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-ims-blue uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-ims-charcoal/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
