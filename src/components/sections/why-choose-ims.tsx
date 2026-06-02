"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Trophy, Target, Zap, Users2, Globe2 } from "lucide-react";

const reasons = [
  {
    title: "28+ Years of Trust",
    description: "A legacy of excellence built on transparency and unwavering commitment to our partners and customers since 1996.",
    icon: ShieldCheck,
    color: "bg-ims-red"
  },
  {
    title: "Diversified Portfolio",
    description: "From healthcare to infrastructure, our presence across multiple critical sectors ensures stability and multi-faceted growth.",
    icon: Globe2,
    color: "bg-ims-blue"
  },
  {
    title: "Innovation First",
    description: "We don't just follow trends; we set them. Our digital division ensures all our businesses are future-ready.",
    icon: Zap,
    color: "bg-ims-gold"
  },
  {
    title: "Strategic Excellence",
    description: "Our centralized Corporate Hub synergizes operations across Lucknow and beyond for maximum efficiency.",
    icon: Target,
    color: "bg-ims-red"
  },
  {
    title: "Institutional Quality",
    description: "We adhere to the highest international standards in every project, whether it's a trauma center or a high-rise.",
    icon: Trophy,
    color: "bg-ims-blue"
  },
  {
    title: "Customer Centric",
    description: "Building relationships is at our core. We believe in creating value that lasts for generations.",
    icon: Users2,
    color: "bg-ims-gold"
  }
];

export default function WhyChooseIMS() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container-xl relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
          >
            The IMS Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-ims-blue mb-8 leading-tight tracking-tighter"
          >
            Why Choose <span className="text-ims-red italic">IMS Group?</span>
          </motion.h2>
          <p className="max-w-2xl text-lg text-ims-charcoal/70 font-medium">
            Discover the pillars of excellence that make us a trusted leader in India&apos;s industrial and digital landscape.
          </p>
          <div className="gold-accent mx-auto mt-8" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group p-6 sm:p-10 bg-ims-cream/30 border border-ims-blue/5 rounded-sm hover:bg-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden will-change-transform"
            >
              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-12 h-12 ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity -mr-6 -mt-6 rounded-full blur-xl`} />
              
              <div className={`w-14 h-14 ${reason.color} text-white rounded-sm flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <reason.icon size={28} />
              </div>

              <h3 className="text-2xl font-serif text-ims-blue mb-4 group-hover:text-ims-red transition-colors">
                {reason.title}
              </h3>
              
              <p className="text-ims-charcoal/70 leading-relaxed font-medium text-justify">
                {reason.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-8 h-px w-0 bg-ims-red group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
