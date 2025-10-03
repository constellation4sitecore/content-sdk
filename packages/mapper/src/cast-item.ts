import { ComponentRendering, Item } from '@sitecore-content-sdk/core/layout';

export function castItem<T>(item: Item | ComponentRendering): T | null {
  return item.fields as T;
}
