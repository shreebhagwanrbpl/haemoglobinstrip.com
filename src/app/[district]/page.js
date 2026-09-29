import Home from "@/app/page";
import { fetchDistrictData } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import { getLocalBusinessSchema } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) return {};

  const districtName = districtData.district;
  const stateName = districtData.state;

  return {
    title: `Hemoglobin Test Strips & Hb Meters Dealer in ${districtName} | Raj Biosis`,
    description: `Looking for reliable hemoglobin test strips in ${districtName}? Raj Biosis supplies Mission Hb strips, Hb meters, and diagnostic testing tools to labs and clinics.`,
    alternates: {
      canonical: `https://haemoglobinstrip.com/${district}`,
    },
  };
}

export default async function DistrictPage({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) {
    notFound();
  }

  const city = districtData.district;
  const state = districtData.state;
  const localBusinessSchema = getLocalBusinessSchema(city, state, `https://haemoglobinstrip.com/${district}`);

  return (
    <div className="site3-static">
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      )}
      <Home city={city} />
    </div>
  );
}
