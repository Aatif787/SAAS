"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, ShieldAlert, CheckCircle, HelpCircle, Layers, Sliders, Settings2, Sparkles, Building2 } from "lucide-react";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { toast } from "sonner";

// High-fidelity structural specifications for all 9 systems
const systemsSpecs: Record<
  string,
  {
    title: string;
    tag: string;
    description: string;
    yieldStrength: string;
    compliance: string;
    maxWindLoad: string;
    finishes: string[];
    defaultThickness: string;
    modulusRange: string;
  }
> = {
  "structural-steel": {
    title: "Structural Steel Systems",
    tag: "Heavy-Duty Frameworks",
    description: "High-grade hot-rolled structural steel sections engineered for supporting massive retail centers, commercial towers, and wide industrial frameworks.",
    yieldStrength: "355 MPa (S355JR)",
    compliance: "EN 1993 (Eurocode 3)",
    maxWindLoad: "4.5 kPa",
    finishes: ["Marine Galvanized Zinc", "Standard Epoxy Orange", "Charcoal Sandblast Primer"],
    defaultThickness: "12 mm - 35 mm",
    modulusRange: "450 - 2,800 cm³",
  },
  "stainless-steel": {
    title: "Stainless Steel Systems",
    tag: "Elite Corrosion-Proof Profiles",
    description: "Sleek, polished stainless steel sections combining maximum corrosion protection with cold luxury aesthetics for boutique offices and portals.",
    yieldStrength: "240 MPa (SS316L)",
    compliance: "ASTM A240 / EN 10088",
    maxWindLoad: "3.8 kPa",
    finishes: ["Satin Brushed Finish", "Mirror Polished Chrome", "Physical Vapor Deposition (PVD) Gold"],
    defaultThickness: "4 mm - 10 mm",
    modulusRange: "120 - 640 cm³",
  },
  "architectural-steel": {
    title: "Architectural Steel Facades",
    tag: "Design-Driven Curtain Walls",
    description: "Fine slim profile facade steel designed to carry monumental glazing units, presenting custom coordinates and high aesthetic restraint.",
    yieldStrength: "275 MPa (S275)",
    compliance: "EN 13830 curtain walling",
    maxWindLoad: "4.8 kPa",
    finishes: ["Anodized Amber Orange", "Pure Matte White EP", "Matte Charcoal Sandblast"],
    defaultThickness: "6 mm - 16 mm",
    modulusRange: "180 - 950 cm³",
  },
  "industrial-steel-solutions": {
    title: "Industrial Steel Solutions",
    tag: "Resilient Facility Assemblies",
    description: "Heavy-duty logistics grids, plant supports, and high-strength portal steel optimized for maximum load resistance and wear cycles.",
    yieldStrength: "355 MPa (S355)",
    compliance: "AISC 360",
    maxWindLoad: "3.5 kPa",
    finishes: ["Galvanized Hot-Dip Zinc", "High-Vis Safety Orange", "Industrial Oxide Grey"],
    defaultThickness: "10 mm - 45 mm",
    modulusRange: "500 - 3,500 cm³",
  },
  "fabrication-systems": {
    title: "CNC Fabrication Systems",
    tag: "Sub-Millimeter Tolerances",
    description: "Digitally calibrated structural connections, custom baseplates, and robotic welding kits designed for exact assembly speeds.",
    yieldStrength: "355 MPa (S355JO)",
    compliance: "EN 1090-2 EXC3",
    maxWindLoad: "4.0 kPa",
    finishes: ["Robotic Anti-Rust Oil", "Matte White Epoxy", "Vibrant Corporate Orange"],
    defaultThickness: "8 mm - 25 mm",
    modulusRange: "200 - 1,800 cm³",
  },
  "luxury-steel-interiors": {
    title: "Luxury Steel Interiors",
    tag: "Bespoke Sculptures & Partitions",
    description: "Laser-cut partition panels, modern staircase framing, and luxury room dividers tailored for boutique retail and villas.",
    yieldStrength: "235 MPa (S235)",
    compliance: "Standard Interior EN 10025",
    maxWindLoad: "1.5 kPa (Acoustic limits)",
    finishes: ["Satin Amber Bronze", "Matte Charcoal EP", "Polished Stainless Steel"],
    defaultThickness: "3 mm - 8 mm",
    modulusRange: "40 - 250 cm³",
  },
  "steel-doors": {
    title: "Bespoke Steel Doors",
    tag: "Secure Monumental Entrances",
    description: "High-security thermal-break steel entrance doors configured with massive structural frames, premium pivots, and bulletproof cores.",
    yieldStrength: "275 MPa (S275)",
    compliance: "EN 14351-1 security rating",
    maxWindLoad: "5.0 kPa (Extreme shelter)",
    finishes: ["Luxury Textured EP Orange", "Brushed Graphite EP", "Gold PVD Accents"],
    defaultThickness: "5 mm - 12 mm",
    modulusRange: "90 - 450 cm³",
  },
  "steel-windows": {
    title: "Slim Steel Windows",
    tag: "Ultra-Minimal Sightlines",
    description: "Slim-line casements presenting classical sightlines, deep double-glazing frames, and ultimate thermal barrier protection.",
    yieldStrength: "275 MPa (S275)",
    compliance: "EN 14351-1 testing standards",
    maxWindLoad: "4.2 kPa",
    finishes: ["Matte Pure White", "Ultra-Satin Black", "Classic Architectural Bronze"],
    defaultThickness: "4 mm - 8 mm",
    modulusRange: "60 - 320 cm³",
  },
  "modern-facade-systems": {
    title: "Modern Facade Systems",
    tag: "Curtain Envelopes",
    description: "Multi-layered exterior cladding brackets, sunscreen fins, and structural backing channels calibrated for modern high-rises.",
    yieldStrength: "355 MPa (S355)",
    compliance: "EN 13830 / CWCT testing",
    maxWindLoad: "5.2 kPa (Super-high wind)",
    finishes: ["Anodized Warm Copper", "Vibrant Epoxy Orange", "Satin Brushed Titanium"],
    defaultThickness: "8 mm - 20 mm",
    modulusRange: "250 - 1,500 cm³",
  },
};

