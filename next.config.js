// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// export default nextConfig


// next.config.mjs
// contentlayer = require('next-contentlayer')

const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = withContentlayer(nextConfig)