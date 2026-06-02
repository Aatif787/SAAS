"use client";

import { useEffect, useState } from "react";
import { 
  Calculator, 
  MessageSquare, 
  TrendingUp, 
  Users,
  ArrowUpRight,
  Clock,
  Loader2,
  Search,
  Filter
} from "lucide-react";
import UPVCAdminSidebar from "@/components/upvc/admin/upvc-admin-sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { LeadRecord } from "@/types";

export default function UPVCAdminPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    quotes: 0,
    contacts: 0,
    total: 0,
    revenue: "₹4.2L"
  });

  useEffect(() => {
    async function fetchUPVCLeads() {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();
        if (data.success) {
          const upvcLeads = (data.leads as LeadRecord[]).filter((l) => l.source.includes("upvc"));
          setLeads(upvcLeads);
          
          const quotes = upvcLeads.filter((l) => l.source === "upvc_quote").length;
          const contacts = upvcLeads.filter((l) => l.source === "upvc_contact").length;
          
          setStats(prev => ({
            ...prev,
            quotes,
            contacts,
            total: upvcLeads.length
          }));
        }
      } catch (error) {
        toast.error("Failed to sync UPVC leads");
      } finally {
        setLoading(false);
      }
    }
    fetchUPVCLeads();
  }, []);

  const statCards = [
    { name: "Quote Requests", value: stats.quotes.toString(), change: "+12%", icon: Calculator, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Contact Inquiries", value: stats.contacts.toString(), change: "+5%", icon: MessageSquare, color: "text-upvc-green", bg: "bg-upvc-green/10" },
    { name: "Total Leads", value: stats.total.toString(), change: "+18%", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Est. Revenue", value: stats.revenue, change: "+22%", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex min-h-screen bg-upvc-white">
      <UPVCAdminSidebar />
      
      <main className="flex-1 lg:pl-64">
        <header className="h-20 border-b border-upvc-dark/5 bg-white flex items-center justify-between px-8 sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-bold text-upvc-dark">UPVC Division Overview</h1>
            <p className="text-[10px] text-upvc-dark/40 uppercase tracking-[0.3em] font-bold">Luxury Fenestration Command</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-upvc-dark">Aariz Khan</p>
              <p className="text-[10px] text-upvc-dark/40 uppercase tracking-widest">Division Head</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-upvc-green text-white flex items-center justify-center font-bold shadow-lg shadow-upvc-green/20">AK</div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-white border border-upvc-dark/5 shadow-sm hover:shadow-xl hover:shadow-upvc-green/5 transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn("p-4 rounded-2xl transition-all group-hover:scale-110", stat.bg, stat.color)}>
                       <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-upvc-green bg-upvc-green/10 px-3 py-1 rounded-full border border-upvc-green/10">{stat.change}</span>
                  </div>
                  <p className="text-[10px] text-upvc-dark/40 font-bold uppercase tracking-widest mb-1">{stat.name}</p>
                  <p className="text-4xl font-bold text-upvc-dark tracking-tighter">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Recent Leads */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-upvc-dark">Live Inquiry Feed</h3>
                  <div className="px-3 py-1 bg-upvc-green/10 text-upvc-green text-[9px] font-bold uppercase tracking-widest rounded-full border border-upvc-green/20 animate-pulse">
                    Live
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-3 rounded-xl border border-upvc-dark/5 hover:bg-upvc-white transition-all text-upvc-dark/40 hover:text-upvc-dark">
                      <Search size={18} />
                   </button>
                   <button className="p-3 rounded-xl border border-upvc-dark/5 hover:bg-upvc-white transition-all text-upvc-dark/40 hover:text-upvc-dark">
                      <Filter size={18} />
                   </button>
                </div>
              </div>
              
              <div className="bg-white rounded-[2.5rem] border border-upvc-dark/5 overflow-hidden shadow-sm">
                {loading ? (
                  <div className="py-32 flex flex-col items-center justify-center">
                    <Loader2 size={48} className="animate-spin text-upvc-green mb-6" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-upvc-dark/30">Synchronizing with UPVC database...</p>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-32 flex flex-col items-center justify-center opacity-20">
                    <MessageSquare size={48} className="mb-6" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-upvc-dark/30">No active inquiries</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-upvc-dark/5 bg-upvc-white/50 text-[10px] uppercase tracking-[0.2em] text-upvc-dark/40">
                        <th className="px-8 py-5 font-bold">Client Identity</th>
                        <th className="px-8 py-5 font-bold">Inquiry Type</th>
                        <th className="px-8 py-5 font-bold">Vertical</th>
                        <th className="px-8 py-5 font-bold">Status</th>
                        <th className="px-8 py-5 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-upvc-dark/5">
                      {leads.map((lead) => (
                        <tr key={lead._id} className="group hover:bg-upvc-green/[0.02] transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-upvc-dark/5 flex items-center justify-center font-bold text-upvc-dark/30 border border-upvc-dark/5">
                                  {lead.name[0]}
                               </div>
                               <div>
                                  <p className="font-bold text-upvc-dark text-sm group-hover:text-upvc-green transition-colors">{lead.name}</p>
                                  <p className="text-[10px] text-upvc-dark/40">{lead.email}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border",
                              lead.source === "upvc_quote" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-purple-50 text-purple-600 border-purple-100"
                            )}>
                               {lead.source === "upvc_quote" ? "Quote Request" : "Direct Message"}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-xs font-bold text-upvc-dark/60">{lead.metadata?.product || "Premium UPVC"}</p>
                             <p className="text-[9px] text-upvc-dark/30 uppercase font-medium mt-0.5 tracking-widest flex items-center gap-1.5">
                                <Clock size={10} /> {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}
                             </p>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <div className={cn("w-1.5 h-1.5 rounded-full", lead.status === "new" ? "bg-upvc-green animate-pulse" : "bg-upvc-dark/20")} />
                               <span className={cn(
                                 "text-[9px] font-bold uppercase tracking-widest",
                                 lead.status === "new" ? "text-upvc-green" : "text-upvc-dark/30"
                               )}>{lead.status}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="w-10 h-10 rounded-xl bg-upvc-white border border-upvc-dark/5 text-upvc-dark/20 hover:text-upvc-green hover:border-upvc-green/20 hover:shadow-lg transition-all flex items-center justify-center group/btn">
                              <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-8">
               <div className="p-10 rounded-[2.5rem] bg-upvc-dark text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={160} className="text-upvc-lime" />
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-2xl font-bold mb-6 tracking-tight">Lead Conversion</h3>
                     <div className="flex items-end gap-3 mb-4">
                        <div className="text-6xl font-black text-upvc-lime tracking-tighter">68%</div>
                        <div className="text-[10px] font-bold text-upvc-lime uppercase tracking-widest pb-3">Growth Index</div>
                     </div>
                     <p className="text-white/40 text-sm leading-relaxed mb-10">
                        Strategic response efficiency has increased by <span className="text-white">12.4%</span> this quarter. All systems are optimal.
                     </p>
                     <button className="w-full py-5 rounded-2xl bg-upvc-green text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-upvc-lime hover:text-upvc-dark transition-all shadow-xl shadow-upvc-green/20">
                        Executive Analysis
                     </button>
                  </div>
               </div>

               <div className="p-10 rounded-[2.5rem] bg-white border border-upvc-dark/5 shadow-sm">
                  <h3 className="text-lg font-bold text-upvc-dark mb-8 tracking-tight">Operation Terminal</h3>
                  <div className="space-y-4">
                    {[
                       { label: "Download CSV Archives", icon: Clock },
                       { label: "Email Marketing Engine", icon: MessageSquare },
                       { label: "Sync External Leads", icon: Users },
                       { label: "Platform Settings", icon: TrendingUp }
                    ].map((item) => (
                      <button key={item.label} className="w-full flex items-center justify-between p-5 rounded-2xl border border-upvc-dark/5 text-xs font-bold text-upvc-dark/60 hover:border-upvc-green/30 hover:text-upvc-green hover:bg-upvc-green/[0.02] transition-all group">
                        {item.label}
                        <ArrowUpRight size={16} className="text-upvc-dark/20 group-hover:text-upvc-green transition-colors" />
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
