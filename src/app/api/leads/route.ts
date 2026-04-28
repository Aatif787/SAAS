import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { leadSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";

export async function POST(req: NextRequest) {
  const ip = getRequestIp(req);
  const rl = checkRateLimit(`lead:${ip}`, 10, 60_000);
  if (!rl.allowed) return NextResponse.json({ success: false, error: "Rate limit exceeded" }, { status: 429 });

  const body = await req.json();
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid lead data" }, { status: 400 });
  }

  await connectDB();
  const lead = await Lead.create(parsed.data);
  return NextResponse.json({ success: true, data: { lead } });
}
