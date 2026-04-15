import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prefer this app directory when a parent folder has another lockfile.
    root: process.cwd(),
  },
};

export default nextConfig;
