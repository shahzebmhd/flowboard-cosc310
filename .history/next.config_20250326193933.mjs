/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    env: {
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
        NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
    },
};

export default nextConfig;
