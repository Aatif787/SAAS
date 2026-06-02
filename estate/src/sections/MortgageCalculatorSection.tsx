import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Landmark, Info, Calculator } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function MortgageCalculatorSection() {
  const [propertyPrice, setPropertyPrice] = useState(6000000)
  const [buyerType, setBuyerType] = useState<'domestic' | 'foreign'>('domestic')
  const [downPaymentPercent, setDownPaymentPercent] = useState(25)
  const [interestRate, setInterestRate] = useState(4.8)
  const [loanTermYears, setLoanTermYears] = useState(25)

  const sectionRef = useRef<HTMLDivElement>(null)

  // Align down payment percent if buyer type changes and current percent is below minimums
  useEffect(() => {
    if (buyerType === 'foreign' && downPaymentPercent < 50) {
      setDownPaymentPercent(50)
    } else if (buyerType === 'domestic' && downPaymentPercent < 25) {
      setDownPaymentPercent(25)
    }
  }, [buyerType])

  // Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100
  const loanAmount = propertyPrice - downPaymentAmount
  const monthlyRate = interestRate / 12 / 100
  const totalMonths = loanTermYears * 12

  let monthlyPayment = 0
  if (loanAmount > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalMonths
    } else {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }
  }

  // Animation on scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.calc-animate'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%'
          }
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-28 lg:py-44 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[#ff7a1a]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[#b7d64a]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Explanatory Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="calc-animate flex items-center gap-3">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">FINANCIAL PLANNER</span>
            </div>
            <h2 className="calc-animate font-display text-[40px] lg:text-[56px] text-black leading-[1.05]">
              Evaluate Your Acquisition Power
            </h2>
            <p className="calc-animate font-body text-[15px] text-[#4d4d4d] leading-[1.7]">
              Buying high-end real estate in Netanya is simplified with local advisory support. Estimate your monthly commitment using current average Bank of Israel rates.
            </p>

            <div className="calc-animate p-5 bg-[#f8f7f3] border border-black/[0.05] rounded-2xl space-y-4">
              <div className="flex gap-3">
                <Landmark size={20} className="text-[#ff7a1a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-[15px] text-black mb-1">Israel Financing Rules</h4>
                  <p className="font-body text-[13px] text-[#4d4d4d] leading-[1.5]">
                    Domestic buyers require at least 25% down payment. Foreign nationals/residents require a minimum of 50% equity.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 border-t border-black/[0.05] pt-4">
                <Info size={20} className="text-[#b7d64a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-[15px] text-black mb-1">Need a custom rate?</h4>
                  <p className="font-body text-[13px] text-[#4d4d4d] leading-[1.5]">
                    Our in-house financing brokers negotiate directly with major Israeli banks on your behalf.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Calculator Card */}
          <div className="lg:col-span-7 calc-animate">
            <div className="bg-white border border-black/[0.08] rounded-3xl p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative">
              <div className="flex items-center gap-3 mb-8 border-b border-black/[0.05] pb-5">
                <Calculator className="text-[#ff7a1a]" size={20} />
                <h3 className="font-display text-[22px] text-black">Mortgage Estimator</h3>
              </div>

              <div className="space-y-6">
                
                {/* Buyer Type Toggle */}
                <div>
                  <label className="block font-body text-[11px] text-[#4d4d4d] uppercase tracking-[1.5px] mb-3">Buyer Residency Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBuyerType('domestic')}
                      className={`h-11 rounded-xl text-[13px] font-body transition-all cursor-hover ${
                        buyerType === 'domestic'
                          ? 'bg-black text-white'
                          : 'bg-[#f8f7f3] text-[#4d4d4d] hover:bg-black/5'
                      }`}
                    >
                      Israeli Resident (Min 25% Down)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuyerType('foreign')}
                      className={`h-11 rounded-xl text-[13px] font-body transition-all cursor-hover ${
                        buyerType === 'foreign'
                          ? 'bg-black text-white'
                          : 'bg-[#f8f7f3] text-[#4d4d4d] hover:bg-black/5'
                      }`}
                    >
                      Foreign Buyer (Min 50% Down)
                    </button>
                  </div>
                </div>

                {/* Property Price Slider */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[1.5px]">Property Value</label>
                    <span className="font-display text-[18px] text-black font-semibold">
                      ₪{propertyPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={25000000}
                    step={250000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(parseInt(e.target.value))}
                    className="w-full h-1 bg-[#efe7da] rounded-lg appearance-none cursor-pointer accent-[#ff7a1a]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-body">
                    <span>₪2M</span>
                    <span>₪12.5M</span>
                    <span>₪25M</span>
                  </div>
                </div>

                {/* Down Payment Slider */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[1.5px]">
                      Equity Down Payment ({downPaymentPercent}%)
                    </label>
                    <span className="font-display text-[18px] text-black font-semibold">
                      ₪{Math.round(downPaymentAmount).toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={buyerType === 'foreign' ? 50 : 25}
                    max={80}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                    className="w-full h-1 bg-[#efe7da] rounded-lg appearance-none cursor-pointer accent-[#ff7a1a]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-body">
                    <span>Min {buyerType === 'foreign' ? '50%' : '25%'}</span>
                    <span>80% Max</span>
                  </div>
                </div>

                {/* Grid inputs for Term & Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-[11px] text-[#4d4d4d] uppercase tracking-[1.5px] mb-2">
                      Annual Interest Rate ({interestRate}%)
                    </label>
                    <input
                      type="range"
                      min={3.0}
                      max={7.5}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full h-1 bg-[#efe7da] rounded-lg appearance-none cursor-pointer accent-[#ff7a1a]"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[11px] text-[#4d4d4d] uppercase tracking-[1.5px] mb-2">
                      Amortization Term ({loanTermYears} Years)
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={30}
                      step={5}
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(parseInt(e.target.value))}
                      className="w-full h-1 bg-[#efe7da] rounded-lg appearance-none cursor-pointer accent-[#ff7a1a]"
                    />
                  </div>
                </div>

                {/* Result Section */}
                <div className="mt-8 p-6 bg-[#efe7da]/30 rounded-2xl border border-[#efe7da] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="block font-body text-[10px] text-[#4d4d4d] uppercase tracking-[1.5px]">Estimated Monthly Payment</span>
                    <span className="font-display text-[32px] text-black font-bold">
                      ₪{Math.round(monthlyPayment).toLocaleString()}
                    </span>
                  </div>
                  <a href="/contact" className="btn-lime text-[13px] text-center font-body cursor-hover shadow-sm">
                    Book Consultation
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
