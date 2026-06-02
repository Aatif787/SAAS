"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Factory, HelpCircle, ChevronRight, Hammer } from "lucide-react";
import SmoothScroll from "@/components/ui/smooth-scroll";

const SteelBrandStory = dynamic(() => import("@/components/steel/steel-brand-story"));

const certificates = [
  { title: "ISO 9001:2015", subtitle: "Quality Management Systems", issuer: "TUV Austria" },
  { title: "EN 1090-2 EXC3", subtitle: "Execution of Steel Structures", issuer: "SGS Global" },
  { title: "AWS D1.1 Certified", subtitle: "Structural Welding Code", issuer: "American Welding Society" },
];

const processes = [
  {
    step: "01",
    phase: "Precision Sizing & CAD Slicing",
    desc: "Every architectural design is processed through customized BIM software to establish cutting parameters down to 0.1mm tolerance.",
  },
  {
    step: "02",
    phase: "Laser-Plasma CNC Profiling",
    desc: "Heavy-duty plates are cut using state-of-the-art CNC fiber laser tables to guarantee hyper-clean profiles and edge finishes.",
  },
  {
    step: "03",
    phase: "Standard Robotic Welding",
    desc: "Structural nodes are welded utilizing robotic coordinate arms alongside AWS certified welders for high execution trust.",
  },
  {
    step: "04",
    phase: "EP Finish & Curing",
    desc: "Completed frames go through multi-stage anti-corrosion sandblasting, followed by warm epoxy-powder coating.",
  },
];

export default function SteelStoryPage() {
  return (
    <SmoothScroll>
      <div className="relative z-10 pt-28 pb-16">
        {/* Editorial Sub-Hero Header */}
        <section className="relative overflow-hidden py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#00C853]/20 bg-[#00C853]/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.36em] text-[#00C853]">
                IMS Corporate Heritage
              </div>
              <h1 className="mt-8 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#F5F5F5] md:text-7xl xl:text-[6.5rem]">
                The standard of
                <br />
                heavy architectural
                <br />
                <span className="text-[#FF6B1A] drop-shadow-[0_0_20px_rgba(255,107,26,0.3)]">fabrication mastery</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9A9A9A] md:text-xl">
                Founded on the principles of extreme structural safety, exact tolerances, and premium finish longevity. We convert structural raw metals into elite commercial facades and architectural statements.
              </p>
            </div>
          </div>
        </section>

        {/* Integrated interactive storytelling component */}
        <SteelBrandStory />

        {/* Industrial Capacities Grid */}
        <section className="relative overflow-hidden py-24 bg-transparent border-t border-[#D9D9D9]/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00C853]">Plant Capabilities</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F5] md:text-5xl">
                  Where raw strength meets sub-millimeter detailing
                </h2>
              </div>
              <p className="max-w-xl text-[#9A9A9A] leading-relaxed">
                Operating out of state-of-the-art heavy engineering centers, our fabrication plants feature automated coordinate cutters, certified structural welding stations, and specialized anti-corrosion sandblasting booths.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Fabrication Facility", value: "145,000 sq.ft", desc: "Equipped with overhead dynamic coordinate gantry cranes." },
                { label: "Monthly Output Capacity", value: "1,200 Tons", desc: "High-volume architectural facade and structural systems." },
                { label: "Laser Cutting Precision", value: "±0.05 mm", desc: "Ultra-accurate fiber lasers for flawless metal profiling." },
                { label: "Warranty Assurance", value: "25 Years", desc: "Standard coverage against structural rust and welding degradation." },
              ].map((item) => (
                <div key={item.label} className="rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-6 backdrop-blur-md">
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A]">{item.label}</div>
                  <div className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#FF6B1A] drop-shadow-[0_0_15px_rgba(255,107,26,0.25)]">{item.value}</div>
                  <p className="mt-3 text-xs leading-5 text-[#9A9A9A]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standard Workflow Timeline */}
        <section className="relative overflow-hidden py-24 border-t border-[#D9D9D9]/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="mb-16 text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#00C853]">Fabrication Pipeline</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F5] md:text-5xl">
                The strict execution process
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processes.map((proc) => (
                <div key={proc.step} className="relative rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-6 shadow-sm transition-all hover:border-[#FF6B1A]/20">
                  <div className="absolute right-6 top-6 text-3xl font-black text-[#FF6B1A]/10">{proc.step}</div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C853]/10 text-[#00C853] mb-5">
                    <Hammer size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#F5F5F5] tracking-[-0.02em]">{proc.phase}</h3>
                  <p className="mt-3 text-xs leading-6 text-[#9A9A9A]">{proc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Certifications & Standards */}
        <section className="relative overflow-hidden py-24 border-t border-[#D9D9D9]/10 bg-[#111111]/20">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="grid gap-12 lg:grid-cols-[480px_minmax(0,1fr)]">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00C853]">Certified Rigor</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F5] md:text-5xl">
                  Accredited by global safety standards
                </h2>
                <p className="mt-6 text-sm leading-7 text-[#9A9A9A]">
                  Every structural portal frame, window track, and steel facade grid is stamped and signed off under international structural codes, guaranteeing maximum project compliance.
                </p>
                <div className="mt-8 flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C853]/10 text-[#00C853]">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B1A]/10 text-[#FF6B1A]">
                    <Award size={22} />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C853]/10 text-[#00C853]">
                    <Factory size={22} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.title} className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-6 transition-all hover:border-[#FF6B1A]/20">
                    <div>
                      <div className="text-lg font-bold text-[#F5F5F5] tracking-[-0.03em]">{cert.title}</div>
                      <div className="text-xs text-[#9A9A9A] mt-1">{cert.subtitle}</div>
                    </div>
                    <div className="rounded-full border border-[#D9D9D9]/10 bg-[#050505] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#00C853] shrink-0 w-fit">
                      Issuer: {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA sub-banner */}
        <section className="relative overflow-hidden py-10 mt-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="rounded-[2.8rem] border border-[#D9D9D9]/10 bg-[#111111]/60 p-8 backdrop-blur-md md:p-12 text-center shadow-[0_0_80px_rgba(5,5,5,0.8)]">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F5] md:text-5xl">
                Ready to review standard engineering details?
              </h3>
              <p className="mt-4 mx-auto max-w-xl text-sm leading-6 text-[#9A9A9A]">
                Partner with the plant that puts precision before supply. Our commercial engineers are standing by.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row max-w-md mx-auto sm:max-w-none">
                <Link
                  href="/ims-steel/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FF6B1A] px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] hover:bg-[#00C853] transition-all shadow-[0_0_30px_rgba(255,107,26,0.2)]"
                >
                  Schedule consultation <ChevronRight size={14} />
                </Link>
                <Link
                  href="/ims-steel/systems"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-[#D9D9D9]/10 bg-[#050505] px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#F5F5F5] hover:bg-[#111111]/80 transition-all"
                >
                  Browse systems
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
