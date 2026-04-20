/* eslint-disable no-unused-expressions, @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import nextjs, { NextRequest, NextResponse } from 'next/server';
import type { VirtualFolderProxyConfig } from './virtual-folder-proxy';
import type { SiteInfoWithVirtualFolder } from '@constellation4sitecore-content-sdk/content/site';

class StubProxyBase {
  constructor(_config: unknown) {}
}

const { VirtualFolderProxy } = proxyquire.noCallThru()('./virtual-folder-proxy', {
  '@sitecore-content-sdk/nextjs/proxy': {
    ProxyBase: StubProxyBase,
  },
});

function createRequest(pathname: string, origin = 'http://localhost:3000'): NextRequest {
  const fullUrl = `${origin}${pathname}`;
  return {
    url: fullUrl,
    nextUrl: {
      pathname,
      origin,
      search: '',
      href: fullUrl,
    },
  } as NextRequest;
}

function minimalConfig(
  partial: Partial<VirtualFolderProxyConfig> & {
    virtualFolders?: SiteInfoWithVirtualFolder[];
    c4sConfig?: VirtualFolderProxyConfig['c4sConfig'];
  }
): VirtualFolderProxyConfig {
  return {
    sites: [],
    enabled: true,
    useCookieResolution: () => false,
    defaultHostname: '',
    virtualFolders: partial.virtualFolders ?? [],
    c4sConfig: partial.c4sConfig ?? { virtualFolders: { enabled: true } },
    ...partial,
  } as VirtualFolderProxyConfig;
}

describe('VirtualFolderProxy', () => {
  let rewriteStub: sinon.SinonStub;

  afterEach(() => {
    rewriteStub?.restore();
  });

  describe('when virtual folders are disabled in c4s config', () => {
    it('returns the incoming response without calling rewrite', async () => {
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite');
      const proxy = new VirtualFolderProxy(
        minimalConfig({
          c4sConfig: { virtualFolders: { enabled: false } },
          virtualFolders: [
            {
              name: 'SiteA',
              language: 'en',
              hostName: 'a.test',
              virtualFolder: '/vf',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/vf/page');
      const res = NextResponse.next();
      const out = await proxy.handle(req, res);

      expect(rewriteStub.called).to.be.false;
      expect(out).to.equal(res);
    });
  });

  describe('when virtual folders are enabled', () => {
    it('returns the incoming response when no site virtual folder matches the path', async () => {
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite');
      const proxy = new VirtualFolderProxy(
        minimalConfig({
          virtualFolders: [
            {
              name: 'SiteA',
              language: 'en',
              hostName: 'a.test',
              virtualFolder: '/blog',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/news/article');
      const res = NextResponse.next();
      const out = await proxy.handle(req, res);

      expect(rewriteStub.called).to.be.false;
      expect(out).to.equal(res);
    });

    it('ignores sites whose virtual folder is root "/"', async () => {
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite');
      const proxy = new VirtualFolderProxy(
        minimalConfig({
          virtualFolders: [
            {
              name: 'RootSite',
              language: 'en',
              hostName: 'root.test',
              virtualFolder: '/',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/anything');
      const res = NextResponse.next();
      const out = await proxy.handle(req, res);

      expect(rewriteStub.called).to.be.false;
      expect(out).to.equal(res);
    });

    it('ignores sites with a falsy virtual folder', async () => {
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite');
      const proxy = new VirtualFolderProxy(
        minimalConfig({
          virtualFolders: [
            {
              name: 'NoVf',
              language: 'en',
              hostName: 'x.test',
              virtualFolder: '',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/page');
      const res = NextResponse.next();
      const out = await proxy.handle(req, res);

      expect(rewriteStub.called).to.be.false;
      expect(out).to.equal(res);
    });

    it('rewrites path to /{siteName}/{language}{remainder}', async () => {
      const rewritten = NextResponse.next();
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(rewritten);

      const proxy = new VirtualFolderProxy(
        minimalConfig({
          virtualFolders: [
            {
              name: 'MySite',
              language: 'da-DK',
              hostName: 'mysite.test',
              virtualFolder: '/dk',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/dk/products/widget');
      const res = NextResponse.next();
      const out = await proxy.handle(req, res);

      expect(rewriteStub.callCount).to.equal(1);
      const rewriteArg = rewriteStub.firstCall.args[0] as URL;
      expect(rewriteArg.pathname).to.equal('/MySite/da-DK/products/widget');

      expect(out).to.equal(rewritten);
    });

    it('rewrites when the path equals the virtual folder (no trailing segment)', async () => {
      const rewritten = NextResponse.next();
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(rewritten);

      const proxy = new VirtualFolderProxy(
        minimalConfig({
          virtualFolders: [
            {
              name: 'Shop',
              language: 'en',
              hostName: 'shop.test',
              virtualFolder: '/shop',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/shop');
      const res = NextResponse.next();
      await proxy.handle(req, res);

      const rewriteArg = rewriteStub.firstCall.args[0] as URL;
      expect(rewriteArg.pathname).to.equal('/Shop/en');
    });

    it('uses the first matching site in config order', async () => {
      const rewritten = NextResponse.next();
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(rewritten);

      const proxy = new VirtualFolderProxy(
        minimalConfig({
          virtualFolders: [
            {
              name: 'First',
              language: 'en',
              hostName: 'first.test',
              virtualFolder: '/a',
            } as SiteInfoWithVirtualFolder,
            {
              name: 'Second',
              language: 'fr',
              hostName: 'second.test',
              virtualFolder: '/a/b',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/a/b/c');
      await proxy.handle(req, NextResponse.next());

      const rewriteArg = rewriteStub.firstCall.args[0] as URL;
      expect(rewriteArg.pathname).to.equal('/First/en/b/c');
    });

    it('preserves request base URL for the rewritten URL', async () => {
      const rewritten = NextResponse.next();
      rewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(rewritten);

      const proxy = new VirtualFolderProxy(
        minimalConfig({
          virtualFolders: [
            {
              name: 'S',
              language: 'en',
              hostName: 's.test',
              virtualFolder: '/vf',
            } as SiteInfoWithVirtualFolder,
          ],
        })
      );

      const req = createRequest('/vf/x', 'https://example.org:8080');
      await proxy.handle(req, NextResponse.next());

      const rewriteArg = rewriteStub.firstCall.args[0] as URL;
      expect(rewriteArg.origin).to.equal('https://example.org:8080');
      expect(rewriteArg.pathname).to.equal('/S/en/x');
    });
  });
});
