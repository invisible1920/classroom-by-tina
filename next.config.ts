import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkkijrohzjbdynxvwkmg.supabase.co",
      },
    ],
  },
};

export default nextConfig;