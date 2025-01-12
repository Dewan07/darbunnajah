import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  serverExternalPackages: ["bcryptjs", "nodemailer"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  }
  
};

export default nextConfig;
