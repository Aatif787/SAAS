import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PasswordResetToken } from "@/models/PasswordResetToken";
import { forgotPasswordSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
  if (!user) {
    return NextResponse.json({ success: true, data: { message: "If the account exists, reset instructions were sent." } });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await PasswordResetToken.deleteMany({ userId: user._id });
  await PasswordResetToken.create({ userId: user._id, token, expiresAt });

  const resetUrl = `${process.env.APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;

  return NextResponse.json({ success: true, data: { message: "Reset link generated.", resetUrl } });
}
