import ServicesClient from "./ServicesClient";
import { getGlobalMetadata } from "@/lib/seo";

export const metadata = getGlobalMetadata({
  title: "Biomedical & Laboratory Equipment Services | Raj Biosis",
  description: "Expert technical support, maintenance, calibration and installation services for diagnostic machines and laboratory equipment.",
  canonical: "/services",
});

export default function ServicesPage({ city = "" }) {
  return <div className="site3-static"><ServicesClient city={city} /></div>;
}