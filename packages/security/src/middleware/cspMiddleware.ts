import { NextRequest, NextResponse } from 'next/server';
import { CSPSettingService } from '../services/cspSettings';
import { CacheOptions } from '../services/cache-client';
import { SiteResolver } from '@sitecore-content-sdk/core/site';
import { MiddlewareBase, MiddlewareBaseConfig } from '@sitecore-content-sdk/nextjs/middleware';
import { createGraphQLClientFactory } from '@constellation4sitecore-content-sdk/nextjs/graphql';

export declare type GraphQLRedirectsServiceConfig = {
  /**
   * Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
   */
  fetch?: typeof fetch;
};

export type CSPMiddlewareConfig = Omit<GraphQLRedirectsServiceConfig, 'fetch'> &
  MiddlewareBaseConfig &
  CacheOptions;

export class CSPMiddleware extends MiddlewareBase {
  private cspService: CSPSettingService;
  constructor(protected config: CSPMiddlewareConfig) {
    super(config);
    this.siteResolver = new SiteResolver(config.sites);
    this.cspService = new CSPSettingService({
      cacheEnabled: config.cacheEnabled,
      cacheTimeout: config.cacheTimeout,
      clientFactory: createGraphQLClientFactory(),
      fetch: fetch,
    });
  }

  handle = async (req: NextRequest, res: NextResponse): Promise<NextResponse> => {
    try {
      return await this.handler(req, res);
    } catch (error) {
      console.log('Redirect middleware failed:');
      console.log(error);
      return res || NextResponse.next();
    }
  };

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const response = res || NextResponse.next();

    if (this.disabled(req, response)) return response;
    // Prerender bypass if cookie is set when prerendering is on preview mode
    // More info: https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode
    if (req.cookies.get('__prerender_bypass')) return response;
    if (req.nextUrl.pathname == '/cspreports.xml') return response;
    const site = this.siteResolver.getByHost((req.headers.get('host') as string) ?? '');
    const forceCacheClear = req.nextUrl.search == '?forceCacheClear=true' ? true : false;
    const cspSettings = await this.cspService.getSettings(
      site.language,
      site.name,
      forceCacheClear
    );
    if (!cspSettings || !cspSettings.cspEnabled.value) return response;
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
      default-src ${cspSettings.defaultSrc.value};
      script-src ${cspSettings.scriptSrc.value.replace('{nonce}', nonce)};
      style-src ${cspSettings.styleSrc.value.replace('{nonce}', nonce)};
      img-src ${cspSettings.imgSrc.value};
      font-src ${cspSettings.fontSrc.value};
      frame-src ${cspSettings.frameSrc.value};
      connect-src ${cspSettings.connectSrc.value};
      object-src ${cspSettings.objectSrc.value};
      media-src ${cspSettings.mediaSrc.value};
      manifest-src ${cspSettings.manifestSrc.value};
      worker-src ${cspSettings.workerSrc.value};
      base-uri ${cspSettings.baseUri.value};
      form-action ${cspSettings.formAction.value};
      frame-ancestors ${cspSettings.frameAncestors.value};
      ${cspSettings.additionalPolicy.value};
  `;
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(req.headers);
    // Response will be provided if other middleware is run before us (e.g. redirects)
    requestHeaders.set('x-nonce', nonce);

    requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    return response;
  };
}
