/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clinicatemplum.com.br",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
