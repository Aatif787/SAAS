"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type AnimationVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'fade-down' | 'scale' | 'blur' | 'rotate' | 'clip-up' | 'clip-left'

interface ScrollRevealProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  stagger?: number
  threshold?: string
  className?: string
  style?: CSSProperties
  once?: boolean
  as?: keyof React.JSX.IntrinsicElements
}

const variantConfigs: Record<AnimationVariant, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  'fade-up': {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  'fade-down': {
    from: { y: -60, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  'fade-left': {
    from: { x: -80, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  'fade-right': {
    from: { x: 80, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  scale: {
    from: { scale: 0.85, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
  blur: {
    from: { filter: 'blur(12px)', opacity: 0, y: 30 },
    to: { filter: 'blur(0px)', opacity: 1, y: 0 },
  },
  rotate: {
    from: { rotateX: -15, y: 50, opacity: 0 },
    to: { rotateX: 0, y: 0, opacity: 1 },
  },
  'clip-up': {
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  'clip-left': {
    from: { clipPath: 'inset(0% 100% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.9,
  stagger = 0.12,
  threshold = 'top 85%',
  className = '',
  style,
  once = true,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const config = variantConfigs[variant]
    const children = el.querySelectorAll('[data-reveal]')
    const targets = children.length > 0 ? children : [el]

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, config.from, {
        ...config.to,
        duration,
        delay,
        stagger: children.length > 0 ? stagger : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: threshold,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [variant, delay, duration, stagger, threshold, once])

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} style={{ ...style, willChange: 'transform, opacity' }}>{children}</Tag>
}

// Horizontal animated divider component
export function AnimatedDivider({
  className = '',
  color = '#ff7a1a',
  thickness = 1,
}: {
  className?: string
  color?: string
  thickness?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className={`w-full origin-left ${className}`}
      style={{ height: `${thickness}px`, background: color }}
    />
  )
}
