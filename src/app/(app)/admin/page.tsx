"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Settings, 
  Briefcase, 
  Layers, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  ShieldAlert,
  Search,
  LayoutDashboard,
  Loader2,
  Calendar
} from "lucide-react";
import LogoutButton from "@/components/ui/logout-button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { LeadRecord } from "@/types";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalUsers: 0,
    revenue: "₹4.2L" // Placeholder or from DB if applicable
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, statsRes] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/admin/stats") // I'll need to create this
        ]);
        
        const leadsData = await leadsRes.json();
        if (leadsData.success) setLeads(leadsData.leads);
        
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.stats);
      } catch (error) {
        console.error("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Revenue", value: stats.revenue, change: "+12%", icon: TrendingUp, color: "text-lime" },
    { label: "Active Users", value: stats.totalUsers.toString(), change: "+5%", icon: Users, color: "text-amber" },
    { label: "Total Leads", value: stats.totalLeads.toString(), change: `+${stats.newLeads}`, icon: MessageSquare, color: "text-orange" },
    { label: "Active Projects", value: "24", change: "+2", icon: Briefcase, color: "text-white" },
  ];

  return (
    <div className="flex min-h-screen bg-obsidian text-white">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-white/5 bg-black/40 backdrop-blur-2xl lg:block">
        <div className="flex h-20 items-center border-b border-white/5 px-6">
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-lg bg-lime flex items-center justify-center text-black font-black">A</div>
             <span className="text-xl font-bold tracking-tighter">ADMIN <span className="text-white/40">PANEL</span></span>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 rounded-xl bg-lime/10 px-4 py-3 text-lime font-medium">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <MessageSquare size={20} /> Leads
          </Link>
          <Link href="/hospital/admin" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Calendar size={20} /> Appointments
          </Link>
          <Link href="/upvc-admin" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Briefcase size={20} /> UPVC Admin
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Settings size={20} /> System Settings
          </Link>
        </nav>
        <div className="absolute bottom-4 w-full px-4">
           <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        <header className="flex h-20 items-center justify-between border-b border-white/5 px-8 bg-black/20 sticky top-0 z-50 backdrop-blur-md">
           <div className="flex items-center gap-4 relative max-w-md w-full">
              <Search className="absolute left-3 text-white/40" size={18} />
              <input 
                type="text" 
                placeholder="Search leads, users, projects..." 
                className="w-full rounded-xl bg-white/5 py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-lime/50 transition-all border border-transparent focus:border-lime/30"
              />
           </div>
           <div className="flex items-center gap-6">
              <button className="relative text-white/60 hover:text-white transition-colors">
                 <ShieldAlert size={22} />
                 <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange text-[10px] font-bold text-black flex items-center justify-center">{stats.newLeads}</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lime">A</div>
           </div>
        </header>

        <div className="p-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
               <h1 className="text-3xl font-bold">System Overview</h1>
               <p className="mt-2 text-white/40">Real-time data synchronization active.</p>
            </div>
            <div className="flex gap-3">
               <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10 transition-all">Export Report</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <div key={stat.label} className="glass rounded-[2rem] p-6 border-white/5 relative overflow-hidden group">
                 <div className={cn("absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity", stat.color)}>
                    <stat.icon size={120} />
                 </div>
                 <div className="flex items-center justify-between">
                    <div className={cn("rounded-xl bg-white/5 p-3", stat.color)}>
                       <stat.icon size={24} />
                    </div>
                    <span className={cn("text-xs font-bold px-2 py-1 rounded-full", stat.color === 'text-white' ? 'bg-white/10 text-white' : 'bg-lime/10 text-lime')}>{stat.change}</span>
                 </div>
                 <p className="mt-6 text-sm font-medium text-white/40 uppercase tracking-widest">{stat.label}</p>
                 <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 glass rounded-[2.5rem] border-white/5 overflow-hidden min-h-[500px]">
               <div className="flex items-center justify-between p-8 border-b border-white/5">
                  <h3 className="text-xl font-bold">Live Inquiries</h3>
                  <button className="text-sm text-lime font-bold hover:underline">Manage All</button>
               </div>
               
               {loading ? (
                 <div className="flex flex-col items-center justify-center py-32 opacity-20">
                    <Loader2 size={40} className="animate-spin mb-4" />
                    <p className="text-sm uppercase tracking-widest font-bold">Syncing Database...</p>
                 </div>
               ) : leads.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-32 opacity-20">
                    <MessageSquare size={40} className="mb-4" />
                    <p className="text-sm uppercase tracking-widest font-bold">No active leads</p>
                 </div>
               ) : (
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-xs font-bold uppercase tracking-widest text-white/30 border-b border-white/5">
                             <th className="px-8 py-4">Client</th>
                             <th className="px-8 py-4">Vertical</th>
                             <th className="px-8 py-4">Date</th>
                             <th className="px-8 py-4 text-right">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {leads.slice(0, 8).map((lead) => (
                            <tr key={lead._id} className="hover:bg-white/[0.02] transition-colors group">
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-white/40">{lead.name[0]}</div>
                                     <div>
                                        <p className="font-bold group-hover:text-lime transition-colors">{lead.name}</p>
                                        <p className="text-xs text-white/40">{lead.email}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-8 py-5">
                                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5">
                                    {lead.source.split('_')[0]}
                                  </span>
                               </td>
                               <td className="px-8 py-5 text-sm text-white/40">
                                 {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}
                               </td>
                               <td className="px-8 py-5 text-right">
                                  <span className={cn(
                                    "rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                                    lead.status === 'new' ? 'bg-orange text-black' : 'bg-lime text-black'
                                  )}>
                                     {lead.status}
                                  </span>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
               )}
            </div>

            {/* Performance Sidebar */}
            <div className="space-y-8">
               <div className="glass rounded-[2.5rem] p-8 border-white/5">
                  <h3 className="text-xl font-bold">Platform Status</h3>
                  <div className="mt-8 space-y-6">
                     {[
                       { label: "MongoDB Atlas", status: "Operational", value: 100, color: "bg-lime" },
                       { label: "Nodemailer SMTP", status: "Active", value: 100, color: "bg-lime" },
                       { label: "Lead Processing", status: "Optimal", value: 95, color: "bg-amber" }
                     ].map((item) => (
                        <div key={item.label} className="space-y-2">
                           <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-white/60">{item.label}</span>
                              <span className="font-bold text-[10px] uppercase tracking-widest text-lime">{item.status}</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full rounded-full shadow-[0_0_10px_rgba(163,255,18,0.2)]", item.color)} 
                                style={{ width: `${item.value}%` }} 
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="glass rounded-[2.5rem] p-8 border-lime/20 bg-gradient-to-br from-lime/5 to-transparent">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                     <ShieldAlert size={20} className="text-amber" />
                     Production Mode
                  </h3>
                  <p className="mt-4 text-white/60 text-sm leading-relaxed">
                     PLATFORM_ENV is set to production. Rate limiting and secure database connections are enforced.
                  </p>
                  <div className="mt-8 pt-8 border-t border-white/5">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2">Connected Database</p>
                     <p className="text-xs font-mono text-white/40 break-all">{process.env.MONGODB_URI?.split('@')[1] || "Cloud Atlas Cluster"}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
