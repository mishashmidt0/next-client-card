/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3080',
                pathname: '/uploads/**',
            },
        ],
    },
}

module.exports = nextConfig
