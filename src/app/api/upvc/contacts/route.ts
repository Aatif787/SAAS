import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UPVCContact } from "@/models/UPVCContact";
import { upvcContactSchema } from "@/lib/upvc-validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { sendEmail, getContactEmailTemplate } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rl = checkRateLimit(`upvc-contact:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = upvcContactSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message);
      return NextResponse.json(
        { success: false, error: errors[0], errors },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = await UPVCContact.create({
      ...parsed.data,
      source: "contact-form",
    });

    // Send Admin Notification
    if (process.env.ADMIN_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New UPVC Contact Inquiry: ${parsed.data.name}`,
        html: getContactEmailTemplate(parsed.data),
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: { id: contact._id },
        message: "Message sent successfully! We'll get back to you within 24 hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[UPVC Contact API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

import { requireAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    await connectDB();

    const filter: { status?: string } = {};
    if (status) filter.status = status;

    const [contacts, total] = await Promise.all([
      UPVCContact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      UPVCContact.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[UPVC Contact GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
