/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "https://m3dlab.onrender.com",
            pathname: "/uploads/**",
          },
        ],
      },
};

export default nextConfig;
