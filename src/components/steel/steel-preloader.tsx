"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SteelPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Cybernetic Boot Logs
    const bootSequence = [
      "INITIATING MATTE BLACK KERNEL...",
      "LOADING METALLIC SILVER SHADERS [OK]",
      "ESTABLISHING LUXURY GREEN NEURAL NET [OK]",
      "MOUNTING PREMIUM WHITE WEBGL CONTEXT...",
      "SYNCHRONIZING PREMIUM ORANGE MATRICES...",
      "CALIBRATING CINEMATIC HOVER PHYSICS...",
      "BYPASSING STANDARD GRAVITY...",
      "SYSTEM ARCHITECTURE [ONLINE]",
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootSequence.length) {
        setLogs((prev) => [...prev, bootSequence[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 250);

    const duration = 2500;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setLoading(false), 600); // Wait slightly after 100%
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      clearInterval(logInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] text-[#00C853] selection:bg-transparent"
        >
          {/* Noise / Scanline Overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(rgba(245,245,245,0)_50%,rgba(5,5,5,0.25)_50%),linear-gradient(90deg,rgba(0,200,83,0.06),rgba(0,153,102,0.02),rgba(255,107,26,0.06))] bg-[length:100%_4px,3px_100%]" />

          {/* Central Circular Loader */}
          <div className="relative flex h-64 w-64 items-center justify-center">
            {/* Outer rings */}
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(245, 245, 245, 0.05)" strokeWidth="0.5" />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="#FF6B1A"
                strokeWidth="1"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 - (301.59 * progress) / 100}
                strokeLinecap="square"
                className="transition-all duration-100 ease-linear"
                style={{ filter: "drop-shadow(0 0 4px #FF6B1A)" }}
              />
            </svg>

            <svg className="absolute inset-4 h-full w-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0, 200, 83, 0.2)" strokeWidth="0.5" strokeDasharray="4 8" />
            </svg>

            {/* Core Value */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F5F5F5]">BOOT SEQUENCE</span>
              <span className="mt-2 text-5xl font-black tabular-nums tracking-tighter text-[#FF6B1A] drop-shadow-[0_0_15px_rgba(255,107,26,0.5)]">
                {Math.round(progress)}
              </span>
              <span className="mt-1 text-[8px] font-bold tracking-[0.2em] text-[#00C853]">SYSTEM_V9.0</span>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="absolute bottom-10 left-10 hidden max-w-sm flex-col gap-1 md:flex">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5F5F5]/70"
              >
                <span className="text-[#00C853] mr-2">{`>`}</span> {log}
              </motion.div>
            ))}
          </div>

          <div className="absolute right-10 top-10 flex flex-col items-end text-[9px] font-bold uppercase tracking-[0.3em] text-[#9A9A9A]">
            <span>LAT: 40.7128° N</span>
            <span>LON: 74.0060° W</span>
            <span className="mt-2 text-[#00C853] animate-pulse">CONNECTING...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
