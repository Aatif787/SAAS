"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Hospital, 
  Clock, 
  Globe, 
  CreditCard, 
  Save, 
  CheckCircle2, 
  Undo2,
  ChevronRight,
  Database,
  Lock
} from "lucide-react";

export default function AdminSettingsPage() {
  const SECTIONS = [
    { label: "General Information", icon: <Hospital size={18} />, desc: "Hospital name, address, and legal details" },
    { label: "Working Hours", icon: <Clock size={18} />, desc: "OPD timings and emergency shift controls" },
    { label: "Payment Gateway", icon: <CreditCard size={18} />, desc: "Razorpay, Stripe, and Bank configurations" },
    { label: "Language & Locale", icon: <Globe size={18} />, desc: "Regional settings and translation controls" },
    { label: "System Backup", icon: <Database size={18} />, desc: "Auto-backup and cloud sync settings" },
    { label: "API Configuration", icon: <Lock size={18} />, desc: "Secure endpoints and third-party integrations" },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">System Configuration</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Core Settings & Platform Governance</p>
        </div>

        <button className="bg-ims-blue text-white px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-red transition-all shadow-xl">
           <Save size={16} /> Save All Changes
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
         {/* Navigation Sections */}
         <div className="lg:col-span-4 space-y-4">
            {SECTIONS.map((section, i) => (
               <button 
                  key={i}
                  className={`w-full text-left p-6 rounded-sm border transition-all flex items-center justify-between group ${
                     i === 0 ? 'bg-ims-blue border-ims-blue text-white shadow-xl' : 'bg-white border-ims-blue/5 text-ims-blue hover:border-ims-blue/20'
                  }`}
               >
                  <div className="flex items-center gap-4">
                     <div className={`${i === 0 ? 'text-ims-gold' : 'text-ims-blue/20 group-hover:text-ims-blue'} transition-colors`}>
                        {section.icon}
                     </div>
                     <div>
                        <p className="text-xs font-bold uppercase tracking-widest">{section.label}</p>
                        <p className={`text-[8px] font-bold uppercase tracking-[0.2em] mt-1 ${i === 0 ? 'text-white/40' : 'text-ims-charcoal/30'}`}>
                           {section.desc}
                        </p>
                     </div>
                  </div>
                  <ChevronRight size={14} className={i === 0 ? 'text-white/40' : 'text-ims-blue/10'} />
               </button>
            ))}
         </div>

         {/* Section Editor */}
         <div className="lg:col-span-8 bg-white border border-ims-blue/5 p-12 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-12">
               <h3 className="text-2xl font-serif text-ims-blue">General Information</h3>
               <button className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 hover:text-ims-blue transition-colors flex items-center gap-2">
                  <Undo2 size={14} /> Reset to Defaults
               </button>
            </div>

            <div className="space-y-10">
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Hospital Name</label>
                     <input type="text" defaultValue="IMS Hospital & Research Center" className="w-full bg-[#F8FAFC] border border-ims-blue/10 px-6 py-4 rounded-sm text-sm font-bold text-ims-blue outline-none focus:border-ims-blue transition-all" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Reg. Number</label>
                     <input type="text" defaultValue="LKO-HOSP-2026-X88" className="w-full bg-[#F8FAFC] border border-ims-blue/10 px-6 py-4 rounded-sm text-sm font-bold text-ims-blue outline-none focus:border-ims-blue transition-all" />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Corporate Address</label>
                  <textarea rows={3} defaultValue="Main Road, Block B, Sushant Golf City, Shaheed Path, Lucknow, Uttar Pradesh 226030" className="w-full bg-[#F8FAFC] border border-ims-blue/10 px-6 py-4 rounded-sm text-sm leading-relaxed text-ims-charcoal focus:border-ims-blue transition-all outline-none" />
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Primary Email</label>
                     <input type="email" defaultValue="admin@imshospital.com" className="w-full bg-[#F8FAFC] border border-ims-blue/10 px-6 py-4 rounded-sm text-sm font-bold text-ims-blue outline-none" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Support Phone</label>
                     <input type="text" defaultValue="+91 9699858212" className="w-full bg-[#F8FAFC] border border-ims-blue/10 px-6 py-4 rounded-sm text-sm font-bold text-ims-blue outline-none" />
                  </div>
               </div>

               <div className="pt-8 border-t border-ims-blue/5">
                  <div className="flex items-center justify-between p-6 bg-ims-blue/5 rounded-sm">
                     <div className="flex items-center gap-4">
                        <CheckCircle2 size={20} className="text-green-500" />
                        <div>
                           <p className="text-xs font-bold text-ims-blue">Last Verified</p>
                           <p className="text-[10px] text-ims-charcoal/40 uppercase font-bold tracking-widest">May 01, 2026 • 11:42 AM</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-ims-blue hover:text-ims-red transition-colors">Re-Verify License</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
