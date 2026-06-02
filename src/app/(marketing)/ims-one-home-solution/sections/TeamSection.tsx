"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const team = [
  {
    name: "Arjun Malhotra",
    role: "Founder & CEO",
    expertise: "25 years in luxury real estate & construction",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    quote: "We don't build houses. We engineer legacies.",
    credentials: ["IIT Roorkee", "Harvard Business School", "RICS Certified"],
  },
  {
    name: "Priya Nair",
    role: "Chief Design Officer",
    expertise: "Award-winning interior architect with global portfolio",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    quote: "Every space should tell the story of the person who lives in it.",
    credentials: ["NID Ahmedabad", "Parsons NYC", "IGBC Green Fellow"],
  },
  {
    name: "Vikram Singh",
    role: "Head of Smart Systems",
    expertise: "Pioneer in residential IoT and AI home automation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    quote: "The smartest home is one you never have to think about.",
    credentials: ["IIT Delhi", "CEDIA Certified", "KNX Expert"],
  },
  {
    name: "Meera Kapoor",
    role: "Director of Client Experience",
    expertise: "Former Oberoi Hotels concierge operations lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    quote: "Luxury is not a price point. It's a feeling of being truly cared for.",
    credentials: ["IHM Mumbai", "Cornell Hospitality", "Six Sigma Black Belt"],
  },
];

export default function TeamSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section ref={containerRef} className="py-36 bg-[#0A1E3D] relative overflow-hidden">
      {/* Background orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.12 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E8761A] to-transparent rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.08 } : {}}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#F5A623] to-transparent rounded-full blur-[120px] -translate-x-1/3 translate-y-1/4 pointer-events-none"
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            The Minds Behind IMS
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter"
            >
              Meet the{" "}
              <span className="text-gradient-animate">Visionaries</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/40 text-lg max-w-2xl mx-auto mt-6"
          >
            World-class expertise, united by one obsession — creating homes that transcend the ordinary.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, scale: 0.92 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -12, transition: { duration: 0.4 } }}
                className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/4 backdrop-blur-sm"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/20 to-transparent" />

                  {/* Hover overlay with quote */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E8761A]/90 via-[#E8761A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white font-medium italic text-sm leading-relaxed">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>

                  {/* Social icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#E8761A] transition-colors duration-300"
                    >
                      <LinkedinIcon size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#E8761A] transition-colors duration-300"
                    >
                      <Mail size={14} />
                    </motion.button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#F5A623] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#E8761A] text-xs font-bold uppercase tracking-widest mb-3">
                    {member.role}
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed mb-4">
                    {member.expertise}
                  </p>

                  {/* Credentials */}
                  <div className="flex flex-wrap gap-1.5">
                    {member.credentials.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-1 bg-white/8 text-white/40 text-[9px] font-bold uppercase tracking-wider rounded-md group-hover:bg-[#E8761A]/20 group-hover:text-[#E8761A] transition-all duration-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#E8761A] to-[#F5A623]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Join team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-white/30 text-sm mb-6">
            We're always looking for exceptional talent to join our mission.
          </p>
          <motion.a
            href="/ims-one-home-solution/contact"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:border-[#E8761A] hover:text-[#E8761A] transition-all duration-400 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#E8761A]/0 group-hover:bg-[#E8761A]/10 transition-colors duration-400" />
            <span className="relative z-10">Join Our Team</span>
            <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
