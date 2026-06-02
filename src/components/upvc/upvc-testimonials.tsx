"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Gupta",
    role: "Villa Owner",
    location: "Lucknow",
    text: "The UPVC windows completely transformed our villa. The noise reduction is remarkable — we can no longer hear the traffic outside. The quality is extraordinary.",
    rating: 5,
    project: "Luxury Villa · 24 Windows",
  },
  {
    name: "Priya Sharma",
    role: "Principal Architect",
    location: "Delhi",
    text: "I recommend IMS UPVC to all my clients. The build quality is exceptional, and their sliding doors are simply stunning. The thermal performance data is real.",
    rating: 5,
    project: "Commercial Complex · 180 Units",
  },
  {
    name: "Amit Verma",
    role: "Real Estate Developer",
    location: "Noida",
    text: "We've partnered with IMS for over 50 residential projects. Their consistency in quality and timely delivery makes them our go-to supplier. Unmatched reliability.",
    rating: 5,
    project: "Residential Tower · 500+ Frames",
  },
  {
    name: "Sunita Agarwal",
    role: "Interior Designer",
    location: "Mumbai",
    text: "The French doors IMS installed for our penthouse project are breathtaking. The precision of the frames and the quality of the glass is unlike anything I've seen.",
    rating: 5,
    project: "Penthouse Suite · Custom Design",
  },
];

export default function UPVCTestimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const prev = () => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: "#040810" }}>
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: "radial-gradient(ellipse, #00C2FF 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[300px] rounded-full blur-[100px] opacity-10"
          style={{ background: "radial-gradient(ellipse, #7DFFD1 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#00C2FF" }} />
            <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#00C2FF" }}>
              Client Stories
            </span>
            <div className="h-px w-8" style={{ background: "#00C2FF" }} />
          </div>
          <h2 className="font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
            Trusted by{" "}
            <span style={{
              background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Thousands
            </span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 md:p-14 rounded-3xl"
              style={{
                border: "1px solid rgba(0,194,255,0.15)",
                background: "rgba(10,22,40,0.7)",
                backdropFilter: "blur(30px)",
                boxShadow: "0 0 80px rgba(0,194,255,0.06)",
              }}
            >
              {/* Quote icon */}
              <Quote size={48} className="absolute top-10 right-10 opacity-10" style={{ color: "#00C2FF" }} />

              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array(testimonials[current].rating).fill(0).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Star size={18} style={{ fill: "#FF6B35", color: "#FF6B35" }} />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-10 italic"
                style={{ color: "rgba(232,244,255,0.8)" }}>
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg"
                    style={{ background: "rgba(0,194,255,0.15)", color: "#00C2FF", border: "1px solid rgba(0,194,255,0.3)" }}>
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: "#E8F4FF" }}>{testimonials[current].name}</div>
                    <div className="text-sm" style={{ color: "rgba(0,194,255,0.6)" }}>
                      {testimonials[current].role} · {testimonials[current].location}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest"
                  style={{ border: "1px solid rgba(125,255,209,0.2)", color: "#7DFFD1", background: "rgba(125,255,209,0.05)" }}>
                  {testimonials[current].project}
                </div>
              </div>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] rounded-b-3xl"
                style={{ background: "linear-gradient(90deg, #00C2FF, #7DFFD1)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 btn-ghost">
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 32 : 8,
                    height: 8,
                    background: i === current ? "#00C2FF" : "rgba(0,194,255,0.2)",
                    boxShadow: i === current ? "0 0 10px rgba(0,194,255,0.5)" : "none",
                  }} />
              ))}
            </div>

            <button onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 btn-ghost">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
