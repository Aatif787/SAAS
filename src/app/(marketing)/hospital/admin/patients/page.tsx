"use client";

import { useState } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical,
  User,
  Phone,
  Calendar,
  History,
  FileText,
  Download
} from "lucide-react";
import { useHospital } from "@/lib/hospital-store";

export default function AdminPatientsPage() {
  const { appointments } = useHospital();
  const [searchTerm, setSearchTerm] = useState("");

  const mounted = useIsClient();

  // Derive unique patients from appointments
  const patients = mounted ? Array.from(new Set(appointments.map(a => a.patientName))).map(name => {
    const lastApt = appointments.find(a => a.patientName === name);
    return {
      name,
      phone: lastApt?.phone,
      lastVisit: lastApt?.date,
      totalVisits: appointments.filter(a => a.patientName === name).length,
      id: `PAT-${name.substring(0, 2).toUpperCase()}-${(appointments.filter(a => a.patientName === name).length * 100).toString()}` // More stable ID
    };
  }) : [];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Patient Registry</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Electronic Health Records & History</p>
        </div>

        <div className="flex gap-4">
           <button className="bg-white border border-ims-blue/5 text-ims-blue px-8 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-cream transition-all shadow-sm">
             <Download size={16} /> Export Records
           </button>
        </div>
      </header>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search patient by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-ims-blue/5 rounded-sm px-12 py-5 text-xs font-medium focus:outline-none focus:border-ims-blue/20 transition-all shadow-sm"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
        </div>
        <button className="px-8 py-5 bg-white border border-ims-blue/5 rounded-sm flex items-center gap-3 text-ims-blue font-bold uppercase tracking-widest text-[10px] hover:bg-ims-cream transition-all">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Patients Table */}
      <div className="bg-white border border-ims-blue/5 rounded-sm shadow-sm overflow-hidden">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-ims-blue/5">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Patient Profile</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">ID Number</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Last Visit</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Total Cases</th>
                  <th className="px-8 py-4"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-ims-blue/5">
               {filteredPatients.map((p, i) => (
                  <tr key={i} className="hover:bg-ims-blue/[0.02] transition-colors group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-ims-blue/5 rounded-full flex items-center justify-center text-ims-blue group-hover:bg-ims-red group-hover:text-white transition-all">
                              <User size={18} />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-ims-blue">{p.name}</p>
                              <p className="text-[10px] text-ims-charcoal/40 font-bold tracking-widest uppercase">{p.phone}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <code className="text-[10px] font-bold text-ims-gold bg-ims-gold/5 px-2 py-1 rounded-sm">{p.id}</code>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-ims-charcoal/60 text-xs font-medium">
                           <Calendar size={14} className="text-ims-blue/20" />
                           {p.lastVisit}
                        </div>
                     </td>
                     <td className="px-8 py-6 text-center">
                        <span className="text-sm font-bold text-ims-blue">{p.totalVisits}</span>
                     </td>
                     <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-2 text-ims-blue/20 hover:text-ims-blue transition-colors" title="View History">
                              <History size={18} />
                           </button>
                           <button className="p-2 text-ims-blue/20 hover:text-ims-red transition-colors" title="Reports">
                              <FileText size={18} />
                           </button>
                           <button className="p-2 text-ims-blue/20 hover:text-ims-blue transition-colors">
                              <MoreVertical size={18} />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {filteredPatients.length === 0 && (
            <div className="p-20 text-center">
               <p className="text-ims-charcoal/30 text-sm font-medium">No patient records found matching your search.</p>
            </div>
         )}
      </div>
    </div>
  );
}
