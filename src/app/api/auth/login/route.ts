import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { loginSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { setSessionCookie, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rl = checkRateLimit(`login:${ip}`, 12, 60_000);
    if (!rl.allowed) return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
    if (!user) return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const match = await bcrypt.compare(parsed.data.password, user.password);
    if (!match) return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const response = NextResponse.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

