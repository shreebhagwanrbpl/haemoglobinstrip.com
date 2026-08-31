import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchDistrictData, fetchProductBySlug } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { slug, district } = await params;

    const districtData = await fetchDistrictData(district);
    const product = await fetchProductBySlug(slug);

    if (!districtData || !product) {
        return {};
    }

    const districtName = districtData.district;
    const productName = product.title;

    const title = `${productName} Supplier in ${districtName} | Price, Dealer & Distributor | Raj Biosis`;
    const description = `Buy ${productName} at best price in ${districtName}. Trusted supplier, dealer and distributor of ${productName} for hospitals, laboratories, diagnostic centers, research institutes and healthcare facilities in ${districtName}. Contact Raj Biosis for latest quotation and product details.`;
    const url = `https://haemoglobinstrip.com/items/${slug}`;

    return {
        title,
        description,
        keywords: [
            productName,
            `${productName} Supplier`,
            `${productName} Dealer`,
            `${productName} Distributor`,
            `${productName} Manufacturer`,
            `${productName} Exporter`,
            `${productName} Price`,
            `${productName} Price in ${districtName}`,
            `${productName} Supplier in ${districtName}`,
            `${productName} Dealer in ${districtName}`,
            `${productName} Distributor in ${districtName}`,
            `Buy ${productName}`,
            `${productName} for Laboratory`,
            `${productName} for Hospital`,
            `${productName} for Diagnostic Center`,
            "Biomedical Equipment",
            "Medical Equipment",
            "Laboratory Equipment",
            "Diagnostic Equipment",
            "Hospital Equipment",
            "Healthcare Equipment",
            " Raj Biosis",
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: " Raj Biosis",
            type: "website",
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        metadataBase: new URL("https://haemoglobinstrip.com"),
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;

    const districtData = await fetchDistrictData(district);
    const product = await fetchProductBySlug(slug);

    if (!districtData || !product) {
        notFound();
    }

    return (
        <ProductDetails
            slug={slug}
            district={district}
        />
    );
}