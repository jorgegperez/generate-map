/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Turbopack setups
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
  },
  // Disable static optimization for protected routes
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
