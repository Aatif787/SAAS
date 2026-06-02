"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Calculator, MessageSquareText, ScanSearch, Sparkles, WandSparkles, Send, Terminal } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitTextReveal, useScrollSkew } from "./steel-scroll-engine";
import { steelAudio } from "./steel-audio-engine";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  { title: "AI Architectural Assistant", copy: "Guides architects, engineers, and developers through steel section logic, load suitability, and facade detailing direction.", icon: <Bot size={18} /> },
  { title: "Smart Estimator Portal", copy: "Converts architectural scope data into fast structural budgets with interactive sliders and instant specifications output.", icon: <Calculator size={18} /> },
  { title: "Category Selector Engine", copy: "Instantly recommends exact profile grades across heavy structural, luxury facade, and slim window solutions.", icon: <Sparkles size={18} /> },
  { title: "Facade Blueprint Visualizer", copy: "Helps design teams visualize complex steel joints and structural mount coordinates before raw fabrication.", icon: <ScanSearch size={18} /> },
  { title: "Private Developer Discovery", copy: "Conversational AI helper for developer onboarding, custom fabrication intakes, and technical support paths.", icon: <MessageSquareText size={18} /> },
  { title: "Predictive Lifecycle Tool", copy: "Calculates likely steel load limits, anti-corrosion layer lifespan, and visual durability index for custom properties.", icon: <WandSparkles size={18} /> },
];

