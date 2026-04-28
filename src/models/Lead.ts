import { Schema, model, models } from "mongoose";

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, required: true },
  },
  { timestamps: true },
);

export const Lead = models.Lead || model("Lead", leadSchema);
