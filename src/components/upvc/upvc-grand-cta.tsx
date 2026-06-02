"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const checklist = [
  "Free site consultation and precision measurement",
  "Premium product recommendations for your facade",
  "Custom RAL colour matching — 200+ finishes",
  "Quotation within 24 hours, guaranteed",
];

export default function UPVCGrandCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Message sent! We'll contact you within 24 hours.");
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: "#040810" }}>
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0,194,255,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 50%, rgba(125,255,209,0.06) 0%, transparent 60%)
            `,
          }} />
        {/* Animated aurora waves */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute inset-x-0 h-px"
            style={{
              top: `${30 + i * 20}%`,
              background: `linear-gradient(90deg, transparent, rgba(0,194,255,${0.15 - i * 0.04}), rgba(125,255,209,${0.1 - i * 0.03}), transparent)`,
            }}
            animate={{ scaleX: [0.8, 1.1, 0.8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: "#FF6B35" }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em]" style={{ color: "#FF6B35" }}>
                Begin Your Project
              </span>
            </div>

            <h2 className="font-black tracking-tight leading-[0.9] mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8F4FF", letterSpacing: "-0.03em" }}>
              Ready to Transform
              <br />
              Your Property?
              <br />
              <span style={{
                background: "linear-gradient(135deg, #FF6B35, #E8F4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Let&apos;s Build It.
              </span>
            </h2>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(232,244,255,0.5)" }}>
              IMS engineers UPVC systems that don&apos;t just seal your home — they transform it.
              Installed in days. Built to outlast generations.
            </p>

            {/* Checklist */}
            <div className="space-y-4 mb-10">
              {checklist.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: "#7DFFD1" }} />
                  <span className="text-sm" style={{ color: "rgba(232,244,255,0.65)" }}>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "200+", label: "Projects Completed" },
                { val: "98%", label: "Client Satisfaction" },
                { val: "25yr", label: "Warranty Period" },
                { val: "24hr", label: "Quote Turnaround" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="p-5 rounded-xl"
                  style={{
                    border: "1px solid rgba(0,194,255,0.12)",
                    background: "rgba(10,22,40,0.6)",
                  }}
                >
                  <div className="text-2xl font-black mb-1" style={{ color: "#00C2FF" }}>{s.val}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(232,244,255,0.35)" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Phone CTA */}
            <motion.a
              href="tel:+919699858212"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ border: "1px solid rgba(255,107,53,0.4)", color: "#FF6B35" }}>
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,107,53,0.6)" }}>
                  Call Direct
                </div>
                <div className="font-bold" style={{ color: "#E8F4FF" }}>+91 9699 858 212</div>
              </div>
            </motion.a>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-8 md:p-10 rounded-3xl"
              style={{
                border: "1px solid rgba(0,194,255,0.15)",
                background: "rgba(10,22,40,0.8)",
                backdropFilter: "blur(30px)",
                boxShadow: "0 0 80px rgba(0,194,255,0.06)",
              }}>

              <div className="mb-8">
                <div className="text-[10px] font-mono uppercase tracking-[0.4em] mb-2" style={{ color: "#00C2FF" }}>
                  Free Consultation
                </div>
                <h3 className="text-2xl font-black" style={{ color: "#E8F4FF" }}>
                  Get Your Quote
                </h3>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(125,255,209,0.15)", border: "1px solid rgba(125,255,209,0.4)" }}
                  >
                    <CheckCircle2 size={36} style={{ color: "#7DFFD1" }} />
                  </motion.div>
                  <h4 className="text-xl font-bold mb-3" style={{ color: "#E8F4FF" }}>Message Sent!</h4>
                  <p style={{ color: "rgba(232,244,255,0.5)" }}>We&apos;ll contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map(field => (
                    <div key={field.key} className="relative group">
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-2"
                        style={{ color: "rgba(0,194,255,0.6)" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(form as any)[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        required
                        className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-300"
                        style={{
                          background: "rgba(4,8,16,0.8)",
                          border: "1px solid rgba(0,194,255,0.15)",
                          color: "#E8F4FF",
                        }}
                        onFocus={e => { e.target.style.borderColor = "rgba(0,194,255,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(0,194,255,0.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(0,194,255,0.15)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest mb-2"
                      style={{ color: "rgba(0,194,255,0.6)" }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
                      style={{
                        background: "rgba(4,8,16,0.8)",
                        border: "1px solid rgba(0,194,255,0.15)",
                        color: "#E8F4FF",
                      }}
                      onFocus={e => { e.target.style.borderColor = "rgba(0,194,255,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(0,194,255,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(0,194,255,0.15)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 btn-ember"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
