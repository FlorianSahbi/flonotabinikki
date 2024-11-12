import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gotokyo.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
