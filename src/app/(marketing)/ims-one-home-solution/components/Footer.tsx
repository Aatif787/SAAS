"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const footerLinks = {
  Solutions: [
    { label: "Membership Plans", href: "/ims-one-home-solution/services" },
    { label: "Home Assessment", href: "/ims-one-home-solution/services" },
    { label: "Interior Design", href: "/ims-one-home-solution/services" },
    { label: "Smart Automation", href: "/ims-one-home-solution/services" },
    { label: "Construction", href: "/ims-one-home-solution/services" },
  ],
  Company: [
    { label: "About IMS Group", href: "/ims-one-home-solution/about" },
    { label: "Our Legacy", href: "/ims-one-home-solution/about" },
    { label: "Projects", href: "/ims-one-home-solution/projects" },
    { label: "Contact Us", href: "/ims-one-home-solution/contact" },
  ],
};

const contactInfo = [
  { label: "Address", value: "IMS Tower, Gomti Nagar, Lucknow" },
  { label: "Email", value: "solutions@imsonehome.com" },
  { label: "Phone", value: "+91 9699858212" },
];

export default function Footer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <footer ref={containerRef} className="relative py-20 bg-[#0A1E3D] overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.08, scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-10 left-10 w-64 h-64 bg-[#E8761A] rounded-full blur-[100px] animate-float-gentle"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.05, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-10 right-10 w-48 h-48 bg-[#F5A623] rounded-full blur-[80px] animate-float-rotate"
      />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E8761A]/30 to-transparent" />

      <div className="relative container-xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <Link href="/ims-one-home-solution" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-[#E8761A] to-[#C45D10] rounded-lg flex items-center justify-center shadow-lg shadow-[#E8761A]/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="text-xl font-bold text-white relative z-10">I</span>
              </motion.div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                IMS <span className="text-gradient-animate">ONE</span>
              </h3>
            </Link>
            <p className="text-sm text-white/30 leading-relaxed">
              Redefining luxury living through seamless home management and world-class design.
            </p>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + sectionIndex * 0.1 }}
            >
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-[#E8761A] mb-8">
                {section}
              </h4>
              <ul className="space-y-4">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + sectionIndex * 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/35 hover:text-[#E8761A] transition-colors duration-300 group flex items-center gap-2"
                    >
                      <span className="w-0 h-px bg-[#E8761A] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-[#E8761A] mb-8">
              Get in Touch
            </h4>
            <ul className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.li
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex flex-col gap-1 group"
                >
                  <span className="text-white/20 text-[9px] uppercase tracking-[0.2em]">{info.label}</span>
                  <span className="text-white/60 text-sm group-hover:text-[#E8761A] transition-colors duration-300">
                    {info.value}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 pt-10 border-t border-[#E8761A]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-medium uppercase tracking-[0.3em] text-white/20"
        >
          <p>&copy; 2024 IMS ONE HOME SOLUTION. PART OF IMS GROUP.</p>
          <div className="flex gap-10">
            {["Privacy", "Terms"].map((item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-[#E8761A] transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E8761A] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
