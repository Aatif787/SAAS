"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, CheckCircle, Users, Briefcase } from "lucide-react";
import { useEffect, useState, useRef } from "react";

function Counter({ value, suffix }: { value: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
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
       <span className="text-4xl md:text-5xl font-serif text-white mb-2">{count}</span>
       <span className="text-ims-red font-serif text-2xl font-bold ml-1">{suffix}</span>
    </div>
  );
}

const stats = [
  { label: "Years of Trust", value: "28", suffix: "+", icon: <Calendar size={20} /> },
  { label: "Successful Projects", value: "500", suffix: "+", icon: <CheckCircle size={20} /> },
  { label: "Client Base", value: "10000", suffix: "+", icon: <Users size={20} /> },
  { label: "Diversified Verticals", value: "7", suffix: "", icon: <Briefcase size={20} /> }
];

export default function Stats() {
  return (
    <section className="bg-ims-blue py-16 border-y border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ims-red/5 blur-[120px] rounded-full" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center group p-6 hover:bg-white/5 transition-colors border-white/5 border-r-0 odd:border-r md:border-r md:last:border-0"
            >
              <div className="flex flex-col items-center">
                 <div className="text-ims-gold mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                 </div>
                 <Counter value={stat.value} suffix={stat.suffix} />
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-ims-gold transition-colors">
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
