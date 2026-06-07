"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Home,
  Layout,
  Layers,
  Construction,
  Building2,
  Globe,
  ArrowUpRight,
  Activity,
  Zap
} from "lucide-react";

const businesses = [
  {
    title: "IMS Hospital",
    description: "Next-gen trauma centers and medical technology systems designed for the future of patient care.",
    icon: <Activity className="w-8 h-8" />,
    image: "/images/healthcare-4k.png",
    color: "text-[#9B1B30]",
    bgAccent: "bg-[#9B1B30]",
    href: "/hospital"
  },
  {
    title: "IMS One Home Solution",
    description: "Smart-integrated luxury interiors and automated living spaces for modern institutional needs.",
    icon: <Home className="w-8 h-8" />,
    image: "/images/home-solution-4k.png",
    color: "text-[#C5A059]",
    bgAccent: "bg-[#C5A059]",
    href: "/ims-one-home-solution"
  },
  {
    title: "IMS UPVC Doors & Windows",
    description: "Premium, energy-efficient window and door systems engineered for soundproofing and durability.",
    icon: <Layers className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    color: "text-[#B87333]",
    bgAccent: "bg-[#B87333]",
    href: "/upvc"
  },
  {
    title: "IMS Steel",
    description: "High-grade structural steel manufacturing and precision fabrication for modern engineering projects.",
    icon: <Construction className="w-8 h-8" />,
    image: "/images/steel-infra-4k.png",
    color: "text-[#3B4252]",
    bgAccent: "bg-[#3B4252]",
    href: "/ims-steel"
  },
  {
    title: "IMS Infra",
    description: "Architectural civil engineering and high-tech infrastructure development shaping urban landscapes.",
    icon: <Globe className="w-8 h-8" />,
    image: "/images/corporate-hub-4k.png",
    color: "text-[#0A1E3D]",
    bgAccent: "bg-[#0A1E3D]",
    href: "/about"
  },
  {
    title: "IMS Estate Empire",
    description: "Premium high-rise developments and strategic real estate assets optimized for lifestyle and growth.",
    icon: <Building2 className="w-8 h-8" />,
    image: "/images/estate-empire-4k.png",
    color: "text-[#722F37]",
    bgAccent: "bg-[#722F37]",
    href: "/ims-estate-empire"
  }
];

/* Staggered container + child variants for a smooth cascading reveal */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-ims-cream relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#0A1E3D_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container-xl relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.4em] text-[#9B1B30] mb-4 block"
          >
            OUR BUSINESSES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#0A1E3D] mb-6 leading-tight tracking-tight"
          >
            Six Strong Verticals. <span className="text-[#9B1B30] italic">One Trusted Brand.</span>
          </motion.h2>
          <div className="gold-accent mx-auto" />
        </div>

        {/* Staggered grid with smooth fade-in + slide-up */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {businesses.map((business) => (
            <Link href={business.href} key={business.title} className="group block cursor-pointer">
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative bg-white/80 backdrop-blur-sm border border-[#0A1E3D]/[0.06] p-1 rounded-sm overflow-hidden h-full shadow-[0_2px_20px_rgba(10,30,61,0.04)] hover:shadow-[0_20px_60px_rgba(197,160,89,0.1),0_8px_24px_rgba(10,30,61,0.06)] transition-shadow duration-500"
              >
                {/* Shimmering Glass Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

                <div className="relative h-52 md:h-56 overflow-hidden mb-8">
                  <Image
                    src={business.image}
                    alt={business.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0A1E3D]/25 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute top-5 left-5 bg-white/70 backdrop-blur-md p-3.5 border border-white/40 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <div className={business.color}>
                      {business.icon}
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8 md:px-10 md:pb-10">
                  <h3
                    className="text-xl md:text-2xl font-serif text-[#0A1E3D] leading-tight mb-4 group-hover:text-[#9B1B30] transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {business.title}
                  </h3>
                  <p className="text-[#3B4252]/75 text-sm leading-relaxed mb-8 h-20 overflow-hidden text-justify font-medium">
                    {business.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-[#0A1E3D]/[0.06]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A059]">Market Leader</span>
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#0A1E3D]/10 flex items-center justify-center group-hover:bg-[#0A1E3D] group-hover:text-white text-[#0A1E3D] transition-all duration-400 shadow-[0_0_20px_rgba(10,30,61,0.06)]"
                    >
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </div>

                {/* Elegant bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#9B1B30] via-[#C5A059] to-[#9B1B30] transition-all duration-700 ease-out" />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
