"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const email = String(formData.get("email") || "");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      toast.error(data.error || "Could not process request");
    } else {
      toast.success("Reset instructions generated");
      setResetUrl(data.data.resetUrl || null);
    }
    setLoading(false);
  }

  return (
    <main className="section-pad"><div className="container-xl max-w-lg"><h1 className="mb-6 text-3xl font-bold">Forgot Password</h1><form action={onSubmit} className="glass space-y-4 rounded-2xl p-6"><input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3" /><button disabled={loading} className="rounded-full bg-lime px-5 py-3 font-semibold text-black">{loading ? "Please wait..." : "Generate Reset Link"}</button></form>{resetUrl && <p className="mt-4 break-all text-sm text-amber">Dev reset URL: {resetUrl}</p>}</div></main>
  );
}
