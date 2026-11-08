/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: { unoptimized: true },
  devIndicators: false,
  experimental: { cpus: 2 },
  turbopack: { root: __dirname },
};
