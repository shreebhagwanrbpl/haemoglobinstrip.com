import ServicesPage from "@/app/services/page";
import { fetchDistrictData } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) return {};

  const districtName = districtData.district;
  return {
    title: `Biomedical & Laboratory Equipment Services in ${districtName} | Raj Biosis`,
    description: `Expert technical support, maintenance, calibration and installation services for diagnostic machines and laboratory equipment in ${districtName}.`,
    alternates: {
      canonical: `https://haemoglobinstrip.com/${district}/services`,
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

  return <div className="site3-static"><ServicesPage city={city} /></div>;
}