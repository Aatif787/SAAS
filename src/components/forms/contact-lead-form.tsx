"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function ContactLeadForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    try {
      const payload = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        message: String(formData.get("message") || ""),
        source: "contact_form",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to submit lead");
      
      toast.success("Message sent! We'll get back to you shortly.");
      // Optional: reset form or redirect
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-0.5">Full Name</label>
          <input 
            name="name" 
            required 
            placeholder="John Doe" 
            className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] text-white outline-none focus:ring-1 focus:ring-ims-red/30 transition-all placeholder:text-white/20" 
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-0.5">Email</label>
          <input 
            name="email" 
            required 
            type="email" 
            placeholder="john@example.com" 
            className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] text-white outline-none focus:ring-1 focus:ring-ims-red/30 transition-all placeholder:text-white/20" 
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-0.5">Project Details</label>
        <textarea 
          name="message" 
          required 
          placeholder="Briefly describe your goals..." 
          rows={2} 
          className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] text-white outline-none focus:ring-1 focus:ring-ims-red/30 transition-all placeholder:text-white/20 resize-none" 
        />
      </div>
      <button 
        disabled={loading} 
        className="group flex w-full items-center justify-center gap-3 rounded-sm bg-[#D32F2F] py-6 font-bold text-white transition-all hover:bg-[#0A1E3D] hover:border-ims-gold border border-transparent active:scale-95 disabled:opacity-50 shadow-xl shadow-ims-red/10"
      >
        {loading ? (
          <span className="flex items-center gap-2 uppercase tracking-[0.2em] text-[11px]">Processing...</span>
        ) : (
          <span className="flex items-center gap-2 uppercase tracking-[0.2em] text-[11px]">Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-ims-gold" /></span>
        )}
      </button>
      <p className="text-center text-[9px] uppercase tracking-[0.2em] text-white/20 mt-4">By submitting, you agree to our privacy policy.</p>
    </form>
  );
}

