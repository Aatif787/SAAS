"use client";

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    q: "What exactly is IMS One Home Solution?",
    a: "IMS One Home Solution is Lucknow's premier luxury home management company. We handle everything your home needs — from architecture and interior design to smart automation, construction, and ongoing maintenance — all under one roof with a single dedicated expert assigned to your property.",
  },
  {
    q: "How does the membership model work?",
    a: "You choose a quarterly plan (Essential, Premium, or Custom Enterprise). Your dedicated Home Manager schedules preventative visits, handles on-demand requests through our app, and coordinates any project work. You pay a fixed quarterly fee — no surprise invoices, no hidden charges.",
  },
  {
    q: "Are your technicians background-checked?",
    a: "Every IMS professional undergoes a 7-step vetting process: identity verification, police clearance, skill certification, reference checks, drug screening, IMS training academy, and a supervised probation period. We carry ₹50L liability insurance on every job.",
  },
  {
    q: "How quickly can you respond to an emergency?",
    a: "Premium and Enterprise members receive a guaranteed 90-minute on-site response, 24/7/365. Essential members receive priority booking within 4 hours. Our emergency dispatch centre operates round the clock.",
  },
  {
    q: "Can IMS handle a full home construction project?",
    a: "Absolutely. We manage end-to-end construction from architectural design and structural engineering to interior fit-out and smart system integration. Our project managers handle all contractor coordination, permits, and quality inspections so you never have to.",
  },
  {
    q: "What areas do you currently serve?",
    a: "We currently operate across Lucknow (Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, and surrounding areas). We are expanding to Kanpur, Agra, and Delhi NCR in 2025. Contact us to check availability in your specific location.",
  },
  {
    q: "Do you offer a trial or free assessment?",
    a: "Yes. We offer a complimentary 50-point Home Health Assessment for new clients — no obligation, no pressure. Our expert visits your home, evaluates all systems, and presents a personalised maintenance roadmap. Book yours through the contact page.",
  },
  {
    q: "What smart home systems do you integrate?",
    a: "We work with all major platforms including KNX, Control4, Crestron, Lutron, and custom IoT solutions. We design system-agnostic architectures so your home is never locked into a single vendor. Voice control, app control, and automated scenes are all standard.",
  },
];

export default function FAQSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={containerRef} className="py-36 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#E8761A] to-[#F5A623] rounded-full blur-[200px] pointer-events-none"
      />

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 items-start">
          {/* Left sticky header */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
            >
              Got Questions?
            </motion.span>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
                className="text-5xl md:text-6xl font-bold text-[#0A1E3D] tracking-tighter leading-tight"
              >
                Everything <br />
                <span className="text-gradient-animate">Answered.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#0A1E3D]/50 leading-relaxed mb-10"
            >
              Can't find what you're looking for? Our team is available 24/7 to answer any question about your home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link href="/ims-one-home-solution/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#E8761A]/25 overflow-hidden group relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Ask Us Anything</span>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <motion.div
                  className={`rounded-2xl border overflow-hidden transition-all duration-500 ${
                    openIndex === i
                      ? 'border-[#E8761A]/30 shadow-xl shadow-[#E8761A]/10 bg-white'
                      : 'border-[#0A1E3D]/8 bg-white hover:border-[#E8761A]/20 hover:shadow-lg hover:shadow-[#E8761A]/5'
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left"
                  >
                    <span className={`font-bold text-lg pr-8 transition-colors duration-300 ${
                      openIndex === i ? 'text-[#E8761A]' : 'text-[#0A1E3D] group-hover:text-[#E8761A]'
                    }`}>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === i
                          ? 'bg-gradient-to-br from-[#E8761A] to-[#F5A623] text-white shadow-lg shadow-[#E8761A]/30'
                          : 'bg-[#0A1E3D]/5 text-[#0A1E3D]/40 group-hover:bg-[#E8761A]/10 group-hover:text-[#E8761A]'
                      }`}
                    >
                      <Plus size={18} />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className="h-px bg-gradient-to-r from-[#E8761A]/20 to-transparent mb-6" />
                          <p className="text-[#0A1E3D]/60 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
