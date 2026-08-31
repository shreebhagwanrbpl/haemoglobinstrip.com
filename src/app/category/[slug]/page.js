import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import {
  getGlobalMetadata,
  getProductSchema,
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
  const matchedProduct = allProducts.find((p) => makeSlug(p.category) === slug);

  if (!matchedProduct) return {};

  const categoryName = matchedProduct.category;
  const title = `${categoryName} Suppliers & Dealers in India | Price | ${SITE_NAME}`;
  const description = `Looking for ${categoryName}? We supply certified ${categoryName} for hospitals, laboratories, and diagnostics across India. Contact us for price quotations and specifications.`;
  const canonical = `https://haemoglobinstrip.com/category/${slug}`;

  return getGlobalMetadata({
    title,
    description,
    canonical,
    keywords: [
      categoryName,
      `Buy ${categoryName}`,
      `${categoryName} Price`,
      `${categoryName} Suppliers`,
      `${categoryName} Dealers`,
      `${categoryName} India`,
      `${categoryName} Specifications`
    ]
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();
  
  // Find category by matching slug
  const matched = allProducts.find((p) => makeSlug(p.category) === slug);
  if (!matched) {
    notFound();
  }

  const categoryName = matched.category;
  const categoryProducts = allProducts.filter((p) => p.category === categoryName);

  // Generate unique categories for internal linking
  const uniqueCategories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  )
    .filter((c) => c !== categoryName)
    .map((c) => ({ name: c, slug: makeSlug(c) }))
    .slice(0, 8);

  const faqs = [
    {
      question: `What is the application of ${categoryName}?`,
      answer: `${categoryName} is used in medical laboratories, hospitals, and clinical settings to perform specialized diagnostic tests, improve patient outcomes, and ensure high accuracy in testing.`
    },
    {
      question: `Do you provide installation and support for ${categoryName}?`,
      answer: `Yes, we provide setup guidance, technical installation assistance, and operational training for all ${categoryName} supplied across India.`
    },
    {
      question: `How can I request a price quotation for ${categoryName}?`,
      answer: `You can click the 'Get Quote' button on any product card, fill out our enquiry form with your contact details, and our diagnostic specialist will get back to you with a competitive quotation.`
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/items" },
    { name: categoryName, url: `/category/${slug}` }
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
        title={categoryName}
        subtitle={`Buy premium quality ${categoryName} at best price. Trusted supplier, dealer, and distributor in India.`}
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            {/* Products Grid */}
            <div className="space-y-8">
              <SectionTitle
                badge="Catalog"
                title={`Premium ${categoryName}`}
                description={`Explore our range of reliable ${categoryName} designed for precision medical diagnostics.`}
              />
              
              <div className="space-y-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.uid} product={product} />
                ))}
              </div>
            </div>

            {/* Sidebar for Internal Linking */}
            <aside className="sticky top-28 bg-white rounded-3xl border border-slate-200 shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">
                Other Categories
              </h3>
              <div className="space-y-3">
                {uniqueCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block text-slate-600 hover:text-sky-700 font-medium transition"
                  >
                    • {cat.name}
                  </Link>
                ))}
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Dynamic SEO FAQs */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="FAQ"
            title="Frequently Asked Questions"
            description={`Answers to common questions about buying and installing ${categoryName}.`}
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
