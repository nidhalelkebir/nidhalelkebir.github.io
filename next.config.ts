import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY || "";
const repositoryName = repository.split("/")[1] || "";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const basePath =
  isGithubActions && !isUserOrOrgPage && repositoryName
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  poweredByHeader: false,
};

export default nextConfig;
