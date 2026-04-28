import Link from "next/link";
import AuthForm from "@/components/forms/auth-form";

export default function LoginPage() {
  return (
    <main className="section-pad"><div className="container-xl"><h1 className="mb-6 text-center text-4xl font-bold">Login</h1><AuthForm mode="login" /><p className="mt-4 text-center text-sm text-white/70">No account? <Link href="/signup" className="text-lime">Create one</Link></p><p className="mt-2 text-center text-sm text-white/70"><Link href="/forgot-password" className="text-amber">Forgot password?</Link></p></div></main>
  );
}
