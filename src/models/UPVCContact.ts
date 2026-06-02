import mongoose, { Schema, Document } from "mongoose";

export interface IUPVCContact extends Document {
  name: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const UPVCContactSchema = new Schema<IUPVCContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    productInterest: { type: String, default: "" },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
    source: { type: String, default: "contact-form" },
  },
  { timestamps: true }
);

UPVCContactSchema.index({ email: 1 });
UPVCContactSchema.index({ status: 1 });
UPVCContactSchema.index({ createdAt: -1 });

export const UPVCContact =
  mongoose.models.UPVCContact ||
  mongoose.model<IUPVCContact>("UPVCContact", UPVCContactSchema);
