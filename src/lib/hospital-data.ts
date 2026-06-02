"use client";

// This file serves as the dynamic data schema for the IMS Hospital platform.
// In a full production environment, this would be replaced by a Prisma/SQL database.

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  education: string;
  img: string;
  status: "Active" | "Surgery" | "On-Leave";
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
};

export const INITIAL_DOCTORS: Doctor[] = [
  { id: "doc-1", name: "Dr. Alok Verma", specialty: "Cardiology", experience: "15+ Years", education: "MD, FACC", status: "Active", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600" },
  { id: "doc-2", name: "Dr. Sarah Khan", specialty: "Pediatrics", experience: "10+ Years", education: "MD, DCH", status: "Active", img: "https://images.unsplash.com/photo-1559839734-2b71f153678e?auto=format&fit=crop&q=80&w=600" },
  { id: "doc-3", name: "Dr. Meera Iyer", specialty: "Neurology", experience: "12+ Years", education: "DM, Neurology", status: "Surgery", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600" },
  { id: "doc-4", name: "Dr. James Wilson", specialty: "Orthopedics", experience: "18+ Years", education: "MS, Ortho", status: "On-Leave", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" },
  { id: "doc-5", name: "Dr. Arjun Kapoor", specialty: "Oncology", experience: "20+ Years", education: "MD, Oncology", status: "Active", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" },
  { id: "doc-6", name: "Dr. Elena Gilbert", specialty: "Gastroenterology", experience: "14+ Years", education: "MD, Gastro", status: "Active", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600" },
];

export const INITIAL_SERVICES: Service[] = [
  { id: "ser-1", title: "Cardiology", description: "Advanced heart care including minimally invasive bypass and valve replacement.", icon: "Activity", path: "/hospital/services/cardiology" },
  { id: "ser-2", title: "Neurology", description: "Comprehensive treatment for neuro-disorders and complex spine surgeries.", icon: "Zap", path: "/hospital/services/neurology" },
  { id: "ser-3", title: "Pediatrics", description: "Specialized neonatology and pediatric emergency care for your little ones.", icon: "Baby", path: "/hospital/services/pediatrics" },
  { id: "ser-4", title: "Orthopedics", description: "Joint replacements and trauma care using minimally invasive techniques.", icon: "Bone", path: "/hospital/services/orthopedics" },
  { id: "ser-5", title: "Oncology", description: "Precision immunotherapy and high-grade chemotherapy for cancer care.", icon: "Microscope", path: "/hospital/services/oncology" },
  { id: "ser-6", title: "Gastroenterology", description: "Digestive health and advanced endoscopy for complex abdominal cases.", icon: "ShieldCheck", path: "/hospital/services/gastro" },
  { id: "ser-7", title: "Radiology", description: "AI-enhanced 3T MRI and 128-slice CT scans for ultra-precise diagnostics.", icon: "Eye", path: "/hospital/services/radiology" },
  { id: "ser-8", title: "Dermatology", description: "Cosmetic and clinical skin care using next-gen laser technologies.", icon: "Zap", path: "/hospital/services/dermatology" },
  { id: "ser-9", title: "Urology", description: "Advanced laparoscopic kidney and bladder surgeries with 99.8% precision rate.", icon: "ShieldCheck", path: "/hospital/services/urology" },
  { id: "ser-10", title: "Pulmonology", description: "Expert care for chronic respiratory diseases and advanced lung health.", icon: "Activity", path: "/hospital/services/pulmonology" },
  { id: "ser-11", title: "Endocrinology", description: "Specialized hormonal and metabolic disorder management.", icon: "Zap", path: "/hospital/services/endocrinology" },
  { id: "ser-12", title: "General Surgery", description: "High-precision minimally invasive abdominal and thoracic procedures.", icon: "ShieldAlert", path: "/hospital/services/surgery" },
  { id: "ser-13", title: "Neurosurgery", description: "Complex brain and peripheral nerve surgeries using micro-navigation.", icon: "Dna", path: "/hospital/services/neurosurgery" },
  { id: "ser-14", title: "Cardiothoracic", description: "Advanced heart and lung operations including transplants.", icon: "Activity", path: "/hospital/services/cardiothoracic" },
  { id: "ser-15", title: "Gynecology", description: "Comprehensive women's health and minimally invasive surgeries.", icon: "Heart", path: "/hospital/services/gynecology" },
  { id: "ser-16", title: "Obstetrics", description: "High-risk pregnancy management and painless delivery services.", icon: "Baby", path: "/hospital/services/obstetrics" },
  { id: "ser-17", title: "Psychiatry", description: "Advanced mental health care and clinical behavioral therapy.", icon: "Zap", path: "/hospital/services/psychiatry" },
  { id: "ser-18", title: "Psychology", description: "Expert psychological counseling and diagnostic assessments.", icon: "ShieldCheck", path: "/hospital/services/psychology" },
  { id: "ser-19", title: "Anesthesiology", description: "Precision pain management and critical care anesthesia.", icon: "Microscope", path: "/hospital/services/anesthesiology" },
  { id: "ser-20", title: "Emergency Med", description: "24/7 Level-1 trauma care with rapid response protocols.", icon: "Zap", path: "/hospital/services/emergency" },
  { id: "ser-21", title: "Pathology", description: "AI-integrated clinical diagnostic and molecular testing.", icon: "Microscope", path: "/hospital/services/pathology" },
];
