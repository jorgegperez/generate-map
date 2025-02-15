const nextConfig = {
  // For Turbopack setups
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
  },

  // For Next.js versions prior to v15
};

export default nextConfig;
