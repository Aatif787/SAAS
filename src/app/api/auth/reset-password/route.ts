import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PasswordResetToken } from "@/models/PasswordResetToken";
import { User } from "@/models/User";
import { resetPasswordSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid token or password" }, { status: 400 });
  }

  await connectDB();
  const tokenDoc = await PasswordResetToken.findOne({ token: parsed.data.token });
  if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    return NextResponse.json({ success: false, error: "Reset token expired or invalid" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(parsed.data.password, 12);
  await User.findByIdAndUpdate(tokenDoc.userId, { password: hashed });
  await PasswordResetToken.deleteOne({ _id: tokenDoc._id });

  return NextResponse.json({ success: true, data: { message: "Password updated successfully" } });
}
