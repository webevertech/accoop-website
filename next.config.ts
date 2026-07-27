import type { NextConfig } from "next";

const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Prevent the site from being framed (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak full URLs to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down powerful browser APIs we don't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Dev server is commonly opened via 127.0.0.1 as well as localhost;
  // Turbopack blocks dev/HMR requests from origins not in this list.
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  images: {
    unoptimized: true, // Disable image optimization for Hostinger compatibility
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90], // Whitelist every quality value used by <Image>
  },
  async headers() {
    return [{ source: "/((?!_next/).*)", headers: securityHeaders }];
  },
};

export default nextConfig;
