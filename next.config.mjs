/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost", // per sviluppo
            port: "1337",
            pathname: "/uploads/**",
          },
          {
            protocol: "https",
            hostname: "tuodominio-strapi.it", // per produzione
            pathname: "/uploads/**",
          },
        ],
      },
};

export default nextConfig;
