import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rl = checkRateLimit(`hospital-booking:${ip}`, 3, 60_000);
    if (!rl.allowed) return NextResponse.json({ success: false, error: "Too many attempts" }, { status: 429 });

    const body = await req.json();
    await connectDB();

    const token = `IMS-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const appointment = await Appointment.create({
      ...body,
      token
    });

    if (process.env.ADMIN_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Hospital Appointment: ${token}`,
        html: `
          <h3>New Appointment Booking</h3>
          <p><strong>Patient:</strong> ${body.patientName}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Specialty:</strong> ${body.specialty}</p>
          <p><strong>Doctor:</strong> ${body.doctor}</p>
          <p><strong>Schedule:</strong> ${body.date} at ${body.time}</p>
          <p><strong>Token:</strong> ${token}</p>
        `
      });
    }

    return NextResponse.json({ success: true, token, appointmentId: appointment._id });
  } catch (error) {
    console.error("[Hospital Booking Error]:", error);
    return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
  }
}

import { requireAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const appointments = await Appointment.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 });
  }
}
