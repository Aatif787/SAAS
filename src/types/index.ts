export type Role = "admin" | "user";

export interface LeadRecord {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, string>;
}

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: string;
};

export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
}
