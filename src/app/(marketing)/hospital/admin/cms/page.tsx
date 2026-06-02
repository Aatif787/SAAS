"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MonitorPlay, 
  Save, 
  Image as ImageIcon, 
  Layout, 
  Globe, 
  CheckCircle2,
  Undo2
} from "lucide-react";
import { useHospital } from "@/lib/hospital-store";

export default function AdminCMSPage() {
  const { cms, updateCMS } = useHospital();
  const [formData, setFormData] = useState(cms);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateCMS(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-16 relative overflow-hidden">
      {/* Neo Luxury Background Accents */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ims-gold/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ims-blue/5 blur-[150px] rounded-full pointer-events-none" />

      <header className="flex items-center justify-between mb-24 relative z-10">
        <div>
          <h2 className="text-6xl font-serif text-ims-blue mb-5 tracking-tight">Institutional Archives</h2>
          <div className="flex items-center gap-4">
             <div className="w-12 h-[1px] bg-ims-gold" />
             <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-ims-gold">Content Management System • Live Control</p>
          </div>
        </div>
 
        <button 
          onClick={handleSave}
          className="bg-ims-blue text-white px-12 py-6 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 hover:bg-ims-gold hover:text-ims-blue transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(10,30,61,0.3)] active:scale-95 group"
        >
          {isSaved ? <CheckCircle2 size={18} className="text-ims-gold" /> : <Save size={18} className="group-hover:rotate-12 transition-transform" />}
          {isSaved ? "Protocol Published" : "Commit to Live Site"}
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12 relative z-10">
         {/* Editor Section */}
         <div className="lg:col-span-8 space-y-12">
            <div className="bg-white border border-ims-gold/10 rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
               <div className="p-10 border-b border-ims-gold/10 flex items-center gap-6 bg-ims-blue/5">
                  <div className="w-12 h-12 bg-white border border-ims-gold/20 rounded-xl flex items-center justify-center text-ims-gold">
                     <Layout size={22} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-ims-blue">Hero Narrative Control</h3>
               </div>
               <div className="p-16 space-y-12">
                  <div className="space-y-4 group">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1 transition-colors group-focus-within:text-ims-blue">Main Heading (Hero)</label>
                     <input 
                        type="text" 
                        value={formData.heroTitle}
                        onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                        className="w-full bg-white border border-ims-gold/20 px-10 py-7 rounded-2xl text-xl font-serif text-ims-blue focus:border-ims-gold focus:ring-8 focus:ring-ims-gold/5 transition-all outline-none placeholder:text-ims-gold/30"
                     />
                  </div>
                  <div className="space-y-4 group">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1 transition-colors group-focus-within:text-ims-blue">Sub-heading (Hero)</label>
                     <textarea 
                        rows={4}
                        value={formData.heroSub}
                        onChange={(e) => setFormData({ ...formData, heroSub: e.target.value })}
                        className="w-full bg-white border border-ims-gold/20 px-10 py-7 rounded-2xl text-[13px] leading-relaxed text-ims-charcoal/70 font-medium tracking-wide focus:border-ims-gold focus:ring-8 focus:ring-ims-gold/5 transition-all outline-none"
                     />
                  </div>
               </div>
            </div>

            <div className="bg-white border border-ims-gold/10 rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
               <div className="p-10 border-b border-ims-gold/10 flex items-center gap-6 bg-ims-blue/5">
                  <div className="w-12 h-12 bg-white border border-ims-gold/20 rounded-xl flex items-center justify-center text-ims-gold">
                     <Globe size={22} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-ims-blue">Institutional Identity</h3>
               </div>
               <div className="p-16 space-y-12">
                  <div className="space-y-4 group">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-ims-gold/60 ml-1">About Narrative</label>
                     <textarea 
                        rows={8}
                        value={formData.aboutText}
                        onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                        className="w-full bg-white border border-ims-gold/20 px-10 py-7 rounded-2xl text-[13px] leading-relaxed text-ims-charcoal/70 font-medium tracking-wide focus:border-ims-gold focus:ring-8 focus:ring-ims-gold/5 transition-all outline-none"
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4 group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ims-red/60 ml-1">Emergency Protocol Line</label>
                        <input 
                           type="text" 
                           value={formData.emergencyPhone}
                           onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                           className="w-full bg-white border border-ims-red/10 px-10 py-7 rounded-2xl text-base font-bold text-ims-red focus:border-ims-red focus:ring-8 focus:ring-ims-red/5 transition-all outline-none"
                        />
                     </div>
                     <div className="space-y-4 group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ims-gold/60 ml-1">Executive Headquarters</label>
                        <input 
                           type="text" 
                           value={formData.address}
                           onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                           className="w-full bg-white border border-ims-gold/20 px-10 py-7 rounded-2xl text-[13px] font-bold text-ims-blue focus:border-ims-gold focus:ring-8 focus:ring-ims-gold/5 transition-all outline-none"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar / Assets */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-ims-blue p-12 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group border border-ims-gold/20">
               <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] bg-[size:20px_20px]" />
               </div>
               <div className="absolute top-0 right-0 w-40 h-40 bg-ims-gold/10 blur-[60px] rounded-full" />
               <div className="flex items-center gap-5 mb-12 relative z-10">
                  <div className="w-12 h-12 bg-ims-gold rounded-xl flex items-center justify-center text-ims-blue">
                     <ImageIcon size={24} />
                  </div>
                  <h3 className="text-3xl font-serif text-ims-gold tracking-tight">Media Vault</h3>
               </div>
               <div className="space-y-4 relative z-10">
                  {[
                    { label: "Elite Hero Canvas", res: "1920x1080" },
                    { label: "Narrative Visual", res: "800x1200" },
                    { label: "Gold Signature", res: "200x200" },
                  ].map((asset, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl group hover:bg-ims-gold hover:text-ims-blue transition-all duration-500 cursor-pointer">
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{asset.label}</p>
                           <p className="text-[8px] font-bold opacity-40 uppercase tracking-[0.3em]">{asset.res} • PREMIUM WEBP</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-ims-blue group-hover:text-ims-gold transition-all">
                           <Undo2 size={16} />
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-12 bg-ims-gold text-ims-blue py-6 rounded-xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all relative z-10 shadow-[0_15px_30px_-5px_rgba(197,160,89,0.3)]">
                  Batch Asset Upload
               </button>
            </div>
 
            <div className="bg-white border border-ims-gold/10 p-12 rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)]">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-ims-gold mb-8 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-ims-gold animate-pulse" />
                  Deployment Node
               </h4>
               <div className="flex items-center gap-5 text-green-700 mb-8 bg-green-50 p-6 rounded-2xl border border-green-100">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Environment: Production</p>
               </div>
               <p className="text-[11px] text-ims-blue/40 leading-relaxed font-medium tracking-wide">
                  Changes published to the <span className="text-ims-gold font-bold">Institutional Registry</span> reflect instantly on the public marketing domain. Ensure brand alignment.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
