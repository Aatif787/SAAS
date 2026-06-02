import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingUp, Users, ShieldCheck, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface StatItem {
  icon: any
  target: number
  prefix?: string
  suffix: string
  label: string
  description: string
}

const statsData: StatItem[] = [
  {
    icon: TrendingUp,
    target: 2.4,
    prefix: '₪',
    suffix: 'B+',
    label: 'Sales Volume',
    description: 'Total cumulative sales value facilitated across luxury Netanya markets.'
  },
  {
    icon: Users,
    target: 500,
    suffix: '+',
    label: 'Happy Families',
    description: 'Discerning clients relocated into their perfect seafront homes.'
  },
  {
    icon: ShieldCheck,
    target: 99.8,
    suffix: '%',
    label: 'Satisfaction',
    description: 'Flawless client satisfaction score based on independent third-party audits.'
  },
  {
    icon: Award,
    target: 15,
    suffix: '+',
    label: 'Years of Trust',
    description: 'A stellar reputation built over a decade of dedication and success.'
  }
]

function AnimatedStatCard({ stat }: { stat: StatItem }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const numEl = el.querySelector('.stat-number-val')
    if (!numEl) return

    const obj = { val: 0 }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Entrance animation for card
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
        )

        // Increment number
        gsap.to(obj, {
          val: stat.target,
          duration: 2.0,
          ease: 'power2.out',
          onUpdate: () => {
            const current = obj.val
            if (stat.target < 10 && !Number.isInteger(stat.target)) {
              numEl.textContent = current.toFixed(1)
            } else {
              numEl.textContent = Math.round(current).toLocaleString()
            }
          }
        })
      }
    })

    return () => st.kill()
  }, [stat])

  return (
    <div
      ref={cardRef}
      className="bg-[#1e1d1a] border border-white/[0.05] hover:border-[#ff7a1a]/30 rounded-2xl p-8 transition-all duration-500 relative group overflow-hidden"
      style={{ opacity: 0 }} // Pre-hidden to avoid flash
    >
      {/* Subtle overlay glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(255,122,26,0.06), transparent 60%)'
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ff7a1a] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#ff7a1a]/10">
          <stat.icon size={22} strokeWidth={1.5} />
        </div>
      </div>

      <div className="font-display text-[44px] lg:text-[56px] text-white leading-none tracking-tight mb-2">
        {stat.prefix && <span className="text-[#ff7a1a] mr-1">{stat.prefix}</span>}
        <span className="stat-number-val font-semibold">0</span>
        <span className="text-[#b7d64a] ml-0.5">{stat.suffix}</span>
      </div>

      <h3 className="font-display text-[18px] text-white/90 mb-3 tracking-wide">{stat.label}</h3>
      <p className="font-body text-[13px] text-white/50 leading-[1.6]">{stat.description}</p>
    </div>
  )
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    gsap.fromTo(
      el.querySelectorAll('.stats-header-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        }
      }
    )
  }, [])

  return (
    <section ref={containerRef} className="bg-[#141413] py-28 lg:py-40 relative overflow-hidden">
      {/* Decorative top border gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Grid background effect */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <div className="stats-header-item flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#b7d64a]" />
            <span className="font-body text-[11px] text-[#b7d64a] uppercase tracking-[3px]">OUR TRACK RECORD</span>
            <div className="w-8 h-px bg-[#b7d64a]" />
          </div>
          <h2 className="stats-header-item font-display text-[36px] lg:text-[52px] text-white leading-[1.1] mb-6">
            A Legacy of Unmatched Real Estate Success
          </h2>
          <p className="stats-header-item font-body text-[15px] lg:text-[17px] text-white/60 leading-[1.7]">
            Numbers tell a story, ours is one of unwavering standard, exceptional service, and helping families secure their waterfront dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <AnimatedStatCard key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
