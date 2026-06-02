import mongoose, { Schema, Document } from "mongoose";

export interface IUPVCNewsletter extends Document {
  email: string;
  active: boolean;
  source: string;
  createdAt: Date;
}

const UPVCNewsletterSchema = new Schema<IUPVCNewsletter>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    active: { type: Boolean, default: true },
    source: { type: String, default: "footer" },
  },
  { timestamps: true }
);

export const UPVCNewsletter =
  mongoose.models.UPVCNewsletter ||
  mongoose.model<IUPVCNewsletter>("UPVCNewsletter", UPVCNewsletterSchema);
