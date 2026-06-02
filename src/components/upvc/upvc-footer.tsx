"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";

const footerLinks = {
  products: [
    { name: "Casement Windows", href: "/upvc/products#casement" },
    { name: "Sliding Windows", href: "/upvc/products#sliding-windows" },
    { name: "Sliding Doors", href: "/upvc/products#sliding-doors" },
    { name: "French Doors", href: "/upvc/products#french-doors" },
    { name: "Bi-Fold Systems", href: "/upvc/products#bifold" },
    { name: "Soundproof Systems", href: "/upvc/products#soundproof" },
  ],
  company: [
    { name: "About IMS", href: "/upvc/about" },
    { name: "Our Projects", href: "/upvc/projects" },
    { name: "Gallery", href: "/upvc/gallery" },
    { name: "Services", href: "/upvc/services" },
    { name: "Get a Quote", href: "/upvc/get-quote" },
  ],
};

// Star field canvas
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,194,255,${s.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
}

export default function UPVCFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/upvc/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) { toast.success(data.message); setEmail(""); }
      else toast.error(data.error || "Subscription failed");
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: "#020609" }}>
      <StarField />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.4), rgba(125,255,209,0.3), transparent)" }} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          style={{ borderBottom: "1px solid rgba(0,194,255,0.08)" }}
        >
          <div>
            <h3 className="text-2xl font-black mb-2" style={{ color: "#E8F4FF" }}>
              Stay in the{" "}
              <span style={{
                background: "linear-gradient(135deg, #00C2FF, #7DFFD1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Future
              </span>
            </h3>
            <p className="text-sm" style={{ color: "rgba(232,244,255,0.4)" }}>
              UPVC innovations, project showcases, and exclusive offers.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-0">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 lg:w-72 px-5 py-3.5 text-sm outline-none"
              style={{
                background: "rgba(10,22,40,0.8)",
                border: "1px solid rgba(0,194,255,0.2)",
                borderRight: "none",
                borderRadius: "12px 0 0 12px",
                color: "#E8F4FF",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider flex items-center gap-2 btn-ember"
              style={{ borderRadius: "0 12px 12px 0" }}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <><ArrowRight size={14} /> Subscribe</>}
            </button>
          </form>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ border: "1px solid rgba(0,194,255,0.4)", background: "rgba(0,194,255,0.08)" }}>
                <span className="text-[10px] font-black" style={{ color: "#00C2FF" }}>IMS</span>
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#E8F4FF" }}>UPVC</div>
                <div className="text-[8px] font-mono uppercase tracking-[0.3em]" style={{ color: "rgba(0,194,255,0.5)" }}>
                  Doors & Windows
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(232,244,255,0.35)" }}>
              Where Light Lives. Ultra-performance UPVC systems engineered for eternity.
            </p>
            <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(0,194,255,0.4)" }}>
              ISO 9001 · BS 6375 · A+ Rated
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6" style={{ color: "#00C2FF" }}>
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map(l => (
                <li key={l.name}>
                  <Link href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-[#00C2FF] flex items-center gap-2 group"
                    style={{ color: "rgba(232,244,255,0.35)" }}>
                    <span className="w-0 h-px group-hover:w-4 transition-all duration-300" style={{ background: "#00C2FF" }} />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6" style={{ color: "#7DFFD1" }}>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map(l => (
                <li key={l.name}>
                  <Link href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-[#7DFFD1] flex items-center gap-2 group"
                    style={{ color: "rgba(232,244,255,0.35)" }}>
                    <span className="w-0 h-px group-hover:w-4 transition-all duration-300" style={{ background: "#7DFFD1" }} />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6" style={{ color: "#FF6B35" }}>
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "#FF6B35" }} />
                <span className="text-sm leading-relaxed" style={{ color: "rgba(232,244,255,0.35)" }}>
                  IMS Tower, Gomti Nagar,<br />Lucknow, UP 226010
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0" style={{ color: "#FF6B35" }} />
                <a href="tel:+919699858212" className="text-sm transition-colors hover:text-[#FF6B35]"
                  style={{ color: "rgba(232,244,255,0.35)" }}>
                  +91 9699 858 212
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0" style={{ color: "#FF6B35" }} />
                <a href="mailto:upvc@imsgroup.co.in" className="text-sm transition-colors hover:text-[#FF6B35]"
                  style={{ color: "rgba(232,244,255,0.35)" }}>
                  upvc@imsgroup.co.in
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(0,194,255,0.06)" }}>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: "rgba(232,244,255,0.2)" }}>
            © 2026 IMS UPVC Systems. Crafted for Infinity.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "#00C2FF" }} />
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(0,194,255,0.4)" }}>
              Where Light Lives
            </span>
          </div>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em]"
            style={{ color: "rgba(232,244,255,0.2)" }}>
            <Link href="#" className="hover:text-[#00C2FF] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#00C2FF] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
