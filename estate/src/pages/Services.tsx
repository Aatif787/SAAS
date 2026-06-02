import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnetic } from '@/hooks/useScrollAnimation'
import ScrollReveal from '@/components/ScrollReveal'
import {
  Building2, TrendingUp, Home, Paintbrush, Search, FileCheck,
  HandshakeIcon, LifeBuoy, Plane, Scale, Palette, CalendarHeart,
  Globe, Shield, Cpu, CheckCircle2
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { icon: Building2, title: 'Property Sales', description: 'Strategic marketing and negotiation to maximize your property\'s value. We use professional photography, targeted online campaigns, and our extensive network of qualified buyers.' },
  { icon: Home, title: 'Property Purchase', description: 'Access exclusive listings and expert guidance through every step. From initial search to final closing, we navigate the complexities of property acquisition.' },
  { icon: Paintbrush, title: 'Property Management', description: 'Full-service management for landlords seeking hassle-free operations. We handle tenant screening, rent collection, maintenance, and financial reporting.' },
  { icon: TrendingUp, title: 'Investment Consulting', description: 'Data-driven insights to build and diversify your real estate portfolio. Our market analysis and financial modeling help you make informed decisions.' },
  { icon: Plane, title: 'Relocation Assistance', description: 'Comprehensive relocation support for families and professionals moving to Israel. We help with neighborhood selection, school guidance, and settling-in services.' },
  { icon: Scale, title: 'Legal & Tax Advisory', description: 'Navigate Israeli real estate law with confidence. We connect you with top attorneys and tax advisors specializing in property transactions and capital gains (Mas Shevach).' },
  { icon: Palette, title: 'Interior Design Coordination', description: 'Transform your new property into a dream home. We partner with leading Israeli interior designers and architects to bring your vision to life.' },
  { icon: CalendarHeart, title: 'Vacation Rental Management', description: 'Maximize returns on your vacation property. We manage bookings, guest communication, cleaning, and maintenance for short-term rental properties.' },
]

const processSteps = [
  { icon: Search, title: 'Consultation', description: 'We understand your goals, preferences, budget, and timeline through an in-depth consultation.' },
  { icon: FileCheck, title: 'Property Search', description: 'Curated selection of properties matching your criteria, including off-market opportunities.' },
  { icon: HandshakeIcon, title: 'Viewing & Negotiation', description: 'Personalized tours with expert analysis, followed by strategic negotiation on your behalf.' },
  { icon: LifeBuoy, title: 'Closing & Beyond', description: 'Seamless transaction management from contract to keys, with ongoing post-purchase support.' },
]

const differentiators = [
  { icon: Shield, title: 'Licensed & Regulated', description: 'Fully licensed under Israel\'s Real Estate Brokers Law (1996). Every transaction is conducted with full legal compliance and professional accountability.' },
  { icon: Globe, title: 'Multilingual Team', description: 'Our team serves clients fluently in Hebrew, English, Russian, and French — ensuring clear communication regardless of your native language.' },
  { icon: Cpu, title: 'Technology-Driven', description: 'We leverage AI-powered property matching, virtual 3D tours, drone photography, and data analytics to deliver a cutting-edge real estate experience.' },
]

