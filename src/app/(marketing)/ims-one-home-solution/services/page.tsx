import { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Services | IMS One Home Solution",
  description: "Explore our premium luxury home solutions and services",
};

export default function ServicesPage() {
  return <ServicesClient />;
}