import { LayoutServiceData } from '@sitecore-content-sdk/nextjs';
import { gql } from 'graphql-request';
import { GraphqlService } from '@constellation4sitecore-content-sdk/nextjs/graphql';

export class NavigationService extends GraphqlService {
  constructor(layoutData: LayoutServiceData) {
    super(layoutData);
  }

  async getNavLinks(navigationId: string): Promise<any | null> {
    const graphQLClient = this.getClient();
    const query = gql`
      query GetNavLinks($datasourceId: String!, $language: String!) {
        items: item(path: $datasourceId, language: $language) {
          id
          name
          children {
            results {
              ...navigationLink
              ...linkGroup
              ...imageNavigationLink
            }
          }
        }
      }
      fragment templateInfo on ItemTemplate {
        id
        name
      }
      fragment navigationLink on C__NavigationLink {
        id
        name
        displayName
        template {
          ...templateInfo
        }
        fields {
          name
          jsonValue
        }
        __typename
      }

      fragment linkGroup on C__LinkGroup {
        id
        name
        template {
          ...templateInfo
        }
        fields {
          name
          jsonValue
        }
        __typename
        hasChildren
      }

      fragment imageNavigationLink on ImageNavigationLink {
        id
        name
        template {
          ...templateInfo
        }
        fields {
          name
          jsonValue
        }
        __typename
        hasChildren
      }
    `;

    const result = (await graphQLClient.request(query, {
      datasourceId: navigationId,
      language: this.language,
    })) as any;

    return result.items.children;
  }
}
