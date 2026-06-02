import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects | IMS One Home Solution",
  description: "Explore our luxury residential portfolio and architectural masterpieces",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}