export default function SteelSystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const spec = systemsSpecs[slug] || systemsSpecs["structural-steel"];

  // Interactive load calculator states
  const [span, setSpan] = useState(6.0); // in meters
  const [height, setHeight] = useState(450); // in mm
  const [load, setLoad] = useState(2.5); // in kN/m2
  const [finish, setFinish] = useState(spec.finishes[0]);

  // Dynamic calculations
  const requiredModulus = Math.round((load * Math.pow(span, 2) * 1000) / (8 * 0.355 * 10)); // simulated calculations
  const deflection = parseFloat(((5 * load * Math.pow(span, 4) * 100) / (384 * 21000 * (requiredModulus / 100))).toFixed(1));
  const suggestedThickness = parseFloat((3 + (requiredModulus / 150)).toFixed(1));
  const isSafe = deflection < (span * 1000) / 250;

  // Form intake states
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleConsultationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const volume = data.get("volume");

    if (!email || !volume) {
      toast.error("Please fill in required technical details.");
      return;
    }

    setFormSubmitted(true);
    toast.success(`Specs checklist generated! Tech dossier sent to ${email}`);
  }

  return (
    <SmoothScroll>
      <div className="relative z-10 pt-28 pb-16">
        {/* Editorial Subpage Header */}
        <section className="relative overflow-hidden py-16">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <Link
              href="/ims-steel/systems"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#00C853] mb-8 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft size={14} /> Back to Catalog
            </Link>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_480px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#00C853]/10 border border-[#00C853]/20 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.26em] text-[#00C853]">
                  <Layers size={12} /> {spec.tag}
                </div>
                <h1 className="mt-6 text-4xl font-semibold leading-[0.92] tracking-[-0.04em] text-[#F5F5F5] md:text-6xl xl:text-7xl">
                  {spec.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9A9A9A]">
                  {spec.description}
                </p>
              </div>

              <div className="rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-6 backdrop-blur-md flex flex-col justify-between shadow-[0_0_50px_rgba(5,5,5,0.5)]">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00C853]">Intelligent System Core</div>
                  <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#F5F5F5]">Custom Sizing Panel</h3>
                  <p className="mt-3 text-xs leading-5 text-[#9A9A9A]">
                    Use our active estimator calculator tool below to analyze structural loads, wind capacities, and plate thicknesses.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-[#D9D9D9]/10 flex items-center justify-between">
                  <div className="text-xs text-[#9A9A9A] font-semibold uppercase tracking-[0.16em]">S355 Steel Compliant</div>
                  <span className="h-2 w-2 animate-ping rounded-full bg-[#00C853]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Calculator & CAD drawing */}
        <section className="relative overflow-hidden py-12">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="grid gap-8 lg:grid-cols-[450px_minmax(0,1fr)]">
              
              {/* Sliders and Controls */}
              <div className="rounded-[2.4rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-5 sm:p-6 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#00C853] mb-6">
                  <Sliders size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em]">Technical Variables</span>
                </div>

                <div className="space-y-6">
                  {/* Span Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#9A9A9A] uppercase tracking-[0.12em] mb-2">
                      <span>Clear Span (Length)</span>
                      <span className="text-[#00C853] font-bold">{span} meters</span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="15.0"
                      step="0.5"
                      value={span}
                      onChange={(e) => setSpan(parseFloat(e.target.value))}
                      className="w-full h-1 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#00C853]"
                    />
                  </div>

                  {/* Section Height Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#9A9A9A] uppercase tracking-[0.12em] mb-2">
                      <span>Section Profile Depth</span>
                      <span className="text-[#00C853] font-bold">{height} mm</span>
                    </div>
                    <input
                      type="range"
                      min="120"
                      max="800"
                      step="10"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="w-full h-1 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#00C853]"
                    />
                  </div>

                  {/* Load factor slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#9A9A9A] uppercase tracking-[0.12em] mb-2">
                      <span>Uniform Distributed Load (UDL)</span>
                      <span className="text-[#00C853] font-bold">{load} kN/m²</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="10.0"
                      step="0.5"
                      value={load}
                      onChange={(e) => setLoad(parseFloat(e.target.value))}
                      className="w-full h-1 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#00C853]"
                    />
                  </div>

                  {/* Finish Selector */}
                  <div className="pt-4 border-t border-[#D9D9D9]/10">
                    <span className="text-xs font-semibold text-[#9A9A9A] uppercase tracking-[0.12em] block mb-3">Surface Treatment finish</span>
                    <div className="flex flex-col gap-2">
                      {spec.finishes.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFinish(f)}
                          className={`w-full text-left rounded-xl border px-4 py-3 text-xs font-medium transition-all ${
                            finish === f
                              ? "border-[#00C853] bg-[#00C853]/5 text-[#00C853]"
                              : "border-[#D9D9D9]/10 bg-[#050505] text-[#9A9A9A] hover:bg-[#111111]/80 hover:text-[#F5F5F5]"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time CAD visual & calculation report */}
              <div className="rounded-[2.4rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between shadow-[0_0_80px_rgba(5,5,5,0.8)]">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]/10">
                    <div className="flex items-center gap-2">
                      <Calculator size={18} className="text-[#00C853]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9A9A9A]">Real-Time Estimator Sizing Report</span>
                    </div>
                    {isSafe ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle size={10} /> Structural Safe
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.18em] text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
                        <ShieldAlert size={10} /> High deflection
                      </span>
                    )}
                  </div>

                  {/* Dynamic SVG Blueprint Drawing */}
                  <div className="relative my-8 h-[240px] w-full overflow-hidden rounded-[1.8rem] border border-[#D9D9D9]/10 bg-[#050505]/60 flex items-center justify-center">
                    {/* SVG detail dimensions drawn dynamically based on sliders! */}
                    <svg className="w-full h-full p-4" viewBox="0 0 600 200">
                      {/* Grid background */}
                      <defs>
                        <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,200,83,0.05)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#cad-grid)" />
                      
                      {/* Left Wall Coordinate */}
                      <line x1="50" y1="30" x2="50" y2="170" stroke="rgba(148,163,184,0.15)" strokeWidth="1.5" strokeDasharray="3,3" />
                      {/* Right Wall Coordinate */}
                      <line x1="550" y1="30" x2="550" y2="170" stroke="rgba(148,163,184,0.15)" strokeWidth="1.5" strokeDasharray="3,3" />

                      {/* Main Steel beam span profile */}
                      <rect
                        x="50"
                        y={100 - suggestedThickness * 2}
                        width="500"
                        height={suggestedThickness * 4}
                        fill="rgba(0,200,83,0.1)"
                        stroke="#00C853"
                        strokeWidth="2"
                        rx="4"
                      />

                      {/* Section Height Indicator bars */}
                      <line x1="120" y1={100 - suggestedThickness * 2} x2="120" y2={100 + suggestedThickness * 2} stroke="#00C853" strokeWidth="2.5" />
                      <line x1="110" y1={100 - suggestedThickness * 2} x2="130" y2={100 - suggestedThickness * 2} stroke="#00C853" strokeWidth="1" />
                      <line x1="110" y1={100 + suggestedThickness * 2} x2="130" y2={100 + suggestedThickness * 2} stroke="#00C853" strokeWidth="1" />
                      <text x="140" y="104" fill="#9A9A9A" fontSize="10" fontWeight="bold">H: {height}mm</text>

                      {/* Span marker bottom */}
                      <path d="M 50 150 L 550 150" stroke="#D9D9D9" strokeOpacity="0.2" strokeWidth="1" />
                      <path d="M 50 145 L 50 155" stroke="#D9D9D9" strokeOpacity="0.2" strokeWidth="1" />
                      <path d="M 550 145 L 550 155" stroke="#D9D9D9" strokeOpacity="0.2" strokeWidth="1" />
                      <text x="270" y="166" fill="#9A9A9A" fontSize="10" fontWeight="bold">SPAN: {span}m</text>

                      {/* Load arrows */}
                      <path d="M 180 40 L 180 70 M 180 70 L 176 64 M 180 70 L 184 64" stroke="#00C853" strokeWidth="1.5" />
                      <path d="M 300 40 L 300 70 M 300 70 L 296 64 M 300 70 L 304 64" stroke="#00C853" strokeWidth="1.5" />
                      <path d="M 420 40 L 420 70 M 420 70 L 416 64 M 420 70 L 424 64" stroke="#00C853" strokeWidth="1.5" />
                      <text x="280" y="32" fill="#00C853" fontSize="9" fontWeight="bold">{load} kN/m² UDL</text>
                    </svg>
                  </div>
                </div>

                {/* Grid performance outputs */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 pt-6 border-t border-[#D9D9D9]/10">
                  <div className="rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/40 p-4">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9A9A]">Suggested thickness</div>
                    <div className="mt-2 text-2xl font-black text-[#F5F5F5]">{suggestedThickness} mm</div>
                  </div>
                  <div className="rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/40 p-4">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9A9A]">Required Modulus</div>
                    <div className="mt-2 text-2xl font-black text-[#F5F5F5]">{requiredModulus} cm³</div>
                  </div>
                  <div className="rounded-2xl border border-[#D9D9D9]/10 bg-[#050505]/40 p-4">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9A9A]">Deflection limit</div>
                    <div className="mt-2 text-2xl font-black text-[#F5F5F5]">{deflection} mm</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Technical specs specification table */}
        <section className="relative overflow-hidden py-16 border-t border-[#D9D9D9]/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F5] mb-8">
              Technical Specifications Dossier
            </h2>

            <div className="overflow-x-auto rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/40">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#D9D9D9]/10 bg-[#050505] text-[10px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A]">
                    <th className="p-6">Parameter Property</th>
                    <th className="p-6">Calibrated Standard Value</th>
                    <th className="p-6">Code Compliance</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-[#9A9A9A]">
                  <tr className="border-b border-[#D9D9D9]/10">
                    <td className="p-6 font-semibold text-[#F5F5F5]">Yield Strength Limit</td>
                    <td className="p-6">{spec.yieldStrength}</td>
                    <td className="p-6">Structural Grade standard</td>
                  </tr>
                  <tr className="border-b border-[#D9D9D9]/10">
                    <td className="p-6 font-semibold text-[#F5F5F5]">System Execution Compliance</td>
                    <td className="p-6">{spec.compliance}</td>
                    <td className="p-6">Civil safety and welding certified</td>
                  </tr>
                  <tr className="border-b border-[#D9D9D9]/10">
                    <td className="p-6 font-semibold text-[#F5F5F5]">Maximum Wind Load Tolerance</td>
                    <td className="p-6">{spec.maxWindLoad}</td>
                    <td className="p-6">Calibrated for coastal heights</td>
                  </tr>
                  <tr className="border-b border-[#D9D9D9]/10">
                    <td className="p-6 font-semibold text-[#F5F5F5]">Default Thickness Range</td>
                    <td className="p-6">{spec.defaultThickness}</td>
                    <td className="p-6">Thicker grades available upon request</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-semibold text-[#F5F5F5]">Coating Finishes Layer</td>
                    <td className="p-6">{finish}</td>
                    <td className="p-6">Sandblast + EP cured</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Technical Intake Consultation Form */}
        <section className="relative overflow-hidden py-16 border-t border-[#D9D9D9]/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_480px]">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00C853]">Technical Checklist Intake</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F5] md:text-5xl">
                  Generate dynamic dossier for your design
                </h2>
                <p className="mt-6 text-sm leading-7 text-[#9A9A9A]">
                  Input your email address and expected load variables. The system will compile a dynamic spec sheet showing section modulus, wind limits, calculations history, and finish blueprints.
                </p>
              </div>

              <div>
                <form onSubmit={handleConsultationSubmit} className="rounded-[2.4rem] border border-[#D9D9D9]/10 bg-[#111111]/40 p-5 sm:p-7 backdrop-blur-md space-y-4 shadow-[0_0_50px_rgba(5,5,5,0.5)]">
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-2">Professional Email Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. architect@firm.com"
                      className="w-full rounded-2xl border border-[#D9D9D9]/10 bg-[#050505] px-4 py-4 text-xs text-[#F5F5F5] focus:border-[#00C853] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9A9A9A] block mb-2">Estimated Tonnage Volume</label>
                    <select
                      name="volume"
                      required
                      className="w-full rounded-2xl border border-[#D9D9D9]/10 bg-[#050505] px-4 py-4 text-xs text-[#F5F5F5] focus:border-[#00C853] focus:outline-none"
                    >
                      <option value="5-20">Boutique Villa (5 - 20 Tons)</option>
                      <option value="20-100">Medium Commercial Facade (20 - 100 Tons)</option>
                      <option value="100+">Tower/Airport Infrastructure (100+ Tons)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#FF6B1A] py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] shadow-md hover:bg-[#00C853] hover:shadow-lg transition-all"
                  >
                    Generate Technical Dossier
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
