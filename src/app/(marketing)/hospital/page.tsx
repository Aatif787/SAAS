"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Phone, Calendar } from "lucide-react";
import HospitalHero from "@/components/hospital/hospital-hero";
import BookingEngine from "@/components/hospital/booking-engine";
import { useHospital } from "@/lib/hospital-store";
import SuperAIChatbot from "@/components/ui/super-ai-chatbot";

const HospitalAbout = dynamic(() => import("@/components/hospital/hospital-about"));
const HospitalServices = dynamic(() => import("@/components/hospital/hospital-services"));
const HospitalTech = dynamic(() => import("@/components/hospital/hospital-tech"));
const HospitalJourney = dynamic(() => import("@/components/hospital/hospital-journey"));
const HospitalDoctors = dynamic(() => import("@/components/hospital/hospital-doctors"));
const HospitalFeatures = dynamic(() => import("@/components/hospital/hospital-features"));
const HospitalTestimonials = dynamic(() => import("@/components/hospital/hospital-testimonials"));
const HospitalFAQ = dynamic(() => import("@/components/hospital/hospital-faq"));
const HospitalContact = dynamic(() => import("@/components/hospital/hospital-contact"));
const HospitalCertifications = dynamic(() => import("@/components/hospital/hospital-certifications"));

export default function HospitalPage() {
  const { cms } = useHospital();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="relative bg-white">
      {/* Global Booking Engine */}
      <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* The Hero now takes a prop to open the booking engine */}
      <HospitalHero onBook={() => setIsBookingOpen(true)} />
      
      <HospitalAbout />
      <HospitalJourney />
      <HospitalServices />
      <HospitalTech />
      <HospitalDoctors />
      <HospitalFeatures />
      <HospitalCertifications />
      <HospitalTestimonials />
      <HospitalFAQ />
      <HospitalContact />
      
      {/* 100% Operational Floating Quick Actions */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
         <a 
            href={`tel:${cms?.emergencyPhone || "9699858212"}`}
            className="w-16 h-16 rounded-full bg-ims-red text-white flex items-center justify-center shadow-3xl hover:bg-ims-blue transition-all group relative"
         >
            <span className="absolute right-full mr-4 bg-ims-blue text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Emergency Call</span>
            <Phone size={24} />
         </a>
         <button 
            onClick={() => setIsBookingOpen(true)}
            className="w-16 h-16 rounded-full bg-ims-blue text-white flex items-center justify-center shadow-3xl hover:bg-ims-red transition-all group relative"
         >
            <span className="absolute right-full mr-4 bg-ims-blue text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Book Appointment</span>
            <Calendar size={24} />
         </button>
      </div>
      <SuperAIChatbot />
    </main>
  );
}
