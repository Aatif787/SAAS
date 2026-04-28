import Link from "next/link";
import AuthForm from "@/components/forms/auth-form";

export default function SignupPage() {
  return (
    <main className="section-pad"><div className="container-xl"><h1 className="mb-6 text-center text-4xl font-bold">Create Account</h1><AuthForm mode="signup" /><p className="mt-4 text-center text-sm text-white/70">Already have an account? <Link href="/login" className="text-lime">Login</Link></p></div></main>
  );
}
