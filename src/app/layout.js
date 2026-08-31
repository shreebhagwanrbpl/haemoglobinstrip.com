import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { getGlobalMetadata, SITE_URL } from "@/lib/seo";

export const metadata = getGlobalMetadata({
  title: "Hemoglobin Testing Strips & Hb Meters Supplier",
  description: "Raj Biosis supplies CBC machines, hematology analyzers, biochemistry analyzers, ELISA readers, and laboratory equipment for healthcare facilities across India.",
  canonical: "/",
});

export default function RootLayout({
  children,
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Raj Biosis",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": "Supplier of biomedical, diagnostic and laboratory equipment across India.",
    "telephone": "+91-9983123469",
    "email": "rajbiosis@yahoo.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302021",
      "addressCountry": "IN"
    }
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Raj Biosis",
    "url": SITE_URL
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}