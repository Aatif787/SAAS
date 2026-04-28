"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setLoading(true);
    try {
      const payload = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      };

      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
         const text = await res.text();
         console.error("Auth API Error:", text);
         throw new Error("Server returned an invalid response. Please try again.");
      }

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Authentication failed");

      toast.success(mode === "signup" ? "Account created successfully!" : "Welcome back!");
      
      const targetRoute = data.data?.user?.role === "admin" ? "/admin" : "/dashboard";
      router.push(targetRoute);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
      console.error("Auth Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="glass mx-auto w-full max-w-md space-y-6 rounded-[2rem] p-8 border-white/5">
      <div className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
            <input 
              name="name" 
              required 
              placeholder="John Doe" 
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-lime/30 transition-all" 
            />
          </div>
        )}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
          <input 
            name="email" 
            type="email" 
            required 
            placeholder="john@example.com" 
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-lime/30 transition-all" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Password</label>
          <input 
            name="password" 
            type="password" 
            required 
            placeholder="••••••••" 
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-lime/30 transition-all" 
          />
        </div>
      </div>
      <button 
        disabled={loading} 
        className="w-full rounded-2xl bg-lime py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-[0_10px_30px_-5px_rgba(163,255,18,0.3)]"
      >
        {loading ? "Authenticating..." : mode === "signup" ? "Create Account" : "Login to Studio"}
      </button>
    </form>
  );
}
