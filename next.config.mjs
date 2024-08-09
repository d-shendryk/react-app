/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
    REACT_APP_AUTH_TOKEN: process.env.REACT_APP_AUTH_TOKEN,
  },
};

export default nextConfig;
