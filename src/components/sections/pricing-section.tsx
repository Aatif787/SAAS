"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "25,000",
    description: "Perfect for institutional landing pages and digital presence.",
    features: [
      "Premium Design",
      "Mobile Responsive",
      "SEO Optimization",
      "Contact Form Integration",
      "1 Month Support"
    ],
    recommended: false
  },
  {
    name: "Business",
    price: "75,000",
    description: "Complete digital solution for growing enterprises.",
    features: [
      "Multi-page Corporate Site",
      "CMS Integration",
      "Advanced Analytics",
      "Speed Optimization",
      "3 Months Support",
      "API Integration"
    ],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "1,50,000",
    description: "Custom-built SaaS platforms and AI-driven systems.",
    features: [
      "Custom SaaS Engineering",
      "Deep AI Integration",
      "Enterprise Security",
      "Dedicated Server Setup",
      "1 Year Support",
      "SLA Guarantee"
    ],
    recommended: false
  }
];

export default function PricingSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
          >
            Digital Investment
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-ims-blue mb-8"
          >
            Web Solution <span className="text-ims-red italic">Pricing</span>
          </motion.h2>
          <div className="gold-accent mx-auto" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-10 premium-border transition-all duration-500 card-hover ${
                plan.recommended ? 'bg-ims-blue text-white shadow-2xl scale-105 z-10' : 'bg-ims-cream/30 text-ims-blue'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ims-red text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-serif mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-serif font-bold">₹{plan.price}</span>
                <span className={`text-xs opacity-60 font-bold uppercase tracking-widest`}>+</span>
              </div>
              <p className={`text-sm mb-10 leading-relaxed font-medium ${plan.recommended ? 'text-white/70' : 'text-ims-charcoal/60'}`}>
                {plan.description}
              </p>
              
              <div className="space-y-4 mb-12">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.recommended ? 'bg-ims-red text-white' : 'bg-ims-blue/10 text-ims-red'}`}>
                      <Check size={12} />
                    </div>
                    <span className="text-xs font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                plan.recommended ? 'bg-ims-red text-white hover:bg-white hover:text-ims-blue' : 'bg-ims-blue text-white hover:bg-ims-red'
              }`}>
                Select Plan <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
