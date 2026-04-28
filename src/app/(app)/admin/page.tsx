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
  Search
} from "lucide-react";
import LogoutButton from "@/components/ui/logout-button";

export default function AdminDashboardPage() {
  // Mock data for admin
  const stats = [
    { label: "Total Revenue", value: "$42.5k", change: "+12%", icon: TrendingUp, color: "text-lime" },
    { label: "Active Users", value: "842", change: "+5%", icon: Users, color: "text-amber" },
    { label: "Active Projects", value: "24", change: "+2", icon: Briefcase, color: "text-orange" },
    { label: "Pending Leads", value: "18", change: "New", icon: MessageSquare, color: "text-white" },
  ];

  const recentLeads = [
    { id: "1", name: "Sarah Connor", email: "sarah@skynet.com", source: "Contact Form", date: "2 mins ago", status: "New" },
    { id: "2", name: "Tony Stark", email: "tony@stark.com", source: "WhatsApp", date: "1 hour ago", status: "In Touch" },
    { id: "3", name: "Bruce Wayne", email: "bruce@wayne.com", source: "Template Selection", date: "4 hours ago", status: "Contacted" },
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
          <Link href="/admin/users" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Users size={20} /> Users
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <MessageSquare size={20} /> Leads
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Briefcase size={20} /> Projects
          </Link>
          <Link href="/admin/templates" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Layers size={20} /> Templates
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
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-white/5 px-8 bg-black/20">
           <div className="flex items-center gap-4 relative max-w-md w-full">
              <Search className="absolute left-3 text-white/40" size={18} />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="w-full rounded-xl bg-white/5 py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-lime/50 transition-all border border-transparent focus:border-lime/30"
              />
           </div>
           <div className="flex items-center gap-6">
              <button className="relative text-white/60 hover:text-white transition-colors">
                 <ShieldAlert size={22} />
                 <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange text-[10px] font-bold text-black flex items-center justify-center">3</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                 <Settings size={18} />
              </div>
           </div>
        </header>

        <div className="p-8">
           <div className="mb-10 flex items-end justify-between">
              <div>
                 <h1 className="text-3xl font-bold">System Overview</h1>
                 <p className="mt-2 text-white/40">Your agency is performing <span className="text-lime">excellent</span> today.</p>
              </div>
              <div className="flex gap-3">
                 <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10 transition-all">Export Report</button>
                 <button className="rounded-xl bg-lime px-4 py-2 text-sm font-bold text-black hover:scale-105 transition-all">Add Service</button>
              </div>
           </div>

           {/* Stats Grid */}
           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-[2rem] p-6 border-white/5 relative overflow-hidden group">
                   <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
                      <stat.icon size={120} />
                   </div>
                   <div className="flex items-center justify-between">
                      <div className={`rounded-xl bg-white/5 p-3 ${stat.color}`}>
                         <stat.icon size={24} />
                      </div>
                      <span className={`text-xs font-bold ${stat.color === 'text-white' ? 'bg-white/10 text-white' : 'bg-lime/10 text-lime'} px-2 py-1 rounded-full`}>{stat.change}</span>
                   </div>
                   <p className="mt-6 text-sm font-medium text-white/40 uppercase tracking-widest">{stat.label}</p>
                   <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
           </div>

           {/* Content Grid */}
           <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {/* Recent Leads Table */}
              <div className="lg:col-span-2 glass rounded-[2.5rem] border-white/5 overflow-hidden">
                 <div className="flex items-center justify-between p-8 border-b border-white/5">
                    <h3 className="text-xl font-bold">Recent Leads</h3>
                    <Link href="/admin/leads" className="text-sm text-lime font-bold hover:underline">View All Leads</Link>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-xs font-bold uppercase tracking-widest text-white/30 border-b border-white/5">
                             <th className="px-8 py-4">Client</th>
                             <th className="px-8 py-4">Source</th>
                             <th className="px-8 py-4">Time</th>
                             <th className="px-8 py-4 text-right">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {recentLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-white/40">{lead.name[0]}</div>
                                     <div>
                                        <p className="font-bold group-hover:text-lime transition-colors">{lead.name}</p>
                                        <p className="text-xs text-white/40">{lead.email}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-8 py-5 text-sm font-medium text-white/60">{lead.source}</td>
                               <td className="px-8 py-5 text-sm text-white/40">{lead.date}</td>
                               <td className="px-8 py-5 text-right">
                                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                                    lead.status === 'New' ? 'bg-orange text-black' : 
                                    lead.status === 'In Touch' ? 'bg-amber text-black' : 
                                    'bg-lime text-black'
                                  }`}>
                                     {lead.status}
                                  </span>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* System Performance Sidebar */}
              <div className="space-y-8">
                 <div className="glass rounded-[2.5rem] p-8 border-white/5">
                    <h3 className="text-xl font-bold">Request Status</h3>
                    <div className="mt-8 space-y-6">
                       <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                             <span className="font-medium text-white/60">Development</span>
                             <span className="font-bold">75%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full w-3/4 bg-lime rounded-full shadow-[0_0_10px_rgba(163,255,18,0.4)]" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                             <span className="font-medium text-white/60">SEO Optimization</span>
                             <span className="font-bold">40%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full w-2/5 bg-amber rounded-full shadow-[0_0_10px_rgba(255,193,7,0.4)]" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                             <span className="font-medium text-white/60">Content Strategy</span>
                             <span className="font-bold">90%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full w-[90%] bg-orange rounded-full shadow-[0_0_10px_rgba(255,107,0,0.4)]" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="glass rounded-[2.5rem] p-8 border-lime/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       <CheckCircle2 size={20} className="text-lime" />
                       Audit Complete
                    </h3>
                    <p className="mt-4 text-white/60 text-sm leading-relaxed">
                       The platform security audit was successful. All API endpoints 
                       are secured and rate limiting is active.
                    </p>
                    <button className="mt-8 text-sm font-bold text-lime hover:underline">View Audit Log</button>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

// Sub-component for LayoutDashboard since it was missing in imports
function LayoutDashboard({ size }: { size: number }) {
  return <TrendingUp size={size} />; // Fallback icon
}
