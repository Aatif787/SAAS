import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, TrendingUp, Home, Paintbrush } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Building2,
    title: 'Property Sales',
    description: 'Strategic marketing and negotiation to maximize your property\'s value.',
  },
  {
    icon: Home,
    title: 'Property Purchase',
    description: 'Access exclusive listings and expert guidance through every step.',
  },
  {
    icon: Paintbrush,
    title: 'Property Management',
    description: 'Full-service management for landlords seeking hassle-free operations.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Consulting',
    description: 'Data-driven insights to build and diversify your real estate portfolio.',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const servicesGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const parallax = parallaxRef.current
    const content = contentRef.current
    const servicesGrid = servicesGridRef.current
    if (!section || !parallax || !content || !servicesGrid) return

    const ctx = gsap.context(() => {
      // Parallax layers on scroll
      const layers = parallax.querySelectorAll('.parallax-layer')
      ScrollTrigger.create({
        trigger: parallax,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress
          layers.forEach((layer, i) => {
            const speed = [0.15, 0.45, 0.75][i] || 0.3
            const yOffset = (progress - 0.5) * 300 * speed
            gsap.set(layer, { y: yOffset })
          })
        },
      })

      // Content entrance
      const contentEls = content.querySelectorAll('.content-animate')
      gsap.fromTo(
        contentEls,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
          },
        }
      )

      // Service cards entrance
      const cards = servicesGrid.querySelectorAll('.service-card')
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: {
            each: 0.12,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesGrid,
            start: 'top 80%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Parallax Background Section */}
      <div ref={parallaxRef} className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {/* Layer 1 - Background */}
        <img
          src="/images/img11.jpg"
          alt=""
          className="parallax-layer absolute inset-0 w-full h-[125%] object-cover will-change-transform"
          style={{ zIndex: 0, top: '-12.5%' }}
        />
        {/* Layer 2 - Midground with blur */}
        <img
          src="/images/img12.jpg"
          alt=""
          className="parallax-layer absolute inset-0 w-full h-[125%] object-cover will-change-transform"
          style={{ zIndex: 1, top: '-12.5%', filter: 'blur(2px)', opacity: 0.5 }}
        />
        {/* Layer 3 - Foreground with more blur */}
        <img
          src="/images/img10.jpg"
          alt=""
          className="parallax-layer absolute inset-0 w-full h-[125%] object-cover will-change-transform"
          style={{ zIndex: 2, top: '-12.5%', filter: 'blur(5px)', opacity: 0.25 }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45 z-[3]" />

        {/* Animated gradient accent */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,122,26,0.15), transparent)',
          }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center px-6"
        >
          <div className="content-animate flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#b7d64a]" />
            <span className="font-body text-[12px] text-white uppercase tracking-[3px]">
              WHAT WE DO
            </span>
            <div className="w-12 h-px bg-[#b7d64a]" />
          </div>
          <h2 className="content-animate font-display text-[40px] lg:text-[56px] text-white leading-[1.05] mb-5 max-w-[700px]">
            End-to-End Real Estate Excellence
          </h2>
          <p className="content-animate font-body text-[16px] text-white/75 max-w-[560px] mb-8 leading-[1.7]">
            From property search to closing, our team delivers a seamless
            experience backed by market expertise and personalized attention.
          </p>
          <Link
            to="/services"
            className="content-animate btn-ghost text-white border-white/40 hover:bg-white/10 hover:border-white cursor-hover transition-all duration-300"
          >
            Our Services &rarr;
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-white py-28 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card group bg-white border border-black/[0.08] rounded-2xl p-10 lg:p-12 hover:border-[#ff7a1a]/40 transition-all duration-500 relative overflow-hidden cursor-hover"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,122,26,0.04), transparent 70%)',
                  }}
                />

                <service.icon
                  size={52}
                  className="text-[#ff7a1a] mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  strokeWidth={1.3}
                />
                <h3 className="font-display text-[28px] lg:text-[36px] text-black leading-[1.15] mb-4 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-[15px] text-[#4d4d4d] leading-[1.7]">
                  {service.description}
                </p>

                {/* Animated underline on hover */}
                <div className="mt-6 relative h-px overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-[#ff7a1a] transition-all duration-700 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
