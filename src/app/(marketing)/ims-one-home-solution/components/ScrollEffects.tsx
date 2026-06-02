"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// ─── SCROLL PROGRESS BAR ───
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E8761A] via-[#F5A623] to-[#E8761A] z-[10000] origin-left"
      style={{ scaleX }}
    />
  );
}

// ─── SCROLL TO TOP BUTTON ───
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#E8761A] to-[#C45D10] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#E8761A]/40 z-[999] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── PARALLAX SECTION ───
interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ children, className = '', speed = 0.5 }: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── REVEAL ON SCROLL ───
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | '3d';
  once?: boolean;
}

export function Reveal({ children, className = '', delay = 0, direction = 'up', once = true }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const variants = {
    hidden: {
      up: { opacity: 0, y: 100, scale: 0.95 },
      down: { opacity: 0, y: -100, scale: 0.95 },
      left: { opacity: 0, x: 100, scale: 0.95 },
      right: { opacity: 0, x: -100, scale: 0.95 },
      scale: { opacity: 0, scale: 0.8 },
      blur: { opacity: 0, filter: "blur(30px)", scale: 0.95 },
      '3d': { opacity: 0, y: 80, rotateX: 10, scale: 0.95 },
    },
    visible: {
      up: { opacity: 1, y: 0, scale: 1 },
      down: { opacity: 1, y: 0, scale: 1 },
      left: { opacity: 1, x: 0, scale: 1 },
      right: { opacity: 1, x: 0, scale: 1 },
      scale: { opacity: 1, scale: 1 },
      blur: { opacity: 1, filter: "blur(0px)", scale: 1 },
      '3d': { opacity: 1, y: 0, rotateX: 0, scale: 1 },
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: variants.hidden[direction], visible: variants.visible[direction] }}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
      style={direction === '3d' ? { perspective: 1000 } : {}}
    >
      {children}
    </motion.div>
  );
}

// ─── STAGGER CONTAINER ───
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ANIMATED COUNTER ───
interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref} className={className}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── TEXT REVEAL ───
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{ 
              duration: 0.6, 
              delay: delay + i * 0.05, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

// ─── HOVER CARD ───
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -12, 
        scale: 1.01,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
      className={`relative group ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#E8761A]/20 via-[#F5A623]/10 to-[#E8761A]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      {children}
    </motion.div>
  );
}

// ─── MAGNETIC BUTTON ───
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * 0.2,
      y: (e.clientY - centerY) * 0.2
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      {children}
    </motion.button>
  );
}

// ─── IMAGE REVEAL ───
interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

export function ImageReveal({ src, alt, className = '', imageClassName = '' }: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#E8761A] to-[#F5A623] z-10"
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'right' }}
      />
      <motion.img
        src={src}
        alt={alt}
        className={imageClassName}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

// ─── CURSOR GLOW ───
export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-[9998] hidden lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(232, 118, 26, 0.08) 0%, transparent 70%)',
        left: position.x,
        top: position.y,
        x: '-50%',
        y: '-50%'
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// ─── SECTION INDICATOR ───
interface SectionIndicatorProps {
  sections: string[];
  activeSection: number;
}

export function SectionIndicator({ sections, activeSection }: SectionIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.button
          key={section}
          whileHover={{ x: 8 }}
          className="group flex items-center gap-3"
        >
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            activeSection === index ? 'text-[#E8761A] opacity-100' : 'text-[#0A1E3D]/40 opacity-0 group-hover:opacity-100'
          }`}>
            {section}
          </span>
          <motion.div 
            className={`rounded-full transition-all duration-300 ${
              activeSection === index ? 'bg-[#E8761A]' : 'bg-[#0A1E3D]/20 group-hover:bg-[#E8761A]/50'
            }`}
            animate={{ 
              width: activeSection === index ? 12 : 6,
              height: activeSection === index ? 12 : 6
            }}
          />
        </motion.button>
      ))}
    </div>
  );
}

// ─── SCROLL VELOCITY TEXT ───
interface ScrollVelocityTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

export function ScrollVelocityText({ children, baseVelocity = 5, className = '' }: ScrollVelocityTextProps) {
  const { scrollY } = useScroll();
  const [velocity, setVelocity] = useState(0);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const diff = latest - prevScrollY.current;
      setVelocity(diff * 0.1);
      prevScrollY.current = latest;
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.div
      className={className}
      animate={{ x: velocity * 10 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
