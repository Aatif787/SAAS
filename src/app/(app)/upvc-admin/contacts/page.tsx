"use client";

import { useEffect, useState } from "react";
import UPVCAdminSidebar from "@/components/upvc/admin/upvc-admin-sidebar";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Mail,
  Phone,
  Calendar,
  Loader2,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { UPVCContactInput } from "@/lib/upvc-validators";

type UPVCContactRecord = UPVCContactInput & {
  _id: string;
  status?: string;
  createdAt?: string;
};

export default function UPVCAdminContactsPage() {
  const [contacts, setContacts] = useState<UPVCContactRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/upvc/contacts");
        const data = await res.json();
        if (data.success) {
          setContacts(data.data);
        } else {
          toast.error("Failed to fetch inquiries");
        }
      } catch (err) {
        toast.error("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-upvc-white">
      <UPVCAdminSidebar />
      
      <main className="flex-1 lg:pl-64">
        <header className="h-20 border-b border-upvc-dark/5 bg-white flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <MessageSquare size={20} className="text-upvc-green" />
            <h1 className="text-xl font-bold text-upvc-dark">Contact Inquiries</h1>
          </div>
        </header>

        <div className="p-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-upvc-dark/20" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-upvc-dark/5 rounded-2xl text-sm focus:outline-none focus:border-upvc-green"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-upvc-dark/5 text-sm font-bold text-upvc-dark/60">
              <Filter size={18} /> Filter Status
            </button>
          </div>

          {/* List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-upvc-dark/20">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p>Loading inquiries...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-upvc-dark/5">
                <p className="text-upvc-dark/30 font-medium">No inquiries found.</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact._id} className="bg-white p-8 rounded-3xl border border-upvc-dark/5 shadow-sm hover:border-upvc-green/20 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-upvc-dark">{contact.name}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                          contact.status === "new" ? "bg-upvc-green text-white" : "bg-upvc-dark/5 text-upvc-dark/40"
                        )}>{contact.status}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 text-sm">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-upvc-dark/50 hover:text-upvc-green transition-colors">
                          <Mail size={14} /> {contact.email}
                        </a>
                        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-upvc-dark/50 hover:text-upvc-green transition-colors">
                          <Phone size={14} /> {contact.phone}
                        </a>
                        <div className="flex items-center gap-2 text-upvc-dark/50">
                          <Calendar size={14} /> {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "—"}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-upvc-white/50 border border-upvc-dark/5">
                        <p className="text-xs font-bold text-upvc-dark/20 uppercase tracking-widest mb-2">Message</p>
                        <p className="text-upvc-dark/60 leading-relaxed text-sm">{contact.message}</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 justify-end">
                      <button className="p-3 rounded-xl bg-upvc-green/10 text-upvc-green hover:bg-upvc-green hover:text-white transition-all" title="Mark as Read">
                        <CheckCircle2 size={20} />
                      </button>
                      <button className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Delete">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
