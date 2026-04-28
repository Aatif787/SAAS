"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, Target } from "lucide-react";

const caseStudies = [
  {
    title: "Global E-commerce Scale",
    client: "EcoMarket Inc.",
    problem: "Outdated legacy system causing 60% cart abandonment and slow mobile performance.",
    solution: "Rebuilt with Next.js and Headless Shopify, implementing advanced edge caching and 1-click checkout.",
    result: "140% increase in mobile conversions and 50% reduction in server costs.",
    metrics: ["140% Conv Rate", "50% Cost Reduction", "Sub-second Loading"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2489"
  },
  {
    title: "SaaS Platform Modernization",
    client: "TechFlow Systems",
    problem: "Complex user onboarding resulting in high churn and low feature discovery.",
    solution: "Interactive dashboard redesign with Framer Motion animations and contextual AI onboarding.",
    result: "35% churn reduction and 80% improvement in user engagement metrics.",
    metrics: ["35% Churn Dec", "80% Engagement", "92% CSAT Score"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  }
];

export default function CaseStudiesPage() {
  return (
    <main className="bg-mesh min-h-screen pt-20">
      <section className="section-pad">
        <div className="container-xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-3xl"
           >
              <h1 className="text-5xl font-bold md:text-7xl">
                Real Results. <br />
                <span className="text-gradient-lime">Measurable Impact.</span>
              </h1>
              <p className="mt-8 text-xl text-white/60 leading-relaxed">
                We don't just deliver code; we deliver business outcomes. 
                Explore how we've helped our clients solve complex problems 
                and achieve significant growth.
              </p>
           </motion.div>

           <div className="mt-20 space-y-32">
              {caseStudies.map((study, i) => (
                <motion.div 
                  key={study.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid gap-16 lg:grid-cols-2 lg:items-center"
                >
                   <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                         <img src={study.image} alt={study.title} className="h-full w-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                         <div className="absolute bottom-8 left-8 flex flex-wrap gap-3">
                            {study.metrics.map(m => (
                              <span key={m} className="rounded-full bg-lime/20 backdrop-blur-md border border-lime/30 px-4 py-1.5 text-xs font-bold text-lime uppercase tracking-widest">{m}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-8">
                      <div>
                         <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">{study.client}</span>
                         <h2 className="mt-2 text-4xl font-bold">{study.title}</h2>
                      </div>
                      
                      <div className="space-y-6">
                         <div className="flex gap-6">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-orange/10 flex items-center justify-center text-orange"><Target size={20} /></div>
                            <div>
                               <h4 className="font-bold">The Problem</h4>
                               <p className="mt-2 text-white/50 leading-relaxed">{study.problem}</p>
                            </div>
                         </div>
                         <div className="flex gap-6">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-amber/10 flex items-center justify-center text-amber"><TrendingUp size={20} /></div>
                            <div>
                               <h4 className="font-bold">The Solution</h4>
                               <p className="mt-2 text-white/50 leading-relaxed">{study.solution}</p>
                            </div>
                         </div>
                         <div className="flex gap-6">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-lime/10 flex items-center justify-center text-lime"><CheckCircle2 size={20} /></div>
                            <div>
                               <h4 className="font-bold">The Result</h4>
                               <p className="mt-2 text-white/50 leading-relaxed">{study.result}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section-pad bg-black/40 border-y border-white/5">
         <div className="container-xl">
            <h2 className="text-3xl font-bold text-center mb-16">Our Result-Driven Methodology</h2>
            <div className="grid gap-8 md:grid-cols-4">
               {[
                 { label: "Audit", icon: Target, desc: "In-depth analysis of existing systems and goals." },
                 { label: "Plan", icon: TrendingUp, desc: "Strategic roadmap focused on ROI." },
                 { label: "Execute", icon: Users, desc: "Agile development with daily updates." },
                 { label: "Optimize", icon: CheckCircle2, desc: "Post-launch scaling and performance tuning." }
               ].map((m, i) => (
                 <div key={i} className="text-center group">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 mb-6 transition-all group-hover:bg-lime/10 group-hover:text-lime">
                       <m.icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold">{m.label}</h4>
                    <p className="mt-3 text-sm text-white/40 leading-relaxed">{m.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}
