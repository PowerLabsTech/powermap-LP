import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/landing-static",
  async redirects() {
    return [{ source: "/", destination: "/welcome", permanent: false }];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