export default function SteelAISystems() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const promptBoxRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [promptInput, setPromptInput] = useState("I need a premium custom steel facade grid and large security glass entry doors for a luxury corporate lobby with slim frame lines.");
  const [isComputing, setIsComputing] = useState(false);
  const [matchOutput, setMatchOutput] = useState("Modern Facade Systems, Architectural Steel sections, Steel Entry Doors, and custom marine-grade epoxy finish.");

  useSplitTextReveal(titleRef, { stagger: 0.018, duration: 1.1, y: 80, start: "top 82%" });
  useScrollSkew(gridRef, 5); 
  useScrollSkew(demoRef, 4);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cards: 3D perspective stagger entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 80, opacity: 0, rotateX: 25, scale: 0.9, filter: "blur(12px)" },
          {
            y: 0, opacity: 1, rotateX: 0, scale: 1, filter: "blur(0px)",
            duration: 1.4, stagger: 0.1, ease: "power4.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }

      // Demo panel slide-in
      if (demoRef.current) {
        gsap.fromTo(
          demoRef.current,
          { x: 80, opacity: 0, scale: 0.95, filter: "blur(15px)" },
          {
            x: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.6, ease: "expo.out",
            scrollTrigger: { trigger: demoRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Hover Matrix Physics
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(card, {
      rotateX: -y * 0.15,
      rotateY: x * 0.15,
      x: x * 0.08,
      y: y * 0.08,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.8, ease: "elastic.out(1.2, 0.4)" });
  };

  const triggerMatch = () => {
    if (isComputing) return;
    setIsComputing(true);
    steelAudio.playWarp();

    gsap.fromTo(
      promptBoxRef.current,
      { filter: "blur(4px)", scale: 0.98 },
      { filter: "blur(0px)", scale: 1.0, duration: 0.6, ease: "power2.out" }
    );

    setTimeout(() => {
      setIsComputing(false);
      steelAudio.playClick();
      if (promptInput.toLowerCase().includes("window")) {
        setMatchOutput("Ultra-Slim Casement Windows, High-Performance Stainless Steel, and dual-layer thermal weather insulation.");
      } else if (promptInput.toLowerCase().includes("industrial")) {
        setMatchOutput("Heavy Structural portals, CNC robotically welded girders, and operational lifecycle coatings.");
      } else {
        setMatchOutput("Modern Facade Systems, Architectural Steel sections, Steel Entry Doors, and custom marine-grade epoxy finish.");
      }
    }, 1200);
  };

  return (
    <section id="ai" ref={sectionRef} className="relative overflow-hidden bg-transparent py-40 text-[#F5F5F5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,200,83,0.06),transparent_35%),radial-gradient(circle_at_82%_30%,rgba(255,107,26,0.06),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,200,83,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(0,200,83,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 xl:px-14">
        <div className="mb-20 max-w-4xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#00C853]">Cybernetic OS Systems</div>
          <h2
            ref={titleRef}
            className="mt-6 text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white md:text-6xl xl:text-7xl"
            style={{ perspective: "800px" }}
          >
            <span className="text-[#00C853] drop-shadow-[0_0_20px_rgba(0,200,83,0.15)]">A luxury steel platform</span> should think as fast as it <span className="text-[#FF3D00] drop-shadow-[0_0_20px_rgba(255,61,0,0.25)]">calculates</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#D0D0D0]">
            IMS Steel integrates intelligent automated layers to simplify commercial engineering, providing rapid structural sizing, process recommendations, and instant budgetary shortlists powered by next-gen algorithms.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-8 md:grid-cols-2 xl:grid-cols-3" style={{ perspective: "1200px" }}>
          {systems.map((system, index) => (
            <div
              key={system.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              onMouseEnter={() => steelAudio.playHover()}
              className="group rounded-[2rem] border border-[#D9D9D9]/10 bg-[#111111]/60 p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#00C853]/40 hover:bg-[#111111]/90 hover:shadow-[0_0_50px_rgba(0,200,83,0.15)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050505] border border-[#00C853]/20 text-[#00C853] shadow-[0_0_20px_rgba(0,200,83,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#00C853] group-hover:border-[#00C853] group-hover:text-[#050505] group-hover:shadow-[0_0_40px_rgba(0,200,83,0.6)]">
                {system.icon}
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-white" style={{ transform: "translateZ(30px)" }}>{system.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#D0D0D0]" style={{ transform: "translateZ(15px)" }}>{system.copy}</p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#00C853]/20 bg-[#00C853]/5 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#00C853] transition-all group-hover:bg-[#00C853] group-hover:text-[#050505] group-hover:border-[#00C853] group-hover:shadow-[0_0_15px_rgba(0,200,83,0.5)]">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                Active Terminal
              </div>
            </div>
          ))}
        </div>

        <div ref={demoRef} className="mt-16 rounded-[2.3rem] border border-[#D9D9D9]/10 bg-[#111111]/50 p-10 backdrop-blur-xl md:p-12 shadow-[0_0_60px_rgba(5,5,5,0.6)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#FF6B1A] flex items-center gap-3">
                <Terminal size={14} className="animate-pulse" />
                Live Engineering Console
              </div>
              <h3 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white">
                Ask the neural net what kind of <span className="text-[#CCCCCC]">steel system</span> your project actually needs
              </h3>
              <p className="mt-6 max-w-2xl text-lg leading-7 text-[#D0D0D0]">
                Type in your architectural variables: structural span, visual style, weight targets, and regional wind metrics. The AI helper will render your shortlists instantly.
              </p>
            </div>
            
            <div ref={promptBoxRef} className="rounded-[1.8rem] border border-[#D9D9D9]/10 bg-[#050505]/80 p-6 shadow-inner relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(5,5,5,0.25)_50%),linear-gradient(90deg,rgba(0,200,83,0.06),rgba(0,153,102,0.02),rgba(255,107,26,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
              
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B1A] mb-4">Command Prompt / INPUT</div>
              
              <div className="relative z-10">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Initiate prompt sequence..."
                  className="w-full rounded-[1.4rem] border border-[#D9D9D9]/20 bg-[#111111] px-5 py-5 pr-14 text-sm text-white outline-none focus:border-[#FF6B1A]/60 transition-colors shadow-inner placeholder:text-[#666666]"
                />
                <button
                  type="button"
                  onClick={triggerMatch}
                  onMouseEnter={() => steelAudio.playHover()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B1A] text-[#050505] shadow-[0_0_15px_rgba(255,107,26,0.4)] hover:bg-[#FF6B1A] hover:shadow-[0_0_25px_rgba(255,107,26,0.8)] transition-all"
                >
                  <Send size={16} className={isComputing ? "animate-spin" : ""} />
                </button>
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-[#00C853]/30 bg-[#00C853]/10 p-5 text-sm leading-6 text-[#00FF66] transition-all duration-300 relative z-10 shadow-[0_0_20px_rgba(0,200,83,0.1)]">
                <div className="text-[9px] uppercase tracking-wider font-bold text-[#00C853] mb-2">
                  {isComputing ? "> PROCESSING ALGORITHM..." : "> SYSTEM MATCH EXECUTED:"}
                </div>
                <div className="text-[#CCFFCC]">{isComputing ? "Allocating neural nodes and compiling architectural tolerances..." : matchOutput}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
