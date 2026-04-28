import { Schema, model, models } from "mongoose";

const templateSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    previewImage: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Template = models.Template || model("Template", templateSchema);
