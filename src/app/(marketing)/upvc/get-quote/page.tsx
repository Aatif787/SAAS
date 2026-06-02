"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Calculator, Loader2 } from "lucide-react";
import { toast } from "sonner";

const productTypes = ["Casement Window", "Sliding Window", "Sliding Door", "French Door", "Villa Window", "Soundproof System"];
const glassTypes = ["Single Glazed", "Double Glazed", "Triple Glazed", "Laminated", "Low-E Coated"];
const colors = ["White", "Mahogany", "Golden Oak", "Walnut", "Anthracite Grey", "Custom RAL"];
const basePrices: Record<string, number> = { "Casement Window": 450, "Sliding Window": 380, "Sliding Door": 650, "French Door": 750, "Villa Window": 900, "Soundproof System": 850 };
const glassMultiplier: Record<string, number> = { "Single Glazed": 1, "Double Glazed": 1.4, "Triple Glazed": 1.8, "Laminated": 1.5, "Low-E Coated": 1.6 };

export default function GetQuotePage() {
  const [product, setProduct] = useState(productTypes[0]);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(5);
  const [glass, setGlass] = useState(glassTypes[1]);
  const [color, setColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Customer info
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const unitPrice = Math.round((basePrices[product] || 450) * (width * height) / 20 * (glassMultiplier[glass] || 1) * (color === "White" ? 1 : 1.15));
  const totalPrice = unitPrice * qty;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.email || !customer.phone) {
      toast.error("Please fill in all contact details");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/upvc/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          width,
          height,
          glassType: glass,
          frameColor: color,
          quantity: qty,
          estimatedPrice: totalPrice,
          ...customer
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success(data.message);
      } else {
        toast.error(data.error || "Submission failed");
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="pt-28 pb-10 sm:pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-upvc-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-upvc-green">Get Quote</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl font-bold text-upvc-dark tracking-tighter mb-6">
            Smart Quote <span className="text-upvc-green">Calculator</span>
          </motion.h1>
        </div>
      </section>
      <section className="pb-16 sm:pb-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-5 sm:p-8 rounded-2xl bg-upvc-white border border-upvc-dark/5">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-upvc-green block mb-4">1. Select Product</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {productTypes.map((p) => (
                    <button key={p} onClick={() => setProduct(p)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${product === p ? "bg-upvc-green text-white" : "bg-white text-upvc-dark/50 hover:text-upvc-dark border border-upvc-dark/5"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="p-5 sm:p-8 rounded-2xl bg-upvc-white border border-upvc-dark/5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-upvc-green block mb-4">2. Dimensions (Width × Height)</label>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-upvc-dark/40 font-bold uppercase">Width (ft)</span>
                        <span className="text-upvc-dark font-bold">{width} ft</span>
                      </div>
                      <input type="range" min={2} max={12} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full accent-upvc-green" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-upvc-dark/40 font-bold uppercase">Height (ft)</span>
                        <span className="text-upvc-dark font-bold">{height} ft</span>
                      </div>
                      <input type="range" min={2} max={10} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full accent-upvc-green" />
                    </div>
                  </div>
                </div>
                 <div className="p-5 sm:p-8 rounded-2xl bg-upvc-white border border-upvc-dark/5 space-y-6">
                   <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-upvc-green block mb-4">3. Glass & Color</label>
                    <div className="space-y-4">
                      <select value={glass} onChange={(e) => setGlass(e.target.value)}
                        className="w-full bg-white border border-upvc-dark/10 rounded-xl px-4 py-3 text-upvc-dark text-sm focus:outline-none focus:border-upvc-green">
                        {glassTypes.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                      <select value={color} onChange={(e) => setColor(e.target.value)}
                        className="w-full bg-white border border-upvc-dark/10 rounded-xl px-4 py-3 text-upvc-dark text-sm focus:outline-none focus:border-upvc-green">
                        {colors.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8 rounded-2xl bg-upvc-white border border-upvc-dark/5">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-upvc-green block mb-6">4. Contact Information</label>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <input 
                      required
                      type="text" 
                      placeholder="Full Name" 
                      value={customer.name}
                      onChange={(e) => setCustomer({...customer, name: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green" 
                    />
                  </div>
                  <div className="space-y-2">
                    <input 
                      required
                      type="tel" 
                      placeholder="Phone Number" 
                      value={customer.phone}
                      onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <input 
                      required
                      type="email" 
                      placeholder="Email Address" 
                      value={customer.email}
                      onChange={(e) => setCustomer({...customer, email: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea 
                      rows={3}
                      placeholder="Any specific requirements? (Optional)" 
                      value={customer.message}
                      onChange={(e) => setCustomer({...customer, message: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-upvc-dark/10 rounded-xl text-sm text-upvc-dark placeholder:text-upvc-dark/30 focus:outline-none focus:border-upvc-green resize-none" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28 h-fit">
              <div className="p-5 sm:p-8 rounded-2xl bg-upvc-white border border-upvc-green/20 shadow-lg shadow-upvc-green/5">
                <div className="flex items-center gap-3 mb-8">
                  <Calculator size={20} className="text-upvc-green" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-upvc-green">Estimate</span>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm"><span className="text-upvc-dark/40">Product</span><span className="text-upvc-dark font-medium">{product}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-upvc-dark/40">Size</span><span className="text-upvc-dark font-medium">{width}&apos; × {height}&apos;</span></div>
                  <div className="flex justify-between text-sm"><span className="text-upvc-dark/40">Glass</span><span className="text-upvc-dark font-medium">{glass}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-upvc-dark/40">Color</span><span className="text-upvc-dark font-medium">{color}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-upvc-dark/40">Quantity</span><div className="flex items-center gap-2">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-6 h-6 rounded bg-white border border-upvc-dark/10 text-xs font-bold">−</button>
                    <span className="font-bold">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-6 h-6 rounded bg-white border border-upvc-dark/10 text-xs font-bold">+</button>
                  </div></div>
                  <div className="border-t border-upvc-dark/5 pt-4 flex justify-between text-sm"><span className="text-upvc-dark/40">Unit Price</span><span className="text-upvc-dark font-bold">₹{unitPrice.toLocaleString()}</span></div>
                </div>
                <div className="p-6 rounded-xl bg-upvc-green/10 text-center mb-8">
                  <span className="text-[9px] uppercase tracking-widest text-upvc-green block mb-1">Estimated Total</span>
                  <span className="text-4xl font-black text-upvc-green">₹{totalPrice.toLocaleString()}</span>
                </div>
                {!submitted ? (
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-upvc-green text-white font-bold text-sm uppercase tracking-wider hover:bg-upvc-lime transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Submit Inquiry"} <ArrowRight size={16} />
                  </button>
                ) : (
                  <div className="text-center py-4 rounded-xl bg-upvc-green/10 text-upvc-green font-bold text-sm">✓ Inquiry Submitted!</div>
                )}
                <p className="text-[10px] text-upvc-dark/20 text-center mt-4">*Prices are estimates based on standard dimensions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
