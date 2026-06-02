"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  History, 
  Fingerprint, 
  Database, 
  AlertTriangle,
  Terminal,
  Activity,
  MoreVertical,
  ShieldAlert
} from "lucide-react";

export default function AdminSecurityPage() {
  const LOGS = [
    { event: "Successful Login", user: "Admin (Sameer)", ip: "192.168.1.45", time: "Just Now", status: "Success" },
    { event: "Record Accessed", user: "Staff (Priya)", ip: "192.168.1.82", time: "12 mins ago", status: "Success" },
    { event: "Failed Authentication", user: "Unknown", ip: "203.0.113.5", time: "1 hour ago", status: "Warning" },
    { event: "CMS Data Updated", user: "Admin (Sameer)", ip: "192.168.1.45", time: "2 hours ago", status: "Success" },
  ];

  return (
    <div className="flex-1 min-h-screen bg-ims-charcoal p-12">
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-ims-blue rounded-sm flex items-center justify-center text-white border border-white/10 shadow-3xl">
              <ShieldCheck size={32} />
           </div>
           <div>
              <h2 className="text-4xl font-serif text-white mb-2">Security & Governance</h2>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Infrastructure Protection • Audit Logs • MFA</p>
           </div>
        </div>

        <button className="bg-ims-red text-white px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-white hover:text-ims-red transition-all shadow-3xl shadow-ims-red/20">
           <AlertTriangle size={16} /> Force System Lockdown
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
         {/* Security Status Cards */}
         <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-2 gap-8">
               <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:bg-white/10 transition-all cursor-pointer group">
                  <Fingerprint size={32} className="text-ims-red mb-6" />
                  <h4 className="text-xl font-serif text-white mb-2">Multi-Factor (MFA)</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">Required for all clinical and administrative staff accounts.</p>
                  <div className="mt-8 flex items-center gap-3 text-green-500">
                     <div className="w-2 h-2 rounded-full bg-green-500" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Active Enforcement</span>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:bg-white/10 transition-all cursor-pointer group">
                  <Database size={32} className="text-ims-blue mb-6" />
                  <h4 className="text-xl font-serif text-white mb-2">Data Backups</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">Daily encrypted snapshots synced to secure regional clusters.</p>
                  <div className="mt-8 flex items-center gap-3 text-white/20">
                     <span className="text-[10px] font-bold uppercase tracking-widest">Last Backup: 4h ago</span>
                  </div>
               </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
               <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 flex items-center gap-4">
                     System Audit Trail <div className="h-[1px] w-48 bg-white/10" />
                  </h3>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-ims-red hover:text-white transition-colors">Export Logs</button>
               </div>
               <div className="p-0">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-white/5">
                           <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-white/20">Event Descriptor</th>
                           <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-white/20">Originator</th>
                           <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-white/20">IP Address</th>
                           <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-white/20">Timestamp</th>
                           <th className="px-8 py-4"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {LOGS.map((log, i) => (
                           <tr key={i} className="hover:bg-white/5 transition-colors group">
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-3">
                                    {log.status === 'Warning' ? <ShieldAlert size={14} className="text-ims-red" /> : <ShieldCheck size={14} className="text-green-500" />}
                                    <p className="text-xs font-bold text-white">{log.event}</p>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <p className="text-xs font-medium text-white/60">{log.user}</p>
                              </td>
                              <td className="px-8 py-6">
                                 <code className="text-[10px] text-ims-blue font-mono">{log.ip}</code>
                              </td>
                              <td className="px-8 py-6 text-xs text-white/30">{log.time}</td>
                              <td className="px-8 py-6 text-right">
                                 <button className="text-white/20 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Security Pulse */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-ims-blue p-10 rounded-sm shadow-3xl text-white relative overflow-hidden">
               <Terminal size={100} className="absolute -bottom-4 -right-4 text-white/5 -rotate-12" />
               <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8">Access Logic</h4>
               <div className="space-y-6">
                  {[
                    { label: "OAuth 2.0 Layer", status: "Active" },
                    { label: "IP Whitelisting", status: "Enabled" },
                    { label: "Rate Limiting", status: "Dynamic" },
                    { label: "SQL Sanitization", status: "Active" },
                  ].map((s, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.label}</p>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-green-400">{s.status}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-ims-red/10 border border-ims-red/20 p-10 rounded-sm">
               <div className="flex items-center gap-4 mb-6">
                  <ShieldAlert size={24} className="text-ims-red" />
                  <h4 className="text-sm font-bold text-ims-red uppercase tracking-widest">Active Monitoring</h4>
               </div>
               <p className="text-[10px] text-white/40 leading-relaxed font-medium mb-8">
                  Security protocols are currently operating at Level 1 (Optimal). No active threats detected in the last 24 hours.
               </p>
               <button className="w-full py-4 border border-ims-red/20 text-ims-red rounded-sm text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-ims-red hover:text-white transition-all">
                  Run Full Security Audit
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
