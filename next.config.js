// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/items",
        permanent: true,
      },
      {
        source: "/products/:slug*",
        destination: "/items/:slug*",
        permanent: true,
      },
    ];
  },
};


export default nextConfig;