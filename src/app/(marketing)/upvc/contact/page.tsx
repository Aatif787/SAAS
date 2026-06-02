"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  { icon: <Phone size={20} />, label: "Call Us", value: "+91 9699 858 212", href: "tel:+919699858212" },
  { icon: <Mail size={20} />, label: "Email", value: "upvc@imsgroup.co.in", href: "mailto:upvc@imsgroup.co.in" },
  { icon: <MapPin size={20} />, label: "Visit", value: "IMS Tower, Gomti Nagar, Lucknow", href: "#" },
  { icon: <Clock size={20} />, label: "Hours", value: "Mon–Sat: 9AM–7PM", href: "#" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productInterest: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/upvc/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success(data.message);
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-upvc-green">Contact</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold text-upvc-dark tracking-tighter mb-6">
            Let&apos;s <span className="text-upvc-green">Connect</span>
          </motion.h1>
        </div>
      </section>
      <section className="pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((c, i) => (
                  <motion.a key={c.label} href={c.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="p-6 rounded-2xl bg-upvc-white border border-upvc-dark/5 hover:border-upvc-green/20 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-upvc-green/10 text-upvc-green flex items-center justify-center mb-4 group-hover:bg-upvc-green group-hover:text-white transition-all">{c.icon}</div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-upvc-dark/30 block mb-1">{c.label}</span>
                    <span className="text-sm text-upvc-dark font-medium">{c.value}</span>
                  </motion.a>
                ))}
              </div>
              <a href="https://wa.me/919699858212" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 font-bold text-sm uppercase tracking-wider hover:bg-green-500/20 transition-all">
                <MessageSquare size={20} /> Chat on WhatsApp
              </a>
              <div className="rounded-2xl overflow-hidden h-64 bg-upvc-white border border-upvc-dark/5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2!2d80.99!3d26.85" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office Location" />
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-5 sm:p-10 rounded-3xl bg-upvc-white border border-upvc-dark/5">
              <h3 className="text-2xl font-bold text-upvc-dark mb-2">Send us a message</h3>
              <p className="text-upvc-dark/40 text-sm mb-8">We&apos;ll get back to you within 24 hours.</p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <input 
                      required 
                      type="text" 
                      placeholder="Full Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green" 
                    />
                    <input 
                      required 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green" 
                    />
                  </div>
                  <input 
                    required 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green" 
                  />
                  <select 
                    value={formData.productInterest}
                    onChange={(e) => setFormData({...formData, productInterest: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark/50 focus:outline-none focus:border-upvc-green"
                  >
                    <option value="">Select Product Interest</option>
                    <option value="casement">Casement Windows</option>
                    <option value="sliding">Sliding Doors</option>
                    <option value="french">French Doors</option>
                    <option value="other">Other / Custom</option>
                  </select>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="Tell us about your project..." 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green resize-none" 
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-upvc-green text-white font-bold text-sm uppercase tracking-wider hover:bg-upvc-lime transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Send Message"} <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-upvc-green/10 text-upvc-green flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                  <h4 className="text-xl font-bold text-upvc-dark mb-2">Message Sent!</h4>
                  <p className="text-upvc-dark/40 max-w-[280px] mx-auto">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-upvc-green text-sm font-bold uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
