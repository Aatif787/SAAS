import nodemailer from "nodemailer";
import type { UPVCContactInput, UPVCQuoteInput } from "@/lib/upvc-validators";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export const getQuoteEmailTemplate = (data: UPVCQuoteInput) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #65A30D;">New UPVC Quote Request</h2>
    <p>A new quote has been submitted via the website calculator.</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px; border: 1px solid #eee;"><strong>Customer</strong></td>
        <td style="padding: 10px; border: 1px solid #eee;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #eee;"><strong>Email</strong></td>
        <td style="padding: 10px; border: 1px solid #eee;">${data.email}</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px; border: 1px solid #eee;"><strong>Phone</strong></td>
        <td style="padding: 10px; border: 1px solid #eee;">${data.phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #eee;"><strong>Product</strong></td>
        <td style="padding: 10px; border: 1px solid #eee;">${data.product}</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px; border: 1px solid #eee;"><strong>Configuration</strong></td>
        <td style="padding: 10px; border: 1px solid #eee;">${data.width}' x ${data.height}', ${data.glassType}, ${data.frameColor}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #eee;"><strong>Estimated Price</strong></td>
        <td style="padding: 10px; border: 1px solid #eee;">₹${data.estimatedPrice.toLocaleString()}</td>
      </tr>
    </table>
    
    <div style="margin-top: 20px; font-size: 12px; color: #888;">
      Sent from IMS UPVC Platform
    </div>
  </div>
`;

export const getContactEmailTemplate = (data: UPVCContactInput) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #65A30D;">New Contact Inquiry</h2>
    <p>You have a new message from the UPVC contact form.</p>
    
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Interest:</strong> ${data.productInterest || "General"}</p>
      <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${data.message}</p>
    </div>
    
    <div style="margin-top: 20px; font-size: 12px; color: #888;">
      Sent from IMS UPVC Platform
    </div>
  </div>
`;

export const getPasswordResetEmailTemplate = (resetUrl: string) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #E8761A;">Reset Your Password</h2>
    <p>We received a request to reset your password for your IMS account.</p>
    <p>Please click the button below to set a new password. This link is valid for 30 minutes.</p>
    <div style="margin: 30px 0; text-align: center;">
      <a href="${resetUrl}" style="background: #E8761A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
    </div>
    <p style="font-size: 12px; color: #666;">Or copy and paste this URL into your browser:</p>
    <p style="font-size: 12px; color: #E8761A; word-break: break-all;">${resetUrl}</p>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    <div style="font-size: 12px; color: #888;">
      If you did not request this, you can safely ignore this email.
    </div>
  </div>
`;
