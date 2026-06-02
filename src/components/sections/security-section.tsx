"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Database, RefreshCcw, Shield } from "lucide-react";

const securityFeatures = [
  {
    title: "Data Protection",
    description: "Enterprise-grade encryption for all institutional data.",
    icon: Lock
  },
  {
    title: "Certified Systems",
    description: "Full compliance with healthcare and infrastructure standards.",
    icon: ShieldCheck
  },
  {
    title: "Redundant Backups",
    description: "Automated off-site backups to ensure business continuity.",
    icon: RefreshCcw
  },
  {
    title: "Privacy Focused",
    description: "Strict adherence to global data protection regulations.",
    icon: Database
  }
];

export default function SecuritySection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <div className="premium-border p-6 sm:p-12 md:p-24 relative overflow-hidden bg-ims-cream/50">
          {/* Background Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
             <Shield size={600} className="text-ims-blue" />
          </div>
          
          <div className="relative z-10 grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-ims-gold mb-6 block">Integrity & Security</span>
                <h2 className="text-4xl font-serif md:text-5xl lg:text-6xl text-ims-blue leading-[1.1]">
                  Built on a Foundation of <span className="text-ims-red">Trust.</span>
                </h2>
                <p className="mt-8 text-lg text-ims-charcoal/70 leading-relaxed max-w-xl font-medium">
                  At IMS Group, security is not just a feature—it&apos;s a commitment. 
                  We implement multi-layered safety and data protection protocols 
                  across all our business verticals to ensure absolute peace of mind.
                </p>
              </motion.div>
              
              <div className="mt-10 sm:mt-16 grid gap-10 sm:grid-cols-2">
                {securityFeatures.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="mt-1 text-ims-red group-hover:text-ims-blue transition-colors">
                      <f.icon size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-ims-blue uppercase tracking-widest text-xs mb-2">{f.title}</h4>
                       <p className="text-xs text-ims-charcoal/60 leading-relaxed font-medium">{f.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
               <div className="relative h-[450px] w-[350px] premium-border p-1 shadow-2xl bg-white card-hover">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Security Infrastructure" 
                    className="object-cover w-full h-full grayscale opacity-80"
                  />
                  <div className="absolute inset-0 bg-ims-blue/10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-xl border-l-4 border-ims-red">
                     <ShieldCheck size={48} className="text-ims-blue" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
