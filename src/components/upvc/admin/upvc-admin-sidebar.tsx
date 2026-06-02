"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calculator, 
  Users, 
  ChevronLeft,
  Settings,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Overview", href: "/upvc-admin", icon: LayoutDashboard },
  { name: "Quote Requests", href: "/upvc-admin/quotes", icon: Calculator },
  { name: "Contact Inquiries", href: "/upvc-admin/contacts", icon: MessageSquare },
  { name: "Customers", href: "/upvc-admin/customers", icon: Users },
  { name: "Settings", href: "/upvc-admin/settings", icon: Settings },
];

export default function UPVCAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-upvc-dark/5 bg-upvc-white lg:block z-50">
      <div className="flex h-20 items-center justify-between border-b border-upvc-dark/5 px-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-upvc-green flex items-center justify-center text-white font-bold text-xs">IMS</div>
           <span className="font-bold text-upvc-dark tracking-tight">UPVC <span className="text-upvc-dark/40">Admin</span></span>
        </div>
        <Link href="/upvc" className="text-upvc-dark/30 hover:text-upvc-green transition-colors">
          <ChevronLeft size={18} />
        </Link>
      </div>
      
      <nav className="p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link 
              key={link.name}
              href={link.href} 
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                active 
                  ? "bg-upvc-green text-white shadow-lg shadow-upvc-green/20" 
                  : "text-upvc-dark/50 hover:bg-upvc-green/5 hover:text-upvc-dark"
              )}
            >
              <Icon size={18} /> {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 w-full px-4">
        <div className="p-4 rounded-2xl bg-upvc-green/5 border border-upvc-green/10">
          <div className="flex items-center gap-2 mb-2">
            <Bell size={14} className="text-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-upvc-green">Lead Alerts</span>
          </div>
          <p className="text-[10px] text-upvc-dark/40 leading-relaxed">
            Email notifications are active for new inquiries.
          </p>
        </div>
      </div>
    </aside>
  );
}
