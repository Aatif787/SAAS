import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MessageSquare } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function AgentSpotlightSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Animate header and content reveal
      gsap.fromTo(
        container.querySelectorAll('.spotlight-animate'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%'
          }
        }
      )

      // Image reveal on scroll
      const imgBlock = container.querySelector('.image-block')
      if (imgBlock) {
        gsap.fromTo(
          imgBlock,
          { opacity: 0, scale: 0.96, rotate: -1 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imgBlock,
              start: 'top 80%'
            }
          }
        )
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="bg-[#f8f7f3] py-28 lg:py-44 relative overflow-hidden">
      {/* Subtle border dividing lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-black/[0.05]" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with luxury framing */}
          <div className="lg:col-span-6 image-block relative opacity-0">
            <div className="relative aspect-[3/4] max-w-[480px] mx-auto rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-black/10">
              <img
                src="/images/img8.jpg"
                alt="Shay Trotsky"
                className="w-full h-full object-cover transition-transform hover:scale-105"
                style={{ transitionDuration: '2000ms' }}
              />
              {/* Gold glass tag */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl">
                <span className="block font-display text-[20px] text-white font-semibold">Shay Trotsky</span>
                <span className="block font-body text-[11px] text-[#b7d64a] uppercase tracking-[2px] mt-1">Founder & CEO</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="spotlight-animate flex items-center gap-3">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">OUR FOUNDER</span>
            </div>
            
            <h2 className="spotlight-animate font-display text-[40px] lg:text-[56px] text-black leading-[1.05]">
              Tailored Guidance, Uncompromising Standard
            </h2>
            
            <p className="spotlight-animate font-body text-[16px] text-[#4d4d4d] leading-[1.7]">
              "With over 15 years representing premier clients in Netanya coastal properties, my approach has always been bespoke. We do not just list properties—we curate portfolios that match your lifestyle and investment trajectory."
            </p>

            <div className="spotlight-animate space-y-3 pt-4 border-t border-black/10">
              <div className="flex items-center gap-3 text-[14px] font-body text-[#4d4d4d]">
                <Phone size={16} className="text-[#ff7a1a]" />
                <a href="tel:+972501234567" className="hover:text-black transition-colors cursor-hover">+972-50-123-4567</a>
              </div>
              <div className="flex items-center gap-3 text-[14px] font-body text-[#4d4d4d]">
                <Mail size={16} className="text-[#ff7a1a]" />
                <a href="mailto:shay@troitsky.re" className="hover:text-black transition-colors cursor-hover">shay@troitsky.re</a>
              </div>
            </div>

            <div className="spotlight-animate flex flex-wrap gap-4 pt-6">
              <Link
                to="/about"
                className="btn-lime inline-flex items-center gap-2 cursor-hover shadow-sm"
              >
                <span>Read Agency Story</span>
              </Link>
              <a
                href="https://wa.me/972501234567?text=Hello%20Shay,%20I'm%20interested%20in%20Netanya%20luxury%20real%20estate."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost border-black/10 text-black hover:bg-black/5 inline-flex items-center gap-2 cursor-hover"
              >
                <MessageSquare size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
