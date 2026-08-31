import ProductsPage from "@/app/items/page";
import { fetchDistrictData } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { district } = await params;
  const districtData = await fetchDistrictData(district);

  if (!districtData) return {};

  const districtName = districtData.district;
  return {
    title: `Diagnostic & Laboratory Equipment for Sale in ${districtName} | Raj Biosis`,
    description: `Browse and buy biochemistry analyzers, CBC machines, ELISA readers, and diagnostic lab equipment in ${districtName}. Best price and expert support.`,
    alternates: {
      canonical: `https://haemoglobinstrip.com/${district}/items`,
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

  return <ProductsPage city={city} district={district} />;
}