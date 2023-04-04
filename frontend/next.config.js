/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'my-twitter-clone.s3.ap-southeast-1.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
