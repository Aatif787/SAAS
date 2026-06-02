"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const password = String(formData.get("password") || "");
    const token = params.get("token") || "";

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      toast.error(data.error || "Reset failed");
    } else {
      toast.success("Password updated");
      router.push("/login");
    }
    setLoading(false);
  }

  return (
    <div className="container-xl max-w-lg"><h1 className="mb-6 text-3xl font-bold">Reset Password</h1><form action={onSubmit} className="glass space-y-4 rounded-2xl p-6"><input name="password" type="password" required placeholder="New Password" className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3" /><button disabled={loading} className="rounded-full bg-lime px-5 py-3 font-semibold text-black">{loading ? "Saving..." : "Update Password"}</button></form></div>
  );
}

import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <main className="section-pad">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
