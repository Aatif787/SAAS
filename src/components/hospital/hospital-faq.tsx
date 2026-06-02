"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useHospital } from "@/lib/hospital-store";

export default function HospitalFAQ() {
  const { cms } = useHospital();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = cms?.faqs || [];

  return (
    <section id="faq" className="section-pad bg-[#F0F4F8] relative overflow-hidden">
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-2 bg-[#F0F4F8] shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] rounded-full" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ims-blue/40 block font-mono">Knowledge // Insights</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[0.95] tracking-tighter text-[#F0F4F8] [text-shadow:4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]">
              Medical <br />
              <span className="text-ims-red italic drop-shadow-sm">Insights</span> & Info
            </h2>
            <p className="text-ims-charcoal/40 text-lg leading-relaxed mb-12 p-8 bg-[#F0F4F8] shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] rounded-3xl font-medium">
              Everything you need to know about our clinical procedures, digital services, and emergency protocols.
            </p>

            <div className="w-24 h-24 bg-[#F0F4F8] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] text-ims-blue flex items-center justify-center rounded-3xl">
               <HelpCircle size={48} />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {faqs.map((faq, i) => (
               <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`transition-all duration-500 rounded-[32px] overflow-hidden ${
                  openIndex === i 
                    ? "bg-[#F0F4F8] shadow-[inset_10px_10px_20px_#d1d9e6,inset_-10px_-10px_20px_#ffffff]" 
                    : "bg-[#F0F4F8] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-xl md:text-2xl font-serif tracking-tight transition-colors ${
                    openIndex === i ? "text-ims-red italic" : "text-ims-blue"
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
                    openIndex === i 
                      ? "bg-[#F0F4F8] shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] text-ims-red" 
                      : "bg-[#F0F4F8] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] text-ims-blue"
                  }`}>
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-10 pb-10">
                        <p className="text-ims-charcoal/40 text-lg leading-relaxed max-w-2xl border-t border-ims-blue/5 pt-8 font-medium">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
               </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
