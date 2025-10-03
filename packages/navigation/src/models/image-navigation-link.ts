import { ImageField } from '@sitecore-content-sdk/nextjs';
import { NavigationLink } from './navigation-link';

export interface ImageNavigationLink extends NavigationLink {
  image: ImageField;
}
