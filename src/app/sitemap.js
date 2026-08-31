import { fetchActiveDistricts, fetchFullCatalog } from "@/lib/data-fetcher-server";

export const revalidate = 3600; // Revalidate sitemap cache every hour
export const dynamic = "force-dynamic"; // Render sitemap dynamically on demand to bypass build-time memory limits

const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

export default async function sitemap() {
    const baseUrl = "https://haemoglobinstrip.com";
    const urls = [];

    // 1. Static Pages
    urls.push(
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/about`, lastModified: new Date() },
        { url: `${baseUrl}/services`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },
        { url: `${baseUrl}/items`, lastModified: new Date() }
    );

    try {
        const districts = await fetchActiveDistricts();
        const products = await fetchFullCatalog();

        // 2. Dynamic Categories (Primary and Verticals)
        const uniqueCategories = Array.from(
            new Set(products.map((p) => p.category).filter(Boolean))
        );
        uniqueCategories.forEach((cat) => {
            const catSlug = makeSlug(cat);
            urls.push(
                { url: `${baseUrl}/category/${catSlug}`, lastModified: new Date() },
                { url: `${baseUrl}/laboratory-equipment/${catSlug}`, lastModified: new Date() },
                { url: `${baseUrl}/diagnostic-equipment/${catSlug}`, lastModified: new Date() },
                { url: `${baseUrl}/biomedical-equipment/${catSlug}`, lastModified: new Date() }
            );
        });

        // 3. Dynamic Brands
        const uniqueBrands = Array.from(
            new Set(products.map((p) => p.brand).filter(Boolean))
        );
        uniqueBrands.forEach((brand) => {
            const brandSlug = makeSlug(brand);
            urls.push({
                url: `${baseUrl}/brand/${brandSlug}`,
                lastModified: new Date()
            });
        });

        // 4. Dynamic Products (Main authoritative URLs only)
        products.forEach((product) => {
            if (!product.slug) return;
            urls.push({
                url: `${baseUrl}/items/${product.slug}`,
                lastModified: new Date()
            });
        });

        // 5. Dynamic Districts (Local Service Pages)
        districts.forEach((district) => {
            const slug = district.slug;
            if (!slug) return;

            urls.push(
                { url: `${baseUrl}/${slug}`, lastModified: new Date() },
                { url: `${baseUrl}/${slug}/about`, lastModified: new Date() },
                { url: `${baseUrl}/${slug}/services`, lastModified: new Date() },
                { url: `${baseUrl}/${slug}/contact`, lastModified: new Date() },
                { url: `${baseUrl}/${slug}/items`, lastModified: new Date() }
            );
        });

    } catch (error) {
        console.error("Sitemap Generation Error:", error);
    }

    return urls;
}