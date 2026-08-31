import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import {
  getGlobalMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  SITE_NAME
} from "@/lib/seo";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();
  const matchedProduct = allProducts.find((p) => p.brand && makeSlug(p.brand) === slug);

  if (!matchedProduct) return {};

  const brandName = matchedProduct.brand;
  const title = `${brandName} Laboratory & Diagnostic Equipment Supplier | ${SITE_NAME}`;
  const description = `Discover high-performance diagnostic products by ${brandName}. We supply certified ${brandName} laboratory equipment across India. Get a free quote today.`;
  const canonical = `https://haemoglobinstrip.com/brand/${slug}`;

  return getGlobalMetadata({
    title,
    description,
    canonical,
    keywords: [
      brandName,
      `${brandName} Equipment`,
      `${brandName} India`,
      `${brandName} Supplier`,
      `${brandName} Price`,
      `${brandName} Diagnostic Products`,
      `${brandName} Analyzer`
    ]
  });
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();
  
  // Find brand by matching slug
  const matched = allProducts.find((p) => p.brand && makeSlug(p.brand) === slug);
  if (!matched) {
    notFound();
  }

  const brandName = matched.brand;
  const brandProducts = allProducts.filter(
    (p) => p.brand && p.brand.toLowerCase() === brandName.toLowerCase()
  );

  // Generate unique brands for internal linking
  const uniqueBrands = Array.from(
    new Set(allProducts.map((p) => p.brand).filter(Boolean))
  )
    .filter((b) => b.toLowerCase() !== brandName.toLowerCase())
    .map((b) => ({ name: b, slug: makeSlug(b) }))
    .slice(0, 8);

  const faqs = [
    {
      question: `Why choose ${brandName} laboratory equipment?`,
      answer: `${brandName} is internationally recognized for manufacturing reliable, high-precision clinical diagnostic systems and medical laboratory reagents.`
    },
    {
      question: `Do you provide genuine reagents for ${brandName} analyzers?`,
      answer: `Yes, we supply authorized reagents, control solutions, and consumables for all ${brandName} analyzer systems.`
    },
    {
      question: `How can I request a quotation for ${brandName} products?`,
      answer: `Choose your preferred ${brandName} equipment on this page, click 'Get Quote' to open our enquiry form, and submit your details to receive an official pricing quotation.`
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/items" },
    { name: brandName, url: `/brand/${slug}` }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbItems))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(faqs))
        }}
      />

      <PageBanner
        title={brandName}
        subtitle={`Buy premium quality ${brandName} laboratory systems and diagnostic equipment at best price.`}
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            {/* Products Grid */}
            <div className="space-y-8">
              <SectionTitle
                badge="Brand Catalog"
                title={`Authorized ${brandName} Equipment`}
                description={`Explore high-performance solutions engineered by ${brandName} for clinical and hospital diagnostics.`}
              />
              
              <div className="space-y-6">
                {brandProducts.map((product) => (
                  <ProductCard key={product.uid} product={product} />
                ))}
              </div>
            </div>

            {/* Sidebar for Internal Linking */}
            <aside className="sticky top-28 bg-white rounded-3xl border border-slate-200 shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">
                Other Brands
              </h3>
              <div className="space-y-3">
                {uniqueBrands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/brand/${brand.slug}`}
                    className="block text-slate-600 hover:text-sky-700 font-medium transition"
                  >
                    • {brand.name}
                  </Link>
                ))}
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Brand FAQs */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="FAQ"
            title="Frequently Asked Questions"
            description={`Common questions and troubleshooting info about ${brandName} diagnostics.`}
            center
          />
          <div className="mt-12 space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 pb-6">
                <h4 className="font-semibold text-xl text-slate-900">
                  {faq.question}
                </h4>
                <p className="text-slate-600 mt-3 leading-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
