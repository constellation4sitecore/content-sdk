import { Field, ImageField } from '@sitecore-content-sdk/nextjs';

export type PageSocialMetadataType = {
  browserTitle: Field<string>;
  metaDescription: Field<string>;
  socialThumbnail: ImageField;
  twitterCardType: Field<string>;
  twitterSite: Field<string>;
  twitterCreator: Field<string>;
  twitterInheritValues: Field<boolean>;
  siteUrl: string;
};
