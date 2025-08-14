import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pages/add',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
