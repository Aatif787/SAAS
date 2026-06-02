import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (prevPath.current !== location.pathname) {
      // Exit animation
      gsap.fromTo(
        container,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      prevPath.current = location.pathname
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
