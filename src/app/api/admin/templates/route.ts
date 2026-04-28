import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { Template } from "@/models/Template";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  const templates = await Template.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: { templates } });
}
