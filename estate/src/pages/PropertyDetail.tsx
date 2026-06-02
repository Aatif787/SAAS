import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import PropertyCard from '@/components/PropertyCard'
import ScrollReveal from '@/components/ScrollReveal'
import { Bed, Bath, Square, MapPin, Phone, Mail, MessageSquare, Check, ChevronLeft, ChevronRight, ArrowLeft, Share2, Copy, Calculator } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `₪${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
  }
  return `₪${price.toLocaleString()}`
}

function formatFullPrice(price: number): string {
  return `₪${price.toLocaleString()}`
}

const neighborhoodInfo: Record<string, string> = {
  'Kiryat Hasharon': 'One of Netanya\'s most prestigious neighborhoods, Kiryat Hasharon is known for its wide tree-lined boulevards, established private gardens, and proximity to the northern cliff promenade. The area features a mix of spacious single-family homes and upscale apartment buildings, attracting families and professionals seeking a quiet yet accessible lifestyle.',
  'Seafront': 'The Seafront district offers unobstructed Mediterranean views from dramatic sandstone cliffs. Properties here command premium prices for their proximity to the beach, the scenic tayelet (promenade), and the vibrant café culture along the coast.',
  'Noga': 'A peaceful residential neighborhood along Netanya\'s northern coastline, Noga is characterized by its family-friendly atmosphere, well-maintained parks, and stunning sunset views. The area offers excellent value compared to the city center while maintaining easy access to beaches and amenities.',
  'Ramat Poleg': 'One of Netanya\'s fastest-growing neighborhoods, Ramat Poleg features modern luxury towers, the Poleg Nature Reserve, and proximity to Poleg Beach. Popular among young professionals and families, it combines contemporary architecture with abundant green spaces.',
  'City Center': 'The vibrant heart of Netanya centered around Independence Square (Kikar Ha\'Atzmaut), offering a rich urban lifestyle with restaurants, cultural venues, the famous outdoor shuk, and direct access to the beach via scenic elevators.',
  'Ir Yamim': 'A modern planned neighborhood featuring cutting-edge residential architecture, a major shopping center, and extensive parks. Ir Yamim attracts young families and professionals with its contemporary lifestyle offerings and excellent infrastructure.',
}

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: property, isLoading } = trpc.property.bySlug.useQuery(
    { slug: slug ?? '' },
    { enabled: !!slug }
  )
  const { data: similar } = trpc.property.list.useQuery(
    { limit: 3 },
    { enabled: !!property }
  )
  const createInquiry = trpc.inquiry.create.useMutation()

  const [activeImage, setActiveImage] = useState(0)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [inquirySent, setInquirySent] = useState(false)
  const [showMortgage, setShowMortgage] = useState(false)
  const [downPayment, setDownPayment] = useState(50)
  const [interestRate, setInterestRate] = useState(4.5)
  const [loanTerm, setLoanTerm] = useState(25)
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (property) {
      setActiveImage(0)
      window.scrollTo(0, 0)
    }
  }, [property])

  // Entrance animations
  useEffect(() => {
    if (!property || !detailRef.current) return

    const ctx = gsap.context(() => {
      const fadeEls = detailRef.current!.querySelectorAll('.detail-fade')
      gsap.fromTo(
        fadeEls,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      )

      // Sticky card entrance
      const stickyCard = detailRef.current!.querySelector('.sticky-card')
      if (stickyCard) {
        gsap.fromTo(
          stickyCard,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.5 }
        )
      }

      // Spec pills stagger
      const pills = detailRef.current!.querySelectorAll('.spec-pill')
      gsap.fromTo(
        pills,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)', delay: 0.4 }
      )
    }, detailRef)

    return () => ctx.revert()
  }, [property])

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createInquiry.mutate(
      {
        propertyId: property?.id,
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone || undefined,
        message: inquiryForm.message,
      },
      { onSuccess: () => { setInquirySent(true); setInquiryForm({ name: '', email: '', phone: '', message: '' }); } }
    )
  }

  const handleShare = (type: 'whatsapp' | 'email' | 'copy') => {
    const url = window.location.href
    const text = `Check out this property: ${property?.title} in ${property?.neighborhood}, Netanya - ${formatPrice(property?.price ?? 0)}`

    switch (type) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
        break
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(`Property: ${property?.title}`)}&body=${encodeURIComponent(text + '\n\n' + url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  // Mortgage calculation
  const calculateMortgage = () => {
    if (!property) return 0
    const principal = property.price * (1 - downPayment / 100)
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    if (monthlyRate === 0) return principal / numPayments
    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    return Math.round(monthly)
  }

  if (isLoading) {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-[#efe7da] border-t-[#ff7a1a] rounded-full animate-spin" />
        <p className="text-gray-400 font-body text-sm">Loading property...</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-display text-[36px] text-black mb-4">Property Not Found</h2>
        <Link to="/properties" className="btn-lime cursor-hover">Back to Properties</Link>
      </div>
    )
  }

  const allImages = [property.mainImage, ...(property.images ?? [])]
  const amenities = property.amenities ?? []
  const hoodInfo = neighborhoodInfo[property.neighborhood]

  return (
    <div ref={detailRef} className="pt-[72px]">
      {/* Gallery */}
      <section className="relative h-[55vh] lg:h-[70vh] bg-black overflow-hidden">
        <img
          src={allImages[activeImage]}
          alt={property.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          key={activeImage}
        />
        <div className="absolute inset-0 bg-black/15" />

        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-300 cursor-hover"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => setActiveImage((prev) => (prev + 1) % allImages.length)}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-300 cursor-hover"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                i === activeImage ? 'border-[#b7d64a] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Back Link */}
        <Link
          to="/properties"
          className="absolute top-5 left-5 lg:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-md rounded-full px-4 py-2.5 cursor-hover"
        >
          <ArrowLeft size={15} />
          <span className="font-body text-[13px]">Back</span>
        </Link>

        {/* Share button */}
        <div className="absolute top-5 right-5 lg:right-8">
          <button
            onClick={() => setShowShare(!showShare)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-md rounded-full px-4 py-2.5 cursor-hover"
          >
            <Share2 size={15} />
            <span className="font-body text-[13px]">Share</span>
          </button>
          {showShare && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-black/[0.06] p-2 min-w-[160px] z-20">
              <button onClick={() => handleShare('whatsapp')} className="w-full text-left px-3 py-2 rounded-lg text-[13px] font-body text-black hover:bg-[#f8f7f3] transition-colors cursor-hover flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                WhatsApp
              </button>
              <button onClick={() => handleShare('email')} className="w-full text-left px-3 py-2 rounded-lg text-[13px] font-body text-black hover:bg-[#f8f7f3] transition-colors cursor-hover flex items-center gap-2">
                <Mail size={14} className="text-[#ff7a1a]" /> Email
              </button>
              <button onClick={() => handleShare('copy')} className="w-full text-left px-3 py-2 rounded-lg text-[13px] font-body text-black hover:bg-[#f8f7f3] transition-colors cursor-hover flex items-center gap-2">
                <Copy size={14} className="text-[#4d4d4d]" /> {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property Info */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="lg:w-[55%]">
              <div className="detail-fade">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-[#ff7a1a]" />
                  <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">{property.neighborhood}</span>
                </div>
                <h1 className="font-display text-[40px] lg:text-[56px] text-black leading-[1.0] mb-4">
                  {property.title}
                </h1>
                <p className="font-body text-[15px] text-[#4d4d4d] flex items-center gap-2 mb-6">
                  <MapPin size={15} className="text-[#ff7a1a]" />
                  {property.address}, {property.neighborhood}, {property.city}
                </p>
                <p className="font-body text-[30px] lg:text-[36px] text-[#ff7a1a] font-medium mb-2">
                  {formatPrice(property.price)}
                </p>
                <p className="font-body text-[13px] text-[#4d4d4d]/60 mb-8">
                  {formatFullPrice(property.price)} · ₪{Math.round(property.price / property.areaSqm).toLocaleString()}/sqm
                </p>
              </div>

              {/* Specs */}
              <div className="detail-fade flex flex-wrap gap-2.5 mb-10">
                <span className="spec-pill inline-flex items-center gap-1.5 bg-[#b7d64a] text-black text-[12px] font-body px-4 py-2 rounded-full">
                  <Bed size={13} />{property.bedrooms} Bedrooms
                </span>
                <span className="spec-pill inline-flex items-center gap-1.5 bg-[#b7d64a] text-black text-[12px] font-body px-4 py-2 rounded-full">
                  <Bath size={13} />{property.bathrooms} Bathrooms
                </span>
                <span className="spec-pill inline-flex items-center gap-1.5 bg-[#b7d64a] text-black text-[12px] font-body px-4 py-2 rounded-full">
                  <Square size={13} />{property.areaSqm} sqm
                </span>
                {property.yearBuilt && (
                  <span className="spec-pill inline-flex items-center gap-1.5 bg-[#b7d64a] text-black text-[12px] font-body px-4 py-2 rounded-full">
                    Built {property.yearBuilt}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="detail-fade mb-10">
                <h3 className="font-display text-[22px] text-black mb-4">Description</h3>
                <p className="font-body text-[15px] text-[#4d4d4d] leading-[1.8] whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="detail-fade mb-10">
                  <h3 className="font-display text-[22px] text-black mb-5">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {amenities.map((amenity: string) => (
                      <div key={amenity} className="flex items-center gap-2.5 text-[13px] font-body text-[#4d4d4d]">
                        <Check size={15} className="text-[#b7d64a] shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Neighborhood Info */}
              {hoodInfo && (
                <ScrollReveal variant="fade-up">
                  <div className="mb-10 p-8 bg-[#f8f7f3] rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin size={18} className="text-[#ff7a1a]" />
                      <h3 className="font-display text-[22px] text-black">About {property.neighborhood}</h3>
                    </div>
                    <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.8]">{hoodInfo}</p>
                  </div>
                </ScrollReveal>
              )}

              {/* Mortgage Calculator */}
              <ScrollReveal variant="fade-up">
                <div className="mb-10">
                  <button
                    onClick={() => setShowMortgage(!showMortgage)}
                    className="flex items-center gap-3 text-left cursor-hover group mb-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#ff7a1a]/10 flex items-center justify-center group-hover:bg-[#ff7a1a]/20 transition-colors">
                      <Calculator size={18} className="text-[#ff7a1a]" />
                    </div>
                    <div>
                      <h3 className="font-display text-[20px] text-black group-hover:text-[#ff7a1a] transition-colors">Mortgage Estimator</h3>
                      <p className="font-body text-[12px] text-[#4d4d4d]">Estimate your monthly payments</p>
                    </div>
                  </button>

                  {showMortgage && (
                    <div className="p-6 bg-white border border-black/[0.08] rounded-2xl space-y-5">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="font-body text-[13px] text-[#4d4d4d]">Down Payment</label>
                          <span className="font-body text-[13px] text-black font-medium">{downPayment}% ({formatFullPrice(Math.round(property.price * downPayment / 100))})</span>
                        </div>
                        <input type="range" min="25" max="80" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-[#ff7a1a]" />
                        <p className="font-body text-[11px] text-[#4d4d4d]/60 mt-1">Foreign buyers: min 50% · Israeli residents: min 25%</p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="font-body text-[13px] text-[#4d4d4d]">Interest Rate</label>
                          <span className="font-body text-[13px] text-black font-medium">{interestRate}%</span>
                        </div>
                        <input type="range" min="2" max="8" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-[#ff7a1a]" />
                        <p className="font-body text-[11px] text-[#4d4d4d]/60 mt-1">Current Israeli mortgage rates: ~3.5-5.5%</p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="font-body text-[13px] text-[#4d4d4d]">Loan Term</label>
                          <span className="font-body text-[13px] text-black font-medium">{loanTerm} years</span>
                        </div>
                        <input type="range" min="10" max="30" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full accent-[#ff7a1a]" />
                      </div>
                      <div className="pt-4 border-t border-black/[0.06]">
                        <p className="font-body text-[12px] text-[#4d4d4d] mb-1">Estimated Monthly Payment</p>
                        <p className="font-display text-[36px] text-[#ff7a1a] leading-none">₪{calculateMortgage().toLocaleString()}</p>
                        <p className="font-body text-[11px] text-[#4d4d4d]/60 mt-2">
                          Loan amount: {formatFullPrice(Math.round(property.price * (1 - downPayment / 100)))} · This is an estimate only and does not constitute a financial offer.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column - Contact Card */}
            <div className="lg:w-[45%]">
              <div className="lg:sticky lg:top-[100px]">
                <div
                  className="sticky-card bg-white rounded-2xl p-6 lg:p-8"
                  style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-center gap-4 mb-7">
                    <div className="w-14 h-14 rounded-full bg-[#efe7da] overflow-hidden flex items-center justify-center ring-2 ring-[#efe7da]">
                      <img src="/images/img8.jpg" alt="Shay Trotsky" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-display text-[18px] text-black">Shay Trotsky</p>
                      <p className="font-body text-[12px] text-[#4d4d4d]">Founder & CEO</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-7">
                    <a href="tel:+972501234567" className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/[0.08] hover:border-[#ff7a1a]/30 transition-all duration-300 font-body text-[13px] text-black cursor-hover hover:shadow-sm group">
                      <Phone size={15} className="text-[#ff7a1a] group-hover:scale-110 transition-transform" />
                      +972-50-123-4567
                    </a>
                    <a href="mailto:shay@troitsky.re" className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/[0.08] hover:border-[#ff7a1a]/30 transition-all duration-300 font-body text-[13px] text-black cursor-hover hover:shadow-sm group">
                      <Mail size={15} className="text-[#ff7a1a] group-hover:scale-110 transition-transform" />
                      shay@troitsky.re
                    </a>
                    <a
                      href={`https://wa.me/972501234567?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} (${formatPrice(property.price)})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#25D366]/20 hover:border-[#25D366]/40 bg-[#25D366]/5 transition-all duration-300 font-body text-[13px] text-[#128C7E] cursor-hover hover:shadow-sm group"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                      WhatsApp
                    </a>
                  </div>

                  {!showInquiryForm ? (
                    <button
                      onClick={() => setShowInquiryForm(true)}
                      className="w-full btn-lime cursor-hover flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={15} />
                      Schedule a Viewing
                    </button>
                  ) : inquirySent ? (
                    <div className="text-center py-6 bg-[#f8f7f3] rounded-xl">
                      <Check size={32} className="text-[#b7d64a] mx-auto mb-3" />
                      <p className="font-body text-[15px] text-black font-medium">Thank you!</p>
                      <p className="font-body text-[13px] text-[#4d4d4d] mt-1">We will contact you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                      <input type="text" placeholder="Your Name *" required value={inquiryForm.name} onChange={(e) => setInquiryForm((p) => ({ ...p, name: e.target.value }))}
                        className="input-premium h-11 px-4 text-[13px]" />
                      <input type="email" placeholder="Email *" required value={inquiryForm.email} onChange={(e) => setInquiryForm((p) => ({ ...p, email: e.target.value }))}
                        className="input-premium h-11 px-4 text-[13px]" />
                      <input type="tel" placeholder="Phone" value={inquiryForm.phone} onChange={(e) => setInquiryForm((p) => ({ ...p, phone: e.target.value }))}
                        className="input-premium h-11 px-4 text-[13px]" />
                      <textarea placeholder="Message *" required rows={4} value={inquiryForm.message} onChange={(e) => setInquiryForm((p) => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-3 border border-black/10 rounded-xl text-[13px] font-body focus:outline-none focus:border-[#ff7a1a] focus:shadow-[0_0_0_3px_rgba(255,122,26,0.08)] transition-all resize-none" />
                      <button type="submit" className="w-full btn-lime" disabled={createInquiry.isPending}>
                        {createInquiry.isPending ? 'Sending...' : 'Send Inquiry'}
                      </button>
                      <button type="button" onClick={() => setShowInquiryForm(false)} className="w-full text-center text-[12px] font-body text-[#4d4d4d] hover:text-black transition-colors cursor-hover">
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similar && similar.items.length > 0 && (
        <section className="bg-[#f8f7f3] py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="font-display text-[32px] text-black mb-10">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similar.items.filter((p: any) => p.id !== property.id).slice(0, 3).map((p: any, i: number) => (
                <div key={p.id}>
                  <PropertyCard property={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
