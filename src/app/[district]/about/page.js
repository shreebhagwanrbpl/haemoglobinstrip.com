import AboutPage from "@/app/about/page";
import { fetchDistrictData } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) return {};

  const districtName = districtData.district;
  return {
    title: `About Our Hb Testing Solutions in ${districtName} | Biomedical & Diagnostic Equipment`,
    description: `Learn about Raj Biosis in ${districtName}. Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision.`,
    alternates: {
      canonical: `https://haemoglobinstrip.com/${district}/about`,
    },
  };
}

export default async function Page({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) {
    notFound();
  }

  const city = districtData.district;

  return <div className="site3-static"><AboutPage city={city} /></div>;
}