export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://haemoglobinstrip.com";
export const SITE_NAME = "Raj Biosis";
export const DEFAULT_TITLE = "Biomedical & Laboratory Equipment Supplier in India";
export const DEFAULT_DESCRIPTION = "Raj Biosis supplies CBC machines, hematology analyzers, biochemistry analyzers, ELISA readers, and laboratory equipment for healthcare facilities across India.";

export function getTitle(pageTitle) {
  if (!pageTitle) return DEFAULT_TITLE;
  return `${pageTitle} | ${SITE_NAME}`;
}

export function getCanonicalUrl(path = "") {
  if (!path || path === "/") return SITE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPathNoTrailing = cleanPath.endsWith("/") && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath;
  return `${SITE_URL}${cleanPathNoTrailing}`;
}

export function getGlobalMetadata(custom = {}) {
  const title = custom.title || DEFAULT_TITLE;
  const description = custom.description || DEFAULT_DESCRIPTION;
  const canonical = custom.canonical || SITE_URL;
  
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: custom.keywords || [
      "Biomedical Equipment Supplier",
      "Laboratory Equipment Supplier",
      "CBC Machine Supplier",
      "Hematology Analyzer Supplier",
      "Biochemistry Analyzer Supplier",
      "Diagnostic Equipment Supplier",
      "Medical Equipment Supplier India",
    ],
    authors: [{ name: "Raj Biosis" }],
    creator: "Raj Biosis",
    publisher: "Raj Biosis",
    robots: custom.robots || {
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
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: custom.ogImage ? [{ url: custom.ogImage, width: 1200, height: 630, alt: title }] : [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      locale: "en_US",
      type: "website",
      ...custom.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: custom.twitterImage ? [custom.twitterImage] : ["/logo.png"],
      ...custom.twitter,
    },
    ...custom.extra,
  };
}

/**
 * Structured Schema Generators
 */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": DEFAULT_DESCRIPTION,
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
}

export function getLocalBusinessSchema(city, state, canonicalUrl) {
  if (!city) return null;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalEquipmentSupplier",
    "name": `${SITE_NAME} ${city}`,
    "url": canonicalUrl || `${SITE_URL}/${city.toLowerCase().replace(/\s+/g, "-")}`,
    "description": `Biomedical, hospital, and laboratory equipment supplier in ${city}, ${state}.`,
    "telephone": "+91-9983123469",
    "email": "rajbiosis@yahoo.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": city
    }
  };
}

export function getProductSchema(product, canonicalUrl) {
  if (!product) return null;
  const imageUrl = product.images?.[0] || product.image || `${SITE_URL}/logo.png`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`,
    "description": product.description || `Buy ${product.title} at best price. Trusted biomedical and laboratory supplier.`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || SITE_NAME
    },
    "model": product.model || "",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "1000",
      "highPrice": "500000",
      "offerCount": "1",
      "url": canonicalUrl || `${SITE_URL}/items/${product.slug}`,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": SITE_NAME
      }
    }
  };
}

export function getBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

export function getFAQSchema(faqs = []) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Programmatic SEO Quality Score (0-100)
 */
export function getSEOQualityScore(page = {}) {
  let score = 0;
  
  // 1. Technical & Meta (40 pts)
  if (page.title) {
    const len = page.title.length;
    if (len >= 30 && len <= 70) score += 20; // Perfect title length
    else if (len > 0) score += 10;
  }
  
  if (page.description) {
    const len = page.description.length;
    if (len >= 100 && len <= 170) score += 20; // Perfect meta description length
    else if (len > 0) score += 10;
  }
  
  // 2. Canonical & Robots (20 pts)
  if (page.canonical) score += 10;
  if (page.robots && page.robots.index !== false) score += 10;
  
  // 3. Schema & Semantics (20 pts)
  if (page.hasSchema) score += 10;
  if (page.hasBreadcrumbs) score += 10;
  
  // 4. Content & Interlinking (20 pts)
  if (page.hasInternalLinks) score += 10;
  if (page.hasContentBody && page.contentLength > 100) score += 10;
  
  return score;
}
