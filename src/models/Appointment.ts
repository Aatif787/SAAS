import { Schema, model, models } from "mongoose";

const appointmentSchema = new Schema(
  {
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    specialty: { type: String, required: true },
    doctor: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { 
      type: String, 
      default: "pending",
      enum: ["pending", "confirmed", "cancelled", "completed"]
    },
    token: { type: String, unique: true }
  },
  { timestamps: true }
);

export const Appointment = models.Appointment || model("Appointment", appointmentSchema);
