'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: "one_home_contact",
          metadata: {
            service: formData.service,
            budget: formData.budget
          }
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Submission failed");

      setSubmitSuccess(true);
      toast.success("Consultation scheduled successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="p-10 bg-white rounded-[1.25rem] border border-[#0A1E3D]/5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A1E3D]/5 rounded-bl-[5rem] -mr-10 -mt-10" />
      
      <h3 className="text-2xl font-bold text-[#0A1E3D] mb-8 tracking-tight">Schedule a <span className="text-ims-gold">Private Consultation</span></h3>
      
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h4 className="text-2xl font-bold text-[#0A1E3D] mb-4">Request Received</h4>
          <p className="text-ims-charcoal/60 max-w-xs mx-auto mb-10">Our home management concierge will contact you within 24 hours to confirm your appointment.</p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="text-ims-gold font-bold uppercase tracking-widest text-[10px] hover:underline"
          >
            Send Another Request
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A1E3D]/50 ml-1">Full Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-ims-cream/50 border border-[#0A1E3D]/10 rounded-xl focus:outline-none focus:border-[#0A1E3D] transition-all text-sm font-medium"
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A1E3D]/50 ml-1">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-ims-cream/50 border border-[#0A1E3D]/10 rounded-xl focus:outline-none focus:border-[#0A1E3D] transition-all text-sm font-medium"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A1E3D]/50 ml-1">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-ims-cream/50 border border-[#0A1E3D]/10 rounded-xl focus:outline-none focus:border-[#0A1E3D] transition-all text-sm font-medium"
                placeholder="Enter your phone"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A1E3D]/50 ml-1">Service Tier</label>
              <select
                required
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-ims-cream/50 border border-[#0A1E3D]/10 rounded-xl focus:outline-none focus:border-[#0A1E3D] transition-all text-sm font-medium appearance-none"
                disabled={isSubmitting}
              >
                <option value="">Select Service Tier</option>
                <option value="essential">Essential Care</option>
                <option value="premium">Premium Luxury</option>
                <option value="enterprise">Custom Enterprise</option>
                <option value="interior">Interior Design</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A1E3D]/50 ml-1">Project Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-6 py-4 bg-ims-cream/50 border border-[#0A1E3D]/10 rounded-xl focus:outline-none focus:border-[#0A1E3D] transition-all text-sm font-medium resize-none"
              placeholder="How can we help transform your home experience?"
              disabled={isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0A1E3D] text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-[#E8761A] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing Secure Request...
              </>
            ) : (
              <>
                Confirm Secure Consultation
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}