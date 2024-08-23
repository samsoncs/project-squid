import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

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
    basePath: "/project-squid",
    assetPrefix: "/project-squid"
  };
  return prodConfig;
};
