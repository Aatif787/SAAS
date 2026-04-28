import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  await connectDB();
  const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: { users } });
}
