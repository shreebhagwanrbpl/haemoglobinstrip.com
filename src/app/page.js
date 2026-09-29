import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";
import { getGlobalMetadata } from "@/lib/seo";

export const metadata = getGlobalMetadata({
  title: "Biomedical Products, Laboratory Equipment & Diagnostic Supplies in India",
  description: "Explore a multi-category biomedical catalogue covering laboratory equipment, diagnostic products, test kits, reagents, consumables, monitoring devices and healthcare supplies.",
  canonical: "/",
});

export default function Home({ city = "" }) {
  return (
    <div className="site3-static">
      <HeroSection city={city} />
      <TrustedBrands city={city} />
      <WhyChooseUs city={city} />
      <StatsSection city={city} />
      <ServicesPreview city={city} />
      <SeoContent city={city} />
      <Testimonials city={city} />
      <CTASection city={city} />
    </div>
  );
}
