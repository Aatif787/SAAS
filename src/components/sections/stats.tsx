"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle, Users, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

function Counter({ 
  value, 
  suffix, 
  numColor, 
  suffixColor 
}: { 
  value: string; 
  suffix: string; 
  numColor: string; 
  suffixColor: string; 
}) {
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalDuration = 2000;
    const increment = end / (totalDuration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex items-baseline justify-center">
       <span className={`text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight mb-1 ${numColor}`}>{count}</span>
       {suffix && <span className={`font-serif text-xl sm:text-2xl font-bold ml-0.5 ${suffixColor}`}>{suffix}</span>}
    </div>
  );
}

const stats = [
  { 
    label: "Years of Trust", 
    value: "28", 
    suffix: "+", 
    icon: <Calendar size={18} />,
    numColor: "text-ims-gold",       // Luxury Gold
    suffixColor: "text-ims-cream",    // Alabaster Cream
    labelColor: "text-ims-cream/60 group-hover:text-ims-cream", 
    iconColor: "text-ims-gold opacity-70 group-hover:opacity-100"
  },
  { 
    label: "Successful Projects", 
    value: "500", 
    suffix: "+", 
    icon: <CheckCircle size={18} />,
    numColor: "text-ims-cream",       // Alabaster Cream
    suffixColor: "text-white",        
    labelColor: "text-ims-gold/80 group-hover:text-ims-gold", 
    iconColor: "text-ims-cream opacity-70 group-hover:opacity-100"
  },
  { 
    label: "Client Base", 
    value: "10000", 
    suffix: "+", 
    icon: <Users size={18} />,
    numColor: "text-white",           
    suffixColor: "text-ims-gold",    // Luxury Gold
    labelColor: "text-ims-cream/80 group-hover:text-ims-cream", 
    iconColor: "text-white opacity-70 group-hover:opacity-100"
  },
  { 
    label: "Diversified Verticals", 
    value: "7", 
    suffix: "", 
    icon: <Briefcase size={18} />,
    numColor: "text-ims-gold",       // Luxury Gold
    suffixColor: "text-ims-cream",    // Alabaster Cream
    labelColor: "text-ims-cream/60 group-hover:text-ims-cream", 
    iconColor: "text-ims-gold opacity-70 group-hover:opacity-100"
  }
];

export default function Stats() {
  return (
    <section className="bg-[#0A1424] py-12 sm:py-16 border-y border-white/5 relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-ims-gold/5 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-ims-blue/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08 }}
              className="text-center group p-4 sm:p-6 hover:bg-white/5 transition-all duration-300 border border-white/5 rounded-xl bg-black/40 backdrop-blur-md hover:border-white/10 hover:shadow-[0_0_25px_rgba(197,160,89,0.05)]"
            >
              <div className="flex flex-col items-center">
                 <div className={`mb-3 sm:mb-4 transition-all duration-300 ${stat.iconColor}`}>
                    {stat.icon}
                 </div>
                 <Counter 
                   value={stat.value} 
                   suffix={stat.suffix} 
                   numColor={stat.numColor} 
                   suffixColor={stat.suffixColor} 
                 />
                 <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors mt-1 ${stat.labelColor}`}>
                    {stat.label}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
