import ServicesClient from "./ServicesClient";
import { getGlobalMetadata } from "@/lib/seo";

export const metadata = getGlobalMetadata({
  title: "Biomedical Procurement & Product Support | Raj Biosis",
  description: "Assistance with biomedical equipment, diagnostic products, laboratory supplies, reagents, consumables and multi-item healthcare requirements.",
  canonical: "/services",
});

export default function ServicesPage({ city = "" }) {
  return <div className="site3-static"><ServicesClient city={city} /></div>;
}
