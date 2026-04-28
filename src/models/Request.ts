import { Schema, model, models } from "mongoose";

const requestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    templateId: { type: Schema.Types.ObjectId, ref: "Template", required: true },
    note: { type: String },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Request = models.Request || model("Request", requestSchema);
