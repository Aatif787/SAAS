"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Cpu, Layers, BarChart, ArrowRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const solutions = [
  {
    title: "Custom Web Development",
    description: "Bespoke digital experiences built with precision. We craft high-performance, responsive websites and enterprise-grade web applications that drive engagement and conversion.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
  },
  {
    title: "AI & Process Automation",
    description: "Integrating intelligence into your operations. Our specialized AI solutions automate complex workflows, enhance decision-making, and provide predictive insights for business growth.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "SaaS & Product Engineering",
    description: "Building scalable software for the future. From conceptualization to deployment, we engineer robust SaaS platforms designed for massive scale and user-centric performance.",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Digital Transformation & Growth",
    description: "Strategy-led digital evolution. We help legacy businesses transition to modern digital landscapes through data-driven marketing, SEO excellence, and strategic tech consulting.",
    icon: BarChart,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop"
  }
];

export default function WebSolutionSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const starY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const starOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="mt-0 pt-24 pb-24 bg-[#020617] relative overflow-hidden">
      {/* Starry Night Effect with Scroll Parallax */}
      <motion.div 
        style={{ y: starY, opacity: starOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:50px_50px] translate-x-4 translate-y-4 opacity-20" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-ims-blue/10 to-[#020617] pointer-events-none" />

      <div className="container-xl relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
          >
            Digital Division
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-8 leading-tight tracking-tighter"
          >
            IMS Web <span className="text-ims-red italic">Solution</span>
          </motion.h2>
          <p className="max-w-2xl text-lg text-white/70 font-medium">
            Bridging the gap between classical business values and modern technological innovation. 
            Our digital arm is dedicated to your institutional growth in the digital age.
          </p>
        </div>

        {/* Vertical Line Timeline-style Layout */}
        <div className="relative">
          {/* Straight Dividing Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden lg:block" />

          <div className="space-y-16 lg:space-y-20">
            {solutions.map((s, i) => (
              <div key={s.title} className="relative lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                {/* Visual Content (Alternating) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, x: i % 2 === 0 ? 100 : -100, filter: "blur(20px)" }}
                  whileInView={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, type: "spring", damping: 15 }}
                  className={`relative ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} perspective-1000 will-change-transform`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: i % 2 === 0 ? 5 : -5, z: 50 }}
                    className="aspect-[16/9] overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)] rounded-sm relative group/img max-w-md mx-auto"
                  >
                    <Image 
                      src={s.image} 
                      alt={s.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-40 hover:opacity-100 scale-110" 
                    />
                    <div className="absolute inset-0 bg-ims-blue/40 group-hover/img:bg-transparent transition-colors" />
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(197,160,89,0.1)_50%,transparent_100%)] bg-[size:100%_4px] animate-scan pointer-events-none" />
                  </motion.div>
                </motion.div>

                {/* Text Content (Consistently Left-Aligned) */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -150 : 150, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, type: "spring", damping: 15, delay: 0.2 }}
                  className={`lg:order-1 text-left mt-10 lg:mt-0 p-6 md:p-10 bg-white/[0.01] backdrop-blur-md border border-white/10 shadow-none rounded-sm group transition-all duration-500 hover:border-ims-red/40 hover:bg-white/[0.03]`}
                >
                  <div className={`flex items-center gap-4 mb-6 justify-start`}>
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      className="p-3 bg-white/5 text-ims-gold rounded-sm border border-white/10 shadow-[0_0_20px_rgba(197,160,89,0.1)]"
                    >
                      <s.icon size={22} />
                    </motion.div>
                    <span className="text-3xl font-serif font-bold tracking-tighter text-white/5 group-hover:text-ims-red transition-colors">0{i + 1}</span>
                  </div>
                  
                  <motion.h3 
                    whileHover={{ x: 10 }}
                    className="text-2xl md:text-4xl font-serif text-white mb-4 leading-tight tracking-tighter group-hover:text-ims-gold transition-colors drop-shadow-2xl"
                  >
                    {s.title}
                  </motion.h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed font-medium mb-8 max-w-lg text-justify group-hover:text-white/90 transition-colors">
                    {s.description}
                  </p>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1, x: 20 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:text-ims-red transition-all mr-auto`}
                  >
                    <span className="h-px w-8 bg-white/20 group-hover:w-16 group-hover:bg-ims-red transition-all" />
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </motion.div>

                {/* Central Point Indicator with Scroll Pulse */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1.5, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ims-red border-4 border-white rounded-full z-20 hidden lg:block shadow-[0_0_30px_rgba(255,59,48,0.8)]" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Process Workflow */}
        <div className="mt-24 pt-20 border-t border-white/5">
          <div className="flex flex-col items-center text-center mb-8">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
            >
              Digital Workflow
            </motion.span>
            <motion.h4 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl font-serif text-white mb-8"
            >
              Web Solution <span className="text-ims-red italic">Process</span>
            </motion.h4>
            <div className="gold-accent mx-auto" />
          </div>

          <div className="grid gap-6 md:grid-cols-5 perspective-1000">
            {[
              { n: "01", t: "Requirement", d: "Deep dive into your business goals and technical needs." },
              { n: "02", t: "Planning", d: "Strategic roadmap and architectural wireframing." },
              { n: "03", t: "Design", d: "Premium UI/UX design that resonates with your brand." },
              { n: "04", t: "Development", d: "Clean, scalable code built with modern frameworks." },
              { n: "05", t: "Delivery", d: "Testing, deployment, and performance optimization." }
            ].map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 50, rotateX: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -20,
                  rotateY: 10,
                  rotateX: -5,
                  transition: { duration: 0.3 }
                }}
                className="relative group p-6 bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden rounded-sm transition-all duration-500 hover:bg-white/10"
              >
                {/* Subtle Glow Effect */}
                <div className="absolute -inset-1 bg-ims-red/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                
                <span className="relative z-10 text-4xl font-serif font-bold text-ims-gold/20 group-hover:text-ims-gold transition-colors block mb-4">
                  {step.n}
                </span>
                <h5 className="relative z-10 text-lg font-serif font-bold text-white mb-3 group-hover:text-ims-gold transition-colors">
                  {step.t}
                </h5>
                <p className="relative z-10 text-[10px] text-white/50 leading-relaxed font-medium group-hover:text-white transition-colors text-justify">
                  {step.d}
                </p>
                
                {/* Animated Line Indicator */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-ims-red/40 group-hover:bg-ims-red transition-colors"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                />

                {index < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10 z-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
