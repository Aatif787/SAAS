"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Luxury Architecture",
    desc: "Bespoke blueprints that redefine high-end residential living.",
    image: "/images/services/home-construction.jpg",
    tags: ["Planning", "3D Design", "Vastu"],
    accent: "#E8761A"
  },
  {
    title: "Smart Automation",
    desc: "Next-gen systems that learn your habits and secure your legacy.",
    image: "/images/services/smart-home.jpg",
    tags: ["IoT", "Security", "AV Control"],
    accent: "#F5A623"
  },
  {
    title: "Interior Curation",
    desc: "Hand-picked materials and custom furniture for soulful spaces.",
    image: "/images/services/interior-design.jpg",
    tags: ["Materials", "Furniture", "Lighting"],
    accent: "#E8761A"
  }
];

type ServiceItem = (typeof services)[number];

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className="sticky top-28 mb-28 h-[75vh] w-full rounded-[2rem] overflow-hidden group shadow-2xl shadow-[#0A1E3D]/20"
    >
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.18 }}
          transition={{ duration: 8, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E3D]/95 via-[#0A1E3D]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D]/60 via-transparent to-transparent" />
      </div>

      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
        <div className="absolute inset-0 rounded-[2rem] border border-[#E8761A]/30 shadow-[inset_0_0_60px_rgba(232,118,26,0.1)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-12 md:p-20">
        {/* Index */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="text-[120px] font-black text-white/[0.04] absolute top-8 right-12 leading-none select-none"
        >
          0{index + 1}
        </motion.div>

        {/* Tags */}
        <div className="flex gap-3 mb-8">
          {service.tags.map((tag: string) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-[#E8761A]/30 hover:border-[#E8761A]/50 transition-all duration-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-8">
          <motion.h3
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none"
          >
            {service.title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/60 text-xl max-w-lg mb-12 leading-relaxed"
        >
          {service.desc}
        </motion.p>

        {/* CTA */}
        <Link
          href="/ims-one-home-solution/services"
          className="group/btn flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs w-fit"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 45 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-[#E8761A] group-hover/btn:border-[#E8761A] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#E8761A] scale-0 group-hover/btn:scale-100 rounded-full transition-transform duration-500" />
            <ArrowRight size={20} className="relative z-10" />
          </motion.div>
          <span className="group-hover/btn:text-[#E8761A] transition-colors duration-300">Explore Capability</span>
        </Link>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#E8761A] to-[#F5A623]"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.05 } : {}}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8761A] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.04 } : {}}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0A1E3D] rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"
        />
      </div>

      <div ref={containerRef} className="container-xl relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Verticals of Excellence
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-bold text-[#0A1E3D] tracking-tighter"
            >
              Our Core{" "}
              <span className="text-gradient-animate italic">Solutions</span>
            </motion.h2>
          </div>
        </div>

        {/* Sticky Cards */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
