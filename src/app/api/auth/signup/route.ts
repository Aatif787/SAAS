import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { signupSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { setSessionCookie, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rl = checkRateLimit(`signup:${ip}`, 10, 60_000);
    if (!rl.allowed) return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });

    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    await connectDB();
    const existing = await User.findOne({ email: parsed.data.email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already in use" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(parsed.data.password, 12);
    const user = await User.create({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      password: hashed,
      role: "user",
    });

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const response = NextResponse.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

