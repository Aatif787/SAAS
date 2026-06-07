"use client";
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { Instagram, Linkedin, Youtube } from './icons'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const quickLinks = [
  { label: 'Properties', path: '/ims-estate-empire/properties' },
  { label: 'About Us', path: '/ims-estate-empire/about' },
  { label: 'Services', path: '/ims-estate-empire/services' },
  { label: 'Blog', path: '/ims-estate-empire/blog' },
  { label: 'Contact', path: '/ims-estate-empire/contact' },
]

const serviceLinks = [
  { label: 'Property Sales', path: '/ims-estate-empire/services' },
  { label: 'Property Purchase', path: '/ims-estate-empire/services' },
  { label: 'Investment Consulting', path: '/ims-estate-empire/services' },
  { label: 'Property Management', path: '/ims-estate-empire/services' },
  { label: 'Relocation Assistance', path: '/ims-estate-empire/services' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      // Animate the large text character by character
      const findText = footer.querySelector('.footer-find')
      const homeText = footer.querySelector('.footer-home')

      if (findText) {
        gsap.fromTo(
          findText,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 85%',
            },
          }
        )
      }

      if (homeText) {
        gsap.fromTo(
          homeText,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 85%',
            },
          }
        )
      }

      // Stagger other elements
      const fadeEls = footer.querySelectorAll('.footer-fade')
      gsap.fromTo(
        fadeEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 75%',
          },
        }
      )

      // Divider line animation
      const divider = footer.querySelector('.footer-divider')
      if (divider) {
        gsap.fromTo(
          divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: divider,
              start: 'top 90%',
            },
          }
        )
      }
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#efe7da] border-t border-black/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-10">
        {/* Top Row - Large CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-14">
          {/* Logo */}
          <Link
            href="/ims-estate-empire"
            className="footer-fade font-body text-[14px] font-medium uppercase tracking-[3px] text-black hover:opacity-70 transition-opacity cursor-hover"
          >
            SHAY TROTSKY
          </Link>

          {/* Large Display Text */}
          <div className="text-center lg:text-left">
            <h2 className="footer-find font-display text-[64px] sm:text-[80px] lg:text-[120px] leading-[0.85] text-black">
              Find your
            </h2>
            <h2 className="footer-home font-display text-[64px] sm:text-[80px] lg:text-[120px] leading-[0.85] text-[#ff7a1a]">
              home
            </h2>
          </div>

          {/* Social Links */}
          <div className="footer-fade flex flex-col gap-3">
            {[
              { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-black hover:text-[#ff7a1a] transition-colors duration-300 group cursor-hover"
              >
                <social.icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="font-body text-[14px]">{social.label}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                  <path d="M1 11L11 1M11 1H3M11 1v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider w-full h-px bg-black/10 mb-12 origin-left" />

        {/* Content Columns */}
        <div className="footer-fade grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Quick Links */}
          <div>
            <h4 className="font-body text-[12px] text-black uppercase tracking-[2px] font-medium mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="font-body text-[14px] text-black/60 hover:text-[#ff7a1a] transition-colors duration-300 cursor-hover">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body text-[12px] text-black uppercase tracking-[2px] font-medium mb-5">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="font-body text-[14px] text-black/60 hover:text-[#ff7a1a] transition-colors duration-300 cursor-hover">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-body text-[12px] text-black uppercase tracking-[2px] font-medium mb-5">Contact</h4>
            <div className="space-y-2.5 font-body text-[14px] text-black/60">
              <p>45 HaTayelet Boulevard</p>
              <p>Netanya, Israel 4250407</p>
              <a href="tel:+972501234567" className="block hover:text-[#ff7a1a] transition-colors cursor-hover">+972-50-123-4567</a>
              <a href="mailto:info@troitsky.re" className="block hover:text-[#ff7a1a] transition-colors cursor-hover">info@troitsky.re</a>
              <a
                href="https://wa.me/972501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#128C7E] transition-colors cursor-hover mt-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.553 4.112 1.52 5.84L.057 23.64l5.948-1.563A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.907 0-3.722-.498-5.336-1.438l-.383-.228-3.964 1.04 1.058-3.865-.25-.397A9.798 9.798 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818S21.818 6.58 21.818 12s-4.398 9.818-9.818 9.818z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-[12px] text-black uppercase tracking-[2px] font-medium mb-5">Newsletter</h4>
            <p className="font-body text-[13px] text-black/60 leading-[1.6] mb-4">
              Get market insights and new listings delivered to your inbox.
            </p>
            {subscribed ? (
              <p className="font-body text-[13px] text-[#b7d64a] font-medium">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-10 px-4 border border-black/10 rounded-full text-[13px] font-body bg-white/80 focus:outline-none focus:border-[#ff7a1a] transition-all"
                />
                <button type="submit" className="w-10 h-10 rounded-full bg-[#ff7a1a] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-hover shrink-0">
                  <Send size={14} className="text-white" />
                </button>
              </form>
            )}
          </div>
        </div>



        {/* Bottom Row */}
        <div className="footer-fade flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-black/50 font-body">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-black transition-colors duration-300 cursor-hover">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-black transition-colors duration-300 cursor-hover">
              Terms of Use
            </Link>
          </div>
          <p>© 2026 Shay Trotsky. All rights reserved.</p>
          <p className="text-black/30">Design by Studio X</p>
        </div>
      </div>
    </footer>
  )
}
