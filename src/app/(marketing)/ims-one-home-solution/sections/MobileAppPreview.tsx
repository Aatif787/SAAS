"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Smartphone, Layout, Bell, ShieldCheck } from 'lucide-react';

const features = [
  "Instant Service Booking",
  "Live Smart Home Monitoring",
  "Emergency One-Tap Concierge",
  "Energy Analytics & Insights"
];

export default function MobileAppPreview() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const rawPhoneY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rawPhoneRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const phoneY = useSpring(rawPhoneY, { stiffness: 80, damping: 20 });
  const phoneRotate = useSpring(rawPhoneRotate, { stiffness: 80, damping: 20 });

  const displayY = isDesktop ? phoneY : 0;
  const displayRotate = isDesktop ? phoneRotate : 0;

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-[#FDFBF7] overflow-hidden relative">
      {/* Background orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.08 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#E8761A] to-[#F5A623] rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container-xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Phone Mockup */}
        <div className="relative flex justify-center">
          <motion.div
            style={{ y: displayY, rotateZ: displayRotate }}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[300px] h-[600px] group"
          >
            {/* Phone outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#E8761A]/20 to-[#F5A623]/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Phone body */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full bg-[#0A1E3D] rounded-[2rem] p-4 shadow-2xl shadow-[#0A1E3D]/40 border-[8px] border-[#0A1E3D]/30 overflow-hidden"
            >
              {/* Shine on phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden p-6 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#0A1E3D]/40 font-bold uppercase">Welcome Home</span>
                    <span className="text-sm font-bold text-[#0A1E3D] tracking-tighter">Mr. Alexander</span>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-10 h-10 rounded-full bg-[#0A1E3D]/5 flex items-center justify-center"
                  >
                    <Bell size={16} className="text-[#E8761A]" />
                  </motion.div>
                </div>

                {/* Energy Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="bg-gradient-to-br from-[#E8761A] to-[#F5A623] rounded-2xl p-4 text-white mb-6 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine" />
                  <div className="text-[8px] uppercase font-bold opacity-70 mb-1">Energy Saving Today</div>
                  <div className="text-2xl font-bold">₹1,240.50</div>
                </motion.div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Layout, label: "Living Room", progress: 75, color: "#0A1E3D" },
                    { icon: Smartphone, label: "Automation", progress: 50, color: "#E8761A" }
                  ].map((ctrl, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#FDFBF7] rounded-2xl p-4 flex flex-col gap-2 cursor-pointer"
                    >
                      <ctrl.icon size={16} className="text-[#0A1E3D]" />
                      <span className="text-[10px] font-bold text-[#0A1E3D]">{ctrl.label}</span>
                      <div className="w-full h-1 bg-[#0A1E3D]/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${ctrl.progress}%` } : {}}
                          transition={{ delay: 0.9 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full"
                          style={{ background: ctrl.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Health Check */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  className="mt-auto bg-[#0A1E3D]/5 rounded-2xl p-4 flex items-center gap-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                  >
                    <ShieldCheck size={20} className="text-green-500" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#0A1E3D]">Home Health</span>
                    <span className="text-[8px] text-green-600 font-bold uppercase">98% Protected</span>
                  </div>
                </motion.div>
              </div>

              {/* Camera notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0A1E3D] rounded-full" />
            </motion.div>
          </motion.div>

          {/* Decorative rings */}
          {[300, 450, 600].map((size, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 0.04 - i * 0.01, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8761A] -z-10"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="z-10">
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#E8761A] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Digital Management
          </motion.span>

          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold text-[#0A1E3D] tracking-tighter"
            >
              Control Your Legacy <br />
              <span className="text-gradient-animate">In Real-Time</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-[#0A1E3D]/60 mb-12 max-w-lg leading-relaxed"
          >
            The IMS One App is your command center. From scheduling maintenance to monitoring solar efficiency and managing security, everything is one tap away.
          </motion.p>

          {/* Feature list */}
          <div className="space-y-5 mb-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-[#E8761A] to-[#F5A623] group-hover:shadow-lg group-hover:shadow-[#E8761A]/50 transition-shadow duration-300"
                />
                <span className="text-sm font-bold text-[#0A1E3D] uppercase tracking-widest group-hover:text-[#E8761A] transition-colors duration-300">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Store buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
          >
            {["App Store", "Play Store"].map((store, i) => (
              <motion.button
                key={store}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-10 py-5 rounded-full font-bold text-sm overflow-hidden group flex-1 ${
                  i === 0
                    ? 'bg-[#0A1E3D] text-white shadow-xl shadow-[#0A1E3D]/20'
                    : 'bg-white text-[#0A1E3D] border border-[#0A1E3D]/10 shadow-lg'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{store}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
