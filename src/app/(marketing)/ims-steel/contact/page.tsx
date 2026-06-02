"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, ShieldCheck, Milestone } from "lucide-react";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { toast } from "sonner";
import { steelAudio } from "@/components/steel/steel-audio-engine";

export default function SteelContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    steelAudio.playWarp();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success(`Priority request dispatch successful! Technical briefing sent to ${email}`);
    }, 1200);
  }

  return (
    <SmoothScroll>
      <div className="relative z-10 pt-28 pb-16 min-h-screen bg-[#050505] text-[#F5F5F5]">
        {/* Volumetric background lights */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,200,83,0.04),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,107,26,0.05),transparent_25%)] pointer-events-none" />

        {/* Subpage Editorial Header */}
        <section className="relative overflow-hidden py-16">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#00C853]/30 bg-[#00C853]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.36em] text-[#00C853]">
                IMS Consultations Desk
              </div>
              <h1 className="mt-8 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-[#F5F5F5] md:text-7xl xl:text-[6.5rem]">
                Connect with our
                <br />
                heavy engineering plant
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9A9A9A] md:text-xl">
                Partner with the team that treats millimeter accuracy as a core design variable. Input your structural parameters below to schedule a direct briefing with our estimators and CAD designers.
              </p>
            </div>
          </div>
        </section>

        {/* Contact layout structure */}
        <section className="relative overflow-hidden py-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_480px]">
              
              {/* Left Column: Form booking engine */}
              <div className="rounded-[2.4rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-5 sm:p-8 backdrop-blur-xl">
                {submitted ? (
                  <div className="text-center py-20 space-y-4 max-w-md mx-auto">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00C853]/10 text-[#00C853] border border-[#00C853]/20 shadow-[0_0_20px_rgba(0,200,83,0.15)]">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#F5F5F5] tracking-[-0.02em]">Briefing successfully dispatched</h3>
                    <p className="text-xs leading-6 text-[#9A9A9A]">
                      Thank you for submitting your structural parameters. A senior IMS Steel estimating engineer has been assigned to your coordinate sheet and will contact you within 4 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        steelAudio.playClick();
                      }}
                      className="mt-6 rounded-full bg-[#00C853] px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] transition-colors hover:bg-[#FF6B1A] hover:shadow-[0_0_25px_rgba(255,107,26,0.3)]"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-2">Architect / Developer Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/60 px-4 py-4 text-xs text-[#F5F5F5] placeholder-[#555555] focus:border-[#00C853] focus:bg-[#111111]/80 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-2">Professional Email Address</label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="e.g. jenkins@facade.com"
                          className="w-full rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/60 px-4 py-4 text-xs text-[#F5F5F5] placeholder-[#555555] focus:border-[#00C853] focus:bg-[#111111]/80 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-2">Steel System Scope</label>
                        <select
                          name="scope"
                          required
                          className="w-full rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/60 px-4 py-4 text-xs text-[#F5F5F5] focus:border-[#00C853] focus:bg-[#111111]/80 focus:outline-none transition-all"
                        >
                          <option value="structural" className="bg-[#050505]">Heavy Structural Steel frames</option>
                          <option value="facade" className="bg-[#050505]">Architectural Facade grids</option>
                          <option value="windows" className="bg-[#050505]">Slim Steel Windows / Doors</option>
                          <option value="bespoke" className="bg-[#050505]">Bespoke Interior Staircases</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-2">Estimated Tonnage Required</label>
                        <select
                          name="tonnage"
                          required
                          className="w-full rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/60 px-4 py-4 text-xs text-[#F5F5F5] focus:border-[#00C853] focus:bg-[#111111]/80 focus:outline-none transition-all"
                        >
                          <option value="1-10" className="bg-[#050505]">Boutique (1 - 10 Tons)</option>
                          <option value="10-50" className="bg-[#050505]">Mid-Scale Commercial (10 - 50 Tons)</option>
                          <option value="50-200" className="bg-[#050505]">Heavy structural (50 - 200 Tons)</option>
                          <option value="200+" className="bg-[#050505]">Mega Terminal Infrastructure (200+ Tons)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-2">Technical Brief & Design Variables</label>
                      <textarea
                        name="brief"
                        rows={5}
                        required
                        placeholder="Detail expected load conditions, profile shapes, sightline targets, saline proximity, and compliance needs..."
                        className="w-full rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/60 px-4 py-4 text-xs text-[#F5F5F5] placeholder-[#555555] focus:border-[#00C853] focus:bg-[#111111]/80 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={() => steelAudio.playHover()}
                      className="w-full rounded-full bg-[#00C853] py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] transition-all hover:bg-[#FF6B1A] disabled:opacity-50"
                    >
                      {loading ? "Registering parameters..." : "Register Priority Sizing Brief"}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Direct contact specifications */}
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/30 p-6 backdrop-blur-md">
                  <div className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#00C853] mb-5">Primary Office & Plant</div>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <MapPin size={18} className="mt-1 text-[#00C853]" />
                      <div>
                        <div className="text-sm font-semibold text-[#F5F5F5]">IMS Steel Division Headquarters</div>
                        <p className="mt-1 text-xs leading-5 text-[#9A9A9A]">Gomti Nagar, Lucknow, Uttar Pradesh 226010</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pt-4 border-t border-[#D9D9D9]/10">
                      <Phone size={18} className="mt-1 text-[#00C853]" />
                      <div>
                        <div className="text-sm font-semibold text-[#F5F5F5]">Direct estimations line</div>
                        <a href="tel:+919699858212" className="mt-1 text-xs text-[#9A9A9A] hover:text-[#00C853] font-semibold transition-colors">+91 9699 858 212</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pt-4 border-t border-[#D9D9D9]/10">
                      <Mail size={18} className="mt-1 text-[#00C853]" />
                      <div>
                        <div className="text-sm font-semibold text-[#F5F5F5]">Engineering mailbox</div>
                        <a href="mailto:steel@imsgroup.co.in" className="mt-1 text-xs text-[#9A9A9A] hover:text-[#00C853] font-semibold transition-colors">steel@imsgroup.co.in</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical priorities summary card */}
                <div className="rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-6">
                  <div className="flex items-center gap-2 text-[#FF6B1A] mb-4">
                    <Milestone size={16} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.24em]">Estimated SLA milestones</span>
                  </div>
                  <div className="space-y-3 text-xs text-[#9A9A9A]">
                    <div className="flex items-center justify-between">
                      <span>Initial contact callback</span>
                      <span className="font-semibold text-[#F5F5F5]">&lt; 4 Hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Eurocode load model sizing</span>
                      <span className="font-semibold text-[#F5F5F5]">&lt; 24 Hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Robotic welding synthesis</span>
                      <span className="font-semibold text-[#F5F5F5]">&lt; 3 Days</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
