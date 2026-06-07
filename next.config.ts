// Trigger Vercel rebuild with the correct main branch codebase
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/estate",
        destination: "/ims-estate-empire",
        permanent: true,
      },
      {
        source: "/estate/:path*",
        destination: "/ims-estate-empire/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
