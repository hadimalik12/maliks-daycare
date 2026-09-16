import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const configuredBasePath = process.env.SITE_BASE_PATH;
const basePath =
  configuredBasePath === '/'
    ? ''
    : configuredBasePath ?? (isGitHubPages ? '/maliks-daycare' : '');

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: 'export' as const } : {}),
  basePath,
  assetPrefix: isGitHubPages ? `${basePath}/assets-v2` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
