import { useState, useEffect, useRef } from 'react'
import { trpc } from '@/providers/trpc'
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Youtube, Check, ChevronDown, Shield, Zap, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const subjects = ['General Inquiry', 'Property Purchase', 'Property Sale', 'Investment Consulting', 'Property Management', 'Relocation Assistance', 'Partnership']

const faqs = [
  { question: 'What areas of Netanya do you specialize in?', answer: 'We specialize in luxury properties across all of Netanya\'s premium neighborhoods, including Kiryat Hasharon, Seafront, Ir Yamim, Ramat Poleg, Noga, South Beach, and City Center.' },
  { question: 'Do you work with international buyers?', answer: 'Absolutely. We have extensive experience working with international clients from North America, Europe, and beyond. Our multilingual team (Hebrew, English, Russian, French) guides you through the entire purchasing process, including legal requirements and tax implications.' },
  { question: 'What is your commission structure?', answer: 'Our commission is competitive and aligned with industry standards in Israel (typically 2% + VAT from each side). We offer transparent pricing with no hidden fees. Commission is only payable upon successful completion of a transaction.' },
  { question: 'How long does the property buying process typically take?', answer: 'The timeline varies depending on the property and financing arrangements. Typically, from offer acceptance to closing takes 60-90 days in Israel. The initial search phase can take 2-8 weeks depending on your requirements.' },
  { question: 'Can you help with property management after purchase?', answer: 'Yes, we offer comprehensive property management services including tenant screening, rent collection, maintenance coordination, and financial reporting. This is especially popular with our international clients who own vacation or investment properties.' },
  { question: 'Do I need a lawyer to buy property in Israel?', answer: 'Yes, Israeli law strongly recommends (and practically requires) both buyer and seller to be represented by separate attorneys. A real estate lawyer handles contract review, due diligence, tax calculations, and registration with the Israel Land Authority (Tabu). We can recommend trusted legal professionals.' },
  { question: 'What taxes apply when buying property in Israel?', answer: 'The main tax is Purchase Tax (Mas Rechisha), which ranges from 0% to 10% depending on the property value and whether you\'re a first-time Israeli buyer or a foreign purchaser. Foreign buyers typically pay 8-10%. There may also be VAT (17%) on new construction from developers.' },
  { question: 'Can foreigners get a mortgage in Israel?', answer: 'Yes, Israeli banks offer mortgages to foreign nationals, typically up to 50% of the property value (compared to 75% for Israeli residents). Interest rates for foreign buyers generally range from 3.5-5.5%, and the process requires proof of income and assets from your home country.' },
]

