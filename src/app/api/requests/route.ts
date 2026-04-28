import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Request } from "@/models/Request";
import { requestSchema } from "@/lib/validators";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  await connectDB();
  const requests = await Request.find({ userId: auth.session.userId })
    .populate("templateId", "name category previewImage")
    .sort({ createdAt: -1 });

  return NextResponse.json({ success: true, data: { requests } });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  const body = await req.json();
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }

  await connectDB();
  const requestDoc = await Request.create({
    userId: auth.session.userId,
    templateId: parsed.data.templateId,
    note: parsed.data.note,
  });

  return NextResponse.json({ success: true, data: { request: requestDoc } });
}
