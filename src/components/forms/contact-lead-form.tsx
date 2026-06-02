"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export default function ContactLeadForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "main_contact",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to submit");
      
      toast.success("Message sent! We'll get back to you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-0.5">Full Name</label>
          <input 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="John Doe" 
            className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] text-white outline-none focus:ring-1 focus:ring-ims-red/30 transition-all placeholder:text-white/20" 
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-0.5">Email</label>
          <input 
            required 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="john@example.com" 
            className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] text-white outline-none focus:ring-1 focus:ring-ims-red/30 transition-all placeholder:text-white/20" 
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-0.5">Phone Number (Optional)</label>
        <input 
          type="tel" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder="+91 00000 00000" 
          className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] text-white outline-none focus:ring-1 focus:ring-ims-red/30 transition-all placeholder:text-white/20" 
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-0.5">Project Details</label>
        <textarea 
          required 
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Briefly describe your goals..." 
          rows={3} 
          className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] text-white outline-none focus:ring-1 focus:ring-ims-red/30 transition-all placeholder:text-white/20 resize-none" 
        />
      </div>
      <button 
        disabled={loading} 
        className="group flex w-full items-center justify-center gap-3 rounded-sm bg-[#D32F2F] py-6 font-bold text-white transition-all hover:bg-[#121214] hover:border-ims-gold border border-transparent active:scale-95 disabled:opacity-50 shadow-xl shadow-ims-red/10"
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin text-white" />
        ) : (
          <span className="flex items-center gap-2 uppercase tracking-[0.2em] text-[11px]">Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-ims-gold" /></span>
        )}
      </button>
    </form>
  );
}
