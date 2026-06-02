"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<'default' | 'link' | 'button' | 'text' | 'image'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Main dot — instant
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  // Ring — smooth lag
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // Trail — very slow
  const trailX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const trailY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const leave = () => setIsVisible(false);

    const handleEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const role = el.getAttribute('role');
      const cursorLabel = el.getAttribute('data-cursor');

      if (cursorLabel) setLabel(cursorLabel);
      else setLabel('');

      if (tag === 'a' || role === 'link') setHoverType('link');
      else if (tag === 'button' || role === 'button') setHoverType('button');
      else if (tag === 'img' || el.classList.contains('cursor-image')) setHoverType('image');
      else setHoverType('text');
    };

    const handleLeave = () => {
      setHoverType('default');
      setLabel('');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);

    const targets = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [mouseX, mouseY]);

  const isHovering = hoverType !== 'default';

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        .ims-one-theme * { cursor: none !important; }
      `}</style>

      {/* Trail blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 120 : 80,
          height: isHovering ? 120 : 80,
          background: `radial-gradient(circle, rgba(232,118,26,0.12) 0%, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.4s ease, height 0.4s ease, opacity 0.3s ease',
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          borderColor: hoverType === 'button' ? '#E8761A' : hoverType === 'link' ? '#2D6A4F' : 'rgba(232,118,26,0.4)',
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, opacity 0.3s ease',
          backdropFilter: isHovering ? 'blur(2px)' : 'none',
          background: isHovering ? (hoverType === 'button' ? 'rgba(232,118,26,0.08)' : 'rgba(45,106,79,0.08)') : 'transparent',
        }}
      >
        {/* Label inside ring */}
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase tracking-widest text-[#E8761A] whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          background: hoverType === 'link' ? '#2D6A4F' : '#E8761A',
          boxShadow: `0 0 ${isHovering ? 20 : 10}px ${hoverType === 'link' ? '#2D6A4F' : '#E8761A'}`,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
        }}
      />

      {/* Click ripple effect */}
      <ClickRipple mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

// Click ripple
function ClickRipple({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = () => {
      const id = Date.now();
      setRipples(prev => [...prev, { id, x: mouseX.get(), y: mouseY.get() }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [mouseX, mouseY]);

  return (
    <>
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 pointer-events-none z-[9994] rounded-full border-2 border-[#E8761A]"
          style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}
