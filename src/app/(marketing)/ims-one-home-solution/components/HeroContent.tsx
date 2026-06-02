"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import Link from 'next/link';

/* ─── MAGNETIC HOOK ─── */
function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left - r.width / 2) * strength);
      y.set((e.clientY - r.top - r.height / 2) * strength);
    };
    const reset = () => { x.set(0); y.set(0); };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); };
  }, [x, y, strength]);
  return { ref, sx, sy };
}

/* ─── CURSOR FOLLOWER (local to hero) ─── */
function HeroCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const trailX = useSpring(x, { stiffness: 80, damping: 20 });
  const trailY = useSpring(y, { stiffness: 80, damping: 20 });
  const [hovered, setHovered] = useState<'absolute' | 'excellence' | 'btn' | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  // expose setter so heading chars can trigger it
  useEffect(() => {
    (window as any).__setHeroCursor = setHovered;
    return () => { delete (window as any).__setHeroCursor; };
  }, []);

  const size = hovered === 'absolute' ? 90 : hovered === 'excellence' ? 80 : hovered === 'btn' ? 60 : 16;
  const bg =
    hovered === 'absolute' ? 'rgba(45,106,79,0.18)' :
    hovered === 'excellence' ? 'rgba(232,118,26,0.18)' :
    hovered === 'btn' ? 'rgba(232,118,26,0.25)' :
    'rgba(232,118,26,0.9)';
  const border =
    hovered === 'absolute' ? '#52B788' :
    hovered === 'excellence' ? '#E8761A' :
    hovered === 'btn' ? '#E8761A' :
    'transparent';

  return (
    <>
      {/* Trail blob */}
      <motion.div className="fixed pointer-events-none z-[9990] rounded-full"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%',
          width: size * 2.5, height: size * 2.5,
          background: hovered === 'absolute'
            ? 'radial-gradient(circle, rgba(45,106,79,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,118,26,0.10) 0%, transparent 70%)',
          transition: 'width 0.5s ease, height 0.5s ease',
        }}
      />
      {/* Ring */}
      <motion.div className="fixed pointer-events-none z-[9995] rounded-full flex items-center justify-center"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%',
          width: size, height: size,
          border: `1.5px solid ${border}`,
          background: bg,
          backdropFilter: hovered ? 'blur(4px)' : 'none',
          transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {hovered === 'absolute' && (
          <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-black uppercase tracking-widest text-[#52B788] select-none">
            Luxury
          </motion.span>
        )}
        {hovered === 'excellence' && (
          <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-black uppercase tracking-widest text-[#E8761A] select-none">
            Explore
          </motion.span>
        )}
      </motion.div>
      {/* Dot */}
      <motion.div className="fixed pointer-events-none z-[9999] rounded-full"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%',
          width: hovered ? 5 : 8, height: hovered ? 5 : 8,
          background: hovered === 'absolute' ? '#52B788' : '#E8761A',
          boxShadow: `0 0 ${hovered ? 16 : 8}px ${hovered === 'absolute' ? '#52B788' : '#E8761A'}`,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.3s ease',
        }}
      />
    </>
  );
}

