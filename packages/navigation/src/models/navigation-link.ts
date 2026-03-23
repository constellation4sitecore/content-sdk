import { Field } from '@sitecore-content-sdk/content/layout';
import { LinkField } from '@sitecore-content-sdk/nextjs';

export interface NavigationLink {
  link: LinkField;
  useThisDisplayName: Field<boolean>;
}
