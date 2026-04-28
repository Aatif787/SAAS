"use client";

import { motion } from "framer-motion";
import PricingGrid from "@/components/sections/pricing-grid";
import FAQ from "@/components/sections/faq";
import { ShieldCheck, Zap, Globe } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="bg-mesh min-h-screen pt-20">
      <section className="section-pad pb-0">
        <div className="container-xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center max-w-3xl mx-auto"
           >
              <h1 className="text-5xl font-bold md:text-7xl">
                Simple, Transparent <br />
                <span className="text-gradient-lime">Pricing.</span>
              </h1>
              <p className="mt-8 text-xl text-white/60">
                No hidden costs. No complex tiers. Just high-performance 
                web solutions designed to help your business grow.
              </p>
           </motion.div>
        </div>
      </section>

      <PricingGrid />

      {/* Comparison Section */}
      <section className="section-pad bg-black/40 border-y border-white/5">
        <div className="container-xl">
           <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Plans?</h2>
           <div className="grid gap-8 md:grid-cols-3">
              <div className="glass p-8 rounded-[2rem] border-white/5">
                 <div className="h-12 w-12 rounded-xl bg-lime/10 text-lime flex items-center justify-center mb-6">
                    <ShieldCheck size={24} />
                 </div>
                 <h4 className="text-xl font-bold">Secure Infrastructure</h4>
                 <p className="mt-4 text-white/50 leading-relaxed">
                    All plans include SSL, firewall protection, and daily backups 
                    as standard. We never compromise on security.
                 </p>
              </div>
              <div className="glass p-8 rounded-[2rem] border-white/5">
                 <div className="h-12 w-12 rounded-xl bg-amber/10 text-amber flex items-center justify-center mb-6">
                    <Zap size={24} />
                 </div>
                 <h4 className="text-xl font-bold">Ultra Fast Speed</h4>
                 <p className="mt-4 text-white/50 leading-relaxed">
                    Powered by Next.js and high-performance CDN, your site 
                    will load in milliseconds globally.
                 </p>
              </div>
              <div className="glass p-8 rounded-[2rem] border-white/5">
                 <div className="h-12 w-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center mb-6">
                    <Globe size={24} />
                 </div>
                 <h4 className="text-xl font-bold">Global Ready</h4>
                 <p className="mt-4 text-white/50 leading-relaxed">
                    Deploy your platform on a global scale with multi-region 
                    hosting and local edge caching.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <FAQ />

      {/* Final CTA */}
      <section className="section-pad">
         <div className="container-xl">
            <div className="glass rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden border-lime/10">
               <div className="relative z-10">
                  <h2 className="text-4xl font-bold">Need a custom plan?</h2>
                  <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
                     For large-scale enterprises and complex requirements, we offer 
                     tailored solutions that fit your specific needs.
                  </p>
                  <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}`} className="mt-10 inline-block rounded-full bg-lime px-8 py-4 font-bold text-black transition-transform hover:scale-105">
                     Contact for Custom Quote
                  </a>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
