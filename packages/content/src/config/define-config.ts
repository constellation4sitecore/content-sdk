import {
  DeepPartial,
  Constellation4SitecoreConfig,
  Constellation4SitecoreConfigInput,
} from './models';

/**
 * Provides default initial values for SitecoreConfig
 * @returns default config
 */
export const getFallbackConfig = (): Constellation4SitecoreConfig => ({
  virtualFolders: {
    enabled: process.env.VIRTUAL_FOLDERS_ENABLED?.toLowerCase() === 'true',
  },
});

/**
 * Deep merge utility that skips undefined or empty string values in the override.
 * @param {T} base base value
 * @param {DeepPartial<T>} [override] override value
 */
export function deepMerge<T>(base: T, override?: DeepPartial<T>): T {
  if (!override) return base;

  const result: T = { ...base };

  for (const key in override) {
    if (!Object.prototype.hasOwnProperty.call(override, key)) continue;

    const typedKey = key as keyof T;
    const baseValue = base[typedKey];
    const overrideValue = override[typedKey];

    // Skip undefined and empty string overrides
    if (overrideValue === undefined || overrideValue === '') {
      continue;
    }

    if (
      typeof overrideValue === 'object' &&
      overrideValue !== null &&
      !Array.isArray(overrideValue) &&
      Object.getPrototypeOf(overrideValue) === Object.prototype
    ) {
      result[typedKey] = deepMerge(baseValue, overrideValue);
    } else {
      result[typedKey] = overrideValue as T[typeof typedKey];
    }
  }

  return result;
}

/**
 * Resolves constellation4sitecore config based on base config and overrides
 * @param {Constellation4SitecoreConfig} base base constellation4sitecore config object
 * @param {Constellation4SitecoreConfigInput} override override constellation4sitecore config object
 * @returns resolved Constellation4SitecoreConfig object
 */
const resolveConfig = (
  base: Constellation4SitecoreConfig,
  override: Constellation4SitecoreConfigInput
): Constellation4SitecoreConfig => {
  const result: Constellation4SitecoreConfig = deepMerge(base, override);

  return result;
};

/**
 * Accepts a Constellation4SitecoreConfigInput object and returns full constellation4sitecore configuration
 * @param {Constellation4SitecoreConfigInput} config override values to be written over default config settings
 * @returns {Constellation4SitecoreConfigInput} full constellation4sitecore configuration to use in application
 * @public
 */
export const defineConfig = (
  config: Constellation4SitecoreConfigInput
): Constellation4SitecoreConfig => {
  const resolvedConfig = resolveConfig(getFallbackConfig(), config);

  return resolvedConfig;
};
