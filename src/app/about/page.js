import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import { getGlobalMetadata } from "@/lib/seo";

export const metadata = getGlobalMetadata({
  title: "About Raj Biosis | Biomedical Products, Equipment & Laboratory Supplies",
  description: "Explore Raj Biosis as a multi-category biomedical product source covering laboratory equipment, diagnostic products, consumables, reagents and healthcare supplies.",
  canonical: "/about",
});

export default function AboutPage() {
  const areas = [
    ["Laboratory & Analysis", "Instruments and systems used for routine testing, analysis and laboratory workflows."],
    ["Diagnostics & Screening", "Diagnostic equipment, rapid testing products and supporting materials for healthcare applications."],
    ["Consumables & Reagents", "Routine-use laboratory supplies, reagents, controls and other supporting products."],
    ["Monitoring & Care", "Devices and accessories used for patient monitoring and day-to-day clinical requirements."],
  ];

  return (
    <div className="site3-static">
      <PageBanner
        title="About Raj Biosis"
        subtitle="A broad biomedical catalogue for laboratories, healthcare facilities, institutions and professional buyers."
      />

      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden card-shadow bg-slate-100 h-[600px] flex items-center justify-center p-10">
              <Image src="/about.png" alt="Biomedical products and laboratory supplies" width={1200} height={900} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-[26px] shadow-2xl hidden lg:block">
              <h3 className="text-3xl font-bold text-sky-700">Multi-category</h3>
              <p className="text-slate-500">Biomedical catalogue</p>
            </div>
          </div>

          <div>
            <SectionTitle
              badge="Our Catalogue"
              title="One place to explore many biomedical requirements"
              description="Raj Biosis is structured around product discovery across laboratory, diagnostic, clinical and healthcare applications."
            />
            <p className="mt-8 text-slate-600 leading-8">
              Instead of defining the business around a single instrument or test, the catalogue brings together different types of products that professional healthcare buyers may need. This includes equipment, diagnostic systems, test kits, reagents, controls, monitoring devices, consumables and accessories.
            </p>
            <p className="mt-5 text-slate-600 leading-8">
              The approach is useful when a buyer is replacing one item, comparing options, preparing a laboratory requirement or compiling a larger institutional purchase list. Product-specific details remain the starting point for every enquiry.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {areas.map(([title, text]) => (
                <div key={title} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="font-semibold text-lg">{title}</h4>
                  <p className="text-slate-500 mt-2 leading-6">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
