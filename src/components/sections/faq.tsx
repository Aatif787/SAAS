"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare } from "lucide-react";

const faqs = [
  { question: "What businesses does IMS Group operate?", answer: "IMS Group is a diversified conglomerate with interests in Healthcare, Infrastructure, Home Solutions (Sanitary, Tiles, Steel), and Digital Web Solutions." },
  { question: "Where is IMS Group located?", answer: "Our corporate headquarters is located in Gomti Nagar, Lucknow, but we serve clients and projects across the region and beyond." },
  { question: "How long has IMS Group been established?", answer: "With over 10 years of excellence, we have built a legacy of trust and quality across multiple industries." },
  { question: "Does IMS offer web development services?", answer: "Yes, IMS Web Solution is our specialized digital arm providing premium web development, AI integration, and SaaS platforms." },
  { question: "How can I get a quote for my project?", answer: "You can use the 'Get Quote' button on our website, contact us via WhatsApp, or call our direct line at 9699858212." },
  { question: "Do you handle international projects?", answer: "Yes, our Web Solution and Real Estate consultancy divisions work with clients globally." }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-ims-blue/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-8 text-left focus:outline-none group"
      >
        <span className="text-xl font-serif text-ims-blue group-hover:text-ims-red transition-colors">{question}</span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-ims-blue/5 transition-all duration-300 ${isOpen ? "bg-ims-blue text-white rotate-180" : "bg-white text-ims-blue"}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-sm leading-relaxed text-ims-charcoal/70 font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-pad bg-ims-cream">
      <div className="container-xl">
        <div className="grid gap-20 lg:grid-cols-2">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
            >
              Support & Information
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-ims-blue leading-tight"
            >
              Frequently <br />
              <span className="text-ims-red italic">Asked Questions</span>
            </motion.h2>
            <p className="mt-8 text-lg text-ims-charcoal/70 font-medium leading-relaxed max-w-md">
              Find answers to common inquiries about our services and operations. 
              Our team is always here for further assistance.
            </p>
            <div className="mt-12">
               <div className="premium-border p-10 bg-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <MessageSquare size={100} className="text-ims-blue" />
                  </div>
                  <h4 className="text-ims-blue font-serif text-2xl mb-4">Need Personalized Help?</h4>
                  <p className="text-sm text-ims-charcoal/60 mb-8">Our advisors are available on WhatsApp for immediate consultation.</p>
                  <a href="https://wa.me/919699858212" className="btn-premium">Chat on WhatsApp</a>
               </div>
            </div>
          </div>
          
          <div className="bg-white premium-border p-10 md:p-16 shadow-2xl">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
