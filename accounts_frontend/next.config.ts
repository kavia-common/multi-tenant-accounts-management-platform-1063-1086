import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Ensure env is exposed at build time
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
