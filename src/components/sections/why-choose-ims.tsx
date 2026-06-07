"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Trophy, Target, Zap, Users2, Globe2 } from "lucide-react";

const reasons = [
  {
    title: "28+ Years of Trust",
    description: "A legacy of excellence built on transparency and unwavering commitment to our partners and customers since 1996.",
    icon: ShieldCheck,
    color: "bg-[#9B1B30]"
  },
  {
    title: "Diversified Portfolio",
    description: "From healthcare to infrastructure, our presence across multiple critical sectors ensures stability and multi-faceted growth.",
    icon: Globe2,
    color: "bg-[#0A1E3D]"
  },
  {
    title: "Innovation First",
    description: "We don't just follow trends; we set them. Our digital division ensures all our businesses are future-ready.",
    icon: Zap,
    color: "bg-[#C5A059]"
  },
  {
    title: "Strategic Excellence",
    description: "Our centralized Corporate Hub synergizes operations across Lucknow and beyond for maximum efficiency.",
    icon: Target,
    color: "bg-[#722F37]"
  },
  {
    title: "Institutional Quality",
    description: "We adhere to the highest international standards in every project, whether it's a trauma center or a high-rise.",
    icon: Trophy,
    color: "bg-[#3B4252]"
  },
  {
    title: "Customer Centric",
    description: "Building relationships is at our core. We believe in creating value that lasts for generations.",
    icon: Users2,
    color: "bg-[#B87333]"
  }
];

/* Staggered container for smooth reveal */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function WhyChooseIMS() {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden w-full">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container-xl relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-[#C5A059] mb-6 block"
          >
            The IMS Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#0A1E3D] mb-8 leading-tight tracking-tight"
          >
            Why Choose <span className="text-[#9B1B30] italic">IMS Group?</span>
          </motion.h2>
          <p className="max-w-2xl text-base md:text-lg text-[#3B4252]/65 font-medium">
            Discover the pillars of excellence that make us a trusted leader in India&apos;s industrial and digital landscape.
          </p>
          <div className="gold-accent mx-auto mt-8" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group p-6 sm:p-8 md:p-10 bg-[#FAF6F0]/30 border border-[#0A1E3D]/5 rounded-sm hover:bg-white hover:shadow-[0_20px_60px_rgba(10,30,61,0.06)] transition-all duration-500 relative overflow-hidden will-change-transform"
            >
              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-12 h-12 ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity -mr-6 -mt-6 rounded-full blur-xl`} />
              
              <div className={`w-12 h-12 md:w-14 md:h-14 ${reason.color} text-white rounded-sm flex items-center justify-center mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <reason.icon size={26} />
              </div>

              <h3 className="text-xl md:text-2xl font-serif text-[#0A1E3D] mb-4 group-hover:text-[#9B1B30] transition-colors duration-300">
                {reason.title}
              </h3>
              
              <p className="text-[#3B4252]/65 leading-relaxed font-medium text-sm md:text-base text-justify">
                {reason.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-6 md:mt-8 h-px w-0 bg-gradient-to-r from-[#9B1B30] to-[#C5A059] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
