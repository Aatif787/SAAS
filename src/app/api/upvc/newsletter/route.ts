import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UPVCNewsletter } from "@/models/UPVCNewsletter";
import { upvcNewsletterSchema } from "@/lib/upvc-validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rl = checkRateLimit(`upvc-newsletter:${ip}`, 3, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = upvcNewsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if already exists
    const existing = await UPVCNewsletter.findOne({ email: parsed.data.email });
    if (existing) {
      return NextResponse.json(
        { success: true, message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    await UPVCNewsletter.create({
      email: parsed.data.email,
      source: "footer",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[UPVC Newsletter API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
