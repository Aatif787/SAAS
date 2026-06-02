import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { trpc } from '@/providers/trpc'
import PropertyCard from '@/components/PropertyCard'
import { Search, ChevronDown, X, LayoutGrid, List } from 'lucide-react'
import gsap from 'gsap'

const propertyTypes = ['All', 'Apartment', 'Villa', 'Penthouse', 'Duplex', 'Studio']
const neighborhoods = ['All', 'Kiryat Hasharon', 'Seafront', 'Noga', 'Ramat Poleg', 'City Center', 'Ir Yamim']
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

const neighborhoodImages: Record<string, string> = {
  'Kiryat Hasharon': '/images/img1.jpg',
  'Seafront': '/images/img3.jpg',
  'Ramat Poleg': '/images/img5.jpg',
  'City Center': '/images/img9.jpg',
  'Ir Yamim': '/images/img7.jpg',
  'Noga': '/images/img14.jpg',
}

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams()
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState({
    type: (searchParams.get('type') as any) || 'All',
    neighborhood: searchParams.get('neighborhood') || 'All',
    minBedrooms: searchParams.get('bedrooms') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: 'newest',
  })

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { data, isLoading } = trpc.property.list.useQuery({
    page: 1,
    limit: 24,
    type: filters.type !== 'All' ? filters.type : undefined,
    neighborhood: filters.neighborhood !== 'All' ? filters.neighborhood : undefined,
    bedrooms: filters.minBedrooms ? parseInt(filters.minBedrooms) : undefined,
    maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
    sortBy: filters.sortBy as 'newest' | 'price_asc' | 'price_desc',
  })

  // Header entrance animation
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelectorAll('.header-animate'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [])

  // Grid animation on data change
  useEffect(() => {
    if (gridRef.current && data?.items) {
      const cards = gridRef.current.querySelectorAll('.property-card-wrapper')
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
      )
    }
  }, [data])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({ type: 'All', neighborhood: 'All', minBedrooms: '', maxPrice: '', sortBy: 'newest' })
    setSearchParams({})
  }

  const selectNeighborhood = (name: string) => {
    setFilters((prev) => ({
      ...prev,
      neighborhood: prev.neighborhood === name ? 'All' : name,
    }))
  }

  const hasFilters = filters.type !== 'All' || filters.neighborhood !== 'All' || filters.minBedrooms !== '' || filters.maxPrice !== ''

  return (
    <div className="pt-[72px]">
      {/* Page Header with entrance animation */}
      <section className="bg-[#efe7da] pt-28 lg:pt-36 pb-16 lg:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }}
        />
        <div ref={headerRef} className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="header-animate flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#ff7a1a]" />
            <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Browse</span>
          </div>
          <h1 className="header-animate font-display text-[48px] lg:text-[72px] text-black leading-[0.95] mb-5">
            Properties
          </h1>
          <p className="header-animate font-body text-[16px] text-[#4d4d4d] leading-[1.7] max-w-[500px]">
            Discover premium homes across Netanya's finest neighborhoods.
            From beachfront penthouses to clifftop villas.
          </p>
        </div>
      </section>

      {/* Neighborhood Quick Select */}
      <section className="bg-white border-b border-black/[0.06] py-5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {Object.entries(neighborhoodImages).map(([name, img]) => (
              <button
                key={name}
                onClick={() => selectNeighborhood(name)}
                className={`flex-shrink-0 group cursor-hover relative rounded-xl overflow-hidden transition-all duration-300 ${
                  filters.neighborhood === name
                    ? 'ring-2 ring-[#ff7a1a] ring-offset-2'
                    : 'hover:ring-2 hover:ring-black/10 hover:ring-offset-2'
                }`}
              >
                <div className="w-[130px] h-[70px] relative">
                  <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center font-body text-[11px] text-white font-medium uppercase tracking-[1px]">
                    {name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {['type', 'neighborhood', 'minBedrooms', 'maxPrice', 'sortBy'].map((filterKey) => (
              <div key={filterKey} className="relative min-w-fit">
                <select
                  value={filters[filterKey as keyof typeof filters]}
                  onChange={(e) => updateFilter(filterKey, e.target.value)}
                  className="appearance-none bg-white/80 border border-black/10 rounded-full h-10 pl-4 pr-10 text-[12px] font-body text-black focus:outline-none focus:border-[#ff7a1a] cursor-hover hover:border-black/20 transition-colors"
                >
                  {filterKey === 'type' && propertyTypes.map((t) => <option key={t} value={t}>{t === 'All' ? 'Property Type' : t}</option>)}
                  {filterKey === 'neighborhood' && neighborhoods.map((n) => <option key={n} value={n}>{n === 'All' ? 'Location' : n}</option>)}
                  {filterKey === 'minBedrooms' && [
                    <option key="" value="">Any Beds</option>,
                    ...[1, 2, 3, 4, 5].map((b) => <option key={b} value={b}>{b}+ Beds</option>),
                  ]}
                  {filterKey === 'maxPrice' && [
                    <option key="" value="">Any Price</option>,
                    ...[3000000, 5000000, 10000000, 15000000, 20000000].map((p) => (
                      <option key={p} value={p}>Up to ₪{(p / 1000000).toFixed(0)}M</option>
                    )),
                  ]}
                  {filterKey === 'sortBy' && sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4d4d4d] pointer-events-none" />
              </div>
            ))}

            {hasFilters && (
              <button onClick={resetFilters} className="flex items-center gap-1 text-[12px] font-body text-[#ff7a1a] hover:underline min-w-fit cursor-hover">
                <X size={13} /> Reset
              </button>
            )}

            <div className="ml-auto flex items-center gap-3 min-w-fit">
              <span className="text-[12px] font-body text-[#4d4d4d]/60">
                {data?.total ?? 0} properties
              </span>
              {/* View toggle */}
              <div className="hidden md:flex items-center gap-1 bg-black/[0.04] rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all cursor-hover ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-[#4d4d4d]/50 hover:text-[#4d4d4d]'
                  }`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all cursor-hover ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-[#4d4d4d]/50 hover:text-[#4d4d4d]'
                  }`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-10 h-10 border-2 border-[#efe7da] border-t-[#ff7a1a] rounded-full animate-spin" />
              <p className="text-gray-400 font-body text-sm">Loading properties...</p>
            </div>
          ) : data?.items && data.items.length > 0 ? (
            <div
              ref={gridRef}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'grid grid-cols-1 md:grid-cols-2 gap-6'
              }
            >
              {data.items.map((property: any, index: number) => (
                <div key={property.id} className="property-card-wrapper" style={{ willChange: 'transform, opacity' }}>
                  <PropertyCard property={property} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-28">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#efe7da] flex items-center justify-center">
                <Search size={28} className="text-[#4d4d4d]" />
              </div>
              <h3 className="font-display text-[24px] text-black mb-2">No properties match</h3>
              <p className="font-body text-[14px] text-[#4d4d4d] mb-6">Try adjusting your search criteria</p>
              <button onClick={resetFilters} className="btn-lime cursor-hover">Reset Filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
