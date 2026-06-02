"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  UserRound, 
  CalendarCheck, 
  Users, 
  CreditCard, 
  BarChart3, 
  MonitorPlay, 
  Bell, 
  ShieldAlert, 
  Video, 
  Settings, 
  ShieldCheck,
  LogOut,
  ChevronRight,
  Stethoscope,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { group: "CORE", items: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/hospital/admin" },
    { label: "Doctors", icon: <UserRound size={18} />, href: "/hospital/admin/doctors" },
    { label: "Appointments", icon: <CalendarCheck size={18} />, href: "/hospital/admin/appointments" },
    { label: "Patients", icon: <Users size={18} />, href: "/hospital/admin/patients" },
  ]},
  { group: "OPERATIONS", items: [
    { label: "Billing & Fees", icon: <CreditCard size={18} />, href: "/hospital/admin/billing" },
    { label: "Emergency", icon: <ShieldAlert size={18} />, href: "/hospital/admin/emergency" },
    { label: "Consultation", icon: <Video size={18} />, href: "/hospital/admin/consultation" },
  ]},
  { group: "MANAGEMENT", items: [
    { label: "Reports", icon: <BarChart3 size={18} />, href: "/hospital/admin/reports" },
    { label: "CMS Controls", icon: <MonitorPlay size={18} />, href: "/hospital/admin/cms" },
    { label: "Notifications", icon: <Bell size={18} />, href: "/hospital/admin/notifications" },
  ]},
  { group: "SYSTEM", items: [
    { label: "Roles & Staff", icon: <ShieldCheck size={18} />, href: "/hospital/admin/roles" },
    { label: "Security", icon: <ShieldAlert size={18} />, href: "/hospital/admin/security" },
    { label: "Settings", icon: <Settings size={18} />, href: "/hospital/admin/settings" },
  ]}
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`fixed lg:sticky top-0 left-0 w-80 h-screen bg-ims-blue border-r border-ims-gold/20 flex flex-col z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Neo Luxury Background Accents */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.5px,transparent_0.5px)] bg-[size:24px_24px]" />
        </div>

        {/* Brand */}
        <div className="p-12 border-b border-ims-gold/10 relative z-10 flex items-center justify-between">
          <Link href="/hospital" className="flex flex-col gap-2 group">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-ims-gold rounded-xl flex items-center justify-center text-ims-blue shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                  <Stethoscope size={24} fill="currentColor" />
               </div>
               <div>
                  <h1 className="text-2xl font-serif text-white tracking-tight group-hover:text-ims-gold transition-colors">IMS Group</h1>
                  <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-ims-gold/50">Healthcare Elite</p>
               </div>
            </div>
          </Link>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden w-10 h-10 rounded-xl border border-ims-gold/20 flex items-center justify-center text-ims-gold hover:bg-white/5 transition-all"
            >
              <X size={18} />
            </button>
          )}
        </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar relative z-10">
        {NAV_ITEMS.map((group, i) => (
          <div key={i} className="mb-12">
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-ims-gold/30 mb-8 ml-2 flex items-center gap-3">
               <span className="w-4 h-[1px] bg-ims-gold/20" />
               {group.group}
            </p>
            <nav className="space-y-3">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between px-6 py-5 rounded-xl transition-all duration-500 group relative overflow-hidden ${
                      isActive 
                        ? "bg-ims-gold text-ims-blue shadow-[0_15px_35px_-5px_rgba(197,160,89,0.4)]" 
                        : "text-white/40 hover:text-ims-gold hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                       <span className={`transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-ims-blue" : "text-ims-gold/60 group-hover:text-ims-gold"}`}>
                          {item.icon}
                       </span>
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-ims-blue" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Luxury Footer */}
      <div className="p-10 border-t border-ims-gold/10 relative z-10">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-5 group cursor-pointer hover:bg-ims-gold transition-all duration-500">
           <div className="w-12 h-12 rounded-xl bg-ims-gold/20 flex items-center justify-center text-ims-gold group-hover:bg-ims-blue group-hover:text-ims-gold transition-all">
              <UserRound size={20} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-white group-hover:text-ims-blue transition-colors">Aariz Khan</p>
              <p className="text-[8px] font-medium text-ims-gold/50 group-hover:text-ims-blue/60 transition-colors uppercase tracking-widest">Chief Administrator</p>
           </div>
        </div>
      </div>
    </aside>
   </>
  );
}
