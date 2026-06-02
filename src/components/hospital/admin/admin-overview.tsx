"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  UserRound, 
  CalendarCheck, 
  TrendingUp, 
  Search, 
  Bell, 
  ChevronRight,
  MoreVertical,
  Loader2,
  CheckCircle2,
  XCircle,
  Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import { useHospital } from "@/lib/hospital-store";
import type { Doctor } from "@/lib/hospital-data";
import { useIsClient } from "@/hooks/use-is-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AdminOverviewProps {
  onMenuToggle?: () => void;
}

export default function AdminOverview({ onMenuToggle }: AdminOverviewProps) {
  const { doctors, updateDoctorStatus } = useHospital();
  type ApiAppointment = {
    _id: string;
    patientName: string;
    phone: string;
    specialty: string;
    doctor: string;
    date: string;
    time: string;
    status: string;
    token?: string;
  };

  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const mounted = useIsClient();

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      setLoading(true);
      const res = await fetch("/api/hospital/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      toast.error("Failed to sync clinical data");
    } finally {
      setLoading(false);
    }
  }

  const STATS = [
    { label: "Total Patients", value: appointments.length.toLocaleString(), icon: <Users size={24} />, color: "bg-ims-blue/5 text-ims-blue" },
    { label: "Active Doctors", value: doctors.length.toString(), icon: <UserRound size={24} />, color: "bg-ims-red/5 text-ims-red" },
    { label: "Daily Bookings", value: mounted ? appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length : 0, icon: <CalendarCheck size={24} />, color: "bg-ims-gold/5 text-ims-gold" },
    { label: "Net Revenue", value: "₹4.2M", icon: <TrendingUp size={24} />, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="flex-1 min-h-screen bg-white p-4 sm:p-8 lg:p-16 relative overflow-hidden">
      {/* Neo Luxury Background Accents */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ims-gold/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ims-blue/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-24 relative z-10">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-ims-blue mb-3 lg:mb-5 tracking-tight">Executive Overview</h2>
          <div className="flex items-center gap-4">
             <div className="w-12 h-[1px] bg-ims-gold" />
             <p className="text-[9px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.6em] text-ims-gold">Hospital Command Center • {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-10 w-full lg:w-auto">
           <div className="relative group w-full sm:w-[300px] lg:w-[400px]">
              <input 
                type="text" 
                placeholder="Search Executive Archives..." 
                className="w-full bg-white border border-ims-gold/20 rounded-xl px-16 py-6 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-ims-gold focus:ring-8 focus:ring-ims-gold/5 transition-all shadow-none placeholder:text-ims-gold/30"
              />
              <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-ims-gold/40 group-focus-within:text-ims-gold transition-colors" />
           </div>
           <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
              <button 
                onClick={onMenuToggle}
                className="lg:hidden w-16 h-16 bg-white border border-ims-gold/20 rounded-xl flex items-center justify-center text-ims-blue hover:bg-ims-gold hover:text-ims-blue transition-all"
              >
                 <Menu size={24} />
              </button>
              <button className="relative w-16 h-16 bg-white border border-ims-gold/20 rounded-xl flex items-center justify-center text-ims-blue hover:bg-ims-gold hover:text-ims-blue transition-all shadow-none group">
                 <Bell size={24} />
                 <span className="absolute top-5 right-5 w-2 h-2 bg-ims-red border-2 border-white rounded-full" />
              </button>
              <div className="w-16 h-16 bg-ims-blue rounded-xl overflow-hidden border border-ims-gold/20 shadow-2xl hover:scale-105 transition-transform cursor-pointer">
                 <img src="https://ui-avatars.com/api/?name=Admin+User&background=121214&color=fff" alt="Admin" />
              </div>
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16 relative z-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 sm:p-10 lg:p-12 border border-ims-gold/10 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(197,160,89,0.1)] hover:-translate-y-3 transition-all duration-700 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-ims-gold/5 blur-[40px] rounded-full translate-x-10 -translate-y-10 group-hover:bg-ims-gold/10 transition-colors" />
            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mb-10 shadow-none group-hover:bg-ims-gold group-hover:text-ims-blue transition-all duration-700`}>
               {stat.icon}
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-ims-gold/60 mb-3">{stat.label}</p>
            <h4 className="text-5xl font-serif text-ims-blue tracking-tighter">{stat.value}</h4>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12 relative z-10">
        {/* Appointments Table */}
        <div className="lg:col-span-8 bg-white border border-ims-gold/10 rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
           <div className="p-6 sm:p-10 lg:p-12 border-b border-ims-gold/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-ims-blue/5">
              <div className="flex items-center gap-5">
                 <div className="w-1.5 h-10 bg-ims-gold rounded-full" />
                 <h3 className="text-3xl font-serif text-ims-blue">Patient Register</h3>
              </div>
              <button onClick={fetchAppointments} className="text-[9px] font-bold uppercase tracking-[0.4em] text-ims-gold hover:text-white hover:bg-ims-gold flex items-center gap-3 transition-all border border-ims-gold/40 px-8 py-4 rounded-xl">
                 Sync Data <Loader2 size={16} className={cn(loading && "animate-spin")} />
              </button>
           </div>
           <div className="overflow-x-auto">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                   <Loader2 size={40} className="animate-spin text-ims-gold mb-4" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-ims-gold/40">Accessing Clinical Records...</p>
                </div>
              ) : (
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                     <tr className="bg-ims-blue/[0.03]">
                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-ims-blue/40">Patient Profile</th>
                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-ims-blue/40">Specialist</th>
                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-ims-blue/40">Schedule</th>
                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-ims-blue/40">Status</th>
                        <th className="px-10 py-6"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-ims-gold/5">
                     {appointments.map((apt) => (
                        <tr key={apt._id} className="hover:bg-ims-blue/[0.02] transition-all group">
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-ims-blue/5 flex items-center justify-center font-bold text-ims-blue text-xs border border-ims-gold/10">
                                    {apt.patientName[0]}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-ims-blue mb-0.5">{apt.patientName}</p>
                                    <p className="text-[9px] text-ims-gold uppercase font-bold tracking-widest">{apt.token}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <p className="text-sm font-semibold text-ims-charcoal/80">{apt.doctor}</p>
                              <p className="text-[9px] text-ims-blue/40 uppercase font-bold tracking-widest mt-1">{apt.specialty}</p>
                           </td>
                           <td className="px-10 py-8">
                              <div className="text-sm font-semibold text-ims-charcoal/80">
                                 <p>{new Date(apt.date).toLocaleDateString()}</p>
                                 <p className="text-[10px] text-ims-charcoal/40 mt-1">{apt.time}</p>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className={cn(
                                "inline-flex items-center gap-2 px-6 py-2 rounded-xl text-[8px] font-bold uppercase tracking-[0.3em]",
                                apt.status === 'pending' ? 'bg-ims-gold/10 text-ims-gold' : 'bg-green-100 text-green-700'
                              )}>
                                 <div className={cn("w-1.5 h-1.5 rounded-full", apt.status === 'pending' ? 'bg-ims-gold' : 'bg-green-500')} />
                                 {apt.status}
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="w-10 h-10 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all flex items-center justify-center border border-green-100">
                                    <CheckCircle2 size={16} />
                                 </button>
                                 <button className="w-10 h-10 rounded-xl bg-ims-red/5 text-ims-red hover:bg-ims-red hover:text-white transition-all flex items-center justify-center border border-ims-red/10">
                                    <XCircle size={16} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
                </table>
              )}
           </div>
        </div>

        {/* Doctor Availability Mini-List */}
        <div className="lg:col-span-4 space-y-12">
           <div className="bg-white border border-ims-gold/10 p-6 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-ims-gold/5 blur-[50px] rounded-full" />
              <h3 className="text-ims-blue text-3xl font-serif mb-12 relative z-10 tracking-tight">Staffing Suite</h3>
              <div className="space-y-8 relative z-10">
                 {doctors.map((doc: Doctor) => (
                    <div key={doc.id} className="flex items-center justify-between group/doc">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-ims-blue/10 group-hover/doc:border-ims-blue/30 transition-all duration-500">
                             <img src={doc.img} alt={doc.name} className="object-cover w-full h-full group-hover/doc:scale-110 transition-transform duration-700" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-ims-blue leading-tight mb-1">{doc.name}</p>
                             <select 
                                value={doc.status}
                                onChange={(e) => updateDoctorStatus(doc.id, e.target.value as Doctor["status"])}
                                className="bg-transparent text-[9px] text-ims-blue/40 uppercase tracking-[0.2em] font-bold border-0 p-0 focus:ring-0 cursor-pointer hover:text-ims-blue transition-colors outline-none"
                             >
                                <option className="text-ims-blue" value="Active">Active</option>
                                <option className="text-ims-blue" value="Surgery">Surgery</option>
                                <option className="text-ims-blue" value="On-Leave">On-Leave</option>
                             </select>
                          </div>
                       </div>
                       <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] ${
                          doc.status === "Active" ? "bg-green-500 shadow-green-500/50" : 
                          doc.status === "Surgery" ? "bg-ims-gold shadow-ims-gold/50" : 
                          "bg-ims-red shadow-ims-red/50"
                       }`} />
                    </div>
                 ))}
              </div>
              <button className="w-full mt-12 bg-white/5 border border-ims-blue/10 text-ims-blue/60 py-5 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-ims-blue hover:text-white hover:border-ims-blue transition-all relative z-10">
                 Full Staff Management
              </button>
           </div>

           <div className="bg-ims-gold p-6 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <TrendingUp size={120} className="absolute -bottom-6 -right-6 text-black/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
              <h4 className="text-black text-xs font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-ims-blue animate-pulse" />
                 Live Analytics
              </h4>
              <p className="text-black text-4xl font-serif leading-tight tracking-tight">{mounted ? Math.floor(Math.random() * 20) + 5 : 12}% Reach <br /> Growth</p>
              <p className="mt-6 text-black/50 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">Real-time engagement metrics from the global platform.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
