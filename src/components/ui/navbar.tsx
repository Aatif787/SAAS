"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageSquare, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Businesses", href: "#businesses" },
  { name: "Gallery", href: "/gallery" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

const businessLinks = [
  { name: "IMS Hospital", href: "/hospital" },
  { name: "IMS One Home Solution", href: "/ims-one-home-solution" },
  { name: "IMS UPVC Doors & Windows", href: "/upvc" },
  { name: "IMS Steel", href: "/ims-steel" },
  { name: "IMS Infra", href: "/about" },
  { name: "IMS Estate Empire", href: "/estate" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            {navLinks.map((link) => {
              if (link.name === "Our Businesses") {
                return (
                  <div 
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 hover:text-ims-red transition-colors cursor-pointer text-[11px] font-bold uppercase tracking-[0.2em] text-ims-blue/70">
                      {link.name}
                      <ChevronDown size={12} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-64 bg-white border border-ims-blue/5 shadow-xl py-3 z-[110] rounded-sm"
                        >
                          {businessLinks.map((bLink) => (
                            <Link
                              key={bLink.name}
                              href={bLink.href}
                              className="block px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-ims-blue/80 hover:text-ims-red hover:bg-ims-cream/50 transition-colors"
                            >
                              {bLink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-ims-red transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ims-red transition-all group-hover:w-full" />
                </Link>
              );
            })}
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
            <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] pr-2">
              {navLinks.map((link, index) => {
                if (link.name === "Our Businesses") {
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={link.name}
                      className="flex flex-col gap-3"
                    >
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between text-left text-4xl font-serif text-ims-blue hover:text-ims-red transition-colors w-full"
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={24} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col gap-3 pl-4 border-l-2 border-ims-red/30 overflow-hidden"
                          >
                            {businessLinks.map((bLink) => (
                              <Link
                                key={bLink.name}
                                href={bLink.href}
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsDropdownOpen(false);
                                }}
                                className="text-xl font-serif text-ims-blue/70 hover:text-ims-red transition-colors py-1"
                              >
                                {bLink.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }
                return (
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
                );
              })}
              <div className="mt-8 pt-8 border-t border-ims-blue/10 flex flex-col gap-6">
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
