"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Code2, 
  Layout, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone 
} from "lucide-react";

const serviceCategories = [
  {
    title: "Web Development",
    icon: Layout,
    items: ["Static Portfolios", "Dynamic Corporate Sites", "High-Conversion Landing Pages", "Custom CMS Solutions"],
    description: "We build more than just websites. We build growth engines tailored to your brand identity.",
    color: "text-lime"
  },
  {
    title: "Web Applications",
    icon: Code2,
    items: ["SaaS Platforms", "Inventory Systems", "Customer Portals", "Custom ERP/CRM"],
    description: "Scalable, secure, and high-performance web software designed for complex business logic.",
    color: "text-amber"
  },
  {
    title: "AI & Automation",
    icon: Cpu,
    items: ["Custom Chatbots", "Voice AI Agents", "Workflow Automation", "Predictive Analytics"],
    description: "Harness the power of AI to automate customer service and optimize internal operations.",
    color: "text-orange"
  },
  {
    title: "Growth Marketing",
    icon: TrendingUp,
    items: ["SEO & Content", "Google/Meta Ads", "Social Media Strategy", "Email Automation"],
    description: "Data-driven marketing that focuses on ROI and sustainable customer acquisition.",
    color: "text-white"
  }
];

export default function ServicesPage() {
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
              Solutions for <br />
              <span className="text-gradient-lime">Modern Business.</span>
            </h1>
            <p className="mt-8 text-xl text-white/60 leading-relaxed">
              We provide a comprehensive suite of digital services designed 
              to transform your online presence into a high-performance 
              business asset.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {serviceCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-[3rem] p-10 md:p-14 hover:border-white/20 transition-all group"
              >
                <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ${cat.color}`}>
                   <cat.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold">{cat.title}</h3>
                <p className="mt-6 text-lg text-white/50 leading-relaxed">
                   {cat.description}
                </p>
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                   {cat.items.map((item) => (
                     <li key={item} className="flex items-center gap-3 text-sm font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-lime" />
                        {item}
                     </li>
                   ))}
                </ul>
                <div className="mt-12 pt-10 border-t border-white/5">
                   <Link href="/contact" className="flex items-center gap-2 font-bold text-lime group-hover:gap-4 transition-all">
                      Discuss This Service <ArrowRight size={20} />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-black/40">
        <div className="container-xl">
           <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex gap-6">
                 <ShieldCheck className="text-lime shrink-0" size={32} />
                 <div>
                    <h4 className="text-xl font-bold">Secure by Default</h4>
                    <p className="mt-2 text-white/50">Every line of code is written with security and performance in mind.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <Smartphone className="text-amber shrink-0" size={32} />
                 <div>
                    <h4 className="text-xl font-bold">Mobile First</h4>
                    <p className="mt-2 text-white/50">Fluid experiences across every screen size and device type.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <Cpu className="text-orange shrink-0" size={32} />
                 <div>
                    <h4 className="text-xl font-bold">Future Ready</h4>
                    <p className="mt-2 text-white/50">We use the latest tech stacks to ensure your platform lasts for years.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-pad">
         <div className="container-xl">
            <div className="glass rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-lime/5 to-amber/5" />
               <div className="relative z-10">
                  <h2 className="text-4xl font-bold md:text-6xl">Ready to scale your <br /> business?</h2>
                  <p className="mt-8 mx-auto max-w-2xl text-lg text-white/60">
                     Join 200+ successful brands that trust InfinityMesh for their digital transformation.
                  </p>
                  <div className="mt-12 flex flex-wrap justify-center gap-6">
                     <Link href="/contact" className="rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105">Book a Free Consultation</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
