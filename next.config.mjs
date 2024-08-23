import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export const BASE_PATH = process.env.NODE_ENV === "production" ? "/project-squid" : "";

// @ts-check
export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const commonConfig = {
    output: "export",
    images: {
      unoptimized: true,
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    /**
     * @type {import('next').NextConfig}
     */
    const devConfig = {
      ...commonConfig,
    };

    return devConfig;
  }

  /**
   * @type {import('next').NextConfig}
   */
  const prodConfig = {
    ...commonConfig,
    basePath: BASE_PATH
  };
  return prodConfig;
};
