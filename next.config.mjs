/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Le immagini erano prima ospitate sul backend Strapi (remotePatterns
    // verso m3dlab.onrender.com / railway.app). Ora sono file locali serviti
    // da /public/uploads, quindi non serve più alcun pattern remoto.
    unoptimized: true,
  },
};

export default nextConfig;

