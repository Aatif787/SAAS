"use client";

import { motion } from "framer-motion";
import { UserPlus, CalendarCheck, Activity, HeartHandshake } from "lucide-react";

const STEPS = [
  {
    title: "Seamless Admission",
    desc: "Digital pre-registration and instant triage upon arrival.",
    icon: <UserPlus size={32} />
  },
  {
    title: "Expert Diagnosis",
    desc: "Comprehensive evaluation using AI-assisted imaging systems.",
    icon: <CalendarCheck size={32} />
  },
  {
    title: "Precision Treatment",
    desc: "High-precision specialized procedures and personalized care plans.",
    icon: <Activity size={32} />
  },
  {
    title: "Holistic Recovery",
    desc: "Advanced rehabilitation and remote monitoring for home care.",
    icon: <HeartHandshake size={32} />
  }
];

export default function HospitalJourney() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-xl">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-ims-red mb-4 block">The Patient Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif text-ims-blue mb-8">How We <span className="text-ims-red italic">Restore</span> Your Health.</h2>
          <div className="gold-accent mx-auto" />
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-ims-blue/5 hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group text-center"
              >
                <div className="relative z-10 w-24 h-24 bg-white border border-ims-blue/10 rounded-full flex items-center justify-center text-ims-blue mx-auto mb-10 group-hover:bg-ims-red group-hover:text-white group-hover:border-ims-red transition-all duration-500 shadow-xl shadow-ims-blue/5">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-ims-gold text-white rounded-full flex items-center justify-center text-xs font-bold font-serif">
                    0{i + 1}
                  </div>
                </div>
                
                <h4 className="text-2xl font-serif text-ims-blue mb-4 group-hover:text-ims-red transition-colors">{step.title}</h4>
                <p className="text-sm text-ims-charcoal/60 leading-relaxed max-w-[200px] mx-auto">
                  {step.desc}
                </p>
                
                {/* Mobile line */}
                <div className="w-[1px] h-12 bg-ims-blue/5 mx-auto mt-8 lg:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
