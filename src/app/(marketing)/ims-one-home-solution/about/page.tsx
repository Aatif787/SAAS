import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | IMS One Home Solution",
  description: "Learn about our legacy, values, and commitment to luxury living",
};

export default function AboutPage() {
  return <AboutClient />;
}