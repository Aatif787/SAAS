import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { leadSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    // 5 leads per minute per IP
    const rl = checkRateLimit(`lead:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid data", details: parsed.error.issues },
        { status: 400 }
      );
    }

    await connectDB();
    const lead = await Lead.create(parsed.data);

    // Notify Admin
    if (process.env.ADMIN_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${parsed.data.name} [${parsed.data.source}]`,
        html: `
          <h2>New Lead Captured</h2>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Phone:</strong> ${parsed.data.phone || 'N/A'}</p>
          <p><strong>Source:</strong> ${parsed.data.source}</p>
          <p><strong>Message:</strong> ${parsed.data.message || 'N/A'}</p>
          ${parsed.data.metadata ? `<hr/><p><strong>Metadata:</strong> ${JSON.stringify(parsed.data.metadata)}</p>` : ''}
          <br/>
          <a href="${process.env.APP_URL}/dashboard/leads">View in Dashboard</a>
        `
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead submitted successfully",
      leadId: lead._id 
    });

  } catch (error) {
    console.error("[Leads API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { requireAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}
