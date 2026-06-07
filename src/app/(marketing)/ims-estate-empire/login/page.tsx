"use client";
import { LogIn } from 'lucide-react'

function getOAuthUrl() {
  const kimiAuthUrl = process.env.NEXT_PUBLIC_KIMI_AUTH_URL || "";
  const appID = process.env.NEXT_PUBLIC_APP_ID || "";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#efe7da]">
      <div className="w-full max-w-[400px] mx-6">
        <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-8 text-center">
          <h1 className="font-display text-[36px] text-black mb-2">
            Welcome
          </h1>
          <p className="font-body text-[14px] text-[#4d4d4d] mb-8">
            Sign in to access your account and manage your dashboard
          </p>
          <button
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
            className="w-full btn-lime flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Sign in with Kimi
          </button>
          <p className="font-body text-[12px] text-[#4d4d4d] mt-6">
            Secure authentication powered by Kimi OAuth 2.0
          </p>
        </div>
      </div>
    </div>
  )
}
