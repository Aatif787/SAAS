import { useState, useEffect, useRef } from 'react'
import { trpc } from '@/providers/trpc'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnetic } from '@/hooks/useScrollAnimation'
import { Quote, MapPin, Sun, Train, Waves, TreePalm, Building2 } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    number: '01',
    title: 'Client First',
    description: 'Every decision we make starts with our clients\' needs and aspirations. We listen deeply, respond thoughtfully, and deliver results that exceed expectations.',
  },
  {
    number: '02',
    title: 'Market Expertise',
    description: 'Our team brings unparalleled knowledge of Netanya\'s real estate landscape. We track trends, analyze data, and provide insights that empower informed decisions.',
  },
  {
    number: '03',
    title: 'Integrity & Transparency',
    description: 'We believe in honest communication and transparent dealings. Every transaction is handled with the utmost professionalism and ethical standards.',
  },
  {
    number: '04',
    title: 'Innovation',
    description: 'We embrace cutting-edge technology and innovative marketing strategies to showcase properties and connect buyers with their dream homes.',
  },
]

const testimonials = [
  {
    quote: 'Shay and his team made the entire process feel effortless. From the first viewing to signing the contract, we felt supported every step of the way.',
    name: 'Rachel & David Cohen',
    role: 'Bought Villa Iris',
  },
  {
    quote: 'Their market knowledge is exceptional. They found us the perfect investment property that has already appreciated significantly.',
    name: 'Michael Abramson',
    role: 'Investment Client',
  },
  {
    quote: 'Selling our family home was emotional, but the team handled everything with such care and professionalism. We got an amazing price.',
    name: 'Sarah Ben-David',
    role: 'Sold Property',
  },
]

const milestones = [
  { year: '2010', title: 'Founded', description: 'Shay Trotsky Real Estate established in Netanya with a vision to redefine luxury property services in Israel\'s Mediterranean coast.' },
  { year: '2014', title: 'First ₪100M', description: 'Reached ₪100 million in cumulative property transactions, establishing a trusted reputation among international buyers.' },
  { year: '2018', title: 'Team Expansion', description: 'Grew to a multilingual team of 12 professionals serving clients in Hebrew, English, Russian, and French.' },
  { year: '2021', title: '₪1B Milestone', description: 'Surpassed ₪1 billion in total real estate transactions across Netanya\'s premium neighborhoods.' },
  { year: '2024', title: 'Digital Innovation', description: 'Launched virtual tour technology and AI-powered property matching to serve global clientele more effectively.' },
  { year: '2026', title: '₪2.4B & Growing', description: 'Over ₪2.4 billion in cumulative sales with 500+ satisfied families and expanding into adjacent coastal markets.' },
]

const neighborhoods = [
  {
    name: 'Kiryat Hasharon',
    description: 'Netanya\'s most prestigious residential area featuring wide boulevards, established gardens, and proximity to the northern cliff promenade. Known for spacious villas and upscale apartments.',
    image: '/images/img1.jpg',
  },
  {
    name: 'Ir Yamim',
    description: 'A modern planned neighborhood with cutting-edge architecture, parks, and a shopping center. Popular among young professionals and families seeking contemporary living.',
    image: '/images/img3.jpg',
  },
  {
    name: 'Ramat Poleg',
    description: 'An upscale southern neighborhood featuring new luxury towers, the Poleg Nature Reserve, and easy access to the Poleg Beach. One of Netanya\'s fastest-growing areas.',
    image: '/images/img5.jpg',
  },
  {
    name: 'South Beach',
    description: 'The scenic southern coastline offering dramatic cliff views, direct beach access, and some of the most sought-after beachfront properties in all of Israel.',
    image: '/images/img7.jpg',
  },
  {
    name: 'City Center',
    description: 'The vibrant heart of Netanya with Ha\'Atzmaut Square, the famous outdoor market, historic architecture, and a rich cultural scene. Perfect for urban living enthusiasts.',
    image: '/images/img9.jpg',
  },
  {
    name: 'Noga',
    description: 'A quiet residential neighborhood nestled along the northern coastline, known for its family-friendly atmosphere, local parks, and stunning sunset views over the Mediterranean.',
    image: '/images/img14.jpg',
  },
]

