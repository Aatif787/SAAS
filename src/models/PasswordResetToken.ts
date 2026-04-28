import { Schema, model, models } from "mongoose";

const passwordResetSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const PasswordResetToken =
  models.PasswordResetToken || model("PasswordResetToken", passwordResetSchema);
