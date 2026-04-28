"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Businesses", href: "#businesses" },
  { name: "Gallery", href: "/gallery" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-ims-blue/5" 
          : "bg-transparent py-6"
      }`}>
        <div className="container-xl flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-3xl font-serif font-bold text-ims-blue tracking-tighter leading-none">
              IMS <span className="text-ims-red italic">GROUP</span>
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-ims-blue/60 ml-1">
              Building Trust
            </span>
          </Link>
          
          <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-ims-blue/70 lg:flex">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-ims-red transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ims-red transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-4 text-ims-blue font-bold">
               <div className="w-10 h-10 rounded-full border border-ims-blue/10 flex items-center justify-center text-ims-red">
                  <Phone size={16} />
               </div>
               <span className="text-sm tracking-widest">9699858212</span>
            </div>

            <a 
              href="https://wa.me/919699858212" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 rounded-sm bg-ims-red px-6 py-3 text-[11px] font-bold text-white uppercase tracking-widest hover:bg-ims-blue transition-all active:scale-95 shadow-lg shadow-ims-red/20"
            >
              <MessageSquare size={16} /> WhatsApp
            </a>
            
            {/* Mobile Toggle */}
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-ims-blue text-white lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ims-cream pt-32 px-8 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif text-ims-blue hover:text-ims-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-12 pt-12 border-t border-ims-blue/10 flex flex-col gap-6">
                <a href="tel:+919699858212" className="flex items-center gap-4 text-2xl font-serif text-ims-blue">
                   <Phone size={24} className="text-ims-red" /> 9699858212
                </a>
                <a href="https://wa.me/919699858212" className="btn-premium w-full justify-center">
                   <MessageSquare size={20} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
