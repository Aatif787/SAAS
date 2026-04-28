import TemplateCatalog from "@/components/sections/template-catalog";

export default function TemplatesPage() {
  return (
    <main className="section-pad">
      <div className="container-xl">
        <h1 className="text-4xl font-bold">Template Marketplace</h1>
        <p className="mt-3 text-white/75">Filter by category, preview layouts, and select templates to start your build.</p>
        <div className="mt-8">
          <TemplateCatalog />
        </div>
      </div>
    </main>
  );
}
