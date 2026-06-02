import { Schema, model, models } from "mongoose";

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String },
    source: { 
      type: String, 
      required: true,
      enum: ["main_contact", "one_home_contact", "upvc_contact", "hospital_contact", "newsletter"]
    },
    status: { 
      type: String, 
      default: "new",
      enum: ["new", "contacted", "qualified", "lost", "converted"]
    },
    // Flexible field for specialized data (e.g., budget, service, product)
    metadata: {
      type: Map,
      of: String
    }
  },
  { timestamps: true }
);

// Add text search for admin dashboard
leadSchema.index({ name: "text", email: "text", source: "text" });

export const Lead = models.Lead || model("Lead", leadSchema);
