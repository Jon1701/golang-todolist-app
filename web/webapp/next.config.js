/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    { source: "/api/:path*", destination: "http://localhost:9000/api/:path*" },
  ],
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  eslint: {
    // Ignore linter in production builds.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
