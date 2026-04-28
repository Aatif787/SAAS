import { Schema, model, models } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
);

export const Testimonial = models.Testimonial || model("Testimonial", testimonialSchema);