const marketStats = [
  { label: 'Avg. Price per sqm (Premium)', value: '₪28,000–45,000' },
  { label: 'Annual Appreciation (2020–2025)', value: '6–10%' },
  { label: 'Avg. Days on Market', value: '45–90 days' },
  { label: 'Foreign Buyer Share', value: '~15%' },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        section.querySelectorAll('.header-animate'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )

      // Service cards with 3D tilt entrance
      const cards = section.querySelectorAll('.service-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0, rotateX: -8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )
      })

      // Process steps
      const steps = section.querySelectorAll('.process-step')
      gsap.fromTo(
        steps,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: steps[0]?.parentElement, start: 'top 80%' },
        }
      )

      // Process line draw
      const line = section.querySelector('.process-line')
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: line, start: 'top 85%' },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="pt-[72px]">
      {/* Hero */}
      <section className="bg-[#efe7da] pt-28 lg:pt-36 pb-16 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="header-animate flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#ff7a1a]" />
            <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">What We Offer</span>
          </div>
          <h1 className="header-animate font-display text-[48px] lg:text-[72px] text-black leading-[0.95] mb-5">
            Our Services
          </h1>
          <p className="header-animate font-body text-[16px] text-[#4d4d4d] leading-[1.7] max-w-[550px]">
            From your first property search to long-term investment management, we provide
            end-to-end real estate solutions with a personal touch.
          </p>
        </div>
      </section>

      {/* Services Grid - 8 services */}
      <section className="bg-white py-28 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-800">
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card group bg-white border border-black/[0.06] rounded-2xl p-10 lg:p-12 hover:border-[#ff7a1a]/30 transition-all duration-500 relative overflow-hidden cursor-hover preserve-3d card-premium"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,122,26,0.04), transparent 70%)' }}
                />
                <service.icon size={48} className="text-[#ff7a1a] mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" strokeWidth={1.3} />
                <h3 className="font-display text-[28px] lg:text-[34px] text-black leading-[1.15] mb-4">{service.title}</h3>
                <p className="font-body text-[15px] text-[#4d4d4d] leading-[1.7]">{service.description}</p>
                <div className="mt-6 relative h-px overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-[#ff7a1a] transition-all duration-700 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f8f7f3] py-28 lg:py-44 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '50px 50px' }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#ff7a1a]" />
                <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Our Edge</span>
                <div className="w-8 h-px bg-[#ff7a1a]" />
              </div>
              <h2 className="font-display text-[36px] lg:text-[52px] text-black leading-[1.08] mb-4">
                Why Choose Us
              </h2>
              <p className="font-body text-[16px] text-[#4d4d4d] leading-[1.7] max-w-[550px] mx-auto">
                Three pillars that set Shay Trotsky Real Estate apart in a competitive market.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {differentiators.map((item, i) => (
              <ScrollReveal key={item.title} variant="fade-up" delay={i * 0.12}>
                <div className="group text-center p-10 lg:p-12 bg-white rounded-2xl card-premium cursor-hover">
                  <div className="w-16 h-16 rounded-full bg-[#ff7a1a]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ff7a1a]/20 transition-colors duration-500">
                    <item.icon size={28} className="text-[#ff7a1a] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[26px] text-black mb-3">{item.title}</h3>
                  <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.7]">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Netanya Market Stats Banner */}
      <section className="bg-black py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-10">
              <span className="font-body text-[11px] text-white/50 uppercase tracking-[3px]">Netanya Market Snapshot</span>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {marketStats.map((stat, i) => (
              <ScrollReveal key={stat.label} variant="fade-up" delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-display text-[28px] lg:text-[36px] text-[#ff7a1a] leading-none mb-2">{stat.value}</p>
                  <p className="font-body text-[11px] text-white/60 uppercase tracking-[1.5px]">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#efe7da] py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '50px 50px' }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">How It Works</span>
              <div className="w-8 h-px bg-[#ff7a1a]" />
            </div>
            <h2 className="font-display text-[36px] lg:text-[48px] text-black leading-[1.05]">Our Process</h2>
          </div>

          <div className="relative">
            <div className="process-line hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-black/10 origin-left" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {processSteps.map((step, i) => (
                <div key={step.title} className="process-step text-center group cursor-hover">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b7d64a] mb-5 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-500">
                    <span className="font-body text-[13px] text-black font-medium">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <step.icon size={28} className="text-[#ff7a1a] mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.3} />
                  <h3 className="font-display text-[22px] text-black mb-2">{step.title}</h3>
                  <p className="font-body text-[13px] text-[#4d4d4d] leading-[1.6]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white py-16 lg:py-20 border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {[
              'Israeli Real Estate Association Member',
              'Licensed Broker — Reg. #2847',
              '15+ Years Serving Netanya',
              'ISO 9001 Certified Service',
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-[12px] font-body text-[#4d4d4d]/70">
                <CheckCircle2 size={14} className="text-[#b7d64a]" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-28 lg:py-36 text-center">
        <div className="max-w-[700px] mx-auto px-6 lg:px-12">
          <ScrollReveal variant="fade-up">
            <h2 className="font-display text-[36px] lg:text-[48px] text-black leading-[1.05] mb-6">
              Let's Work Together
            </h2>
            <p className="font-body text-[16px] text-[#4d4d4d] leading-[1.7] mb-8">
              Whether you're buying, selling, or investing, our team is ready to provide the expertise
              and personalized service you deserve. Start with a free consultation.
            </p>
            <Link ref={ctaRef} to="/contact" className="btn-lime inline-block cursor-hover">
              Contact Us
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
