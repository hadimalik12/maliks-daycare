import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const configuredBasePath = process.env.SITE_BASE_PATH;
const basePath =
  configuredBasePath === '/'
    ? ''
    : configuredBasePath ?? '';

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: 'export' as const } : {}),
  basePath,
  // A custom domain serves the site from its root. Only use the GitHub
  // repository subpath when SITE_BASE_PATH has explicitly been configured.
  assetPrefix: isGitHubPages && basePath ? `${basePath}/assets-v2` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
