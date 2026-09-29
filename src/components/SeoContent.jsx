export default function SeoContent({ city = "" }) {
  const location = city || "India";
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">
          Biomedical products and laboratory supplies for {location}
        </h2>
        <div className="space-y-6 text-slate-600 leading-8 text-lg">
          <p>
            The catalogue brings together equipment and supplies used in laboratories, hospitals, clinics, diagnostic centres, research settings and healthcare programmes. Categories can include analytical instruments, diagnostic equipment, rapid tests, reagents, controls, patient monitoring products, sample-handling items and everyday laboratory consumables.
          </p>
          <p>
            Buyers can browse individual products or discuss a combined requirement when several departments, applications or product categories are involved. The aim is to make product discovery easier without limiting the catalogue to one medical specialty.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Common catalogue questions</h2>
          <div className="space-y-6">
            {[
              ["What kinds of biomedical products can I enquire about?", "The catalogue is intended for a wide range of biomedical and laboratory requirements, including instruments, diagnostic products, test kits, reagents, monitoring devices, consumables and related accessories."],
              ["Can I request more than one product category?", "Yes. A requirement can contain several products or categories, which is useful for laboratory setup, replacement needs, routine procurement and institutional projects."],
              ["Can product specifications be checked before ordering?", "You can share the product name, model or application and discuss available specifications, compatibility points and other relevant details before proceeding."],
              ["Who can use the catalogue?", "Hospitals, diagnostic centres, pathology and clinical laboratories, clinics, research organisations, healthcare programmes and other institutional buyers can use it for product enquiries."],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="font-semibold text-xl">{q}</h3>
                <p className="text-slate-600 mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
