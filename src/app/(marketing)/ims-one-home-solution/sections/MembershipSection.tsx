"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: "Essential Care",
    price: "₹4,999",
    period: "per quarter",
    description: "Proactive maintenance for your core home systems.",
    features: [
      "2 Scheduled Maintenance Visits",
      "50-Point Home Health Check",
      "Filter & Battery Replacement",
      "Priority Handyman Booking",
      "IMS One Home App Access",
    ],
    highlight: false,
  },
  {
    name: "Premium Luxury",
    price: "₹14,999",
    period: "per quarter",
    description: "Full concierge management for extraordinary homes.",
    features: [
      "4 Scheduled Maintenance Visits",
      "Dedicated Home Manager",
      "24/7 Priority Emergency Support",
      "Annual Interior Consultation",
      "Smart Home Optimization",
      "Concierge Project Management",
    ],
    highlight: true,
  },
  {
    name: "Custom Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "Bespoke solutions for large estates and institutions.",
    features: [
      "Full-time On-site Support",
      "Multiple Property Management",
      "Security & Surveillance Audit",
      "Custom Renovation Planning",
      "VIP Hospitality Services",
    ],
    highlight: false,
  }
];

export default function MembershipSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.06 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#E8761A] to-transparent rounded-full blur-[120px]"
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#E8761A] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Membership Plans
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              className="text-5xl md:text-7xl font-bold text-[#0A1E3D] tracking-tighter"
            >
              Elevate Your{" "}
              <span className="text-gradient-animate">Home Management</span>
            </motion.h2>
          </div>
        </div>

        {/* Plans */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: plan.highlight ? 1.05 : 1 } : {}}
              transition={{
                delay: 0.2 + index * 0.15,
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative"
            >
              <motion.div
                whileHover={{
                  y: plan.highlight ? -8 : -12,
                  scale: plan.highlight ? 1.02 : 1.02,
                  transition: { duration: 0.4 }
                }}
                className={`relative p-12 rounded-2xl border overflow-hidden ${
                  plan.highlight
                    ? 'bg-[#0A1E3D] text-white border-[#E8761A]/20 shadow-2xl shadow-[#E8761A]/15 z-10'
                    : 'bg-white border-[#E8761A]/10 text-[#0A1E3D]'
                }`}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-[#E8761A]/30 via-[#F5A623]/20 to-[#E8761A]/30'
                    : 'bg-gradient-to-r from-[#E8761A]/15 via-[#E8761A]/10 to-[#E8761A]/15'
                }`} />

                {/* Shine sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Popular badge */}
                {plan.highlight && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#E8761A]/30"
                  >
                    <Sparkles size={12} />
                    Most Popular
                  </motion.div>
                )}

                {/* Plan name */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`text-5xl font-bold ${plan.highlight ? 'text-[#E8761A]' : 'text-[#0A1E3D]'}`}
                    >
                      {plan.price}
                    </motion.span>
                    <span className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-[#0A1E3D]/50'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mt-6 text-sm ${plan.highlight ? 'text-white/70' : 'text-[#0A1E3D]/60'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-5 mb-12">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                      className="flex items-start gap-4 group/item"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          plan.highlight
                            ? 'bg-[#E8761A] text-white group-hover/item:bg-[#F5A623]'
                            : 'bg-[#0A1E3D]/10 text-[#E8761A] group-hover/item:bg-[#E8761A] group-hover/item:text-white'
                        }`}
                      >
                        <Check size={14} />
                      </motion.div>
                      <span className={`text-sm font-medium ${plan.highlight ? 'text-white/80' : 'text-[#0A1E3D]/70'}`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/ims-one-home-solution/contact">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative block w-full py-5 rounded-xl font-bold text-center transition-all duration-500 overflow-hidden cursor-pointer ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white shadow-lg shadow-[#E8761A]/30'
                        : 'bg-[#0A1E3D] text-white hover:bg-gradient-to-r hover:from-[#E8761A] hover:to-[#F5A623]'
                    }`}
                  >
                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10">Join Now</span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
