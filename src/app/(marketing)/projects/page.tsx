"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectsGrid from "@/components/sections/projects-grid";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="bg-mesh min-h-screen pt-20">
      <section className="section-pad">
        <div className="container-xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-3xl"
           >
              <h1 className="text-5xl font-bold md:text-7xl">
                Built for <br />
                <span className="text-gradient-gold">Impact.</span>
              </h1>
              <p className="mt-8 text-xl text-white/60 leading-relaxed">
                We take pride in our work. Each project is a testament to our 
                commitment to excellence, technical precision, and user-centric design.
              </p>
           </motion.div>

           <div className="mt-20">
              <ProjectsGrid />
           </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 bg-black/60 border-y border-white/5">
         <div className="container-xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Web Apps Built", value: "45+" },
              { label: "Successful SEO", value: "120+" },
              { label: "Countries Served", value: "15" },
              { label: "Happy Clients", value: "200+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                 <p className="text-4xl font-bold text-lime">{stat.value}</p>
                 <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
         <div className="container-xl">
            <div className="glass rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
               <div>
                  <h2 className="text-4xl font-bold">Have a project in mind?</h2>
                  <p className="mt-4 text-white/60">Let's discuss how we can help you achieve your business goals.</p>
               </div>
               <Link href="/contact" className="rounded-full bg-lime px-8 py-4 font-bold text-black flex items-center gap-2 hover:scale-105 transition-transform">
                  Start a Consultation <ArrowUpRight size={20} />
               </Link>
            </div>
         </div>
      </section>
    </main>
  );
}
