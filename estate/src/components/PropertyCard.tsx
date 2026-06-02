import { useRef, useCallback } from 'react'
import { Link } from 'react-router'
import { Bed, Bath, Square } from 'lucide-react'
import gsap from 'gsap'

interface PropertyCardProps {
  property: {
    id: number
    slug: string
    title: string
    mainImage: string
    price: number
    bedrooms: number
    bathrooms: number
    areaSqm: number
    address: string
    neighborhood: string
    isFeatured?: boolean
    status?: string
  }
  index?: number
}

function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `₪${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
  }
  return `₪${price.toLocaleString()}`
}

function getStatusBadge(property: PropertyCardProps['property']): { label: string; className: string } | null {
  if (property.isFeatured) return { label: 'Exclusive', className: 'badge-exclusive' }
  if (property.status === 'new') return { label: 'New', className: 'badge-new' }
  return { label: 'For Sale', className: 'badge-sale' }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // 3D tilt
    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.4,
      ease: 'power2.out',
    })

    // Image parallax within card
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: x * 10,
        y: y * 10,
        scale: 1.08,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    // Overlay glow
    if (overlayRef.current) {
      overlayRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,122,26,0.08) 0%, transparent 60%)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.6)',
    })

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    if (overlayRef.current) {
      overlayRef.current.style.background = 'transparent'
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      y: -8,
      boxShadow: '0 24px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)',
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const badge = getStatusBadge(property)

  return (
    <Link to={`/properties/${property.slug}`} className="block group cursor-hover">
      <div
        ref={cardRef}
        className="rounded-xl overflow-hidden bg-white transition-shadow duration-300"
        style={{
          perspective: '800px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          handleMouseLeave()
          gsap.to(cardRef.current, {
            y: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            duration: 0.4,
            ease: 'power2.out',
          })
        }}
        onMouseEnter={handleMouseEnter}
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden shimmer-hover">
          <img
            ref={imageRef}
            src={property.mainImage}
            alt={property.title}
            className="w-full h-full object-cover will-change-transform"
          />
          {/* Hover overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 transition-all duration-300 pointer-events-none"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          {/* Status badge */}
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className={badge.className}>{badge.label}</span>
            </div>
          )}
          {/* Price badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-white/90 backdrop-blur-sm text-black font-body text-[13px] font-medium px-3 py-1.5 rounded-full shadow-sm">
              {formatPrice(property.price)}
            </span>
          </div>
          {/* View property indicator */}
          <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <span className="font-body text-[11px] text-black font-medium">View</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H5M11 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-[22px] text-black leading-tight mb-1.5 group-hover:text-[#ff7a1a] transition-colors duration-300">
            {property.title}
          </h3>
          <p className="font-body text-[13px] text-[#4d4d4d] tracking-[0.42px] mb-3">
            {property.neighborhood}
          </p>
          <div className="flex items-center gap-4 text-[12px] text-[#4d4d4d] font-body">
            <span className="flex items-center gap-1">
              <Bed size={13} className="text-[#b7d64a]" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={13} className="text-[#b7d64a]" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Square size={13} className="text-[#b7d64a]" />
              {property.areaSqm} sqm
            </span>
          </div>
          {/* Animated bottom border */}
          <div className="mt-4 relative h-px overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gradient-to-r from-[#ff7a1a] to-[#b7d64a] transition-all duration-700 ease-out" />
          </div>
        </div>
      </div>
    </Link>
  )
}
