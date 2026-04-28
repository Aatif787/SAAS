"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Requirement",
    description: "Deep dive into your business goals and technical needs."
  },
  {
    number: "02",
    title: "Planning",
    description: "Strategic roadmap and architectural wireframing."
  },
  {
    number: "03",
    title: "Design",
    description: "Premium UI/UX design that resonates with your brand."
  },
  {
    number: "04",
    title: "Development",
    description: "Clean, scalable code built with modern frameworks."
  },
  {
    number: "05",
    title: "Delivery",
    description: "Testing, deployment, and performance optimization."
  }
];

export default function Process() {
  return (
    <section className="section-pad bg-ims-blue text-ims-cream">
      <div className="container-xl">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
          >
            Digital Workflow
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-white mb-8"
          >
            Web Solution <span className="text-ims-red italic">Process</span>
          </motion.h2>
          <div className="gold-accent mx-auto" />
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-8 bg-white/5 border border-white/10 hover:border-ims-gold/40 transition-all duration-500 card-hover"
            >
              <span className="text-5xl font-serif font-bold text-ims-gold/20 group-hover:text-ims-gold transition-colors block mb-6">{step.number}</span>
              <h3 className="text-xl font-serif font-bold text-white mb-4">{step.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed font-medium">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/10 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
