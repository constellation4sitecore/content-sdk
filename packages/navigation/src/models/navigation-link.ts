import { Field } from '@sitecore-content-sdk/core/layout';
import { LinkField } from '@sitecore-content-sdk/nextjs';

export interface NavigationLink {
  link: LinkField;
  useThisDisplayName: Field<boolean>;
}
