import { SiteInfo } from '@sitecore-content-sdk/content/site';

export type SiteInfoWithAttributes = {
  name: string;
  hostName: string;
  language: string;
  attributes: {
    key: string;
    value: string;
  }[];
};

export type SiteInfoWithVirtualFolder = SiteInfo & {
  virtualFolder: string;
};
