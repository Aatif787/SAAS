import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact | IMS One Home Solution",
  description: "Get in touch with IMS One Home Solution for luxury home solutions",
};

export default function ContactPage() {
  return <ContactClient />;
}