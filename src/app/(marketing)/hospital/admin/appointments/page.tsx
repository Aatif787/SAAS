"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar,
  MoreVertical,
  CalendarDays,
  User,
  Stethoscope
} from "lucide-react";
import { useHospital } from "@/lib/hospital-store";

export default function AdminAppointmentsPage() {
  const { appointments, updateStatus } = useHospital();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Clinical Appointments</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Real-time scheduling & dispatch control</p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white border border-ims-blue/5 px-6 py-4 rounded-sm flex items-center gap-4 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-ims-gold animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-ims-blue">
                 {appointments.filter(a => a.status === "Pending").length} Pending Requests
              </p>
           </div>
        </div>
      </header>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by patient, doctor or specialty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-ims-blue/5 rounded-sm px-12 py-5 text-xs font-medium focus:outline-none focus:border-ims-blue/20 transition-all shadow-sm"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
        </div>
        <button className="px-8 py-5 bg-white border border-ims-blue/5 rounded-sm flex items-center gap-3 text-ims-blue font-bold uppercase tracking-widest text-[10px] hover:bg-ims-cream transition-all">
          <Filter size={16} /> Advanced Filter
        </button>
      </div>

      {/* Appointments List */}
      <div className="grid gap-6">
        <AnimatePresence>
          {filtered.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-ims-blue/5 rounded-sm p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-8 min-w-[300px]">
                 <div className="w-16 h-16 bg-ims-blue/5 rounded-sm flex items-center justify-center text-ims-blue group-hover:bg-ims-blue group-hover:text-white transition-all">
                    <User size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-serif text-ims-blue mb-1">{apt.patientName}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40">{apt.phone}</p>
                 </div>
              </div>

              <div className="flex-1 grid md:grid-cols-3 gap-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-ims-gold/5 text-ims-gold flex items-center justify-center rounded-full">
                       <Stethoscope size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">Assigned Doctor</p>
                       <p className="text-xs font-bold text-ims-blue">{apt.doctor}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-ims-blue/5 text-ims-blue flex items-center justify-center rounded-full">
                       <Calendar size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">Date & Time</p>
                       <p className="text-xs font-bold text-ims-blue">{apt.date} | {apt.time}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                       apt.status === "Confirmed" ? "bg-green-100 text-green-600" :
                       apt.status === "Pending" ? "bg-ims-gold/10 text-ims-gold" :
                       "bg-ims-red/10 text-ims-red"
                    }`}>
                       {apt.status === "Confirmed" ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                    </div>
                    <div>
                       <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">Status</p>
                       <p className={`text-xs font-bold uppercase tracking-widest ${
                          apt.status === "Confirmed" ? "text-green-600" :
                          apt.status === "Pending" ? "text-ims-gold" :
                          "text-ims-red"
                       }`}>{apt.status}</p>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4 pt-8 lg:pt-0 border-t lg:border-0 border-ims-blue/5">
                 {apt.status === "Pending" && (
                    <button 
                       onClick={() => updateStatus(apt.id, "Confirmed")}
                       className="px-6 py-3 bg-green-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-sm hover:bg-green-700 transition-all flex items-center gap-2"
                    >
                       <CheckCircle2 size={14} /> Approve
                    </button>
                 )}
                 <button className="px-6 py-3 border border-ims-blue/10 text-ims-blue text-[9px] font-bold uppercase tracking-widest rounded-sm hover:bg-ims-blue hover:text-white transition-all flex items-center gap-2">
                    <CalendarDays size={14} /> Reschedule
                 </button>
                 <button className="p-3 text-ims-blue/20 hover:text-ims-red transition-colors">
                    <MoreVertical size={20} />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
