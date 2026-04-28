"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ExternalLink, Check } from "lucide-react";

type Template = {
  _id: string;
  name: string;
  category: string;
  previewImage: string;
  description: string;
};

const categories = ["All", "Business", "E-commerce", "Portfolio", "Landing"];

export default function TemplateCatalog() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (category !== "All") params.set("category", category);
        const res = await fetch(`/api/templates?${params.toString()}`);
        
        if (!res.ok) {
           const text = await res.text();
           console.error("API Error Response:", text);
           throw new Error(`Server returned ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
           const text = await res.text();
           console.error("Non-JSON Response:", text);
           throw new Error("Invalid response format from server");
        }

        const data = await res.json();
        setTemplates(data?.data?.templates || []);
      } catch (error) {
        console.error("Failed to load templates:", error);
        toast.error("Could not load templates. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [query, category]);

  async function selectTemplate(templateId: string) {
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
         throw new Error("Login session expired or server error");
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.error || "Login required before selecting template");
        return;
      }
      toast.success("Template selected and request created");
    } catch (error) {
       toast.error("An error occurred. Please login again.");
    }
  }

  return (
    <div className="space-y-12">
      {/* Filters & Search */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                category === c 
                  ? "bg-lime text-black shadow-[0_0_20px_rgba(163,255,18,0.3)]" 
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        
        <div className="relative max-w-md w-full">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
           <input 
             value={query} 
             onChange={(e) => setQuery(e.target.value)} 
             placeholder="Search premium templates..." 
             className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-lime/30 transition-all"
           />
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[400px] animate-pulse rounded-[2.5rem] bg-white/5" />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {templates.length > 0 ? templates.map((template, index) => (
              <motion.article 
                key={template._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card group overflow-hidden rounded-[2.5rem] border-white/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={template.previewImage} 
                    alt={template.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <button className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition-transform hover:scale-105">Preview</button>
                  </div>
                  <div className="absolute top-4 left-4">
                     <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lime">
                        {template.category}
                     </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold">{template.name}</h3>
                  <p className="mt-3 line-clamp-2 text-white/50 leading-relaxed">
                    {template.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                     <button 
                       onClick={() => selectTemplate(template._id)} 
                       className="flex items-center gap-2 font-bold text-lime hover:gap-3 transition-all"
                     >
                        Select Template <Check size={18} />
                     </button>
                     <div className="text-white/20"><ExternalLink size={20} /></div>
                  </div>
                </div>
              </motion.article>
            )) : (
              <div className="col-span-full py-20 text-center">
                 <div className="mx-auto h-20 w-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6">
                    <Filter size={32} />
                 </div>
                 <h4 className="text-2xl font-bold">No templates found</h4>
                 <p className="mt-2 text-white/40">Try adjusting your filters or search query.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
