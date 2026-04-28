"use client";

import { motion } from "framer-motion";
import { Users, Target, Rocket, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-mesh min-h-screen pt-20">
      <section className="section-pad">
        <div className="container-xl">
           <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                 <span className="text-sm font-bold uppercase tracking-[0.3em] text-lime">Our Story</span>
                 <h1 className="mt-4 text-5xl font-bold md:text-7xl">
                    Beyond Code. <br />
                    <span className="text-gradient-lime">Pure Excellence.</span>
                 </h1>
                 <p className="mt-8 text-xl text-white/60 leading-relaxed">
                    InfinityMesh was founded on the principle that digital experiences 
                    should be as immersive as they are functional. We are a boutique 
                    agency of dreamers, builders, and growth hackers.
                 </p>
                 <div className="mt-12 grid grid-cols-2 gap-8">
                    <div>
                       <h4 className="text-4xl font-bold text-white">5+</h4>
                       <p className="text-sm font-medium text-white/40 mt-1">Years of Innovation</p>
                    </div>
                    <div>
                       <h4 className="text-4xl font-bold text-white">12+</h4>
                       <p className="text-sm font-medium text-white/40 mt-1">Global Awards</p>
                    </div>
                 </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                 <div className="glass aspect-square w-full rounded-[4rem] p-12 overflow-hidden border-white/5 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2400" 
                      alt="Team Collaborating"
                      className="h-full w-full object-cover rounded-[3rem] opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-lime/20 to-transparent" />
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-pad bg-black/40 border-y border-white/5">
         <div className="container-xl">
            <h2 className="text-3xl font-bold text-center mb-16">What Drives Us</h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
               {[
                 { label: "Innovation", icon: Rocket, desc: "Constantly pushing the boundaries of web technology." },
                 { label: "Integrity", icon: Target, desc: "Transparent processes and honest communication." },
                 { label: "Excellence", icon: Award, desc: "Never settling for 'good enough'. We aim for perfection." },
                 { label: "Community", icon: Users, desc: "Building lasting partnerships with our global clients." }
               ].map((v, i) => (
                 <div key={i} className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-white/5 flex items-center justify-center text-lime mb-6">
                       <v.icon size={28} />
                    </div>
                    <h4 className="text-xl font-bold">{v.label}</h4>
                    <p className="mt-3 text-sm text-white/40 leading-relaxed">{v.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="section-pad">
         <div className="container-xl">
            <h2 className="text-4xl font-bold text-center mb-20">The Minds Behind <span className="text-gradient-gold">IMS</span></h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
               {[
                 { name: "Aariz", role: "Founder & Lead Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2400" },
                 { name: "Sophia", role: "Creative Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2400" },
                 { name: "Marcus", role: "Head of Marketing", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=2400" }
               ].map((member, i) => (
                 <motion.div 
                   key={member.name}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="group text-center"
                 >
                    <div className="mx-auto h-64 w-64 rounded-full overflow-hidden border-[6px] border-white/5 mb-8 grayscale group-hover:grayscale-0 group-hover:border-lime/30 transition-all duration-500">
                       <img src={member.img} alt={member.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <h4 className="text-2xl font-bold">{member.name}</h4>
                    <p className="mt-1 text-lime font-medium uppercase tracking-widest text-xs">{member.role}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}
