"use client";
import { useEffect, useRef } from 'react'
import { trpc } from '@/providers/trpc'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { data: blogData } = trpc.blog.list.useQuery({ page: 1, limit: 4 })

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    if (!section || !header) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.querySelectorAll('.header-animate'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%' },
        }
      )

      // Cards animation
      const cards = section.querySelectorAll('.blog-card')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: section.querySelector('.blog-grid'), start: 'top 80%' },
          }
        )
      }

      // Decorative line
      const line = section.querySelector('.section-line')
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: line, start: 'top 90%' },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [blogData])

  const posts = blogData?.items ?? []

  return (
    <section ref={sectionRef} className="bg-[#f8f7f3] py-28 lg:py-44 relative">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div ref={headerRef} className="flex items-baseline justify-between mb-4">
          <div className="header-animate">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Insights</span>
            </div>
            <h2 className="font-display text-[40px] lg:text-[52px] text-black leading-[1.05]">
              Market Insights
            </h2>
          </div>
          <Link
            href="/ims-estate-empire/blog"
            className="header-animate font-body text-[13px] text-black uppercase tracking-[2px] link-underline hidden md:inline-block cursor-hover group"
          >
            <span className="inline-flex items-center gap-2">
              VIEW ALL
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M1 12L12 1M12 1H3M12 1v9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>

        <div className="section-line w-full h-px bg-black/10 mb-12 origin-left" />

        {/* Blog Cards */}
        {posts.length > 0 ? (
          <div className="blog-grid flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/ims-estate-empire/blog?slug=${post.slug}`}
                className="blog-card flex-shrink-0 w-[300px] lg:w-[380px] snap-start group cursor-hover"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <img
                    src={post.coverImage || '/images/img11.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-body text-[11px] text-[#ff7a1a] uppercase tracking-[2px]">{post.category}</span>
                <h3 className="font-display text-[20px] lg:text-[22px] text-black leading-[1.2] mt-2 group-hover:text-[#ff7a1a] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="font-body text-[12px] text-[#4d4d4d] mt-2">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-2 border-[#efe7da] border-t-[#ff7a1a] rounded-full animate-spin" />
          </div>
        )}
      </div>
    </section>
  )
}
