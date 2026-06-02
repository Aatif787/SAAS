"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Hexagon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { steelAudio } from "./steel-audio-engine";

const navLinks = [
  { name: "Architectural Systems", href: "#systems" },
  { name: "Dimensional Story", href: "#story" },
  { name: "AI Engineering", href: "#ai" },
  { name: "Global Deployments", href: "#projects" },
];

export default function SteelNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-700 ${
        isScrolled ? "bg-[#050505]/80 py-4 backdrop-blur-2xl shadow-[0_10px_40px_rgba(5,5,5,0.8)] border-b border-[#D9D9D9]/10" : "bg-transparent py-8"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-10 xl:px-14">
        {/* Logo */}
        <Link
          href="/ims-steel"
          onMouseEnter={() => steelAudio.playHover()}
          className="group flex items-center gap-4"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF6B1A]/30 bg-[#FF6B1A]/10 text-[#FF6B1A] transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:bg-[#FF6B1A] group-hover:text-[#050505] group-hover:shadow-[0_0_20px_rgba(255,107,26,0.5)]">
            <Hexagon size={24} className="absolute" />
            <span className="text-[10px] font-black tracking-tighter">IMS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-[-0.04em] text-[#F5F5F5]">STEEL</span>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#00C853]">OS // VERSION 9.0</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => steelAudio.playHover()}
              className="group relative text-xs font-bold uppercase tracking-[0.2em] text-[#9A9A9A] transition-colors hover:text-[#F5F5F5]"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#FF6B1A] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(255,107,26,0.5)]" />
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/ims-steel/contact"
            onMouseEnter={() => steelAudio.playHover()}
            onClick={() => steelAudio.playClick()}
            className="group flex items-center gap-3 rounded-full border border-[#00C853]/30 bg-[#050505] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00C853] transition-all hover:bg-[#00C853] hover:text-[#050505] hover:shadow-[0_0_25px_rgba(0,200,83,0.4)]"
          >
            Initiate Link <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D9D9D9]/20 bg-[#111111] text-[#F5F5F5] lg:hidden"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            steelAudio.playClick();
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full border-b border-[#D9D9D9]/10 bg-[#050505]/95 p-6 backdrop-blur-2xl lg:hidden shadow-[0_20px_40px_rgba(5,5,5,0.8)]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-[0.1em] text-[#F5F5F5]"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/ims-steel/contact"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B1A] py-4 text-xs font-bold uppercase tracking-widest text-[#050505]"
              >
                Initiate Link
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
