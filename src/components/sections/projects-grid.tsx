"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { title: "Quantum Nexus", category: "SaaS Platform", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200", link: "/projects/quantum-nexus" },
  { title: "Vivid Studio", category: "Design Agency", image: "https://images.unsplash.com/photo-1522542550221-31fd19705268?w=1200", link: "/projects/vivid-studio" },
  { title: "EcoFlow", category: "E-commerce", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200", link: "/projects/ecoflow" },
  { title: "Pulse AI", category: "Tech Startup", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200", link: "/projects/pulse-ai" },
  { title: "Aether Labs", category: "Web3/Blockchain", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200", link: "/projects/aether-labs" },
  { title: "Solaris", category: "Green Energy", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200", link: "/projects/solaris" },
  { title: "Nova Health", category: "Healthcare", image: "https://images.unsplash.com/photo-1538108149393-fdfd8169143a?w=1200", link: "/projects/nova-health" },
  { title: "Drift Racing", category: "Automotive", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200", link: "/projects/drift-racing" },
  { title: "Peak Fitness", category: "Sports", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200", link: "/projects/peak-fitness" },
  { title: "ArchiBuild", category: "Architecture", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200", link: "/projects/archibuild" },
  { title: "Lumina", category: "Lighting Design", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200", link: "/projects/lumina" },
  { title: "Velvet Dine", category: "Restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?w=1200", link: "/projects/velvet-dine" },
  { title: "Cloud Peak", category: "SaaS", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200", link: "/projects/cloud-peak" },
  { title: "Urban Living", category: "Real Estate", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200", link: "/projects/urban-living" },
  { title: "Byte Tech", category: "Software", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200", link: "/projects/byte-tech" },
  { title: "Oceanic", category: "Marine Tech", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200", link: "/projects/oceanic" },
  { title: "Skyline", category: "Construction", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200", link: "/projects/skyline" },
  { title: "Motive AI", category: "Automation", image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=1200", link: "/projects/motive-ai" },
  { title: "Glow Skin", category: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200", link: "/projects/glow-skin" },
  { title: "Next Gear", category: "Consulting", image: "https://images.unsplash.com/photo-1454165833762-b201c0029f8a?w=1200", link: "/projects/next-gear" }
];

export default function ProjectsGrid() {
  return (
    <section id="projects" className="section-pad">
      <div className="container-xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row text-center md:text-left">
           <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold md:text-5xl lg:text-6xl"
              >
                Featured <span className="text-gradient-gold">Projects</span>
              </motion.h2>
              <p className="mt-4 text-white/60">Selected works that define our technical capabilities.</p>
           </div>
           <Link href="/projects" className="group flex items-center gap-2 font-bold text-lime">
              View All Work <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
           </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[400px] overflow-hidden rounded-[2.5rem] border border-white/10"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                   <p className="text-xs font-bold uppercase tracking-widest text-lime">{project.category}</p>
                   <h3 className="mt-2 text-3xl font-bold">{project.title}</h3>
                   <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Link href={project.link} className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-black">
                      Case Study <ArrowUpRight size={18} />
                   </Link>
                   </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold transition-all hover:bg-white/10">
              View Template Gallery
           </Link>
        </div>
      </div>
    </section>
  );
}
