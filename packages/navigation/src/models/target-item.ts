import { Field } from '@sitecore-content-sdk/nextjs';

export interface BasePageFields {
  NavigationTitle: Field<string>;
  teaser: Field<string>;
}

export type BaseTargetItem<T extends BasePageFields> = {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: T;
  bestLinkText: string;
};

export type TargetItem = BaseTargetItem<BasePageFields>;
