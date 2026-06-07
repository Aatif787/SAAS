"use client";
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const neighborhoods = [
  {
    name: 'Kiryat Hasharon',
    desc: 'Prestigious residential area on the northern cliffs, offering gorgeous villas and proximity to green parks.',
    image: '/images/img1.jpg',
    tag: 'Clifftop Luxury'
  },
  {
    name: 'Ir Yamim',
    desc: 'Modern planned coastal district famous for high-rise architectural marvels, boutique cafes, and sea parks.',
    image: '/images/img3.jpg',
    tag: 'Modern Living'
  },
  {
    name: 'Ramat Poleg',
    desc: 'Stunning southern seafront neighborhood adjoining the nature reserve and golden sandy Poleg Beach.',
    image: '/images/img5.jpg',
    tag: 'Coastal Haven'
  },
  {
    name: 'Noga',
    desc: 'Quiet residential neighborhood with local parks and spectacular sunset views over the Mediterranean.',
    image: '/images/img14.jpg',
    tag: 'Sunset Views'
  }
]

export default function NeighborhoodsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const grid = gridRef.current
    if (!container || !grid) return

    const ctx = gsap.context(() => {
      // Animate header items
      gsap.fromTo(
        container.querySelectorAll('.hoods-header-item'),
        { opacity: 0, y: 30 },
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

      // Animate neighborhood cards
      const cards = grid.querySelectorAll('.hood-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%'
          }
        }
      )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="bg-white py-28 lg:py-44 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#ff7a1a]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#b7d64a]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-[620px]">
            <div className="hoods-header-item flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Explore Areas</span>
            </div>
            <h2 className="hoods-header-item font-display text-[40px] lg:text-[56px] text-black leading-[1.05]">
              Netanya\'s Most Exclusive Neighborhoods
            </h2>
          </div>
          <p className="hoods-header-item font-body text-[15px] text-[#4d4d4d] max-w-[450px] leading-[1.7]">
            From the peaceful cliffs of Kiryat Hasharon to the ultra-modern luxury towers of Ir Yamim. We specialize in the city\'s premium waterfront real estate.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((hood) => (
            <Link
              key={hood.name}
              href={`/ims-estate-empire/properties?neighborhood=${encodeURIComponent(hood.name)}`}
              className="hood-card group block relative aspect-[3/4] rounded-2xl overflow-hidden shimmer-hover card-premium cursor-hover"
              style={{ opacity: 0 }} // Pre-hidden to prevent flash
            >
              {/* Image Background */}
              <img
                src={hood.image}
                alt={hood.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Tag / Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-block text-[9px] font-body bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium px-2.5 py-1 rounded-full uppercase tracking-[1.5px]">
                  {hood.tag}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform transition-transform duration-500">
                <div className="flex items-center gap-1.5 text-white/50 mb-2">
                  <MapPin size={12} className="text-[#b7d64a]" />
                  <span className="font-body text-[11px] uppercase tracking-[1.5px]">Netanya, Israel</span>
                </div>
                <h3 className="font-display text-[26px] text-white leading-tight mb-3 group-hover:text-[#b7d64a] transition-colors duration-300">
                  {hood.name}
                </h3>
                <p className="font-body text-[13px] text-white/60 leading-[1.6] opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto overflow-hidden transition-all duration-500 ease-out">
                  {hood.desc}
                </p>

                {/* Learn More Button */}
                <div className="flex items-center gap-1.5 mt-4 text-[12px] font-body text-[#ff7a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Browse Properties <ChevronRight size={12} />
                </div>
              </div>

              {/* Bottom active state border */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#ff7a1a] to-[#b7d64a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
