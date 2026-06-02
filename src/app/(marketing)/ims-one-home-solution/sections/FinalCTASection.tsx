"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Calendar, MessageSquare } from 'lucide-react';

const ctaOptions = [
  {
    icon: Calendar,
    title: "Book a Free Assessment",
    body: "Our expert visits your home, evaluates all systems, and presents a personalised plan — completely free.",
    cta: "Schedule Now",
    href: "/ims-one-home-solution/contact",
    primary: true,
  },
  {
    icon: Phone,
    title: "Call Our Concierge",
    body: "Speak directly with a home expert. Available 24/7 for Premium members, 9AM–9PM for all others.",
    cta: "+91 9699858212",
    href: "tel:+919699858212",
    primary: false,
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Us",
    body: "Send photos, describe your issue, and get an expert response within 15 minutes during business hours.",
    cta: "Chat Now",
    href: "https://wa.me/919699858212",
    primary: false,
  },
];

export default function FinalCTASection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={containerRef} className="relative py-0 overflow-hidden">
      {/* Full-bleed background image */}
      <div className="relative min-h-[90vh] flex items-center">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
          <Image
            src="/images/one-home/hero.png"
            alt="IMS One Home"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E3D]/95 via-[#0A1E3D]/80 to-[#0A1E3D]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-transparent to-[#0A1E3D]/30" />
        </motion.div>

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#E8761A] rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}

        <div className="relative z-10 container-xl py-32">
          <div className="max-w-3xl mb-20">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-6 block"
            >
              Begin Your Journey
            </motion.span>

            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
              >
                Your Dream Home <br />
                <span className="text-gradient-animate">Awaits.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white/60 text-xl leading-relaxed max-w-2xl"
            >
              Join 5,000+ families who have trusted IMS One Home to transform, manage, and elevate their most important asset. The first step is a conversation.
            </motion.p>
          </div>

          {/* CTA Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {ctaOptions.map((option, i) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60, scale: 0.93 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <Link href={option.href}>
                    <motion.div
                      whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                      className={`relative p-8 rounded-2xl overflow-hidden cursor-pointer h-full ${
                        option.primary
                          ? 'bg-gradient-to-br from-[#E8761A] to-[#F5A623] shadow-2xl shadow-[#E8761A]/40'
                          : 'bg-white/8 backdrop-blur-md border border-white/15 hover:border-[#E8761A]/40'
                      }`}
                    >
                      {/* Shine */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Glow for non-primary */}
                      {!option.primary && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#E8761A]/0 via-[#E8761A]/15 to-[#E8761A]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
                      )}

                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                          option.primary ? 'bg-white/20 text-white' : 'bg-[#E8761A]/20 text-[#E8761A] group-hover:bg-[#E8761A] group-hover:text-white'
                        } transition-all duration-400`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>

                      <h3 className={`text-xl font-bold mb-3 ${option.primary ? 'text-white' : 'text-white group-hover:text-[#F5A623]'} transition-colors duration-300`}>
                        {option.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${option.primary ? 'text-white/80' : 'text-white/50 group-hover:text-white/70'} transition-colors duration-300`}>
                        {option.body}
                      </p>

                      <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest ${
                        option.primary ? 'text-white' : 'text-[#E8761A]'
                      }`}>
                        {option.cta}
                        <motion.div
                          whileHover={{ x: 4 }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            option.primary ? 'bg-white/20' : 'bg-[#E8761A]/20 group-hover:bg-[#E8761A]'
                          } transition-all duration-300`}
                        >
                          <ArrowRight size={12} className={option.primary ? 'text-white' : 'text-[#E8761A] group-hover:text-white'} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 flex flex-wrap gap-8 items-center"
          >
            {[
              "✓ No commitment required",
              "✓ Free home assessment",
              "✓ Response within 2 hours",
              "✓ Fully insured service",
            ].map((badge) => (
              <span key={badge} className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
