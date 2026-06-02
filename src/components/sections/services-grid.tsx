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
    color: "text-ims-red",
    href: "/hospital"
  },
  {
    title: "IMS One Home Solution",
    description: "Smart-integrated luxury interiors and automated living spaces for modern institutional needs.",
    icon: <Home className="w-8 h-8" />,
    image: "/images/home-solution-4k.png",
    color: "text-ims-gold",
    href: "/ims-one-home-solution"
  },
  {
    title: "IMS UPVC Doors & Windows",
    description: "Premium, energy-efficient window and door systems engineered for soundproofing and durability.",
    icon: <Layers className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    color: "text-ims-gold",
    href: "/upvc"
  },
  {
    title: "IMS Steel",
    description: "High-grade structural steel manufacturing and precision fabrication for modern engineering projects.",
    icon: <Construction className="w-8 h-8" />,
    image: "/images/steel-infra-4k.png",
    color: "text-ims-blue",
    href: "/ims-steel"
  },
  {
    title: "IMS Infra",
    description: "Architectural civil engineering and high-tech infrastructure development shaping urban landscapes.",
    icon: <Globe className="w-8 h-8" />,
    image: "/images/corporate-hub-4k.png",
    color: "text-ims-blue",
    href: "/about"
  },
  {
    title: "IMS Estate Empire",
    description: "Premium high-rise developments and strategic real estate assets optimized for lifestyle and growth.",
    icon: <Building2 className="w-8 h-8" />,
    image: "/images/estate-empire-4k.png",
    color: "text-ims-red",
    href: "/estate"
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-ims-cream relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#0A1E3D_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container-xl relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.4em] text-ims-red mb-4 block"
          >
            OUR BUSINESSES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-ims-blue mb-6 leading-tight tracking-tighter"
          >
            Six Strong Verticals. <span className="text-ims-red italic">One Trusted Brand.</span>
          </motion.h2>
          <div className="gold-accent mx-auto" />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 perspective-1000">
          {businesses.map((business, index) => (
            <Link href={business.href} key={business.title} className="group block cursor-pointer">
              <motion.div
                initial={{
                  opacity: 0,
                  rotateX: index % 2 === 0 ? 45 : -45,
                  rotateY: index % 3 === 0 ? 30 : -30,
                  y: 100,
                  scale: 0.8
                }}
                whileInView={{
                  opacity: 1,
                  rotateX: 0,
                  rotateY: 0,
                  y: 0,
                  scale: 1
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.15,
                  duration: 1.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 12
                }}
                whileHover={{
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.05,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-transparent border border-ims-blue/5 p-1 transition-all duration-500 rounded-sm overflow-hidden will-change-transform h-full"
              >
                {/* Shimmering Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <div className="relative h-56 overflow-hidden mb-8">
                  <Image
                    src={business.image}
                    alt={business.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ims-blue/30 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute top-6 left-6 bg-white/60 backdrop-blur-md p-4 border border-white/40 shadow-2xl group-hover:scale-125 transition-transform">
                    <div className={business.color}>
                      {business.icon}
                    </div>
                  </div>

                  {/* Image Scanning Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-[size:100%_12px] animate-scan opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="px-10 pb-10">
                  <motion.h3
                    whileHover={{ x: 10 }}
                    className="text-2xl font-serif text-ims-blue leading-tight mb-6 group-hover:text-ims-red transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {business.title}
                  </motion.h3>
                  <p className="text-ims-charcoal/80 text-sm leading-relaxed mb-10 h-20 overflow-hidden text-justify group-hover:text-ims-charcoal transition-colors">
                    {business.description}
                  </p>
                  <div className="flex items-center justify-between pt-8 border-t border-ims-blue/10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ims-gold">Market Leader</span>
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 45 }}
                      className="w-14 h-14 rounded-full border border-ims-blue/10 flex items-center justify-center group-hover:bg-ims-blue group-hover:text-white transition-all shadow-[0_0_30px_rgba(10,30,61,0.1)]"
                    >
                      <ArrowUpRight size={24} />
                    </motion.div>
                  </div>
                </div>

                {/* Animated Liquid Border Bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1.5 bg-ims-red shadow-[0_0_15px_rgba(255,59,48,0.5)]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
