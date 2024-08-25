import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@common"] = path.join(process.cwd(), "src/app/components/common");

    config.resolve.alias["@variables"] = path.join(process.cwd(), "src/app/styles/variables.scss");

    return config;
  },

  async redirects() {
    return [
      {
        source: "/frontend-blog",
        destination: "/frontend-blog/posts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
