/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Must be absolute path — silences the multi-lockfile workspace root warning
    root: process.cwd(),
  },
};

export default nextConfig;
