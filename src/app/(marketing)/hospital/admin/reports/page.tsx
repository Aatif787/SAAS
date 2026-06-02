"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Users, 
  Activity, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  FileJson
} from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-4 sm:p-8 lg:p-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-12 lg:mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Clinical Analytics</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Statistical performance & data insights</p>
        </div>

        <div className="flex gap-4">
           <button className="bg-white border border-ims-blue/5 text-ims-blue px-8 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-cream transition-all shadow-sm">
             <FileSpreadsheet size={16} /> Export Excel
           </button>
           <button className="bg-ims-blue text-white px-8 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-red transition-all shadow-xl">
             <Download size={16} /> Download PDF
           </button>
        </div>
      </header>

      {/* Primary Analytics Grid */}
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
         {/* Main Growth Chart (SVG Simulation) */}
         <div className="lg:col-span-8 bg-white border border-ims-blue/5 p-6 sm:p-10 lg:p-12 rounded-sm shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-xl font-serif text-ims-blue">Patient Inflow Analytics</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/30 mt-1">Growth comparison vs previous quarter</p>
               </div>
               <div className="flex gap-8">
                  <div className="text-right">
                     <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">Monthly Peak</p>
                     <p className="text-sm font-bold text-ims-blue">1,482 Patients</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">Growth Rate</p>
                     <p className="text-sm font-bold text-green-500">+24.8%</p>
                  </div>
               </div>
            </div>

            {/* Simulated SVG Line Chart */}
            <div className="h-80 w-full relative group">
               <svg viewBox="0 0 1000 400" className="w-full h-full preserve-3d overflow-visible">
                  <defs>
                     <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#121214" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#121214" stopOpacity="0" />
                     </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  {[0, 100, 200, 300, 400].map(y => (
                     <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#121214" strokeOpacity="0.05" strokeWidth="1" />
                  ))}
                  {/* Area */}
                  <path 
                     d="M0,350 Q100,320 200,340 T400,200 T600,280 T800,100 T1000,150 V400 H0 Z" 
                     fill="url(#chartGradient)" 
                  />
                  {/* Line */}
                  <motion.path 
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 2, ease: "easeInOut" }}
                     d="M0,350 Q100,320 200,340 T400,200 T600,280 T800,100 T1000,150" 
                     fill="none" 
                     stroke="#121214" 
                     strokeWidth="4" 
                  />
                  {/* Dots */}
                  {[0, 200, 400, 600, 800, 1000].map((x, i) => (
                     <circle key={i} cx={x} cy={350 - (i * 40)} r="6" fill="#D4AF37" className="cursor-pointer hover:r-8 transition-all" />
                  ))}
               </svg>
               {/* Tooltip Simulation */}
               <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-ims-blue p-4 rounded-sm text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-1">Peak Performance</p>
                  <p className="text-xs font-bold font-serif">April Week 4: 482 Cases</p>
               </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-ims-blue/5 pt-8">
               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                  <span key={m} className="text-[10px] font-bold uppercase tracking-widest text-ims-charcoal/20">{m}</span>
               ))}
            </div>
         </div>

         {/* Specialty Performance (Vertical Bars) */}
         <div className="lg:col-span-4 bg-ims-blue p-6 sm:p-10 lg:p-12 rounded-sm shadow-xl text-white flex flex-col justify-between">
            <div>
               <h3 className="text-xl font-serif mb-8">Department Efficiency</h3>
               <div className="space-y-10">
                  {[
                    { label: "Cardiology", value: 85 },
                    { label: "Neurology", value: 64 },
                    { label: "Pediatrics", value: 92 },
                    { label: "Orthopedics", value: 48 },
                  ].map((dept, i) => (
                     <div key={i} className="space-y-3">
                        <div className="flex items-center justify-between">
                           <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{dept.label}</p>
                           <p className="text-[10px] font-bold text-ims-gold">{dept.value}%</p>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${dept.value}%` }}
                              transition={{ duration: 1, delay: i * 0.2 }}
                              className="h-full bg-ims-red" 
                           />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <button className="w-full mt-12 border border-white/20 py-4 rounded-sm text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-ims-blue transition-all">
               Detailed Unit Reports
            </button>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         {[
           { label: "Patient Retention", value: "92%", icon: <Users size={20} />, trend: "up" },
           { label: "Average Wait Time", value: "14m", icon: <Activity size={20} />, trend: "down" },
           { label: "Occupancy Rate", value: "78%", icon: <Calendar size={20} />, trend: "up" },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 lg:p-10 border border-ims-blue/5 rounded-sm shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-ims-blue/5 text-ims-blue rounded-sm flex items-center justify-center">
                     {stat.icon}
                  </div>
                  <div>
                     <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">{stat.label}</p>
                     <h4 className="text-2xl font-serif text-ims-blue">{stat.value}</h4>
                  </div>
               </div>
               {stat.trend === "up" ? <ArrowUpRight className="text-green-500" /> : <ArrowDownRight className="text-ims-red" />}
            </div>
         ))}
      </div>
    </div>
  );
}
