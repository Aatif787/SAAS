"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Foundation",
    price: "49k",
    description: "Ideal for local businesses and professional portfolios.",
    features: [
      "Custom Digital Presence",
      "Responsive Architecture",
      "Essential SEO Optimization",
      "Institutional Content Management",
      "Standard Priority Support",
    ],
    notIncluded: ["Advanced E-commerce", "AI Implementation", "Strategic Consulting"],
    color: "border-ims-blue/10"
  },
  {
    name: "Growth",
    price: "129k",
    description: "Comprehensive solutions for established corporate entities.",
    features: [
      "Dynamic Enterprise Platform",
      "E-commerce Integration",
      "Strategic Digital Marketing",
      "Performance Optimization",
      "Advanced Security Protocols",
      "Extended Support (6 Months)",
    ],
    notIncluded: ["Custom AI Engines", "Voice Integration"],
    color: "border-ims-red/50 bg-ims-red/5 shadow-xl",
    popular: true
  },
  {
    name: "Elite",
    price: "299k",
    description: "Total digital transformation for industry leaders.",
    features: [
      "Bespoke System Architecture",
      "AI & Process Automation",
      "Market Intelligence Dashboard",
      "Full Lifecycle Support",
      "High-Performance Cloud Hosting",
      "24/7 Strategic Consultation",
      "Institutional Training",
    ],
    notIncluded: [],
    color: "border-ims-gold/50 bg-ims-gold/5"
  }
];

export default function PricingGrid() {
  return (
    <section id="pricing" className="section-pad bg-ims-cream">
      <div className="container-xl">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.4em] text-ims-gold mb-4"
          >
            Investment Plans
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-ims-blue"
          >
            Tailored <span className="text-ims-red italic">Digital Packages</span>
          </motion.h2>
          <p className="mt-8 max-w-2xl text-lg text-ims-charcoal/70 font-medium">
            Select an investment tier that aligns with your institutional goals. 
            Transparent valuation with a focus on long-term growth.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`premium-border flex flex-col p-10 bg-white card-hover ${plan.color} relative overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-ims-red text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest">
                  Most Preferred
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-2xl font-serif text-ims-blue font-bold">{plan.name}</h3>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-sm font-bold text-ims-charcoal/40 uppercase tracking-widest">Starts from</span>
                  <span className="text-5xl font-serif font-bold text-ims-blue">₹{plan.price}</span>
                </div>
                <p className="mt-6 text-sm text-ims-charcoal/60 leading-relaxed font-medium">{plan.description}</p>
                
                <div className="mt-12 space-y-5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-4">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ims-blue/5 text-ims-red">
                        <Check size={14} />
                      </div>
                      <span className="text-xs font-bold text-ims-blue/80 uppercase tracking-wider">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-center gap-4 opacity-30">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ims-charcoal/5 text-ims-charcoal">
                        <X size={14} />
                      </div>
                      <span className="text-xs font-bold text-ims-charcoal/80 uppercase tracking-wider">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/signup"
                className={`btn-premium mt-12 w-full justify-center ${
                  !plan.popular ? "bg-ims-blue/10 !text-ims-blue border border-ims-blue/20 hover:bg-ims-blue hover:!text-white" : ""
                }`}
              >
                Inquire Now <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
