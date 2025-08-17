/** @type {import('next').NextConfig} */
const basePath = '';

const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath,
    assetPrefix: basePath ? `${basePath}/` : undefined
};

module.exports = nextConfig;
