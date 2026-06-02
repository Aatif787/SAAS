import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnetic } from '@/hooks/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const magneticBtnRef = useMagnetic<HTMLAnchorElement>(0.3)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const textBlock = textBlockRef.current
    const overlay = overlayRef.current
    if (!section || !video || !textBlock || !overlay) return

    const tl = gsap.timeline()

    // Initial state
    gsap.set(overlay, { opacity: 0 })
    gsap.set(video, { scale: 1.15 })

    // Entrance sequence
    tl.to(overlay, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    })
    .to(video, {
      scale: 1,
      duration: 2.5,
      ease: 'power2.out',
    }, 0)

    // Text entrance with stagger
    const headlineWords = textBlock.querySelectorAll('.hero-word')
    const subElements = textBlock.querySelectorAll('.hero-sub')

    tl.fromTo(
      headlineWords,
      {
        y: 120,
        opacity: 0,
        rotateX: -40,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
      },
      0.6
    )
    .fromTo(
      subElements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      },
      1.2
    )

    // Scroll-driven parallax
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=80%',
        scrub: 1.5,
      },
    })

    scrollTl
      .to(video, { y: '-18%', scale: 1.08, ease: 'none' }, 0)
      .to(textBlock, { y: '40%', opacity: 0, ease: 'none' }, 0)
      .to(overlay, { opacity: 0.7, ease: 'none' }, 0)

    return () => {
      tl.kill()
      scrollTl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  // Split headline into words for animation
  const headline = 'Where Modern Living Meets Nature'
  const words = headline.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
      </video>

      {/* Multi-layer gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60"
      />

      {/* Ambient light rays effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(255,122,26,0.3) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Text Block */}
      <div
        ref={textBlockRef}
        className="absolute bottom-[100px] lg:bottom-[120px] left-6 lg:left-20 z-10 will-change-transform"
      >
        <div
          className="frosted-glass rounded-2xl p-8 lg:p-12 max-w-[640px]"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px) saturate(140%)',
            WebkitBackdropFilter: 'blur(24px) saturate(140%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          {/* Label */}
          <div className="hero-sub flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#b7d64a]" />
            <span className="font-body text-[11px] text-white/70 uppercase tracking-[3px]">
              Premium Real Estate
            </span>
          </div>

          {/* Headline - word by word */}
          <h1
            className="text-[42px] sm:text-[56px] lg:text-[80px] xl:text-[96px] text-white leading-[0.95] mb-6"
            style={{ perspective: '600px' }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="hero-word inline-block mr-[0.25em] font-display"
                style={{ transformOrigin: 'center bottom' }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="hero-sub font-body text-[15px] lg:text-[17px] text-white/70 leading-[1.7] mb-8 max-w-[480px]">
            Explore premium properties in Netanya's most sought-after
            neighborhoods. Handpicked homes designed for elevated living.
          </p>

          {/* CTA Buttons */}
          <div className="hero-sub flex flex-wrap gap-4">
            <Link
              ref={magneticBtnRef}
              to="/properties"
              className="btn-lime inline-flex items-center gap-2 cursor-hover"
            >
              <span>Explore Properties</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              to="/contact"
              className="btn-ghost text-white border-white/40 hover:bg-white/10 hover:border-white inline-flex items-center gap-2 cursor-hover"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="font-body text-[10px] text-white/50 uppercase tracking-[3px]">Scroll</span>
        <div className="w-px h-8 bg-white/30 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-white/70"
            style={{
              height: '40%',
              animation: 'scrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* CSS animation for scroll line */}
      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(250%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </section>
  )
}
