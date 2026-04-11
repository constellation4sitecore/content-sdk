import {
  DeepRequired,
  defineConfig as defineConfigCore,
  Constellation4SitecoreConfigInput as Constellation4SitecoreConfigInputCore,
} from '@constellation4sitecore-content-sdk/content/config';

/**
 * Provides default NextJs initial values from env variables for SitecoreConfig
 * @param {SitecoreConfigInput} config optional override values to be written over default config settings
 * @returns default nextjs input config
 */
export const getNextFallbackConfig = (
  config?: Constellation4SitecoreConfigInput
): Constellation4SitecoreConfigInput => {
  return {
    ...config,

    virtualFolders: {
      enabled:
        process.env.VIRTUAL_FOLDERS_ENABLED != undefined
          ? process.env.VIRTUAL_FOLDERS_ENABLED?.toLowerCase() === 'true'
          : config?.virtualFolders?.enabled ?? false,
    },
  };
};

/**
 * Type to be used as config input in constellation4sitecore.config
 * @public
 */
export type Constellation4SitecoreConfigInput = Constellation4SitecoreConfigInputCore;

/**
 * Final constellation4sitecore config type used at runtime Every property should be populated, either from constellation4sitecore.config or built-in fallback values
 * @public
 */
export type Constellation4SitecoreConfig = DeepRequired<Constellation4SitecoreConfigInput>;

/**
 * Accepts a SitecoreConfigInput object and returns full sitecore configuration
 * @param {SitecoreConfigInput} config override values to be written over default config settings
 * @returns {SitecoreConfig} full sitecore configuration to use in application
 * @public
 */
export const defineConfig = (
  config?: Constellation4SitecoreConfigInput
): Constellation4SitecoreConfig => {
  return defineConfigCore(getNextFallbackConfig(config)) as Constellation4SitecoreConfig;
};
