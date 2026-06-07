"use client";
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from '../hooks/useSearchParams'
import { trpc } from '@/providers/trpc'
import { ArrowLeft, ChevronRight, Send, Clock } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '../components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

function estimateReadTime(content: string | null | undefined): string {
  if (!content) return '3 min read'
  const words = content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function BlogContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const slug = searchParams.get('slug')
  const categoryParam = searchParams.get('category')
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  const { data: categories } = trpc.blog.categories.useQuery()
  const { data: blogList } = trpc.blog.list.useQuery(
    { category: selectedCategory !== 'All' ? selectedCategory : undefined },
    { enabled: !slug }
  )
  const { data: singlePost } = trpc.blog.bySlug.useQuery(
    { slug: slug ?? '' },
    { enabled: !!slug }
  )

  // Header entrance
  useEffect(() => {
    if (headerRef.current && !slug) {
      gsap.fromTo(
        headerRef.current.querySelectorAll('.header-animate'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [slug])

  // Cards animation
  useEffect(() => {
    if (sectionRef.current && blogList) {
      const cards = sectionRef.current.querySelectorAll('.blog-card')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        )
      }
    }
  }, [blogList, selectedCategory])

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setSearchParams({})
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setNewsletterSubscribed(true)
      setNewsletterEmail('')
    }
  }

  // Single Post View
  if (slug && singlePost) {
    return (
      <div className="pt-[72px]">
        <article className="bg-white">
          <div className="relative h-[50vh] overflow-hidden">
            <img src={singlePost.coverImage || '/images/img11.jpg'} alt={singlePost.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute bottom-8 left-6 lg:left-20 z-10">
              <button onClick={() => setSearchParams({})} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 cursor-hover">
                <ArrowLeft size={15} />
                <span className="font-body text-[13px]">Back to Articles</span>
              </button>
              <span className="font-body text-[11px] text-white/60 uppercase tracking-[3px]">{singlePost.category}</span>
            </div>
          </div>
          <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
            <h1 className="font-display text-[36px] lg:text-[48px] text-black leading-[1.05] mb-4">{singlePost.title}</h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="font-body text-[13px] text-[#4d4d4d]">
                {new Date(singlePost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <span className="w-1 h-1 rounded-full bg-[#4d4d4d]/40" />
              <span className="font-body text-[13px] text-[#4d4d4d] flex items-center gap-1">
                <Clock size={12} /> {estimateReadTime(singlePost.content)}
              </span>
            </div>
            {singlePost.excerpt && (
              <p className="font-body text-[17px] text-[#4d4d4d] leading-[1.6] mb-8 italic border-l-2 border-[#ff7a1a] pl-5">{singlePost.excerpt}</p>
            )}
            <div className="prose max-w-none">
              <p className="font-body text-[16px] text-[#4d4d4d] leading-[1.85] whitespace-pre-line">{singlePost.content}</p>
            </div>
          </div>
        </article>
      </div>
    )
  }

  const posts = blogList?.items ?? []
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div ref={sectionRef} className="pt-[72px]">
      {/* Header */}
      <section ref={headerRef} className="bg-[#efe7da] pt-28 lg:pt-36 pb-16 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="header-animate flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#ff7a1a]" />
            <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Insights</span>
          </div>
          <h1 className="header-animate font-display text-[48px] lg:text-[72px] text-black leading-[0.95] mb-5">
            Market Insights
          </h1>
          <p className="header-animate font-body text-[16px] text-[#4d4d4d] leading-[1.7] max-w-[500px]">
            Expert perspectives on Netanya's luxury real estate market,
            investment trends, and neighborhood guides.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-2.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {['All', ...(categories ?? [])].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-[12px] font-body transition-all duration-300 whitespace-nowrap cursor-hover ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-black/[0.04] text-black/70 hover:bg-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post Hero */}
      {featuredPost && (
        <section className="bg-white pt-12 lg:pt-20 pb-8">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <ScrollReveal variant="fade-up">
              <button
                onClick={() => setSearchParams({ slug: featuredPost.slug })}
                className="w-full text-left group cursor-hover"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                  <div className="lg:w-3/5">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden shimmer-hover">
                      <img
                        src={featuredPost.coverImage || '/images/img11.jpg'}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="lg:w-2/5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="badge-new">{featuredPost.category || 'Featured'}</span>
                      <span className="font-body text-[12px] text-[#4d4d4d] flex items-center gap-1">
                        <Clock size={12} /> {estimateReadTime(featuredPost.content)}
                      </span>
                    </div>
                    <h2 className="font-display text-[32px] lg:text-[40px] text-black leading-[1.1] mb-4 group-hover:text-[#ff7a1a] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="font-body text-[15px] text-[#4d4d4d] leading-[1.7] mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                    )}
                    <p className="font-body text-[13px] text-[#4d4d4d]/60">
                      {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 text-[13px] font-body text-[#ff7a1a] group-hover:gap-3 transition-all duration-300">
                      Read Full Article <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {remainingPosts.length > 0 ? (
            <>
              <div className="section-divider mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post: any) => (
                  <button
                    key={post.id}
                    onClick={() => setSearchParams({ slug: post.slug })}
                    className="blog-card text-left group cursor-hover"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 shimmer-hover">
                      <img
                        src={post.coverImage || '/images/img11.jpg'}
                        alt={post.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-body text-[11px] text-[#ff7a1a] uppercase tracking-[2px]">{post.category}</span>
                      <span className="font-body text-[11px] text-[#4d4d4d]/50 flex items-center gap-1">
                        <Clock size={10} /> {estimateReadTime(post.content)}
                      </span>
                    </div>
                    <h3 className="font-display text-[22px] text-black leading-[1.2] mt-1 group-hover:text-[#ff7a1a] transition-colors duration-300">{post.title}</h3>
                    {post.excerpt && <p className="font-body text-[13px] text-[#4d4d4d] leading-[1.6] mt-2 line-clamp-2">{post.excerpt}</p>}
                    <div className="flex items-center gap-1.5 mt-3 text-[12px] font-body text-[#4d4d4d] group-hover:text-[#ff7a1a] group-hover:gap-3 transition-all duration-300">
                      Read Article <ChevronRight size={13} />
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 font-body">No articles found.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#f8f7f3] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }}
        />
        <div className="max-w-[600px] mx-auto px-6 lg:px-12 text-center relative">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Stay Updated</span>
              <div className="w-8 h-px bg-[#ff7a1a]" />
            </div>
            <h2 className="font-display text-[32px] lg:text-[42px] text-black leading-[1.1] mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="font-body text-[15px] text-[#4d4d4d] leading-[1.7] mb-8">
              Get the latest market insights, new property listings, and exclusive investment
              opportunities delivered to your inbox every week.
            </p>
            {newsletterSubscribed ? (
              <p className="font-body text-[15px] text-[#b7d64a] font-medium">Thank you for subscribing! Check your inbox soon.</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-[440px] mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 h-12 px-5 border border-black/10 rounded-full text-[14px] font-body bg-white focus:outline-none focus:border-[#ff7a1a] transition-all"
                />
                <button type="submit" className="h-12 px-6 rounded-full bg-[#ff7a1a] text-white text-[13px] font-body uppercase tracking-[1px] hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-hover flex items-center gap-2">
                  <Send size={14} /> Subscribe
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

export default function Blog() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-[72px] flex flex-col items-center justify-center gap-4 bg-[#efe7da]/10">
        <div className="w-10 h-10 border-2 border-[#efe7da] border-t-[#ff7a1a] rounded-full animate-spin" />
        <p className="text-gray-400 font-body text-sm">Loading articles...</p>
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}