const whyNetanya = [
  { icon: Waves, title: '13.5 km Coastline', description: 'Israel\'s longest urban coastline with pristine sandy beaches, dramatic sandstone cliffs, and a beautifully maintained seaside promenade.' },
  { icon: Train, title: '30 Min from Tel Aviv', description: 'Direct rail connection to Tel Aviv, Herzliya, and Ben Gurion Airport. Easy access to Israel\'s tech hub while enjoying coastal tranquility.' },
  { icon: Sun, title: '300+ Sunny Days', description: 'Mediterranean climate with warm summers, mild winters, and over 300 days of sunshine annually — perfect for year-round outdoor living.' },
  { icon: TreePalm, title: 'Parks & Green Spaces', description: 'Over 1,200 acres of parks and gardens, including the Iris Nature Reserve and the Poleg Wetlands, offering urban nature at your doorstep.' },
  { icon: Building2, title: 'Growing Market', description: 'Netanya\'s real estate market has seen consistent appreciation, with premium properties gaining 6-10% annually over the past decade.' },
  { icon: MapPin, title: 'Population ~230,000', description: 'Israel\'s 7th largest city, Netanya is a thriving coastal metropolis attracting both domestic and international residents seeking quality of life.' },
]

function AnimatedStat({ target, suffix, label, prefix = '' }: { target: number; suffix: string; label: string; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const numEl = el.querySelector('.stat-number')
    if (!numEl) return

    const obj = { val: 0 }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(numEl.parentElement, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            const current = obj.val
            if (target < 1) {
              numEl.textContent = prefix + current.toFixed(1)
            } else {
              numEl.textContent = prefix + Math.round(current).toLocaleString()
            }
          },
        })
      },
    })

    return () => st.kill()
  }, [target, prefix])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-[48px] lg:text-[72px] text-black leading-none">
        <span className="stat-number">0</span>
        <span className="text-[#ff7a1a]">{suffix}</span>
      </div>
      <p className="font-body text-[12px] text-[#4d4d4d] uppercase tracking-[2px] mt-4">{label}</p>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const storyImageRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { data: agents } = trpc.agent.list.useQuery()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const ctaMagneticRef = useMagnetic<HTMLAnchorElement>(0.25)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const hero = heroRef.current
    const story = storyRef.current
    const storyImage = storyImageRef.current
    const valuesSection = valuesRef.current
    const teamSection = teamRef.current
    const timeline = timelineRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Hero parallax
      if (hero) {
        const heroImg = hero.querySelector('img')
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            if (heroImg) {
              gsap.set(heroImg, { y: self.progress * 150, scale: 1 + self.progress * 0.05 })
            }
            const heroText = hero.querySelector('.hero-text')
            if (heroText) {
              gsap.set(heroText, { y: self.progress * 80, opacity: 1 - self.progress * 0.7 })
            }
          },
        })
      }

      // Story section - image mask reveal + text slide in
      if (story && storyImage) {
        const img = storyImage.querySelector('img')
        if (img) {
          gsap.fromTo(
            storyImage,
            { clipPath: 'inset(0% 100% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.4,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: story, start: 'top 75%' },
            }
          )
          gsap.fromTo(
            img,
            { scale: 1.3 },
            {
              scale: 1,
              duration: 1.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: story, start: 'top 75%' },
            }
          )
        }

        gsap.fromTo(
          story.querySelectorAll('.story-text'),
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: story, start: 'top 70%' },
          }
        )
      }

      // Values section
      if (valuesSection) {
        const items = valuesSection.querySelectorAll('.value-item')
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 85%' },
            }
          )
        })
      }

      // Team section
      if (teamSection) {
        const cards = teamSection.querySelectorAll('.team-card')
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: teamSection.querySelector('.team-grid'), start: 'top 80%' },
          }
        )
      }

      // Timeline animation
      if (timeline) {
        const items = timeline.querySelectorAll('.timeline-item')
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 88%' },
            }
          )
        })

        // Animate the timeline line
        const line = timeline.querySelector('.timeline-line')
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 2,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: timeline, start: 'top 80%', end: 'bottom 60%', scrub: 1 },
            }
          )
        }
      }
    }, section)

    return () => ctx.revert()
  }, [agents])

  return (
    <div ref={sectionRef} className="pt-[72px]">
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative h-[60vh] lg:h-[75vh] overflow-hidden">
        <img
          src="/images/img11.jpg"
          alt="Netanya coastline"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        <div className="absolute bottom-16 lg:bottom-20 left-6 lg:left-20 z-10 hero-text">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-px bg-[#b7d64a]" />
            <span className="font-body text-[11px] text-white/60 uppercase tracking-[3px]">About Us</span>
          </div>
          <h1 className="font-display text-[48px] lg:text-[80px] text-white leading-[0.95]">
            Redefining Real Estate<br />
            <span className="text-[#ff7a1a]">in Netanya</span>
          </h1>
        </div>
      </section>

      {/* Story Section with image mask reveal */}
      <section ref={storyRef} className="bg-white py-28 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-24 items-center">
            <div className="lg:w-1/2">
              <div ref={storyImageRef} className="aspect-[4/5] rounded-xl overflow-hidden" style={{ willChange: 'clip-path' }}>
                <img
                  src="/images/img8.jpg"
                  alt="Shay Trotsky"
                  className="w-full h-full object-cover will-change-transform"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6 story-text">
                <div className="w-8 h-px bg-[#ff7a1a]" />
                <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Our Story</span>
              </div>
              <h2 className="story-text font-display text-[36px] lg:text-[52px] text-black leading-[1.08] mb-8">
                A Personal Approach to Premium Properties
              </h2>
              <p className="story-text font-body text-[16px] text-[#4d4d4d] leading-[1.8] mb-5">
                Founded on the belief that buying or selling a home should be an extraordinary
                experience, Shay Trotsky has established himself as Netanya's premier luxury
                real estate advisor. With over 15 years of experience and more than ₪2.4 billion
                in property transactions, our agency has earned the trust of discerning clients
                worldwide.
              </p>
              <p className="story-text font-body text-[16px] text-[#4d4d4d] leading-[1.8] mb-5">
                Netanya, Israel's Mediterranean jewel, is a city of dramatic sandstone cliffs,
                pristine beaches stretching 13.5 kilometers, and a thriving international community.
                Our curated portfolio features the finest properties in Netanya's most
                sought-after neighborhoods — from cliffside villas with panoramic sea views
                to sleek penthouses along the coast.
              </p>
              <p className="story-text font-body text-[16px] text-[#4d4d4d] leading-[1.8]">
                What sets us apart is our commitment to personalized service. We take the time
                to understand each client's unique vision, lifestyle, and goals — whether
                they are relocating to Israel, seeking a vacation home, or investing in
                one of the country's most promising coastal markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics with animated counters */}
      <section className="bg-[#efe7da] py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-0">
            <AnimatedStat target={2.4} suffix="B+" prefix="₪" label="In Property Sales" />
            <div className="hidden md:flex items-center justify-center">
              <div className="w-px h-24 bg-black/10" />
            </div>
            <AnimatedStat target={15} suffix="+" label="Years of Experience" />
            <div className="hidden md:flex items-center justify-center">
              <div className="w-px h-24 bg-black/10" />
            </div>
            <AnimatedStat target={500} suffix="+" label="Happy Families" />
          </div>
        </div>
      </section>

      {/* Why Netanya Section */}
      <section className="bg-white py-28 lg:py-44 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#ff7a1a]" />
                <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Discover</span>
                <div className="w-8 h-px bg-[#ff7a1a]" />
              </div>
              <h2 className="font-display text-[36px] lg:text-[52px] text-black leading-[1.08] mb-4">
                Why Netanya?
              </h2>
              <p className="font-body text-[16px] text-[#4d4d4d] leading-[1.7] max-w-[600px] mx-auto">
                Israel's premier Mediterranean coastal city offers an unmatched combination of
                natural beauty, modern infrastructure, and investment potential.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyNetanya.map((item, i) => (
              <ScrollReveal key={item.title} variant="fade-up" delay={i * 0.08}>
                <div className="group bg-white border border-black/[0.06] rounded-2xl p-8 lg:p-10 hover:border-[#ff7a1a]/30 transition-all duration-500 relative overflow-hidden cursor-hover card-premium">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,122,26,0.04), transparent 70%)' }}
                  />
                  <item.icon size={36} className="text-[#ff7a1a] mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" strokeWidth={1.3} />
                  <h3 className="font-display text-[24px] text-black leading-[1.15] mb-3">{item.title}</h3>
                  <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.7]">{item.description}</p>
                  <div className="mt-5 relative h-px overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-[#ff7a1a] transition-all duration-700 ease-out" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="bg-[#f8f7f3] py-28 lg:py-44 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '50px 50px' }}
        />
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 relative">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#ff7a1a]" />
                <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Our Journey</span>
                <div className="w-8 h-px bg-[#ff7a1a]" />
              </div>
              <h2 className="font-display text-[36px] lg:text-[52px] text-black leading-[1.08]">
                Milestones
              </h2>
            </div>
          </ScrollReveal>

          <div ref={timelineRef} className="relative">
            {/* Animated vertical line */}
            <div className="timeline-line absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-[#ff7a1a]/30 origin-top lg:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div key={milestone.year} className={`timeline-item flex items-start gap-6 lg:gap-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`hidden lg:block lg:w-[calc(50%-24px)] ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="font-display text-[42px] text-[#ff7a1a] leading-none">{milestone.year}</span>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#ff7a1a] flex items-center justify-center z-10 relative shadow-lg">
                      <span className="font-body text-[11px] text-white font-medium">{milestone.year.slice(2)}</span>
                    </div>
                  </div>
                  <div className="lg:w-[calc(50%-24px)] pb-2">
                    <span className="font-display text-[28px] text-[#ff7a1a] leading-none lg:hidden block mb-1">{milestone.year}</span>
                    <h3 className="font-display text-[22px] text-black mb-2">{milestone.title}</h3>
                    <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.7]">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods We Serve */}
      <section className="bg-white py-28 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Explore</span>
            </div>
            <h2 className="font-display text-[36px] lg:text-[52px] text-black leading-[1.08] mb-5">
              Neighborhoods We Serve
            </h2>
            <p className="font-body text-[16px] text-[#4d4d4d] leading-[1.7] max-w-[550px] mb-14">
              From the prestigious clifftop villas of Kiryat Hasharon to the modern towers of Ramat Poleg,
              we specialize in Netanya's most desirable addresses.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((hood, i) => (
              <ScrollReveal key={hood.name} variant="fade-up" delay={i * 0.08}>
                <Link
                  to={`/properties?neighborhood=${encodeURIComponent(hood.name)}`}
                  className="group cursor-hover block"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shimmer-hover">
                    <img
                      src={hood.image}
                      alt={hood.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-[24px] text-white leading-tight group-hover:text-[#b7d64a] transition-colors duration-300">
                        {hood.name}
                      </h3>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 13L13 1M13 1H5M13 1v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-[13px] text-[#4d4d4d] leading-[1.6] line-clamp-2">{hood.description}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values with alternating slide */}
      <section ref={valuesRef} className="bg-white py-28 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#ff7a1a]" />
            <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Our Principles</span>
          </div>
          <h2 className="font-display text-[36px] lg:text-[52px] text-black leading-[1.08] mb-14">
            Our Values
          </h2>
          <div className="space-y-0">
            {values.map((value) => (
              <div key={value.number} className="value-item border-t border-black/[0.08]">
                <details className="group py-8" open={value.number === '01'}>
                  <summary className="flex items-center gap-6 cursor-pointer list-none select-none">
                    <span className="font-body text-[14px] text-[#ff7a1a] tracking-[1px] w-8 shrink-0">
                      {value.number}
                    </span>
                    <h3 className="font-display text-[26px] lg:text-[32px] text-black flex-1 group-hover:text-[#ff7a1a] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <span className="text-[22px] text-[#4d4d4d] font-light transition-all duration-300 group-open:rotate-45 group-open:text-[#ff7a1a]">
                      +
                    </span>
                  </summary>
                  <p className="font-body text-[15px] text-[#4d4d4d] leading-[1.7] mt-4 ml-14 max-w-[600px]">
                    {value.description}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="bg-[#f8f7f3] py-28 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#ff7a1a]" />
            <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">The Team</span>
          </div>
          <h2 className="font-display text-[36px] lg:text-[52px] text-black leading-[1.08] mb-14">
            Meet Our Experts
          </h2>
          {agents && agents.length > 0 ? (
            <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map((agent: any) => (
                <div key={agent.id} className="team-card group bg-white rounded-xl overflow-hidden card-premium cursor-hover">
                  <div className="aspect-[3/4] bg-[#efe7da] overflow-hidden relative">
                    {agent.photo ? (
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-[80px] text-black/10">
                          {agent.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-[24px] text-black mb-1 group-hover:text-[#ff7a1a] transition-colors duration-300">{agent.name}</h3>
                    <p className="font-body text-[12px] text-[#ff7a1a] uppercase tracking-[2px] mb-3">
                      {agent.title}
                    </p>
                    <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.6] line-clamp-3">
                      {agent.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block w-10 h-10 border-2 border-[#efe7da] border-t-[#ff7a1a] rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-28 lg:py-36">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
          <Quote size={32} className="text-[#b7d64a] mx-auto mb-8" />
          <div className="relative min-h-[180px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="transition-all duration-500 absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  opacity: i === activeTestimonial ? 1 : 0,
                  transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(20px)',
                  pointerEvents: i === activeTestimonial ? 'auto' : 'none',
                }}
              >
                <blockquote className="font-display text-[22px] lg:text-[34px] text-black leading-[1.3] italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="font-body text-[16px] text-black font-medium">{t.name}</p>
                <p className="font-body text-[13px] text-[#4d4d4d]">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeTestimonial ? 'w-8 bg-[#b7d64a]' : 'w-2 bg-black/15 hover:bg-black/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA with parallax */}
      <section className="relative h-[450px] lg:h-[500px] overflow-hidden">
        <img
          src="/images/img4.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="font-display text-[36px] lg:text-[56px] text-white leading-[1.05] mb-8">
            Ready to Find Your<br />Dream Home?
          </h2>
          <Link
            ref={ctaMagneticRef}
            to="/contact"
            className="btn-ghost text-white border-white/50 hover:bg-white/10 hover:border-white cursor-hover"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
