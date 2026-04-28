"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

export default function ScrollScale({ children }: { children: ReactNode }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // More conservative transformations to ensure visibility
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale: springScale,
        opacity: springOpacity,
        rotateX: rotateX,
        perspective: "1000px"
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