const guarantees = [
  { icon: Zap, title: '24-Hour Response', description: 'Every inquiry receives a personal response within 24 hours — guaranteed.' },
  { icon: Users, title: 'Dedicated Agent', description: 'You\'ll be assigned a dedicated agent who understands your unique requirements.' },
  { icon: Shield, title: 'No Obligation', description: 'Initial consultations are completely free with no strings attached.' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: subjects[0], message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const submitContact = trpc.contact.submit.useMutation({ onSuccess: () => setSubmitted(true) })

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); submitContact.mutate(form); }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        section.querySelectorAll('.header-animate'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )

      // Form and info stagger
      const fadeEls = section.querySelectorAll('.contact-fade')
      gsap.fromTo(
        fadeEls,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: fadeEls[0], start: 'top 85%' } }
      )

      // FAQ items
      const faqItems = section.querySelectorAll('.faq-item')
      gsap.fromTo(
        faqItems,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: faqItems[0], start: 'top 85%' } }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="pt-[72px]">
      {/* Header */}
      <section className="bg-[#efe7da] pt-28 lg:pt-36 pb-16 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="header-animate flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#ff7a1a]" />
            <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Reach Out</span>
          </div>
          <h1 className="header-animate font-display text-[48px] lg:text-[72px] text-black leading-[0.95] mb-5">
            Get in Touch
          </h1>
          <p className="header-animate font-body text-[16px] text-[#4d4d4d] leading-[1.7] max-w-[500px]">
            Whether you're buying, selling, or just exploring — we're here to help.
            Start with a free, no-obligation consultation.
          </p>
        </div>
      </section>

      {/* Response Guarantees */}
      <section className="bg-white py-10 border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <ScrollReveal key={g.title} variant="fade-up" delay={i * 0.1}>
                <div className="flex items-center gap-4 p-4 rounded-xl group cursor-hover">
                  <div className="w-12 h-12 rounded-full bg-[#ff7a1a]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff7a1a]/20 transition-colors duration-300">
                    <g.icon size={20} className="text-[#ff7a1a]" />
                  </div>
                  <div>
                    <p className="font-body text-[14px] text-black font-medium">{g.title}</p>
                    <p className="font-body text-[12px] text-[#4d4d4d] leading-[1.5]">{g.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:w-1/2 contact-fade">
              {submitted ? (
                <div className="bg-[#f8f7f3] rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#b7d64a]/20 flex items-center justify-center mx-auto mb-5">
                    <Check size={28} className="text-[#b7d64a]" />
                  </div>
                  <h3 className="font-display text-[28px] text-black mb-2">Thank You!</h3>
                  <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.7]">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Your Name *" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="input-premium" />
                  <input type="email" placeholder="Email *" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="input-premium" />
                  <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="input-premium" />
                  <div className="relative">
                    <select value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      className="input-premium appearance-none cursor-hover pr-10">
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4d4d4d] pointer-events-none" />
                  </div>
                  <textarea placeholder="Your Message *" required rows={5} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-5 py-4 border border-black/10 rounded-xl text-[14px] font-body focus:outline-none focus:border-[#ff7a1a] focus:shadow-[0_0_0_3px_rgba(255,122,26,0.08)] transition-all resize-none bg-white hover:border-black/20" />
                  <button type="submit" className="w-full btn-lime cursor-hover" disabled={submitContact.isPending}>
                    {submitContact.isPending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:w-1/2 space-y-8">
              {/* Google Maps Embed */}
              <div className="contact-fade rounded-2xl overflow-hidden aspect-[16/9] border border-black/[0.06]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26952.42847747187!2d34.83!3d32.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4836ee6be1f7%3A0x456c54ab7308c1b3!2sNetanya%2C%20Israel!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our office in Netanya, Israel"
                />
              </div>

              <div className="contact-fade space-y-5">
                {[
                  { icon: MapPin, label: 'Office', value: '45 HaTayelet Boulevard, Netanya, Israel 4250407' },
                  { icon: Phone, label: 'Phone', value: '+972-50-123-4567', href: 'tel:+972501234567' },
                  { icon: Mail, label: 'Email', value: 'info@troitsky.re', href: 'mailto:info@troitsky.re' },
                  { icon: Clock, label: 'Business Hours', value: 'Sun - Thu: 9:00 AM - 6:00 PM\nFri: 9:00 AM - 1:00 PM\nSat: Closed' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[#ff7a1a]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff7a1a]/20 transition-colors duration-300">
                      <item.icon size={16} className="text-[#ff7a1a]" />
                    </div>
                    <div>
                      <p className="font-body text-[13px] text-black font-medium mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-body text-[14px] text-[#4d4d4d] hover:text-[#ff7a1a] transition-colors cursor-hover">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-[14px] text-[#4d4d4d] whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-fade flex gap-3">
                {[
                  { Icon: Instagram, href: 'https://instagram.com' },
                  { Icon: Linkedin, href: 'https://linkedin.com' },
                  { Icon: Youtube, href: 'https://youtube.com' },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-[#4d4d4d] hover:border-[#ff7a1a] hover:text-[#ff7a1a] hover:bg-[#ff7a1a]/5 hover:scale-110 transition-all duration-300 cursor-hover">
                    <Icon size={16} />
                  </a>
                ))}
                <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 hover:scale-110 transition-all duration-300 cursor-hover">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.553 4.112 1.52 5.84L.057 23.64l5.948-1.563A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.907 0-3.722-.498-5.336-1.438l-.383-.228-3.964 1.04 1.058-3.865-.25-.397A9.798 9.798 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818S21.818 6.58 21.818 12s-4.398 9.818-9.818 9.818z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f8f7f3] py-16 lg:py-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#ff7a1a]" />
              <span className="font-body text-[11px] text-[#4d4d4d] uppercase tracking-[3px]">Help</span>
              <div className="w-8 h-px bg-[#ff7a1a]" />
            </div>
            <h2 className="font-display text-[32px] text-black">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item border-t border-black/[0.08]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left cursor-hover group">
                  <span className="font-display text-[17px] lg:text-[19px] text-black pr-6 group-hover:text-[#ff7a1a] transition-colors">{faq.question}</span>
                  <span className={`text-[20px] text-[#4d4d4d] font-light shrink-0 transition-all duration-300 ${openFaq === i ? 'rotate-45 text-[#ff7a1a]' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${openFaq === i ? 'max-h-64 pb-5' : 'max-h-0'}`}>
                  <p className="font-body text-[14px] text-[#4d4d4d] leading-[1.7]">{faq.answer}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-black/[0.08]" />
          </div>
        </div>
      </section>
    </div>
  )
}
