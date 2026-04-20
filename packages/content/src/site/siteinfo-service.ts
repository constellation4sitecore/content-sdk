import {
  SiteInfoService as SiteInfoServiceBase,
  SiteInfoServiceConfig,
} from '@sitecore-content-sdk/content/site';
import {
  CacheClient,
  FetchOptions,
  GraphQLClient,
  MemoryCacheClient,
} from '@sitecore-content-sdk/core';
import { gql } from 'graphql-request';
import { SiteInfoWithAttributes, SiteInfoWithVirtualFolder } from './models';
import debug from '../debug';

const siteQuery = gql`
  query {
    site {
      siteInfoCollection {
        name
        hostName: hostname
        language
        attributes {
          key
          value
        }
      }
    }
  }
`;

type GraphQLSiteInfoResponse = {
  site: {
    siteInfoCollection: SiteInfoWithAttributes[];
  };
};

export class SiteInfoService extends SiteInfoServiceBase {
  private siteGraphQLClient: GraphQLClient;
  private siteCache: CacheClient<SiteInfoWithVirtualFolder[]>;
  constructor(private readonly siteConfig: SiteInfoServiceConfig) {
    super(siteConfig);
    this.siteCache = this.getSiteCacheClient();
    this.siteGraphQLClient = this.getGraphQLClient();
  }

  /**
   * Gets cache client implementation
   * Override this method if custom cache needs to be used
   * @returns CacheClient instance
   */
  protected getSiteCacheClient(): CacheClient<SiteInfoWithVirtualFolder[]> {
    return new MemoryCacheClient<SiteInfoWithVirtualFolder[]>({
      cacheEnabled: this.siteConfig.cacheEnabled ?? true,
      cacheTimeout: this.siteConfig.cacheTimeout ?? 10,
    });
  }

  async fetchSiteInfoWithAttributes(fetchOptions?: FetchOptions) {
    const cachedResult = this.siteCache.getCacheValue(this.getSiteCacheKey());
    if (cachedResult) {
      return cachedResult;
    }
    if (process.env.SITECORE) {
      debug.virtualFolder('Skipping site information fetch (building on XM Cloud)');
      return [];
    }
    const response = await this.siteGraphQLClient.request<GraphQLSiteInfoResponse>(
      siteQuery,
      {},
      fetchOptions
    );
    const results = response?.site?.siteInfoCollection?.reduce<SiteInfoWithVirtualFolder[]>(
      (result, current) => {
        result.push({
          name: current.name,
          hostName: current.hostName,
          language: current.language,
          virtualFolder: this.removeTrailingSlash(
            current.attributes.find(
              (attribute: { key: string; value: string }) => attribute.key === 'virtualFolder'
            )?.value ?? ''
          ),
        });
        return result;
      },
      []
    );
    this.siteCache.setCacheValue(this.getSiteCacheKey(), results);
    return results;
  }

  private removeTrailingSlash(virtualFolder: string): string {
    return virtualFolder.replace(/\/$/, '');
  }

  private getSiteCacheKey(): string {
    return 'siteinfo-with-virtual-folder-service-cache';
  }
}
