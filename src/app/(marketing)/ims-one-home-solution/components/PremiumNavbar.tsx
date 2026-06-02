"use client";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/ims-one-home-solution/services' },
    { name: 'Process', href: '#process' },
    { name: 'Membership', href: '#membership' },
    { name: 'Projects', href: '/ims-one-home-solution/projects' },
    { name: 'About', href: '/ims-one-home-solution/about' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-700 ${
        isScrolled
          ? 'py-3 bg-[#FDFBF7]/95 backdrop-blur-2xl border-b border-[#E8761A]/10 shadow-2xl shadow-black/10'
          : 'py-8 bg-transparent'
      }`}>
        {/* Animated underline on scroll */}
        {isScrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E8761A]/30 to-transparent"
          />
        )}

        <div className="container-xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/ims-one-home-solution" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-gradient-to-br from-[#E8761A] to-[#C45D10] text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-[#E8761A]/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">I</span>
            </motion.div>
            <span
              className={`font-bold tracking-tight text-xl transition-colors duration-300 ${isScrolled ? 'text-[#0A1E3D]' : 'text-white'}`}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              IMS <span className="text-gradient-animate">ONE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`relative text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 group ${
                    isScrolled ? 'text-[#0A1E3D]/50 hover:text-[#E8761A]' : 'text-white/40 hover:text-[#E8761A]'
                  }`}
                >
                  {link.name}
                  {/* Underline animation */}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#E8761A] to-[#F5A623] group-hover:w-full transition-all duration-400" />
                </Link>
              </motion.div>
            ))}

            <Link href="/ims-one-home-solution/contact">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-[#E8761A]/20 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Inquire</span>
                <ArrowUpRight size={12} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`lg:hidden p-2 ${isScrolled ? 'text-[#0A1E3D]' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#FDFBF7] z-[210] flex flex-col justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute top-8 right-8 text-[#0A1E3D]/30 hover:text-[#E8761A] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </motion.button>

            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl md:text-5xl font-bold text-[#0A1E3D]/90 hover:text-[#E8761A] tracking-tight transition-colors duration-300 group relative"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#E8761A] to-[#F5A623] group-hover:w-full transition-all duration-500" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link
                  href="/ims-one-home-solution/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-8 px-16 py-6 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white rounded-xl font-bold text-lg shadow-2xl shadow-[#E8761A]/25 inline-block"
                  >
                    Book Consultation
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
