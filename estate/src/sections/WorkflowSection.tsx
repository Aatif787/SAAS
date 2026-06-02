import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, TrendingUp, Eye, FileText, Key } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const workflowSteps = [
  {
    icon: Compass,
    number: '01',
    title: 'Curated Discovery',
    description: 'We listen to your specific layout, views, and structural wishes, then curate a handpicked catalog of public and off-market properties.'
  },
  {
    icon: TrendingUp,
    number: '02',
    title: 'Bespoke Advisory',
    description: 'Our advisors review tax structures, Israeli mortgage options, and market projection models to ensure your acquisition is sound.'
  },
  {
    icon: Eye,
    number: '03',
    title: 'Guided Private Viewings',
    description: 'Experience property walkthroughs with customized schedules. We coordinate local transport, translation, and building details.'
  },
  {
    icon: FileText,
    number: '04',
    title: 'Legal Orchestration',
    description: 'Our partnered legal advisors oversee contracts, registrations, bank guarantees, and transfer procedures to secure your asset.'
  },
  {
    icon: Key,
    number: '05',
    title: 'Concierge Handover',
    description: 'From key handover ceremonies to moving services and home staging modifications, we ensure your transition is completely effortless.'
  }
]

export default function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const list = listRef.current
    if (!container || !list) return

    const ctx = gsap.context(() => {
      // Animate left column title
      gsap.fromTo(
        container.querySelectorAll('.workflow-intro-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%'
          }
        }
      )

      // Animate right column steps
      const steps = list.querySelectorAll('.step-card')
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%'
            }
          }
        )
      })

      // Draw vertical linking line on scroll
      const line = container.querySelector('.workflow-line')
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: list,
              start: 'top 80%',
              end: 'bottom 75%',
              scrub: true
            }
          }
        )
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="bg-[#f8f7f3] py-28 lg:py-44 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Title */}
          <div className="lg:w-[40%] lg:sticky lg:top-[120px] h-fit">
            <div className="workflow-intro-item flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">OUR BLUEPRINT</span>
            </div>
            <h2 className="workflow-intro-item font-display text-[40px] lg:text-[56px] text-black leading-[1.05] mb-6">
              The Path to Your Waterfront Sanctuary
            </h2>
            <p className="workflow-intro-item font-body text-[15px] text-[#4d4d4d] leading-[1.7] mb-8">
              Acquiring luxury property abroad requires rigorous details, local connections, and absolute transparency. Here is how we ensure your purchase journey in Israel is exceptional.
            </p>
            <div className="workflow-intro-item hidden lg:block">
              <div className="p-6 bg-white border border-black/[0.05] rounded-2xl max-w-[340px]">
                <h4 className="font-display text-[16px] text-black mb-2">Need immediate assistance?</h4>
                <p className="font-body text-[13px] text-[#4d4d4d] mb-4">Our advisory team is available 24/7 for consultation bookings.</p>
                <a href="/contact" className="text-[12px] font-body font-semibold text-[#ff7a1a] hover:text-[#b7d64a] transition-colors">
                  Contact Advisory &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Step Cards */}
          <div className="lg:w-[60%] relative pl-8 lg:pl-12">
            
            {/* Animated Vertical Line */}
            <div className="absolute left-[3px] lg:left-[7px] top-[40px] bottom-[40px] w-[2px] bg-black/[0.08]" />
            <div className="workflow-line absolute left-[3px] lg:left-[7px] top-[40px] bottom-[40px] w-[2px] bg-[#ff7a1a] origin-top scale-y-0 will-change-transform" />

            <div ref={listRef} className="space-y-12">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className="step-card relative flex flex-col sm:flex-row gap-6 p-6 lg:p-8 bg-white border border-black/[0.05] rounded-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:border-[#ff7a1a]/20 transition-all duration-500 cursor-hover"
                  style={{ opacity: 0 }} // Pre-hidden
                >
                  {/* Step Connector Node */}
                  <div className="absolute left-[-39px] lg:left-[-49px] top-[34px] lg:top-[38px] w-4 h-4 rounded-full border-[3px] border-[#f8f7f3] bg-black/20 z-10 transition-colors duration-500 group-hover:bg-[#ff7a1a]"
                    style={{
                      borderColor: '#f8f7f3',
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.05)'
                    }}
                  />

                  {/* Step Icon */}
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#f8f7f3] flex items-center justify-center text-[#ff7a1a] sm:mb-0">
                    <step.icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Step details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-[12px] text-[#ff7a1a] tracking-[1.5px] uppercase font-bold">Step {step.number}</span>
                    </div>
                    <h3 className="font-display text-[22px] text-black leading-tight mb-2">{step.title}</h3>
                    <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.6]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
