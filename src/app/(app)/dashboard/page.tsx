import Link from "next/link";
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  Layers, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import LogoutButton from "@/components/ui/logout-button";

export default function DashboardPage() {
  // Mock data for now - in a real app, fetch from server component or API
  const user = { name: "Aariz", role: "user" };
  const requests = [
    { id: "1", title: "Corporate Portfolio", status: "In Progress", date: "Oct 24, 2024" },
    { id: "2", title: "E-commerce Landing", status: "Pending", date: "Oct 25, 2024" },
  ];
  
  const selectedTemplates = [
    { id: "t1", name: "Modern SaaS", category: "Business", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" },
  ];

  return (
    <div className="flex min-h-screen bg-obsidian text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl lg:block">
        <div className="flex h-20 items-center border-b border-white/5 px-6">
          <span className="text-xl font-bold tracking-tighter text-lime">IMS <span className="text-white/40">Studio</span></span>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-lime/10 px-4 py-3 text-lime font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/templates" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Layers size={20} /> Templates
          </Link>
          <Link href="/dashboard/projects" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Briefcase size={20} /> My Projects
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/5 transition-all">
            <Settings size={20} /> Settings
          </Link>
        </nav>
        <div className="absolute bottom-4 w-full px-4">
           <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        {/* Top Header */}
        <header className="flex h-20 items-center justify-between border-b border-white/5 px-8">
           <h2 className="text-lg font-semibold">Welcome back, {user.name}</h2>
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-lime to-amber p-[2px]">
                 <div className="h-full w-full rounded-full bg-black flex items-center justify-center font-bold">A</div>
              </div>
           </div>
        </header>

        <div className="p-8">
           <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                 {/* Stats Cards */}
                 <div className="grid gap-4 sm:grid-cols-3">
                    <div className="glass rounded-2xl p-6">
                       <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Total Projects</p>
                       <p className="mt-2 text-3xl font-bold">12</p>
                    </div>
                    <div className="glass rounded-2xl p-6">
                       <p className="text-sm font-medium text-white/40 uppercase tracking-widest">In Progress</p>
                       <p className="mt-2 text-3xl font-bold text-amber">02</p>
                    </div>
                    <div className="glass rounded-2xl p-6">
                       <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Completed</p>
                       <p className="mt-2 text-3xl font-bold text-lime">10</p>
                    </div>
                 </div>

                 {/* Project Requests */}
                 <section>
                    <div className="mb-6 flex items-center justify-between">
                       <h3 className="text-xl font-bold">Recent Requests</h3>
                       <Link href="/dashboard/projects" className="text-sm text-lime hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                       {requests.map((req) => (
                         <div key={req.id} className="glass flex items-center justify-between rounded-2xl p-5 border-white/5 hover:border-white/10 transition-all">
                            <div className="flex items-center gap-4">
                               <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${req.status === 'In Progress' ? 'bg-amber/10 text-amber' : 'bg-white/5 text-white/40'}`}>
                                  {req.status === 'In Progress' ? <Clock size={24} /> : <AlertCircle size={24} />}
                               </div>
                               <div>
                                  <h4 className="font-bold">{req.title}</h4>
                                  <p className="text-sm text-white/40">Submitted on {req.date}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${req.status === 'In Progress' ? 'bg-amber text-black' : 'bg-white/10 text-white'}`}>
                                  {req.status}
                               </span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* Selected Templates */}
                 <section>
                    <h3 className="mb-6 text-xl font-bold">Saved Templates</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                       {selectedTemplates.map((temp) => (
                         <div key={temp.id} className="group glass-card overflow-hidden rounded-2xl border-white/5">
                            <div className="aspect-video relative overflow-hidden">
                               <img src={temp.image} alt={temp.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Link href={`/templates/${temp.id}`} className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black">Preview</Link>
                               </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                               <div>
                                  <h4 className="font-bold">{temp.name}</h4>
                                  <p className="text-xs text-white/40">{temp.category}</p>
                               </div>
                               <Link href={`/templates/${temp.id}/request`} className="text-lime"><ExternalLink size={20} /></Link>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>

              {/* Sidebar Column */}
              <div className="space-y-8">
                 <div className="glass rounded-3xl p-8 border-lime/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <CheckCircle2 size={120} className="text-lime" />
                    </div>
                    <h3 className="text-2xl font-bold">Growth Tip</h3>
                    <p className="mt-4 text-white/60 leading-relaxed">
                       Adding contextual AI chatbots to your landing pages can increase 
                       lead generation by up to 35%. Check out our AI packs in the services page.
                    </p>
                    <Link href="/#ai" className="mt-8 inline-block text-lime font-bold hover:underline">Explore AI Solutions</Link>
                 </div>

                 <div className="glass rounded-3xl p-8 border-orange/20">
                    <h3 className="text-xl font-bold">Support</h3>
                    <p className="mt-4 text-white/60">Need help with your project? Our team is available for a call.</p>
                    <div className="mt-6 space-y-3">
                       <a href="#" className="flex items-center gap-3 text-sm font-medium hover:text-orange transition-colors">
                          <div className="h-8 w-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange"><Clock size={16} /></div>
                          Schedule a Call
                       </a>
                       <a href="#" className="flex items-center gap-3 text-sm font-medium hover:text-orange transition-colors">
                          <div className="h-8 w-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange"><LayoutDashboard size={16} /></div>
                          Open Support Ticket
                       </a>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
