import { fetchDistrictData } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) {
    return {};
  }

  const districtName = districtData.district;
  const url = `https://haemoglobinstrip.com/${district}`;

  return {
    title: `Hemoglobin Test Strips & Hb Meters in ${districtName}`,

    description: `Raj Biosis supplies hemoglobin test strips, digital Hb meters, and anemia testing consumables in ${districtName}.`,

    keywords: [
      `Hemoglobin Strips ${districtName}`,
      `Hb Meters ${districtName}`,
      `Anemia Test Kits ${districtName}`,
      `Mission Hb ${districtName}`,
      `HemoCue Strips ${districtName}`,
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Hemoglobin Test Strips & Hb Meters in ${districtName}`,
      description: `Raj Biosis supplies hemoglobin test strips, digital Hb meters, and anemia testing consumables in ${districtName}.`,
      url,
      type: "website",
    },
  };
}

export default async function DistrictLayout({ children, params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) {
    notFound();
  }

  return children;
}
