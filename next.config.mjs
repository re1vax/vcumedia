/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages: fully static export, served at the domain root (vcumedia.com)
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
