import ContactPage from "@/app/contact/page";
import { fetchDistrictData } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) return {};

  const districtName = districtData.district;
  return {
    title: `Contact Raj Biosis in ${districtName} | Phone, Email & Address`,
    description: `Contact Raj Biosis in ${districtName} for CBC machines, hematology analyzers, biochemistry analyzers and laboratory equipment. Get quotes and technical support.`,
    alternates: {
      canonical: `https://haemoglobinstrip.com/${district}/contact`,
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

  return <div className="site3-static"><ContactPage city={city} /></div>;
}