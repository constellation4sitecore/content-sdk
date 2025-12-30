import { GraphqlService } from '@constellation4sitecore-content-sdk/nextjs/graphql';
import { LayoutServiceData } from '@sitecore-content-sdk/core/layout';
import { gql } from 'graphql-request';
import { AnalyticScriptItem, AnalyticScripts } from '../models';

export class AppAnalyticsService extends GraphqlService {
  private sitecoreRootPath: string;
  constructor(appName: string, site: string, locale: string) {
    const layoutData = {
      sitecore: {
        context: {
          language: locale,
        },
      },
    };
    super(layoutData as LayoutServiceData);
    this.sitecoreRootPath = this.buildSitecoreRootPath(appName, site);
  }
  private buildSitecoreRootPath(appName: string, siteInfo: string): string {
    return `/sitecore/content/${appName}/${siteInfo}`;
  }

  async getAnalyticsScripts(): Promise<AnalyticScripts> {
    const headScripts = await this.getAnalyticsScriptPart(
      `${this.sitecoreRootPath}/Analytics/Head Scripts`
    );
    const topBodyScripts = await this.getAnalyticsScriptPart(
      `${this.sitecoreRootPath}/Analytics/Body Top Scripts`
    );
    const bottomBodyScripts = await this.getAnalyticsScriptPart(
      `${this.sitecoreRootPath}/Analytics/Body Bottom Scripts`
    );
    return { headScripts, topBodyScripts, bottomBodyScripts };
  }

  async getAnalyticsScriptPart(folderId: string): Promise<AnalyticScriptItem[]> {
    const client = this.getClient();

    const query = gql`
      query GetAnalyticsScripts($datasourceId: String!, $language: String!) {
        item: item(path: $datasourceId, language: $language) {
          children {
            results {
              id
              template {
                id
              }
              fields {
                name
                jsonValue
              }
            }
          }
        }
      }
    `;

    type AnalyticResult = {
      item: {
        children: {
          results: AnalyticScriptItem[];
        };
      };
    };

    const result = (await client.request(query, {
      datasourceId: folderId,
      language: this.language,
    })) as AnalyticResult;

    return result?.item?.children?.results || [];
  }
}
