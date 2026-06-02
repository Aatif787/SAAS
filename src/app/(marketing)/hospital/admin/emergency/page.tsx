"use client";

import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  MapPin, 
  Truck, 
  Activity, 
  PhoneCall, 
  Clock, 
  Navigation,
  ChevronRight,
  MoreVertical,
  BellRing
} from "lucide-react";
import { useHospital } from "@/lib/hospital-store";

export default function AdminEmergencyPage() {
  const { emergencies } = useHospital();

  return (
    <div className="flex-1 min-h-screen bg-ims-charcoal p-12">
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-ims-red rounded-sm flex items-center justify-center text-white shadow-3xl shadow-ims-red/20 animate-pulse">
              <ShieldAlert size={32} />
           </div>
           <div>
              <h2 className="text-4xl font-serif text-white mb-2">Emergency Response</h2>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Active Case Tracking • Real-time Dispatch</p>
           </div>
        </div>

        <button className="bg-ims-red text-white px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-white hover:text-ims-red transition-all shadow-3xl shadow-ims-red/20">
           <BellRing size={16} /> Signal Red Alert
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
         {/* Active Cases */}
         <div className="lg:col-span-8 space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6 flex items-center gap-4">
               Live Incident Board <div className="h-[1px] flex-1 bg-white/10" />
            </h3>

            {emergencies.map((ev, i) => (
               <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-sm p-10 flex flex-col md:flex-row items-center justify-between gap-10 hover:bg-white/10 transition-all group"
               >
                  <div className="flex items-center gap-8 flex-1">
                     <div className={`w-14 h-14 rounded-sm flex items-center justify-center ${
                        ev.type === "Ambulance" ? "bg-ims-blue text-white" : "bg-ims-gold text-black"
                     }`}>
                        {ev.type === "Ambulance" ? <Truck size={24} /> : <Activity size={24} />}
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-ims-red">{ev.type} Case</span>
                           <span className="text-[10px] font-bold text-white/20">•</span>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{ev.time}</span>
                        </div>
                        <h4 className="text-2xl font-serif text-white mb-2">{ev.location}</h4>
                        <div className="flex items-center gap-4 text-xs font-medium text-white/60">
                           <MapPin size={14} className="text-ims-red" />
                           GPS Locked • Dispatch Unit A4
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-6">
                     <div className="text-right mr-6">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-1">Status</p>
                        <p className={`text-xs font-bold uppercase tracking-widest ${
                           ev.status === "Responding" ? "text-ims-gold" : "text-green-500"
                        }`}>{ev.status}</p>
                     </div>
                     <button className="px-8 py-4 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-ims-red transition-all flex items-center gap-3">
                        <Navigation size={14} /> View Map
                     </button>
                     <button className="text-white/20 hover:text-white transition-colors">
                        <MoreVertical size={24} />
                     </button>
                  </div>
               </motion.div>
            ))}

            <div className="p-20 border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-6">
                  <Activity size={24} />
               </div>
               <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Scanning Network for Incidents...</p>
            </div>
         </div>

         {/* Unit Status */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-ims-red p-10 rounded-sm shadow-3xl shadow-ims-red/20 relative overflow-hidden">
               <Truck size={100} className="absolute -bottom-4 -right-4 text-white/10 -rotate-12" />
               <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-4">Unit Availability</h4>
               <div className="space-y-6">
                  {[
                    { label: "Ambulance Unit A1", status: "Available", color: "bg-white" },
                    { label: "Ambulance Unit A2", status: "On Mission", color: "bg-white/40" },
                    { label: "Trauma Team 1", status: "Surgery", color: "bg-white/40" },
                    { label: "Life Support S1", status: "Available", color: "bg-white" },
                  ].map((unit, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <p className="text-sm font-bold text-white">{unit.label}</p>
                        <div className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                           unit.status === "Available" ? "bg-white text-ims-red" : "bg-white/20 text-white/60"
                        }`}>
                           {unit.status}
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-10 border border-white/20 text-white py-4 rounded-sm text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-ims-red transition-all">
                  Manage Fleet
               </button>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-sm">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8">Incident Hotspots</h4>
               <div className="space-y-8">
                  {[
                    { loc: "Gomti Nagar", count: 12, trend: "+2" },
                    { loc: "Hazratganj", count: 8, trend: "-1" },
                    { loc: "Aliganj", count: 5, trend: "0" },
                  ].map((h, i) => (
                     <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div>
                           <p className="text-xs font-bold text-white">{h.loc}</p>
                           <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Lucknow Central</p>
                        </div>
                        <div className="text-right">
                           <p className="text-xl font-serif text-ims-red">{h.count}</p>
                           <p className={`text-[8px] font-bold ${h.trend.startsWith('+') ? 'text-ims-gold' : 'text-white/20'}`}>{h.trend} this week</p>
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
