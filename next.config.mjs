/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "m3dlab.onrender.com", // per produzione
            pathname: "/uploads/**",
          },
        ],
      },
};

export default nextConfig;
