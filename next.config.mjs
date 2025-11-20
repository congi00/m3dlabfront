/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "m3dlab-production.up.railway.app",
            pathname: "/uploads/**",
          },
        ],
      },
};

export default nextConfig;
