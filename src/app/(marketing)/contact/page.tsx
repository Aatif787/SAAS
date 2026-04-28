import ContactLeadForm from "@/components/forms/contact-lead-form";

export default function ContactPage() {
  return (
    <main className="section-pad">
      <div className="container-xl grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 text-white/75">Gomti Nagar, Lucknow, Uttar Pradesh, India</p>
          <p className="mt-1 text-white/75">contact@aizenscale.com | +91 90000 00000</p>
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Gomti%20Nagar%20Lucknow&output=embed"
            className="mt-6 h-72 w-full rounded-xl border border-white/10"
            loading="lazy"
          />
        </div>
        <ContactLeadForm />
      </div>
    </main>
  );
}
