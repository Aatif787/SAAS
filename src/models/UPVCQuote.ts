import mongoose, { Schema, Document } from "mongoose";

export interface IUPVCQuote extends Document {
  product: string;
  width: number;
  height: number;
  glassType: string;
  frameColor: string;
  quantity: number;
  estimatedPrice: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: "new" | "contacted" | "quoted" | "converted" | "closed";
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const UPVCQuoteSchema = new Schema<IUPVCQuote>(
  {
    product: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    glassType: { type: String, required: true },
    frameColor: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    estimatedPrice: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "converted", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

UPVCQuoteSchema.index({ email: 1 });
UPVCQuoteSchema.index({ status: 1 });
UPVCQuoteSchema.index({ createdAt: -1 });

export const UPVCQuote =
  mongoose.models.UPVCQuote ||
  mongoose.model<IUPVCQuote>("UPVCQuote", UPVCQuoteSchema);
