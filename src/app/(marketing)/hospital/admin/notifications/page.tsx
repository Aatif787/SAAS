"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Send, 
  Users, 
  History, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  MoreVertical,
  Search
} from "lucide-react";

export default function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState("compose");

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Patient Communications</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Automated Messaging & Notification Hub</p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white border border-ims-blue/5 px-6 py-4 rounded-sm flex items-center gap-4 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-ims-red animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-ims-blue">
                 System: Online
              </p>
           </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-12 border-b border-ims-blue/5 mb-12">
         {["compose", "history", "templates", "reminders"].map(tab => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`pb-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${
                  activeTab === tab ? "text-ims-blue" : "text-ims-charcoal/30 hover:text-ims-blue"
               }`}
            >
               {tab}
               {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-ims-red" />
               )}
            </button>
         ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
         {/* Main Action Area */}
         <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
               {activeTab === "compose" ? (
                  <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="bg-white border border-ims-blue/5 p-12 rounded-sm shadow-sm"
                  >
                     <div className="space-y-10">
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Channel</label>
                              <div className="flex gap-4">
                                 <button className="flex-1 py-4 bg-ims-blue text-white rounded-sm flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest">
                                    <MessageSquare size={16} /> SMS
                                 </button>
                                 <button className="flex-1 py-4 bg-[#F8FAFC] border border-ims-blue/5 text-ims-blue rounded-sm flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest hover:bg-ims-cream transition-all">
                                    <Mail size={16} /> Email
                                 </button>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Audience</label>
                              <select className="w-full bg-[#F8FAFC] border border-ims-blue/10 px-6 py-4 rounded-sm text-xs font-bold text-ims-blue outline-none">
                                 <option>All Registered Patients</option>
                                 <option>Today&apos;s Appointments</option>
                                 <option>Pending Follow-ups</option>
                                 <option>Specific Department</option>
                              </select>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 ml-1">Message Content</label>
                           <textarea 
                              rows={6}
                              placeholder="Type your message here..."
                              className="w-full bg-[#F8FAFC] border border-ims-blue/10 px-8 py-6 rounded-sm text-sm leading-relaxed text-ims-blue focus:border-ims-blue transition-all outline-none"
                           />
                           <p className="text-[9px] font-bold text-ims-charcoal/20 uppercase text-right">0 / 160 Characters (1 Credit)</p>
                        </div>

                        <div className="pt-8 border-t border-ims-blue/5 flex items-center justify-between">
                           <div className="flex items-center gap-3 text-ims-gold">
                              <Zap size={16} />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Instant Delivery Enabled</span>
                           </div>
                           <button className="bg-ims-blue text-white px-12 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 hover:bg-ims-red transition-all shadow-xl">
                              Broadcast Notification <Send size={16} />
                           </button>
                        </div>
                     </div>
                  </motion.div>
               ) : (
                  <div className="p-20 text-center bg-white border border-ims-blue/5 rounded-sm">
                     <History size={48} className="text-ims-blue/10 mx-auto mb-6" />
                     <p className="text-ims-charcoal/30 text-sm font-medium">History records will appear here as you broadcast messages.</p>
                  </div>
               )}
            </AnimatePresence>
         </div>

         {/* Stats Sidebar */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-ims-blue p-10 rounded-sm shadow-xl text-white">
               <h3 className="text-xl font-serif mb-8">System Health</h3>
               <div className="space-y-8">
                  {[
                    { label: "SMS Credits", value: "48,290", icon: <MessageSquare size={18} /> },
                    { label: "Email Server", value: "Active", icon: <Mail size={18} /> },
                    { label: "Delivery Rate", value: "99.8%", icon: <CheckCircle2 size={18} /> },
                  ].map((s, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-white/40">
                           {s.icon}
                           <span className="text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                        </div>
                        <span className="text-sm font-bold">{s.value}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-10 border border-ims-blue/5 rounded-sm shadow-sm">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 mb-6">Recent Reminders Sent</h4>
               <div className="space-y-6">
                  {[
                    { name: "Rahul Gupta", time: "2 mins ago", status: "Sent" },
                    { name: "Aditi Sharma", time: "15 mins ago", status: "Delivered" },
                    { name: "Amit Singh", time: "1 hour ago", status: "Delivered" },
                  ].map((r, i) => (
                     <div key={i} className="flex items-center justify-between border-b border-ims-blue/5 pb-4 last:border-0 last:pb-0">
                        <div>
                           <p className="text-xs font-bold text-ims-blue">{r.name}</p>
                           <p className="text-[9px] text-ims-charcoal/30 uppercase font-bold tracking-widest">{r.time}</p>
                        </div>
                        <div className="text-[8px] font-bold uppercase tracking-widest text-green-500 bg-green-50 px-2 py-1 rounded-sm">
                           {r.status}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
