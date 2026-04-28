import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { Role } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export type SessionPayload = {
  userId: string;
  email: string;
  role: Role;
};

export function signToken(payload: SessionPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set("session_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
}
