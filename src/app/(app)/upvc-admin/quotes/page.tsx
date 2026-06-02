"use client";

import { useEffect, useState } from "react";
import UPVCAdminSidebar from "@/components/upvc/admin/upvc-admin-sidebar";
import { 
  Calculator, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { UPVCQuoteInput } from "@/lib/upvc-validators";

type UPVCQuoteRecord = UPVCQuoteInput & {
  _id: string;
  status?: string;
  createdAt?: string;
};

export default function UPVCAdminQuotesPage() {
  const [quotes, setQuotes] = useState<UPVCQuoteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("/api/upvc/quotes");
        const data = await res.json();
        if (data.success) {
          setQuotes(data.data);
        } else {
          toast.error("Failed to fetch quotes");
        }
      } catch (err) {
        toast.error("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const filteredQuotes = quotes.filter(q => 
    q.name.toLowerCase().includes(search.toLowerCase()) || 
    q.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-upvc-white">
      <UPVCAdminSidebar />
      
      <main className="flex-1 lg:pl-64">
        <header className="h-20 border-b border-upvc-dark/5 bg-white flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Calculator size={20} className="text-upvc-green" />
            <h1 className="text-xl font-bold text-upvc-dark">Quote Requests</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-upvc-dark/5 text-sm font-bold text-upvc-dark/60 hover:border-upvc-green transition-all">
              <Download size={16} /> Export CSV
            </button>
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

          {/* Table */}
          <div className="bg-white rounded-3xl border border-upvc-dark/5 overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-upvc-dark/20">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p>Loading requests...</p>
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-upvc-dark/30 font-medium">No quote requests found.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-upvc-dark/5 bg-upvc-white/50 text-[10px] uppercase tracking-widest text-upvc-dark/40">
                    <th className="px-6 py-4 font-bold">Customer</th>
                    <th className="px-6 py-4 font-bold">Product Details</th>
                    <th className="px-6 py-4 font-bold">Price Est.</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-upvc-dark/5 text-sm">
                  {filteredQuotes.map((quote) => (
                    <tr key={quote._id} className="hover:bg-upvc-green/[0.02] transition-colors">
                      <td className="px-6 py-6">
                        <div>
                          <p className="font-bold text-upvc-dark">{quote.name}</p>
                          <div className="flex flex-col gap-1 mt-1">
                            <a href={`mailto:${quote.email}`} className="flex items-center gap-2 text-xs text-upvc-dark/40 hover:text-upvc-green">
                              <Mail size={12} /> {quote.email}
                            </a>
                            <a href={`tel:${quote.phone}`} className="flex items-center gap-2 text-xs text-upvc-dark/40 hover:text-upvc-green">
                              <Phone size={12} /> {quote.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div>
                          <p className="font-medium text-upvc-dark">{quote.product}</p>
                          <p className="text-xs text-upvc-dark/40 mt-1">
                            {quote.width}&apos; x {quote.height}&apos; • {quote.glassType} • {quote.frameColor}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="font-bold text-upvc-green">₹{quote.estimatedPrice.toLocaleString()}</div>
                        <p className="text-[10px] text-upvc-dark/20 uppercase tracking-widest mt-1">Qty: {quote.quantity}</p>
                      </td>
                      <td className="px-6 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          quote.status === "new" ? "bg-upvc-green/10 text-upvc-green" : "bg-upvc-dark/5 text-upvc-dark/40"
                        )}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-upvc-dark/40 text-xs">
                          <Calendar size={14} />
                          {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : "—"}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <button className="p-2 rounded-xl hover:bg-upvc-green/5 text-upvc-dark/20 hover:text-upvc-green transition-all">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
