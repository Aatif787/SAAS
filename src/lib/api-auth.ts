import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function getTokenFromRequest(req: NextRequest) {
  return req.cookies.get("session_token")?.value;
}

export function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return { error: NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 }) };
  }

  const session = verifyToken(token);
  if (!session) {
    return { error: NextResponse.json({ success: false, error: "Invalid session" }, { status: 401 }) };
  }

  return { session };
}

export function requireAdmin(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth;
  if (auth.session.role !== "admin") {
    return { error: NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 }) };
  }
  return auth;
}
