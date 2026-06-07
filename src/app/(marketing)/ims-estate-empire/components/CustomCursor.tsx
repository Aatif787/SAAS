"use client";
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const isTouch = useRef(false)

  useEffect(() => {
    // Detect touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
    if (isTouch.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Add body class to hide default cursor
    document.body.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      })
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: 'power3.out',
      })
    }

    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    // Track interactive elements
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true)
      }
    }
    const onOut = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isHovering ? 56 : isClicking ? 28 : 40,
            height: isHovering ? 56 : isClicking ? 28 : 40,
            borderColor: isHovering ? '#ff7a1a' : 'rgba(255,255,255,0.5)',
            borderWidth: isHovering ? 2 : 1,
            opacity: 0.8,
            transform: isClicking ? 'scale(0.8)' : 'scale(1)',
            transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.15s ease',
          }}
        />
      </div>

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <div
          className="rounded-full bg-white transition-all duration-200"
          style={{
            width: isHovering ? 0 : 6,
            height: isHovering ? 0 : 6,
            opacity: isHovering ? 0 : 0.9,
          }}
        />
      </div>
    </>
  )
}
