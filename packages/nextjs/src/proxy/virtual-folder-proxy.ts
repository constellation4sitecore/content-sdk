import { ProxyBase, ProxyBaseConfig } from '@sitecore-content-sdk/nextjs/proxy';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { SiteInfoWithVirtualFolder } from '@constellation4sitecore-content-sdk/content/site';
import { Constellation4SitecoreConfig } from '@constellation4sitecore-content-sdk/content/config';

export type VirtualFolderProxyConfig = ProxyBaseConfig & {
  virtualFolders: SiteInfoWithVirtualFolder[];
  c4sConfig: Constellation4SitecoreConfig;
};

export class VirtualFolderProxy extends ProxyBase {
  constructor(private readonly proxyConfig: VirtualFolderProxyConfig) {
    super(proxyConfig);
  }

  async handle(req: NextRequest, res: NextResponse<unknown>): Promise<NextResponse<unknown>> {
    if (!this.proxyConfig.c4sConfig.virtualFolders.enabled) {
      return res;
    }
    const virtualFolderSites = this.proxyConfig.virtualFolders.filter(
      (virtualFolder) => virtualFolder.virtualFolder && virtualFolder.virtualFolder != '/'
    );
    const virtualFolder = virtualFolderSites.find((virtualFolder) =>
      req.nextUrl.pathname.startsWith(virtualFolder.virtualFolder)
    );
    if (virtualFolder) {
      const pathname = req.nextUrl.pathname.replace(virtualFolder.virtualFolder, '');
      return NextResponse.rewrite(
        new URL(`/${virtualFolder.name}/${virtualFolder.language}${pathname}`, req.url)
      );
    }
    return res;
  }
}
