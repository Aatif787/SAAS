"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Home, ChevronDown } from 'lucide-react'

const neighborhoods = ['All', 'Kiryat Hasharon', 'Seafront', 'Noga', 'Ramat Poleg', 'City Center']
const propertyTypes = ['All', 'Apartment', 'Villa', 'Penthouse', 'Duplex', 'Studio']

export default function SearchBarSection() {
  const [neighborhood, setNeighborhood] = useState('All')
  const [type, setType] = useState('All')
  const [priceRange, setPriceRange] = useState('All')
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (neighborhood !== 'All') params.set('neighborhood', neighborhood)
    if (type !== 'All') params.set('type', type.toLowerCase())
    if (priceRange !== 'All') params.set('maxPrice', priceRange)
    router.push(`/ims-estate-empire/properties?${params.toString()}`)
  }

  return (
    <section className="bg-[#efe7da] py-4 lg:py-5 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-full h-14 lg:h-[56px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-black/[0.06] flex items-center px-2 lg:px-3">
          {/* Location */}
          <div className="flex items-center gap-2 px-3 lg:px-4 min-w-fit">
            <MapPin size={16} className="text-[#ff7a1a] shrink-0" />
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="bg-transparent text-[13px] font-body text-black focus:outline-none cursor-hover appearance-none pr-4 min-w-[80px] lg:min-w-[120px]"
            >
              {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown size={12} className="text-[#4d4d4d] -ml-4 pointer-events-none" />
          </div>

          <div className="w-px h-6 bg-black/8 hidden sm:block" />

          {/* Property Type */}
          <div className="flex items-center gap-2 px-3 lg:px-4 min-w-fit">
            <Home size={16} className="text-[#ff7a1a] shrink-0" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-transparent text-[13px] font-body text-black focus:outline-none cursor-hover appearance-none pr-4 min-w-[80px] lg:min-w-[100px]"
            >
              {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={12} className="text-[#4d4d4d] -ml-4 pointer-events-none" />
          </div>

          <div className="w-px h-6 bg-black/8 hidden sm:block" />

          {/* Price Range */}
          <div className="flex items-center gap-2 px-3 lg:px-4 min-w-fit">
            <span className="text-[13px] font-body text-[#ff7a1a] shrink-0">\u20aa</span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-transparent text-[13px] font-body text-black focus:outline-none cursor-hover appearance-none pr-4 min-w-[60px] lg:min-w-[100px]"
            >
              <option value="All">Any Price</option>
              <option value="3000000">Up to \u20aa3M</option>
              <option value="5000000">Up to \u20aa5M</option>
              <option value="10000000">Up to \u20aa10M</option>
              <option value="15000000">Up to \u20aa15M</option>
            </select>
            <ChevronDown size={12} className="text-[#4d4d4d] -ml-4 pointer-events-none" />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="ml-auto w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#b7d64a] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 cursor-hover shrink-0 shadow-sm"
          >
            <Search size={16} className="text-black" />
          </button>
        </div>
      </div>
    </section>
  )
}
