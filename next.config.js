/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], 
  },
  outputFileTracingIncludes: {
    '/api/create-checkout': ['./private/**/*'],
  },
};

module.exports = nextConfig;
