"use client";

import { useState, useEffect } from "react";
import { INITIAL_DOCTORS, INITIAL_SERVICES, type Doctor, type Service } from "./hospital-data";

export type Appointment = {
  id: string;
  patientName: string;
  phone: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
};

export type Payment = {
  id: string;
  patientName: string;
  amount: number;
  status: "Paid" | "Pending" | "Refunded";
  date: string;
  method: "Card" | "UPI" | "Cash";
};

export type EmergencyCase = {
  id: string;
  type: "Ambulance" | "ER" | "Trauma";
  status: "Active" | "Responding" | "Resolved";
  location: string;
  time: string;
};

export type CMSContent = {
  heroTitle: string;
  heroSub: string;
  aboutText: string;
  emergencyPhone: string;
  faqs: { q: string, a: string }[];
  address: string;
  emails: string[];
  social: { platform: string, link: string }[];
};

class HospitalStore extends EventTarget {
  private appointments: Appointment[] = [];
  private doctors: Doctor[] = [];
  private services: Service[] = [];
  private payments: Payment[] = [];
  private emergencies: EmergencyCase[] = [];
  private cms: CMSContent = {
    heroTitle: "The Future of Healing Starts Here.",
    heroSub: "IMS Hospital is redefining tertiary healthcare in Lucknow through advanced clinical excellence and specialized medical care.",
    aboutText: "IMS Hospital is Lucknow's premier multispecialty institution blending traditional compassion with futuristic digital-first care.",
    emergencyPhone: "+91 9699858212",
    address: "Plot No. 12, Vikas Khand, Gomti Nagar, Lucknow",
    emails: ["hospital@imsgroup.com", "appointments@imsgroup.com"],
    social: [
      { platform: "Globe", link: "https://imsgroup.com" },
      { platform: "Mail", link: "mailto:hospital@imsgroup.com" }
    ],
    faqs: [
      { q: "How do I book a priority appointment?", a: "You can book instantly using the 'Book Priority Appointment' button on our homepage. Our system synchronizes directly with doctor schedules to provide real-time availability." },
      { q: "Do you offer emergency ambulance services?", a: "Yes, our Advanced Life Support (ALS) ambulances are available 24/7. Call our emergency helpline for immediate dispatch." },
      { q: "Can I download my medical reports online?", a: "Absolutely. Once registered, you can log in to the Patient Portal to download digital copies of your MRI, blood tests, and prescription history." }
    ]
  };
  private static instance: HospitalStore;

  private constructor() {
    super();
    this.load();
  }

  static getInstance() {
    if (!HospitalStore.instance) {
      HospitalStore.instance = new HospitalStore();
    }
    return HospitalStore.instance;
  }

  private load() {
    if (typeof window !== "undefined") {
      const savedAppts = localStorage.getItem("ims_appointments");
      const savedDocs = localStorage.getItem("ims_doctors");
      const savedServices = localStorage.getItem("ims_services");
      const savedPayments = localStorage.getItem("ims_payments");
      const savedCMS = localStorage.getItem("ims_cms");

      this.appointments = savedAppts ? JSON.parse(savedAppts) : [
         { id: "1", patientName: "Aditi Sharma", phone: "9876543210", specialty: "Cardiology", doctor: "Dr. Alok Verma", date: "2026-05-05", time: "10:30 AM", status: "Confirmed", createdAt: new Date().toISOString() },
         { id: "2", patientName: "Rahul Gupta", phone: "9876543211", specialty: "Pediatrics", doctor: "Dr. Sarah Khan", date: "2026-05-06", time: "11:15 AM", status: "Pending", createdAt: new Date().toISOString() },
      ];

      const parsedDocs = savedDocs ? JSON.parse(savedDocs) : [];
      const docMap = new Map(parsedDocs.map((d: Doctor) => [d.id, d]));
      this.doctors = INITIAL_DOCTORS.map(d => ({ ...d, ...(docMap.get(d.id) || {}) }));
      // Add any custom docs from localstorage that aren't in INITIAL
      const initialDocIds = new Set(INITIAL_DOCTORS.map(d => d.id));
      parsedDocs.forEach((d: Doctor) => {
        if (!initialDocIds.has(d.id)) this.doctors.push(d);
      });

      const parsedServices = savedServices ? JSON.parse(savedServices) : [];
      const serviceMap = new Map(parsedServices.map((s: Service) => [s.id, s]));
      this.services = INITIAL_SERVICES.map(s => ({ ...s, ...(serviceMap.get(s.id) || {}) }));
      // Add any custom services from localstorage that aren't in INITIAL
      const initialServiceIds = new Set(INITIAL_SERVICES.map(s => s.id));
      parsedServices.forEach((s: Service) => {
        if (!initialServiceIds.has(s.id)) this.services.push(s);
      });
      this.payments = savedPayments ? JSON.parse(savedPayments) : [
         { id: "INV-882", patientName: "Aditi Sharma", amount: 15000, status: "Paid", date: "2026-05-01", method: "Card" },
         { id: "INV-883", patientName: "Rahul Gupta", amount: 2500, status: "Pending", date: "2026-05-02", method: "UPI" },
      ];
      if (savedCMS) {
        try {
          const parsed = JSON.parse(savedCMS);
          this.cms = { ...this.cms, ...parsed };
        } catch (e) {
          console.error("Failed to parse CMS storage", e);
        }
      }
      
      this.emergencies = [
        { id: "EM-1", type: "Ambulance", status: "Responding", location: "Hazratganj, Lucknow", time: "10 mins ago" },
        { id: "EM-2", type: "ER", status: "Active", location: "Hospital Gate 4", time: "Just now" },
      ];
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ims_appointments", JSON.stringify(this.appointments));
      localStorage.setItem("ims_doctors", JSON.stringify(this.doctors));
      localStorage.setItem("ims_services", JSON.stringify(this.services));
      localStorage.setItem("ims_payments", JSON.stringify(this.payments));
      localStorage.setItem("ims_cms", JSON.stringify(this.cms));
      this.dispatchEvent(new Event("change"));
    }
  }

