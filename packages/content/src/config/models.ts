/**
 * Utility type to make every property in a type required
 * @public
 */
export type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>;
}>;

/**
 * Utility type to make all properties in a type optional, recursively
 * @internal
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Type to be used as config input in sitecore.config
 * @public
 */
export type Constellation4SitecoreConfigInput = {
  /**
   * Settings for virtual folders functionality
   */
  virtualFolders?: {
    /**
     * Enable virtual folders
     * @default true
     */
    enabled?: boolean;
  };
};

/**
 * Final Sitecore config type used at runtime.
 * Every property is populated, either from sitecore.config or fallback values.
 * @public
 */
export type Constellation4SitecoreConfig = DeepRequired<Constellation4SitecoreConfigInput>;
