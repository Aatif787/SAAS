"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, HelpCircle, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Activity, Info } from "lucide-react";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { toast } from "sonner";

const steps = [
  "Slicing BIM architectural coordinates...",
  "Calibrating Eurocode 3 load parameters...",
  "Simulating sandblast coating requirements...",
  "Shortlisting high-performance systems...",
];

export default function SteelAILabPage() {
  const [projectType, setProjectType] = useState("villa");
  const [priority, setPriority] = useState("strength");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState(0);
  const [synthesisComplete, setSynthesisComplete] = useState(false);

  function triggerSynthesis() {
    setIsSynthesizing(true);
    setSynthesisStep(0);
    setSynthesisComplete(false);

    // Dynamic stepping simulation
    const interval = setInterval(() => {
      setSynthesisStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSynthesizing(false);
            setSynthesisComplete(true);
            toast.success("AI Synthesis complete! Technical spec shortlisted.");
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  }

  return (
    <SmoothScroll>
      <div className="relative z-10 pt-28 pb-16">
        {/* Editorial Subpage Header */}
        <section className="relative overflow-hidden py-16">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#00C853]/20 bg-[#00C853]/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.36em] text-[#00C853]">
                <Bot size={14} className="text-[#00C853]" />
                IMS Engineering Laboratory
              </div>
              <h1 className="mt-8 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#F5F5F5] md:text-7xl xl:text-[6.5rem]">
                Automated steel
                <br />
                synthesis lab
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9A9A9A] md:text-xl">
                Bridge raw steel fabrication variables and intelligent computational specifications. Enter your project variables below and trigger our AI synthesizer to shortlist structural nodes, finishes, and thickness ranges.
              </p>
            </div>
          </div>
        </section>

        {/* Synthesis Workspace */}
        <section className="relative overflow-hidden py-10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="grid gap-8 lg:grid-cols-[460px_minmax(0,1fr)]">
              
              {/* Controls Column */}
              <div className="rounded-[2.4rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-5 sm:p-7 backdrop-blur-md shadow-[0_0_50px_rgba(5,5,5,0.5)]">
                <div className="flex items-center gap-2 text-[#00C853] mb-6 pb-4 border-b border-[#D9D9D9]/10">
                  <Cpu size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em]">Input Parameters</span>
                </div>

                <div className="space-y-6">
                  {/* Project Type */}
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-3">Project Classification</label>
                    <div className="grid gap-2 grid-cols-2">
                      {[
                        { id: "villa", label: "Luxury Villa" },
                        { id: "commercial", label: "Sky Tower" },
                        { id: "airport", label: "Mobility Terminal" },
                        { id: "interior", label: "Boutique Retail" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProjectType(item.id)}
                          className={`rounded-xl border p-3 sm:p-4 text-xs font-semibold tracking-[-0.02em] transition-all text-center ${
                            projectType === item.id
                              ? "border-[#00C853] bg-[#00C853]/5 text-[#00C853] shadow-sm"
                              : "border-[#D9D9D9]/10 bg-[#050505] text-[#9A9A9A] hover:bg-[#111111]/80 hover:text-[#F5F5F5]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority Variable */}
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-3">Structural Optimization Priority</label>
                    <div className="space-y-2">
                      {[
                        { id: "strength", label: "Maximum Yield Strength (Hot-Rolled)" },
                        { id: "corrosion", label: "High-Salinity Corrosion Proofing" },
                        { id: "slimness", label: "Minimal Sightlines (Architectural Casement)" },
                        { id: "efficiency", label: "Zero-Waste Modular Sequencing" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPriority(item.id)}
                          className={`w-full text-left rounded-xl border px-4 py-3.5 text-xs font-semibold tracking-[-0.02em] transition-all ${
                            priority === item.id
                              ? "border-[#00C853] bg-[#00C853]/5 text-[#00C853]"
                              : "border-[#D9D9D9]/10 bg-[#050505] text-[#9A9A9A] hover:bg-[#111111]/80 hover:text-[#F5F5F5]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trigger Button */}
                  <button
                    type="button"
                    onClick={triggerSynthesis}
                    disabled={isSynthesizing}
                    className="w-full mt-6 rounded-full bg-[#FF6B1A] py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] shadow-lg hover:shadow-xl hover:bg-[#00C853] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSynthesizing ? (
                      <>
                        <Activity className="animate-spin text-[#050505]" size={14} /> Synthesizing...
                      </>
                    ) : (
                      <>
                        Run AI Synthesis <Sparkles size={14} className="text-[#050505]" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Simulation Screen output */}
              <div className="rounded-[2.4rem] border border-[#D9D9D9]/10 bg-[#111111]/60 p-5 sm:p-7 backdrop-blur-md min-h-[420px] sm:min-h-[500px] flex flex-col justify-between shadow-[0_0_80px_rgba(5,5,5,0.8)]">
                
                {/* Synthesis header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]/10">
                  <div className="flex items-center gap-2">
                    <Activity size={18} className="text-[#00C853]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9A9A9A]">Synthesizer Terminal Sizing</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-[#00C853] animate-pulse" />
                </div>

                {/* Synthesis Output Area */}
                <div className="flex-1 flex flex-col items-center justify-center my-6">
                  <AnimatePresence mode="wait">
                    {isSynthesizing ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-4 max-w-sm"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00C853]/10 text-[#00C853] animate-bounce">
                          <Bot size={28} />
                        </div>
                        <h4 className="text-sm font-bold text-[#F5F5F5] tracking-[-0.01em]">Synthesizing Specifications...</h4>
                        <p className="text-xs text-[#9A9A9A] min-h-[30px] font-medium transition-all">
                          {steps[synthesisStep]}
                        </p>
                      </motion.div>
                    ) : synthesisComplete ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full space-y-6"
                      >
                        <div className="rounded-3xl border border-[#D9D9D9]/10 bg-[#050505]/60 p-4 sm:p-6">
                          <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#00C853] mb-4">Shortlist Spec Sheet</div>
                          
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A]">Primary System</div>
                              <div className="mt-1.5 text-lg font-bold text-[#F5F5F5]">
                                {projectType === "villa" && "Architectural Steel / Slim Windows"}
                                {projectType === "commercial" && "Modern Facade Curtain Walls"}
                                {projectType === "airport" && "Heavy Hot-Rolled Structural Steel"}
                                {projectType === "interior" && "Luxury Partitions / Stainless Detailing"}
                              </div>
                            </div>

                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A]">Yield Strength Standard</div>
                              <div className="mt-1.5 text-lg font-bold text-[#F5F5F5]">
                                {priority === "strength" && "S355JR (355 MPa limit)"}
                                {priority === "corrosion" && "SS316L Marine Grade (240 MPa)"}
                                {priority === "slimness" && "S275 Steel Profile (275 MPa)"}
                                {priority === "efficiency" && "S355JO High execution tolerance"}
                              </div>
                            </div>

                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A]">Optimal Coating finish</div>
                              <div className="mt-1.5 text-lg font-bold text-[#F5F5F5]">
                                {priority === "corrosion" ? "Hot-Dip Galvanized Zinc" : "Standard Epoxy Orange Coating"}
                              </div>
                            </div>

                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9A9A]">Wind Load Capacity</div>
                              <div className="mt-1.5 text-lg font-bold text-[#F5F5F5]">
                                {projectType === "commercial" || projectType === "airport" ? "5.2 kPa Limit" : "3.8 kPa Standard"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 flex-col sm:flex-row">
                          <Link
                            href="/ims-steel/contact"
                            className="flex-1 rounded-full bg-[#FF6B1A] py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] hover:bg-[#00C853] shadow-md transition-all text-center block"
                          >
                            Approve Checklist
                          </Link>
                          <button
                            type="button"
                            onClick={() => setSynthesisComplete(false)}
                            className="flex-1 rounded-full border border-[#D9D9D9]/20 bg-[#050505] py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#F5F5F5] hover:bg-[#111111]/80"
                          >
                            Reset Parameters
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-4 max-w-sm"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050505]/40 text-[#9A9A9A] border border-[#D9D9D9]/10">
                          <Bot size={28} />
                        </div>
                        <h4 className="text-sm font-bold text-[#F5F5F5] tracking-[-0.01em]">Synthesizer Standby</h4>
                        <p className="text-xs leading-5 text-[#9A9A9A]">
                          Please select your project parameters on the left controls panel and click &ldquo;Run AI Synthesis&rdquo; to begin.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Synthesis Footer info */}
                <div className="pt-4 border-t border-[#D9D9D9]/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9A9A]">
                  <Info size={12} className="text-[#00C853]" />
                  <span>Calibrated to Eurocode 3 standard calculations guidelines.</span>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
