"use client";
import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevPath = useRef(pathname)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (prevPath.current !== pathname) {
      // Exit animation
      gsap.fromTo(
        container,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      prevPath.current = pathname
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
