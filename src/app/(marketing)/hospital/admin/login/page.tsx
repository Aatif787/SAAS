"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Lock, User } from "lucide-react";
import Link from "next/link";
import MedicalBackground from "@/components/ui/medical-background";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo Authentication Logic
    setTimeout(() => {
      if (userId === "ADMIN-IMS-2026" && password === "IMS@Health@Secure") {
        router.push("/hospital/admin");
      } else {
        setError("Invalid Administrative Credentials. Access Denied.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <MedicalBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-12 bg-white/80 backdrop-blur-xl border border-ims-blue/5 shadow-3xl"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-ims-blue text-white flex items-center justify-center rounded-sm mb-6 shadow-2xl">
            <Activity size={32} />
          </div>
          <h2 className="text-3xl font-serif text-ims-blue mb-2">IMS Admin Portal</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Secure Medical Command Console</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
             <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-ims-red/10 border border-ims-red/20 p-4 text-[10px] font-bold uppercase tracking-widest text-ims-red text-center"
             >
                {error}
             </motion.div>
          )}

          <div className="space-y-2">
             <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-ims-blue/60 ml-1">Administrator ID</label>
             <div className="relative">
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="ADMIN-IMS-2026" 
                  className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-red transition-all"
                  required
                />
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-ims-blue/60 ml-1">Secret Access Key</label>
             <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-red transition-all"
                  required
                />
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
             </div>
          </div>

          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center gap-2">
                <input type="checkbox" className="w-3 h-3 border-ims-blue/10 rounded-sm" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/40">Remember Device</span>
             </div>
             <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-ims-red hover:underline">Forgot Key?</Link>
          </div>

          <motion.button 
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-5 rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all mt-8 ${
              loading ? "bg-ims-blue/40 text-white/50 cursor-not-allowed" : "bg-ims-blue text-white hover:bg-ims-red"
            }`}
          >
            {loading ? "Authenticating Console..." : "Initialize Console Access"}
          </motion.button>
        </form>

        <div className="mt-12 pt-8 border-t border-ims-blue/5 flex items-center justify-center gap-3 text-ims-charcoal/20">
           <ShieldCheck size={16} />
           <span className="text-[9px] font-bold uppercase tracking-widest leading-none">End-to-End Encrypted Link Active</span>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center opacity-20 pointer-events-none">
         <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-ims-blue">IMS Group Digital Security Division</p>
      </div>
    </div>
  );
}