  getAppointments() { return this.appointments; }
  getDoctors() { return this.doctors; }
  getServices() { return this.services; }
  getPayments() { return this.payments; }
  getCMS() { return this.cms; }
  getEmergencies() { return this.emergencies; }

  updateCMS(content: Partial<CMSContent>) {
    this.cms = { ...this.cms, ...content };
    this.save();
  }

  addPayment(payment: Payment) {
    this.payments = [payment, ...this.payments];
    this.save();
  }

  updateDoctorStatus(id: string, status: Doctor["status"]) {
    this.doctors = this.doctors.map(d => d.id === id ? { ...d, status } : d);
    this.save();
  }

  addDoctor(doctor: Omit<Doctor, "id">) {
    const newDoc = { ...doctor, id: `doc-${Math.random().toString(36).substr(2, 5)}` };
    this.doctors = [...this.doctors, newDoc];
    this.save();
    return newDoc;
  }

  addAppointment(appointment: Omit<Appointment, "id" | "status" | "createdAt">) {
    const newAppt: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    this.appointments = [newAppt, ...this.appointments];
    this.save();
    return newAppt;
  }

  updateStatus(id: string, status: Appointment["status"]) {
    this.appointments = this.appointments.map(a => a.id === id ? { ...a, status } : a);
    this.save();
  }
}

export const hospitalStore = HospitalStore.getInstance();

export function useHospital() {
  const [data, setData] = useState({
    appointments: [] as Appointment[],
    doctors: INITIAL_DOCTORS,
    services: INITIAL_SERVICES,
    payments: [] as Payment[],
    cms: {
      heroTitle: "The Future of Healing Starts Here.",
      heroSub: "IMS Hospital is redefining tertiary healthcare in Lucknow through advanced clinical excellence and specialized medical care.",
      aboutText: "IMS Hospital is Lucknow's premier multispecialty institution blending traditional compassion with futuristic digital-first care.",
      emergencyPhone: "+91 9699858212",
      address: "Plot No. 12, Vikas Khand, Gomti Nagar, Lucknow",
      emails: ["hospital@imsgroup.com", "appointments@imsgroup.com"],
      social: [
        { platform: "Globe", link: "https://imsgroup.com" },
        { platform: "Mail", link: "mailto:hospital@imsgroup.com" }
      ],
      faqs: [
        { q: "How do I book a priority appointment?", a: "You can book instantly using the 'Book Priority Appointment' button on our homepage. Our system synchronizes directly with doctor schedules to provide real-time availability." },
        { q: "Do you offer emergency ambulance services?", a: "Yes, our Advanced Life Support (ALS) ambulances are available 24/7. Call our emergency helpline for immediate dispatch." },
        { q: "Can I download my medical reports online?", a: "Absolutely. Once registered, you can log in to the Patient Portal to download digital copies of your MRI, blood tests, and prescription history." }
      ]
    },
    emergencies: [] as EmergencyCase[]
  });

  useEffect(() => {
    // Sync with store on mount
    const sync = () => setData({
      appointments: [...hospitalStore.getAppointments()],
      doctors: [...hospitalStore.getDoctors()],
      services: [...hospitalStore.getServices()],
      payments: [...hospitalStore.getPayments()],
      cms: { ...hospitalStore.getCMS() },
      emergencies: [...hospitalStore.getEmergencies()]
    });
    
    sync(); // Initial sync after mount

    hospitalStore.addEventListener("change", sync);
    return () => hospitalStore.removeEventListener("change", sync);
  }, []);

  return {
    ...data,
    addAppointment: (appointment: Omit<Appointment, "id" | "status" | "createdAt">) =>
      hospitalStore.addAppointment(appointment),
    updateStatus: (id: string, status: Appointment["status"]) => hospitalStore.updateStatus(id, status),
    updateDoctorStatus: (id: string, status: Doctor["status"]) => hospitalStore.updateDoctorStatus(id, status),
    addDoctor: (doc: Omit<Doctor, "id">) => hospitalStore.addDoctor(doc),
    updateCMS: (content: Partial<CMSContent>) => hospitalStore.updateCMS(content),
    addPayment: (payment: Payment) => hospitalStore.addPayment(payment),
  };
}
