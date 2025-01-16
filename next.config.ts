import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  serverExternalPackages: ["bcryptjs", "nodemailer"],
  images: {
    remotePatterns:[
      { hostname: 'dummyjson.com' },
      { hostname: 'lh3.googleusercontent.com' }
    ]

  }
  
};

export default nextConfig;
