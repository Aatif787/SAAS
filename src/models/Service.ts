import { Schema, model, models } from "mongoose";

const serviceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

export const Service = models.Service || model("Service", serviceSchema);
