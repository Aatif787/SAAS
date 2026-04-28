"use client";

import { MessageCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

const number = "919699858212";

export default function WhatsAppFloat() {
  const message = encodeURIComponent("Hi IMS Group, I am interested in your services and would like to discuss a project.");
  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <>
      {/* WhatsApp Float */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="relative group">
          {/* Ping Effect */}
          <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-[#25D366]/40 opacity-75" />
          
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={32} />
          </a>
          
          {/* Tooltip */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-ims-blue font-bold text-xs uppercase tracking-widest shadow-xl border border-ims-blue/5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with us
          </div>
        </div>
      </motion.div>

      {/* Get Quote Side Tab */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[101] hidden md:block"
      >
        <button className="flex flex-col items-center gap-4 bg-ims-red text-white py-6 px-3 rounded-l-2xl shadow-2xl hover:bg-ims-blue transition-colors group">
          <FileText size={20} />
          <span className="[writing-mode:vertical-lr] font-bold uppercase tracking-[0.3em] text-[10px] py-2">Get Quote</span>
        </button>
      </motion.div>
    </>
  );
}
