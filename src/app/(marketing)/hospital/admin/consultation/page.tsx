"use client";

import { motion } from "framer-motion";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Activity,
  History
} from "lucide-react";

export default function AdminConsultationPage() {
  const SESSIONS = [
    { patient: "Aditi Sharma", doctor: "Dr. Alok Verma", time: "10:30 AM", status: "In-Progress", room: "MED-ROOM-01" },
    { patient: "Rahul Gupta", doctor: "Dr. Sarah Khan", time: "11:15 AM", status: "Waiting", room: "MED-ROOM-02" },
    { patient: "Amit Singh", doctor: "Dr. Meera Iyer", time: "12:00 PM", status: "Scheduled", room: "MED-ROOM-03" },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Digital Consultations</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Manage Telemedicine & Virtual Sessions</p>
        </div>

        <div className="flex gap-4">
           <button className="bg-ims-blue text-white px-8 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-red transition-all shadow-xl">
             <Video size={16} /> Start Instant Session
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
         {/* Live Sessions */}
         <div className="lg:col-span-8 space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-ims-charcoal/40 mb-6 flex items-center gap-4">
               Active Virtual Queue <div className="h-[1px] flex-1 bg-ims-blue/5" />
            </h3>

            {SESSIONS.map((session, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-ims-blue/5 p-8 rounded-sm flex items-center justify-between group hover:shadow-xl transition-all"
               >
                  <div className="flex items-center gap-8">
                     <div className={`w-16 h-16 rounded-sm flex items-center justify-center ${
                        session.status === 'In-Progress' ? 'bg-ims-red text-white' : 'bg-ims-blue/5 text-ims-blue'
                     }`}>
                        {session.status === 'In-Progress' ? <Activity size={24} className="animate-pulse" /> : <Video size={24} />}
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-2">
                           <span className={`text-[10px] font-bold uppercase tracking-widest ${
                              session.status === 'In-Progress' ? 'text-ims-red' : 'text-ims-gold'
                           }`}>{session.status}</span>
                           <span className="text-[10px] font-bold text-ims-charcoal/20">•</span>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40">{session.room}</span>
                        </div>
                        <h4 className="text-xl font-serif text-ims-blue mb-1">{session.patient}</h4>
                        <p className="text-xs font-bold text-ims-charcoal/40 uppercase tracking-widest">{session.doctor} • {session.time}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <button className="px-6 py-3 border border-ims-blue/10 text-ims-blue text-[9px] font-bold uppercase tracking-widest rounded-sm hover:bg-ims-blue hover:text-white transition-all flex items-center gap-2">
                        <ExternalLink size={14} /> Join Room
                     </button>
                     <button className="p-3 text-ims-blue/20 hover:text-ims-blue transition-colors">
                        <MoreVertical size={20} />
                     </button>
                  </div>
               </motion.div>
            ))}

            <div className="p-12 border border-dashed border-ims-blue/10 rounded-sm flex items-center justify-center gap-4 text-ims-charcoal/30">
               <History size={18} />
               <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Viewing scheduled sessions for May 02, 2026</p>
            </div>
         </div>

         {/* Network & Hardware Status */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-ims-blue p-10 rounded-sm shadow-xl text-white">
               <h3 className="text-xl font-serif mb-8">Infrastructure</h3>
               <div className="space-y-6">
                  {[
                    { label: "Server Latency", value: "24ms", color: "text-green-400" },
                    { label: "Active Rooms", value: "08 / 20", color: "text-white" },
                    { label: "Bandwidth Usage", value: "1.2 Gbps", color: "text-white" },
                    { label: "Recording API", value: "Standby", color: "text-ims-gold" },
                  ].map((stat, i) => (
                     <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                        <p className={`text-xs font-bold ${stat.color}`}>{stat.value}</p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-10 border border-ims-blue/5 rounded-sm shadow-sm relative overflow-hidden">
               <MessageSquare size={60} className="absolute -bottom-4 -right-4 text-ims-blue/5 -rotate-12" />
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40 mb-6">Patient Feedback</h4>
               <p className="text-sm font-serif text-ims-blue italic leading-relaxed mb-4">&ldquo;The virtual consultation was seamless. Dr. Alok explained the reports very clearly through the screen share.&rdquo;</p>
               <p className="text-[9px] font-bold uppercase tracking-widest text-ims-gold">— Aditi Sharma, Cardio Patient</p>
            </div>
         </div>
      </div>
    </div>
  );
}
