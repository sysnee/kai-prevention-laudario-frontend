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
    // webpack: (config) => {
    //   config.resolve.alias = {
    //     ...config.resolve.alias,
    //     '@mui/styled-engine': '@mui/styled-engine-sc',
    //   };
    //   return config;
    // },
  };
  
  export default nextConfig;
