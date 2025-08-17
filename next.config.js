/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath: '/wahlflorian.com',
    assetPrefix: '/wahlflorian.com/',
}

module.exports = nextConfig 
