import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // Allows all images inside the TMDB path
      },
    ],
  },
};

export default nextConfig;
