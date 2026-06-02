"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';

const projects = [
  { id: 1, title: "Palatial Residence", location: "Gomti Nagar, Lucknow", category: "Mansion", image: "/images/projects/palatial-residence.png", description: "A sprawling 10,000 sq ft luxury mansion featuring classical architecture with modern amenities.", features: ["Smart Home Automation", "Home Theater", "Wine Cellar", "Infinity Pool"], area: "10,000 sq ft", year: "2024" },
  { id: 2, title: "Modern Apartment Complex", location: "Hazratganj, Lucknow", category: "Apartments", image: "/images/projects/modern-apartment.png", description: "Contemporary high-rise apartments with premium finishes and smart building technology.", features: ["24/7 Concierge", "Fitness Center", "Rooftop Garden", "EV Charging"], area: "2,500 sq ft", year: "2024" },
  { id: 3, title: "Smart Villa Retreat", location: "Gomti Nagar Extension, Lucknow", category: "Smart Home", image: "/images/projects/smart-villa.png", description: "Fully automated luxury villa with AI-powered home management systems.", features: ["Voice Control", "Energy Management", "Security System", "Automated Lighting"], area: "6,500 sq ft", year: "2023" },
  { id: 4, title: "Gourmet Kitchen Transformation", location: "Aliganj, Lucknow", category: "Kitchen", image: "/images/projects/gourmet-kitchen.png", description: "Luxury kitchen remodel featuring Italian marble, custom cabinetry, and professional-grade appliances.", features: ["Custom Cabinetry", "Professional Appliances", "Quartz Countertops", "Smart Storage"], area: "800 sq ft", year: "2024" },
];

const categories = ["All", "Mansion", "Apartments", "Smart Home", "Kitchen"];

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section ref={containerRef} className="py-28 relative overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#E8761A] to-transparent rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none"
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block"
          >
            Our Portfolio
          </motion.span>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              className="text-4xl md:text-7xl font-bold text-[#0A1E3D] tracking-tight"
            >
              Our Luxury{" "}
              <span className="text-gradient-animate">Portfolio</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-[#0A1E3D]/40 max-w-2xl mx-auto"
          >
            Explore our collection of exceptional residential projects showcasing our commitment to luxury, innovation, and craftsmanship.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-400 overflow-hidden ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white shadow-lg shadow-[#E8761A]/25'
                  : 'bg-[#0A1E3D]/5 text-[#0A1E3D]/50 hover:bg-[#E8761A]/10 hover:text-[#0A1E3D] border border-[#0A1E3D]/8'
              }`}
            >
              {activeFilter === cat && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine" />
              )}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Link href="/ims-one-home-solution/projects" className="group block relative w-full aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer shadow-2xl shadow-[#0A1E3D]/10">
            <Image
              src="/images/projects/featured-project.png"
              alt="Featured Project"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E3D]/60 to-transparent" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8761A]/0 to-[#E8761A]/0 group-hover:from-[#E8761A]/10 group-hover:to-transparent transition-all duration-700" />

            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-[#E8761A]/0 group-hover:border-[#E8761A]/30 transition-colors duration-700" />

            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white text-[9px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5"
                >
                  <Sparkles size={10} /> Featured
                </motion.span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-[9px] font-bold uppercase tracking-widest rounded-full">Estate</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight group-hover:text-[#F5A623] transition-colors duration-500" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                The Grand Estate
              </h3>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                <MapPin size={14} /><span>Gomti Nagar, Lucknow</span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8761A]">View Project</span>
                <ArrowUpRight size={16} className="text-[#E8761A]" />
              </motion.div>
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#E8761A] to-[#F5A623]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </Link>
        </motion.div>

        {/* Project Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Link href="/ims-one-home-solution/projects" className="block relative rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-[#0A1E3D]/5">
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-115"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3D] via-[#0A1E3D]/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#E8761A]/0 group-hover:bg-[#E8761A]/10 transition-colors duration-700" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#0A1E3D] text-[9px] font-bold uppercase tracking-widest rounded-lg">
                    {project.category}
                  </div>

                  {/* Arrow button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-[#E8761A] to-[#F5A623] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"
                  >
                    <ArrowUpRight size={18} className="text-white" />
                  </motion.div>
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#F5A623] transition-colors duration-400">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
                    <MapPin size={12} /><span>{project.location}</span>
                  </div>
                  <p className="text-white/40 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white/70 text-[10px] font-medium rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{project.area}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8761A]/60">{project.year}</span>
                  </div>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#E8761A] to-[#F5A623]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/ims-one-home-solution/projects">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="relative group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#E8761A] to-[#F5A623] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#E8761A]/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">View All Projects</span>
              <ArrowUpRight size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
