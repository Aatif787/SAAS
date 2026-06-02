import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { User } from "@/models/User";
import { Appointment } from "@/models/Appointment";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();

    const [totalLeads, newLeads, totalUsers, totalAppointments] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      User.countDocuments(),
      Appointment.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        totalUsers,
        totalAppointments,
        revenue: "₹4.2L" // Placeholder for now
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}
