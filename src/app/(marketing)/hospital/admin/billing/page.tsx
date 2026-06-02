"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Download, 
  Plus, 
  Search, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  FileText
} from "lucide-react";
import { useHospital } from "@/lib/hospital-store";

export default function AdminBillingPage() {
  const { payments } = useHospital();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = payments.filter(p => 
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Billing & Revenue</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Financial Operations & Invoice Management</p>
        </div>

        <button className="bg-ims-blue text-white px-8 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-red transition-all shadow-xl">
          <Plus size={16} /> Create New Invoice
        </button>
      </header>

      {/* Financial Overview */}
      <div className="grid grid-cols-3 gap-8 mb-16">
         {[
           { label: "Total Revenue", value: "₹14.2M", change: "+12.5%", icon: <TrendingUp size={24} />, color: "bg-ims-blue" },
           { label: "Pending Dues", value: "₹284k", change: "-2.1%", icon: <Clock size={24} />, color: "bg-ims-gold" },
           { label: "Refunded", value: "₹45k", change: "0%", icon: <CreditCard size={24} />, color: "bg-ims-red" },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-10 border border-ims-blue/5 rounded-sm shadow-sm relative overflow-hidden group">
               <div className={`w-14 h-14 ${stat.color} text-white rounded-sm flex items-center justify-center mb-6`}>
                  {stat.icon}
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-2">{stat.label}</p>
               <div className="flex items-end justify-between">
                  <h4 className="text-4xl font-serif text-ims-blue">{stat.value}</h4>
                  <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-ims-red'}`}>
                     {stat.change}
                  </span>
               </div>
            </div>
         ))}
      </div>

      {/* Transaction List */}
      <div className="bg-white border border-ims-blue/5 rounded-sm shadow-sm overflow-hidden">
         <div className="p-8 border-b border-ims-blue/5 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="relative w-96">
               <input 
                  type="text" 
                  placeholder="Search invoice or patient..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-ims-blue/5 rounded-sm px-12 py-4 text-xs font-medium focus:outline-none focus:border-ims-blue/20 transition-all"
               />
               <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
            </div>
            <div className="flex gap-4">
               <button className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 hover:text-ims-blue flex items-center gap-2">
                  Last 30 Days <ArrowUpRight size={14} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-ims-blue/5">
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Invoice ID</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Patient</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Amount</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Method</th>
                     <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Status</th>
                     <th className="px-8 py-4 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-ims-blue/5">
                  {filtered.map((p, i) => (
                     <tr key={p.id} className="hover:bg-ims-blue/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                           <code className="text-[10px] font-bold text-ims-blue">#{p.id}</code>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold text-ims-blue">{p.patientName}</p>
                           <p className="text-[9px] text-ims-charcoal/40 font-bold uppercase tracking-widest">{p.date}</p>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold text-ims-blue">₹{p.amount.toLocaleString()}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-bold text-ims-charcoal/40 uppercase tracking-widest">{p.method}</span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              {p.status === "Paid" ? (
                                 <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full">
                                    <CheckCircle2 size={12} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Paid</span>
                                 </div>
                              ) : (
                                 <div className="flex items-center gap-2 px-3 py-1 bg-ims-gold/10 text-ims-gold rounded-full">
                                    <Clock size={12} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Pending</span>
                                 </div>
                              )}
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-3 text-ims-blue/20 hover:text-ims-blue hover:bg-ims-blue/5 rounded-sm transition-all" title="Download Invoice">
                              <Download size={18} />
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
