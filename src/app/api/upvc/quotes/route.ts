import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UPVCQuote } from "@/models/UPVCQuote";
import { upvcQuoteSchema } from "@/lib/upvc-validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { sendEmail, getQuoteEmailTemplate } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rl = checkRateLimit(`upvc-quote:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = upvcQuoteSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message);
      return NextResponse.json(
        { success: false, error: errors[0], errors },
        { status: 400 }
      );
    }

    await connectDB();

    const quote = await UPVCQuote.create({
      ...parsed.data,
      source: "website-calculator",
    });

    // Send Admin Notification
    if (process.env.ADMIN_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New UPVC Quote Request: ${parsed.data.name}`,
        html: getQuoteEmailTemplate(parsed.data),
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: quote._id,
          estimatedPrice: quote.estimatedPrice,
          product: quote.product,
        },
        message: "Quote submitted successfully! Our team will contact you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[UPVC Quote API Error]:", error);
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

    const [quotes, total] = await Promise.all([
      UPVCQuote.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      UPVCQuote.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: quotes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[UPVC Quote GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
