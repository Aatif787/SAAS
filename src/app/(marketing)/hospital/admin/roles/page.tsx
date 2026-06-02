"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  UserPlus, 
  Key, 
  Search, 
  MoreVertical, 
  ShieldAlert, 
  Users,
  Settings2,
  Lock,
  Eye,
  CheckCircle2,
  X
} from "lucide-react";

export default function AdminRolesPage() {
  const ROLES = [
    { name: "Super Admin", count: 2, access: "Full System Access", color: "text-ims-red" },
    { name: "Medical Staff", count: 18, access: "Appointments & Records", color: "text-ims-blue" },
    { name: "Billing Dept", count: 4, access: "Invoices & Revenue", color: "text-ims-gold" },
    { name: "Support Team", count: 6, access: "Emergency & Chat", color: "text-ims-blue" },
  ];

  const STAFF = [
    { name: "Sameer Verma", role: "Super Admin", email: "sameer@imshospital.com", status: "Active" },
    { name: "Priya Singh", role: "Medical Staff", email: "priya.s@imshospital.com", status: "Active" },
    { name: "Arjun Dev", role: "Billing Dept", email: "arjun.d@imshospital.com", status: "On-Leave" },
    { name: "Anjali Rao", role: "Support Team", email: "anjali.r@imshospital.com", status: "Active" },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Access Control</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Manage Roles, Permissions & Security Protocols</p>
        </div>

        <button className="bg-ims-blue text-white px-8 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-red transition-all shadow-xl">
          <UserPlus size={16} /> Create Staff Account
        </button>
      </header>

      {/* Roles Summary */}
      <div className="grid md:grid-cols-4 gap-8 mb-16">
         {ROLES.map((role, i) => (
            <div key={i} className="bg-white p-8 border border-ims-blue/5 rounded-sm shadow-sm group hover:shadow-xl transition-all">
               <div className="flex items-center justify-between mb-6">
                  <div className={`w-10 h-10 bg-ims-blue/5 flex items-center justify-center rounded-sm ${role.color}`}>
                     <ShieldCheck size={20} />
                  </div>
                  <span className="text-2xl font-serif text-ims-blue">{role.count}</span>
               </div>
               <h4 className="text-sm font-bold text-ims-blue mb-2">{role.name}</h4>
               <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30">{role.access}</p>
            </div>
         ))}
      </div>

      {/* Staff Management Table */}
      <div className="bg-white border border-ims-blue/5 rounded-sm shadow-sm overflow-hidden">
         <div className="p-8 border-b border-ims-blue/5 flex items-center justify-between">
            <h3 className="text-xl font-serif text-ims-blue">Administrative Directory</h3>
            <div className="flex gap-4">
               <div className="relative w-64">
                  <input type="text" placeholder="Search staff..." className="w-full bg-[#F8FAFC] border border-ims-blue/5 rounded-sm px-10 py-3 text-[10px] font-bold uppercase tracking-widest outline-none" />
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
               </div>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-ims-blue/5">
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Staff Member</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Assigned Role</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Access Permissions</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Account Status</th>
                     <th className="px-8 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-ims-blue/5">
                  {STAFF.map((staff, i) => (
                     <tr key={i} className="hover:bg-ims-blue/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold text-ims-blue">{staff.name}</p>
                           <p className="text-[9px] text-ims-charcoal/30 uppercase font-bold tracking-widest">{staff.email}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-ims-blue bg-ims-blue/5 px-3 py-1 rounded-sm">{staff.role}</span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex gap-2">
                              <Lock size={12} className="text-ims-blue/20" />
                              <Eye size={12} className="text-ims-blue/20" />
                              <Settings2 size={12} className="text-ims-blue/20" />
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-green-500' : 'bg-ims-gold'}`} />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/40">{staff.status}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="text-ims-blue/20 hover:text-ims-blue transition-colors">
                              <MoreVertical size={18} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
