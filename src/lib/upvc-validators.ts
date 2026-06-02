import { z } from "zod";

const phoneRegex = /^[+]?[\d\s\-()]{7,15}$/;

export const upvcQuoteSchema = z.object({
  product: z.string().min(1, "Product is required"),
  width: z.number().min(2).max(20),
  height: z.number().min(2).max(15),
  glassType: z.string().min(1, "Glass type is required"),
  frameColor: z.string().min(1, "Frame color is required"),
  quantity: z.number().int().min(1).max(999),
  estimatedPrice: z.number().min(0),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  message: z.string().max(1000).optional(),
});

export const upvcContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const upvcNewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type UPVCQuoteInput = z.infer<typeof upvcQuoteSchema>;
export type UPVCContactInput = z.infer<typeof upvcContactSchema>;
export type UPVCNewsletterInput = z.infer<typeof upvcNewsletterSchema>;
