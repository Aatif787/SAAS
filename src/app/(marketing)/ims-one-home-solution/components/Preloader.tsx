"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old === 100) { clearInterval(timer); setTimeout(() => setLoading(false), 500); return 100; }
        return Math.min(old + Math.random() * 20, 100);
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div initial={{ opacity: 1 }} exit={{ y: '-100%', transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } }} className="fixed inset-0 z-[9999] bg-[#FDFBF7] flex flex-col items-center justify-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E8761A]/8 rounded-full blur-[100px] animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#E8761A]/5 rounded-full blur-[80px] animate-float-delay" />
          </div>
          <div className="relative text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
              <div className="text-6xl md:text-8xl font-bold text-[#0A1E3D] tracking-tight mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                IMS <span className="gold-shimmer-text">ONE</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.6em] text-[#0A1E3D]/30">Home Solution</div>
            </motion.div>
            <div className="w-48 h-[2px] bg-[#0A1E3D]/5 relative overflow-hidden mt-12 mx-auto rounded-full">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-[#E8761A] to-[#F5A623] rounded-full" />
            </div>
            <div className="mt-6 text-[9px] font-medium uppercase tracking-[0.5em] text-[#0A1E3D]/20">{Math.round(progress)}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
