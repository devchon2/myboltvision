// @ts-check
/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'bolt-vision.vercel.app'],
  },
  // Configuration expérimentale
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
  },
  sassOptions: {
    includePaths: ['./styles'],
  },
  webpack: (config, { isServer }) => {
    // Support pour les bibliothèques spécifiques
    config.resolve.fallback = {
      fs: false,
      crypto: false,
      path: false,
      os: false,
    };

    // Ajout de polyfills si nécessaire
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      };
    }

    // Gérer les imports Remix pendant la transition
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
  // Rediriger les routes Remix vers les nouvelles routes Next.js pendant la migration
  async redirects() {
    return [
      {
        source: '/routes/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/api.check-env-key',
        destination: '/api/check-env-key',
        permanent: true,
      },
      {
        source: '/api.health',
        destination: '/api/health',
        permanent: true,
      },
      {
        source: '/api.system.app-info',
        destination: '/api/system/app-info',
        permanent: true,
      },
      {
        source: '/api.system.git-info',
        destination: '/api/system/git-info',
        permanent: true,
      },
    ];
  },
  // Configuration d'environnement pour la migration
  env: {
    MIGRATION_MODE: 'active',
    NEXT_PUBLIC_IS_MIGRATED: 'true',
  },
};

export default nextConfig;
