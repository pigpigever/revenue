import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';


const isAnalyze = process.env.ANALYZE === 'true';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/v4/:path*',
        destination: 'https://api.finmindtrade.com/api/v4/:path*',
      },
    ];
  },
};

export default isAnalyze
  ? withBundleAnalyzer({enabled: true})(nextConfig)
  : nextConfig;
