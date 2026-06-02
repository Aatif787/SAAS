"use client";

import { useState } from "react";
import AdminSidebar from "@/components/hospital/admin/admin-sidebar";
import AdminOverview from "@/components/hospital/admin/admin-overview";

export default function HospitalAdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      {/* Admin Layout */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
         <AdminOverview onMenuToggle={() => setSidebarOpen(true)} />
      </main>
    </div>
  );
}
