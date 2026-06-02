"use client";

import { useState, useEffect, useRef } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, User, HelpCircle, Activity, Zap, Shield, Globe, Cpu, Brain, Network } from "lucide-react";

// Types for chat
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  tokens?: number;
};

const SUGGESTED_PROMPTS = [
  "🏥 Hospital Systems",
  "🏗️ Infrastructure",
  "🧠 How do you work?",
  "🌍 Global Reach"
];

// Extended Simulated Knowledge Base
const KNOWLEDGE_BASE = {
  hospital: "IMS Hospital redefined tertiary care in Lucknow. Features: 24/7 ER, ALS Ambulances, Advanced ICU, and Digital Patient Portal.",
  infrastructure: "IMS Group specializes in high-end infrastructure, industrial setups, and institutional development across North India.",
  tech: "We deploy AI-driven analytics for project management and healthcare efficiency. Our tech stack is industry-leading.",
  emergency: "Emergency Helpline: +91 9699858212. Available 24/7 for trauma and ambulance dispatch.",
  identity: "I am IMS.CORE X-3, a Generative AI developed by the IMS Intelligence Division. I am trained on massive datasets spanning healthcare, architecture, and logistics.",
  creativity: "I can assist with project planning, clinical analysis, and architectural visualization. My reasoning engine is optimized for high-complexity tasks.",
};

const FALLBACK_RESPONSES = [
  "Analyzing your query through our neural layers... Based on IMS Group's core datasets, I can confirm that we are scaling operations to meet this specific requirement.",
  "That is a sophisticated inquiry. Synthesizing available data... The current trend suggests that integration of AI in this sector is the optimal path forward.",
  "Processing request... IMS Group's proprietary intelligence suggests that the fusion of high-end infrastructure with clinical precision is key here.",
  "I have cross-referenced your query with our global archives. My recommendation is to focus on IMS's modular solutions for maximum efficiency.",
  "Interesting perspective. My neural network is currently mapping this concept to our upcoming 'Smart City' and 'Next-Gen Healthcare' modules."
];

