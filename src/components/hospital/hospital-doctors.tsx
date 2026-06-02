"use client";

import { motion } from "framer-motion";
import { Share2, Globe, Mail, ChevronRight, Stethoscope } from "lucide-react";
import { useHospital } from "@/lib/hospital-store";

export default function HospitalDoctors() {
  const { doctors } = useHospital();

  return (
    <section id="doctors" className="section-pad bg-[#F8FAFC] relative overflow-hidden">
      <div className="container-xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-ims-red" />
               <span className="text-xs font-bold uppercase tracking-[0.4em] text-ims-red block">Clinical Leadership</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-ims-blue leading-[0.95] tracking-tighter">
              The <span className="text-ims-red italic">Architects</span> <br />
              of Recovery.
            </h2>
          </div>
          <p className="text-ims-charcoal/40 text-lg leading-relaxed max-w-sm mb-4">
             Our medical board consists of internationally recognized specialists dedicated to advancing medical science.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white border border-ims-blue/5 rounded-sm overflow-hidden hover:shadow-3xl transition-all duration-700"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                 <img 
                    src={doc.img} 
                    alt={doc.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-ims-blue via-transparent to-transparent opacity-60" />
                 
                 {/* Floating Info Overlay */}
                 <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ims-red mb-2">{doc.specialty}</p>
                    <h3 className="text-2xl font-serif text-white">{doc.name}</h3>
                 </div>

                 {/* On-Call Pulse */}
                 <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                       doc.status === "Active" ? "bg-green-500" :
                       doc.status === "Surgery" ? "bg-ims-gold" :
                       "bg-ims-red"
                    }`} />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white">{doc.status}</span>
                 </div>
              </div>

              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 mb-1">Experience</p>
                       <p className="text-sm font-bold text-ims-blue">{doc.experience}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 mb-1">Education</p>
                       <p className="text-sm font-bold text-ims-blue">{doc.education}</p>
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-8 border-t border-ims-blue/5">
                    <div className="flex gap-4">
                       <button className="text-ims-blue/20 hover:text-ims-blue transition-colors">
                          <Globe size={18} />
                       </button>
                       <button className="text-ims-blue/20 hover:text-ims-blue transition-colors">
                          <Mail size={18} />
                       </button>
                    </div>
                    <button className="w-10 h-10 bg-ims-blue/5 text-ims-blue flex items-center justify-center rounded-sm group-hover:bg-ims-red group-hover:text-white transition-all">
                       <ChevronRight size={20} />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <button className="px-16 py-6 bg-white border border-ims-blue/5 text-ims-blue rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-ims-blue hover:text-white transition-all shadow-3xl shadow-ims-blue/5">
              View Full Medical Board
           </button>
        </div>
      </div>
    </section>
  );
}
