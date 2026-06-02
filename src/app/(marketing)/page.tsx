import ExtraordinaryHero from "@/components/sections/extraordinary-hero";
import ServicesGrid from "@/components/sections/services-grid";
import AboutIMS from "@/components/sections/about-ims";
import Stats from "@/components/sections/stats";
import VideoSection from "@/components/sections/video-section";
import AIIntegration from "@/components/sections/ai-integration";
import TechStack from "@/components/sections/tech-stack";
import SecuritySection from "@/components/sections/security-section";
import FAQ from "@/components/sections/faq";
import ContactSection from "@/components/sections/contact-section";
import WhyChooseIMS from "@/components/sections/why-choose-ims";
import WhatsAppFloat from "@/components/ui/whatsapp-float";
import ScrollScale from "@/components/ui/scroll-scale";

export default function HomePage() {
  return (
    <main className="relative bg-ims-cream">
      <ExtraordinaryHero />
      
      <ScrollScale>
        <Stats />
      </ScrollScale>
 
      <ScrollScale>
        <VideoSection />
      </ScrollScale>
 
      <ScrollScale>
        <ServicesGrid />
      </ScrollScale>
 
      <ScrollScale>
        <AboutIMS />
      </ScrollScale>

      <ScrollScale>
        <WhyChooseIMS />
      </ScrollScale>

      <ScrollScale>
        <div className="bg-ims-blue py-20">
          <div className="container-xl">
            <h2 className="text-white text-center mb-16 text-4xl font-serif">Deep AI Capabilities</h2>
            <AIIntegration />
          </div>
        </div>
      </ScrollScale>

      <ScrollScale>
        <TechStack />
      </ScrollScale>

      <ScrollScale>
        <SecuritySection />
      </ScrollScale>

      <ScrollScale>
        <section className="section-pad bg-white border-y border-ims-blue/5">
          <div className="container-xl text-center">
             <span className="text-xs font-bold uppercase tracking-[0.3em] text-ims-gold mb-4 block">Testimonials</span>
             <h2 className="text-4xl md:text-5xl font-serif text-ims-blue mb-16">Trusted by Industry Leaders</h2>
             <div className="grid gap-10 md:grid-cols-3">
                {[
                  { name: "Vikram Singh", role: "MD, Urban Developers", text: "IMS Group's commitment to quality and timelines in infrastructure is unparalleled. A truly professional experience." },
                  { name: "Dr. Ananya Roy", role: "Director, LifeCare", text: "The trauma center setup and healthcare solutions provided by IMS are world-class. They understand the urgency of life-saving care." },
                  { name: "Rahul Verma", role: "CEO, TechVibe", text: "Their web solutions team transformed our digital presence. The AI integration significantly improved our operations." }
                ].map((testimonial, i) => (
                  <div key={i} className="premium-border p-10 text-left bg-ims-cream/30 card-hover">
                     <div className="flex gap-1 text-ims-gold mb-6">
                        {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                     </div>
                     <p className="text-ims-charcoal/80 italic leading-relaxed font-medium mb-8">
                        "{testimonial.text}"
                     </p>
                     <div className="flex items-center gap-4 pt-6 border-t border-ims-blue/5">
                        <div className="h-12 w-12 rounded-full bg-ims-blue/10 flex items-center justify-center font-serif text-ims-blue font-bold">
                           {testimonial.name[0]}
                        </div>
                        <div>
                           <p className="font-bold text-ims-blue">{testimonial.name}</p>
                           <p className="text-[10px] uppercase tracking-widest text-ims-charcoal/40">{testimonial.role}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </ScrollScale>

      <ScrollScale>
        <FAQ />
      </ScrollScale>

      <ScrollScale>
        <ContactSection />
      </ScrollScale>

      <WhatsAppFloat />
    </main>
  );
}
