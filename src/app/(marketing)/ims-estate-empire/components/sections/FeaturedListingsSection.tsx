"use client";
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { trpc } from '@/providers/trpc'
import PropertyCard from '../PropertyCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedListingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const { data: featured } = trpc.property.featured.useQuery()

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const grid = gridRef.current
    if (!section || !header || !grid) return

    const ctx = gsap.context(() => {
      // Header animation - text reveal
      const headerTitle = header.querySelector('h2')
      const headerLink = header.querySelector('a')

      if (headerTitle) {
        gsap.fromTo(
          headerTitle,
          { y: 60, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
            },
          }
        )
      }

      if (headerLink) {
        gsap.fromTo(
          headerLink,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
            },
          }
        )
      }

      // Cards animation - staggered with scale
      const cards = grid.querySelectorAll('.property-card-wrapper')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 80,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: {
              each: 0.12,
              from: 'start',
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
            },
          }
        )
      }

      // Parallax on the section itself
      gsap.fromTo(
        section,
        { backgroundPositionY: '0%' },
        {
          backgroundPositionY: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [featured])

  const properties = featured?.slice(0, 6) ?? []

  return (
    <section ref={sectionRef} className="bg-white py-28 lg:py-44 relative">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex items-baseline justify-between mb-14"
          style={{ perspective: '500px' }}
        >
          <h2 className="font-display text-[40px] lg:text-[56px] text-black leading-[1.05]">
            Curated For You
          </h2>
          <Link
            href="/ims-estate-empire/properties"
            className="font-body text-[14px] text-black uppercase tracking-[2px] link-underline hidden md:inline-block cursor-hover group"
          >
            <span className="inline-flex items-center gap-2">
              VIEW ALL LISTINGS
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>

        {/* Decorative line */}
        <div className="w-full h-px bg-black/10 mb-14 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[#ff7a1a]"
            style={{
              width: '0%',
              animation: 'lineExpand 1.5s ease-out forwards',
              animationDelay: '0.5s',
            }}
          />
        </div>

        {/* Property Grid */}
        {properties.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property: any, index: number) => (
              <div
                key={property.id}
                className="property-card-wrapper"
                style={{ willChange: 'transform, opacity' }}
              >
                <PropertyCard property={property} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-block w-12 h-12 border-2 border-[#efe7da] border-t-[#ff7a1a] rounded-full animate-spin" />
            <p className="text-gray-400 font-body mt-4">Loading featured properties...</p>
          </div>
        )}

        {/* Mobile View All Link */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/ims-estate-empire/properties"
            className="font-body text-[14px] text-black uppercase tracking-[2px] link-underline"
          >
            VIEW ALL LISTINGS &rarr;
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes lineExpand {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