/* ─── CHAR with ultra hover ─── */
function HoverChar({ char, index, total, type }: {
  char: string; index: number; total: number;
  type: 'absolute' | 'excellence';
}) {
  const [hovered, setHovered] = useState(false);
  const [exploded, setExploded] = useState(false);
  const isSpace = char === ' ';

  const onEnter = useCallback(() => {
    setHovered(true);
    (window as any).__setHeroCursor?.(type);
  }, [type]);

  const onLeave = useCallback(() => {
    setHovered(false);
    (window as any).__setHeroCursor?.(null);
  }, []);

  const onClick = useCallback(() => {
    setExploded(true);
    setTimeout(() => setExploded(false), 700);
  }, []);

  if (isSpace) return <span className="inline-block w-[0.3em]" />;

  const greenGrad = 'linear-gradient(135deg, #2D6A4F 0%, #40916C 40%, #74C69D 70%, #2D6A4F 100%)';
  const goldGrad  = 'linear-gradient(135deg, #E8761A 0%, #F5A623 40%, #FBBF24 70%, #E8761A 100%)';

  return (
    <motion.span
      className="relative inline-block cursor-none select-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      animate={hovered ? {
        y: type === 'absolute' ? -14 : -10,
        scale: 1.18,
        rotate: type === 'absolute' ? (index % 2 === 0 ? -4 : 4) : (index % 2 === 0 ? -3 : 3),
        filter: `drop-shadow(0 0 20px ${type === 'absolute' ? '#52B788' : '#E8761A'})`,
      } : { y: 0, scale: 1, rotate: 0, filter: 'drop-shadow(0 0 0px transparent)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      style={{
        background: type === 'absolute' ? greenGrad : goldGrad,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundPosition: hovered ? '100% center' : '0% center',
        transition: 'background-position 0.4s ease',
        display: 'inline-block',
      }}
    >
      {char}

      {/* Underline glow */}
      <motion.span
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ background: type === 'absolute' ? '#52B788' : '#E8761A' }}
        animate={{ width: hovered ? '100%' : '0%', opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Particle burst on click */}
      <AnimatePresence>
        {exploded && [...Array(8)].map((_, i) => {
          const angle = (i / 8) * 360;
          const dist = 30 + Math.random() * 20;
          return (
            <motion.span key={i}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{ background: type === 'absolute' ? '#52B788' : '#E8761A' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * dist,
                y: Math.sin((angle * Math.PI) / 180) * dist,
                opacity: 0, scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          );
        })}
      </AnimatePresence>

      {/* Ripple on hover */}
      {hovered && (
        <motion.span
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{ border: `1px solid ${type === 'absolute' ? '#52B78840' : '#E8761A40'}` }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </motion.span>
  );
}

/* ─── WORD with stagger hover ─── */
function HoverWord({ word, type, entryDelay }: {
  word: string; type: 'absolute' | 'excellence'; entryDelay: number;
}) {
  const chars = word.split('');
  return (
    <span className="inline-block">
      {chars.map((ch, i) => (
        <span key={i} className="inline-block overflow-visible">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: type === 'absolute' ? 5 : -4, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: entryDelay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >
            <HoverChar char={ch} index={i} total={chars.length} type={type} />
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── MAIN EXPORT ─── */
export default function HeroContent() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cta1 = useMagnetic(0.35);
  const cta2 = useMagnetic(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(subtitleRef.current, { y: 40, opacity: 0, duration: 1.1, delay: 1.0, ease: 'power4.out' });
      gsap.from(ctaRef.current?.children || [], { y: 30, opacity: 0, stagger: 0.15, duration: 1, delay: 1.2, ease: 'power4.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <HeroCursor />

      <div className="relative z-30 container-xl h-full flex flex-col justify-center items-start pt-20">
        <div className="max-w-5xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.div animate={{ width: [12, 52, 12] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="h-px bg-gradient-to-r from-[#E8761A] to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.55em] text-[#E8761A]">Privileged Living</span>
            <motion.div animate={{ width: [12, 52, 12] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="h-px bg-gradient-to-l from-[#E8761A] to-transparent" />
          </motion.div>

          {/* ═══ HEADING ═══ */}
          <h1
            style={{ fontFamily: 'var(--font-playfair), serif' }}
            className="text-5xl sm:text-7xl md:text-[7.5rem] font-bold tracking-tight leading-[0.92] mb-8"
          >
            {/* "Absolute" — forest green, char-by-char hover */}
            <span className="block overflow-visible mb-2">
              <HoverWord word="Absolute" type="absolute" entryDelay={0.2} />
            </span>

            {/* "Excellence." — gold, char-by-char hover */}
            <span className="block overflow-visible">
              <HoverWord word="Excellence." type="excellence" entryDelay={0.45} />
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg md:text-xl text-white/65 max-w-2xl font-medium leading-relaxed mb-14">
            We architect, build, and manage the world&apos;s most sophisticated residences.
            Every detail curated. Every moment elevated.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Primary — magnetic */}
            <motion.div ref={cta1.ref} style={{ x: cta1.sx, y: cta1.sy }}
              onMouseEnter={() => (window as any).__setHeroCursor?.('btn')}
              onMouseLeave={() => (window as any).__setHeroCursor?.(null)}
            >
              <Link href="/ims-one-home-solution/contact">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white rounded-xl font-bold text-xs uppercase tracking-[0.22em] flex items-center gap-3 shadow-2xl shadow-[#E8761A]/40 overflow-hidden cursor-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <motion.div className="absolute inset-0 rounded-xl"
                    animate={{ boxShadow: ['0 0 0px rgba(232,118,26,0)', '0 0 35px rgba(232,118,26,0.6)', '0 0 0px rgba(232,118,26,0)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }} />
                  <span className="relative z-10">Explore Estates</span>
                  <motion.div className="relative z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Play — magnetic */}
            <motion.div ref={cta2.ref} style={{ x: cta2.sx, y: cta2.sy }}
              className="flex items-center gap-4 group cursor-none"
              onMouseEnter={() => (window as any).__setHeroCursor?.('btn')}
              onMouseLeave={() => (window as any).__setHeroCursor?.(null)}
            >
              <div className="relative">
                <motion.div className="absolute inset-0 rounded-full border border-white/20"
                  animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
                <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
                  className="relative w-14 h-14 rounded-full border border-white/25 flex items-center justify-center group-hover:border-[#E8761A] transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8761A] to-[#F5A623] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
                  <Play size={18} className="fill-white text-white ml-0.5 relative z-10" />
                </motion.div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/45 group-hover:text-[#E8761A] transition-colors duration-300">
                Watch Film
              </span>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-20 flex items-center gap-3">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown size={16} className="text-white/30" />
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/25">Scroll to Discover</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
