"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HospitalCertifications() {
  return (
    <section className="py-12 bg-white border-y border-ims-blue/5">
      <div className="container-xl">
        <div className="flex flex-col items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <div className="relative h-24 w-full max-w-4xl">
            <Image 
              src="/images/hospital/certifications.png" 
              alt="IMS Hospital Accreditations" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="mt-4 text-[9px] font-bold uppercase tracking-[0.4em] text-ims-blue/40">
            NABH • JCI • NABL • ISO 9001:2015 CERTIFIED
          </span>
        </div>
      </div>
    </section>
  );
}
