export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/*?*",        // Block query parameters (filter, sort, search)
                "/api/",       // Block internal APIs
            ]
        },

        sitemap: "https://haemoglobinstrip.com/sitemap.xml",
    };
}
