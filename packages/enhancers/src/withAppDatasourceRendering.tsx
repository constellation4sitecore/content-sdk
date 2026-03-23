import { ComponentRendering } from '@sitecore-content-sdk/content/layout';
import { Page } from '@sitecore-content-sdk/nextjs';
import React, { ComponentType, ReactElement } from 'react';

export interface WithAppDatasourceRenderingProps {
  rendering: ComponentRendering;
  fields?: unknown;
  dataFields?: unknown;
  page: Page;
}

export function withAppDatasourceRendering() {
  return function withDatasourceRenderingHoc<
    ComponentProps extends WithAppDatasourceRenderingProps
  >(
    componentOrMap: ComponentType<ComponentProps> | { [key: string]: ComponentType<ComponentProps> }
  ) {
    return function WithDatasourceRendering(props: ComponentProps): ReactElement {
      const { page } = props;
      const siteName: string = page.layout.sitecore.context.site?.name ?? 'default';

      let InjectedComponent: ComponentType<ComponentProps>;

      if (typeof componentOrMap === 'function') {
        InjectedComponent = componentOrMap;
      } else {
        InjectedComponent = componentOrMap[siteName] ?? componentOrMap['default'];
      }

      if (!props.rendering.dataSource) {
        return React.createElement(
          InjectedComponent,
          Object.assign({}, props, { fields: page.layout.sitecore.route?.fields })
        );
      }

      return React.createElement(InjectedComponent, props);
    };
  };
}
