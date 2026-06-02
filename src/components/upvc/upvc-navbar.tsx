"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const navLinks = [
  { name: "Home", href: "/upvc" },
  { name: "Products", href: "/upvc/products" },
  { name: "Gallery", href: "/upvc/gallery" },
  { name: "Projects", href: "/upvc/projects" },
  { name: "About", href: "/upvc/about" },
  { name: "Contact", href: "/upvc/contact" },
];

// Custom cursor component
function UPVCCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let outerX = 0, outerY = 0;
    let targetX = 0, targetY = 0;

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }
    };

    const raf = () => {
      outerX += (targetX - outerX) * 0.12;
      outerY += (targetY - outerY) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = `${outerX}px`;
        outerRef.current.style.top = `${outerY}px`;
      }
      requestAnimationFrame(raf);
    };

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);
    const handleLeaveDoc = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", handleLeaveDoc);
    requestAnimationFrame(raf);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", handleLeaveDoc);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lagged */}
      <div
        ref={outerRef}
        className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
        style={{
          width: hovered ? 80 : 40,
          height: hovered ? 80 : 40,
          border: "1px solid rgba(0,194,255,0.6)",
          background: hovered ? "rgba(0,194,255,0.1)" : "transparent",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Inner dot — instant */}
      <div
        ref={innerRef}
        className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "#00C2FF",
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 10px #00C2FF",
        }}
      />
    </>
  );
}

export default function UPVCNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    // Live time
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    tick();
    const timer = setInterval(tick, 1000);

    // GSAP entrance
    gsap.from(navRef.current, { y: -80, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.3 });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <UPVCCursor />

      <nav
        ref={navRef}
        className="fixed top-0 z-[200] w-full transition-all duration-700"
        style={{
          background: scrolled ? "rgba(4,8,16,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,194,255,0.12)" : "none",
          padding: scrolled ? "12px 0" : "24px 0",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/upvc" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center"
              style={{ border: "1px solid rgba(0,194,255,0.4)", borderRadius: 8 }}>
              <span className="text-[#00C2FF] font-black text-xs tracking-widest">IMS</span>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "rgba(0,194,255,0.1)", boxShadow: "0 0 20px rgba(0,194,255,0.3)" }} />
            </div>
            <div>
              <div className="text-[#E8F4FF] font-bold text-lg tracking-tight leading-none">UPVC</div>
              <div className="text-[8px] font-bold uppercase tracking-[0.4em] mt-0.5" style={{ color: "rgba(0,194,255,0.6)" }}>
                Doors & Windows
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group"
                  style={{ color: isActive ? "#00C2FF" : "rgba(232,244,255,0.5)" }}
                >
                  <span className="relative z-10 group-hover:text-[#E8F4FF] transition-colors">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="upvc-nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.2)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-4/5 transition-all duration-300"
                    style={{ background: "#00C2FF" }} />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Live time */}
            <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono"
              style={{ color: "rgba(0,194,255,0.5)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "#00C2FF" }} />
              Lucknow · {time} IST
            </div>

            <Link
              href="/upvc/get-quote"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] btn-ember"
            >
              Get Quote <ArrowRight size={12} />
            </Link>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden transition-all"
              style={{ border: "1px solid rgba(0,194,255,0.3)", color: "#E8F4FF" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[190] flex flex-col justify-center px-12"
            style={{ background: "#040810" }}
          >
            <button className="absolute top-8 right-8" style={{ color: "rgba(232,244,255,0.4)" }}
              onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}
                    className="block text-5xl font-bold tracking-tight transition-colors"
                    style={{ color: pathname === link.href ? "#00C2FF" : "rgba(232,244,255,0.3)" }}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(0,194,255,0.15)" }}>
                <Link href="/upvc/get-quote" onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest btn-ember">
                  Get Free Quote <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
