"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const TESTIMONIALS = [
  {
    name: "Rajesh Khanna",
    location: "Lucknow, UP",
    text: "The cardiovascular department at IMS saved my life. The specialized surgical care was precise, and the recovery time was remarkably short. Truly world-class.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Dr. Sunita Reddy",
    location: "Hyderabad",
    text: "As a fellow physician, I was impressed by the digital integration at IMS. From report downloads to live doctor availability, it's the future of healthcare.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Mohit Agarwal",
    location: "Kanpur",
    text: "The emergency response team arrived within 10 minutes. The advanced life support in the ambulance made all the difference. Highly professional staff.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export default function HospitalTestimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="section-pad bg-ims-blue relative overflow-hidden">
      {/* Background Abstract */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(191,10,48,0.1),transparent)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
           <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-ims-red" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/60 block">Patient Voices</span>
              <div className="w-12 h-[1px] bg-ims-red" />
           </div>
           <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight tracking-tighter">
             Healing <span className="text-ims-red italic">Stories</span>.
           </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                 <Quote size={120} className="absolute -top-16 -left-16 text-white/5 -z-10" />
                 <div className="flex gap-2 mb-8">
                    {[...Array(TESTIMONIALS[active].rating)].map((_, i) => (
                       <Star key={i} size={16} className="fill-ims-gold text-ims-gold shadow-gold" />
                    ))}
                 </div>
                 <p className="text-3xl md:text-4xl font-serif text-white/90 leading-[1.3] mb-12 italic">
                    &ldquo;{TESTIMONIALS[active].text}&rdquo;
                 </p>
                 <div>
                    <h4 className="text-xl font-bold text-white mb-1">{TESTIMONIALS[active].name}</h4>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ims-red font-bold">{TESTIMONIALS[active].location}</p>
                 </div>
              </motion.div>

              <div className="relative">
                 <div className="aspect-square bg-ims-blue/30 border border-white/10 rounded-sm overflow-hidden relative group">
                    <motion.img 
                       key={active}
                       initial={{ opacity: 0, scale: 1.1 }}
                       animate={{ opacity: 1, scale: 1 }}
                       src={TESTIMONIALS[active].img} 
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ims-blue via-transparent to-transparent opacity-60" />
                 </div>

                 {/* Navigation Controls */}
                 <div className="absolute -bottom-10 -left-10 flex gap-4">
                    <button 
                       onClick={() => setActive((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                       className="w-20 h-20 bg-white text-ims-blue flex items-center justify-center hover:bg-ims-red hover:text-white transition-all shadow-3xl"
                    >
                       <ChevronLeft size={32} />
                    </button>
                    <button 
                       onClick={() => setActive((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                       className="w-20 h-20 bg-ims-red text-white flex items-center justify-center hover:bg-white hover:text-ims-blue transition-all shadow-3xl"
                    >
                       <ChevronRight size={32} />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Floating Stat Overlay */}
        <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="absolute top-1/2 -right-20 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-sm hidden xl:block"
        >
           <p className="text-5xl font-serif text-white mb-2">9.8/10</p>
           <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ims-red">Average Satisfaction</p>
        </motion.div>
      </div>
    </section>
  );
}