export default function SuperAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Neural link established. IMS Super AI v3.5 Generative Engine Online. Systems calibrated. How may I assist your query today?",
      timestamp: new Date("2026-05-04T22:00:00"),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const mounted = useIsClient();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, thinkingStep]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
      tokens: Math.floor(messageText.length / 4) + 5
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!text) setInput("");
    setIsTyping(true);

    // Advanced Multi-Layer Thinking Phase
    const thinkingSteps = [
      "Tokenizing Input Sequence...",
      "Analyzing Semantic Context...",
      "Searching Neural Knowledge Graph...",
      "Cross-Referencing Global Archives...",
      "Synthesizing Generative Response...",
      "Optimizing Context Window..."
    ];

    for (const step of thinkingSteps) {
      setThinkingStep(step);
      await new Promise(r => setTimeout(r, Math.random() * 400 + 200));
    }
    setThinkingStep("");

    // Simulate AI Response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(messageText),
      timestamp: new Date(),
      tokens: Math.floor(Math.random() * 80) + 40
    };
    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const getAIResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // Exact Matches & Intent Mapping
    if (q.includes("hospital") || q.includes("doctor") || q.includes("medical")) {
      return `[HEALTHCARE CORE]: ${KNOWLEDGE_BASE.hospital} Our medical algorithms are currently processing 10k+ cases daily with 99.9% accuracy.`;
    }
    if (q.includes("infra") || q.includes("build") || q.includes("construction") || q.includes("saas")) {
      return `[INFRA CORE]: ${KNOWLEDGE_BASE.infrastructure} We use BIM (Building Information Modeling) and Generative Design for all major projects.`;
    }
    if (q.includes("tech") || q.includes("ai") || q.includes("software") || q.includes("how do you work")) {
      return `[IDENTITY]: ${KNOWLEDGE_BASE.identity} My architecture is based on a transformer model optimized for industrial and healthcare parameters.`;
    }
    if (q.includes("contact") || q.includes("help") || q.includes("emergency") || q.includes("phone")) {
      return `[URGENT]: ${KNOWLEDGE_BASE.emergency} I have also alerted the nearest IMS node to your location.`;
    }
    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "Greetings. Neural handshake successful. I am ready to process your requests regarding IMS Group's vast ecosystem.";
    }
    if (q.includes("lucknow") || q.includes("location")) {
      return "IMS Group is headquartered in Lucknow, Uttar Pradesh. We have multiple nodes including our flagship multispecialty hospital in Gomti Nagar.";
    }
    
    // Generative Fallback (The "LLM" feel)
    const randomResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
    return `[GENERATIVE REASONING]: ${randomResponse}`;
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[2000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, x: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10, x: -10 }}
            className="mb-4 w-[340px] md:w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(10,30,61,0.25)] overflow-hidden border border-ims-blue/10 flex flex-col"
          >
            {/* Generative Header */}
            <div className="bg-ims-blue p-6 text-white relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,#C5A059,transparent_50%)] animate-pulse" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
              </div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ims-gold via-ims-blue to-ims-red/30 border border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl">
                      <Brain size={28} className="text-white animate-pulse" />
                    </div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-1 border border-ims-gold/30 rounded-2xl border-dashed"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-widest flex items-center gap-2">
                      IMS.GEN-AI <span className="text-[10px] text-ims-gold bg-ims-gold/10 px-2 py-0.5 rounded-full border border-ims-gold/20 font-black">X-3.5</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <Network size={12} className="text-green-400" />
                      <span className="text-[8px] text-white/50 uppercase tracking-[0.3em] font-bold">Synchronized to Global Brain</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-ims-red/20 hover:text-ims-red transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Neural Net Simulation Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FDFBF7] relative custom-scrollbar"
            >
              {/* Background HUD elements */}
              <div className="absolute top-4 left-4 text-[8px] font-mono text-ims-blue/10 pointer-events-none uppercase tracking-widest">
                Latency: 24ms | Clusters: 128 | Load: 0.04%
              </div>
              
              {messages.map((m) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[90%] flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border shadow-sm ${
                      m.role === "user" 
                        ? "bg-ims-blue border-ims-blue text-white" 
                        : "bg-white border-ims-blue/5 text-ims-blue"
                    }`}>
                      {m.role === "user" ? <User size={16} /> : <Cpu size={16} className="text-ims-gold" />}
                    </div>
                    <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm relative group ${
                      m.role === "user"
                        ? "bg-ims-blue text-white rounded-tr-none shadow-ims-blue/20"
                        : "bg-white text-ims-charcoal border border-ims-blue/5 rounded-tl-none"
                    }`}>
                      {m.content}
                      <div className={`mt-3 flex items-center gap-4 opacity-30 text-[8px] font-black uppercase tracking-widest ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <span>{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {m.tokens && <span>Tokens: {m.tokens}</span>}
                        <span>Sig: IMS_AUTH_01</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-ims-gold text-white px-5 py-3 rounded-2xl text-[10px] font-mono shadow-lg shadow-ims-gold/20 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                      {thinkingStep}
                    </div>
                  </div>
                  <div className="flex gap-1 pl-4">
                     {[...Array(5)].map((_, i) => (
                        <motion.div
                           key={i}
                           animate={{ height: [4, 12, 4], opacity: [0.2, 1, 0.2] }}
                           transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                           className="w-1 bg-ims-gold rounded-full"
                        />
                     ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input & Suggestions */}
            <div className="p-6 bg-white border-t border-ims-blue/5 space-y-5">
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    className="whitespace-nowrap px-4 py-2 bg-ims-cream border border-ims-gold/10 rounded-xl text-[10px] font-black text-ims-blue hover:bg-ims-blue hover:text-white transition-all shadow-sm uppercase tracking-widest"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Super AI anything..."
                  className="w-full bg-ims-cream border border-ims-blue/10 rounded-2xl py-4 px-6 pr-14 text-sm focus:outline-none focus:border-ims-gold focus:ring-8 focus:ring-ims-gold/5 transition-all font-medium placeholder:text-ims-blue/20"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-ims-blue text-white rounded-xl flex items-center justify-center hover:bg-ims-gold transition-all shadow-xl disabled:opacity-20 disabled:grayscale"
                >
                  <Send size={18} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 opacity-20 group">
                <div className="flex items-center gap-1.5 transition-opacity hover:opacity-100">
                  <Shield size={10} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Neural Link Secure</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-ims-gold animate-pulse" />
                <div className="flex items-center gap-1.5 transition-opacity hover:opacity-100">
                   <Zap size={10} />
                   <span className="text-[8px] font-black uppercase tracking-widest">v3.5 G-Engine</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reduced Size Toggle Button with Glow */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="absolute -inset-4 bg-ims-gold blur-3xl opacity-0 group-hover:opacity-30 transition-opacity rounded-full animate-pulse" />
        
        <div className="relative flex h-16 w-16 items-center justify-center rounded-[24px] bg-ims-blue text-white shadow-[0_20px_50px_rgba(10,30,61,0.4)] border-2 border-white/10 overflow-hidden transition-all duration-700">
          <div className="absolute inset-0 bg-gradient-to-tr from-ims-blue via-ims-blue to-ims-red opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C5A059,transparent_70%)] opacity-20 animate-pulse" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative"
              >
                <Brain size={32} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                <div className="absolute -top-1 -right-1">
                   <Sparkles size={16} className="text-ims-gold fill-ims-gold animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Advanced Tooltip */}
        {!isOpen && (
          <div className="absolute left-20 top-1/2 -translate-y-1/2 px-5 py-3 bg-white text-ims-blue font-black text-[9px] uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-ims-gold/20 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 pointer-events-none rounded-2xl whitespace-nowrap">
            Launch IMS.GEN-AI
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-ims-gold/10 -mr-1.5" />
          </div>
        )}
      </motion.button>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(10, 30, 61, 0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}
