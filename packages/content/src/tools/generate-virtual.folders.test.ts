import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { constants } from '@sitecore-content-sdk/core';
import { GenerateSitesConfig } from './generate-virtual-folders';
import { SiteInfoWithVirtualFolder, SiteInfoService } from '../site';
import { SitecoreConfigInput, defineConfig } from '@sitecore-content-sdk/content/config';
import proxyquire from 'proxyquire';
import nock from 'nock';
import { Constellation4SitecoreConfig } from '../config';

const { ERROR_MESSAGES } = constants;

const defaultSite: SiteInfoWithVirtualFolder = {
  name: 'defaultSite',
  hostName: '*',
  language: 'en',
  virtualFolder: '',
};

const mockConfig: SitecoreConfigInput = {
  api: {
    edge: {
      contextId: 'context-id',
      clientContextId: 'client-id',
    },
  },
  defaultSite: defaultSite.name,
  defaultLanguage: defaultSite.language,
  multisite: {
    enabled: true,
  },
};

describe('generateVirtualFolders', () => {
  let ensurePathExistsStub: sinon.SinonStub;
  let fsWriteFileSyncStub: sinon.SinonStub;
  let consoleErrorStub: sinon.SinonStub;
  let generateSites: any;

  beforeEach(() => {
    ensurePathExistsStub = sinon.stub();
    fsWriteFileSyncStub = sinon.stub(fs, 'writeFileSync');
    sinon.stub(console, 'log');
    consoleErrorStub = sinon.stub(console, 'error');

    const generateSitesModule = proxyquire('./generate-virtual-folders', {
      '@sitecore-content-sdk/core/node-tools': { ensurePathExists: ensurePathExistsStub },
    });
    generateSites = generateSitesModule.generateVirtualFolders;
  });

  afterEach(() => {
    sinon.restore();
    nock.cleanAll();
  });

  const runCommand = (generateSitesConfig: GenerateSitesConfig) => {
    const scConfig = defineConfig(mockConfig);
    const generate = generateSites(generateSitesConfig);
    return generate({ scConfig });
  };

  it('should write site info to the default path when destinationPath is not provided', async () => {
    const config: GenerateSitesConfig = {
      c4sConfig: {
        virtualFolders: {
          enabled: true,
        },
      },
    };
    sinon.stub(SiteInfoService.prototype, 'fetchSiteInfoWithAttributes').resolves([defaultSite]);

    await runCommand(config);

    const expectedPath = path.resolve('.sitecore/virtual-folders.json');
    expect(ensurePathExistsStub.calledWith(expectedPath)).to.be.true;
    expect(
      fsWriteFileSyncStub.calledWith(
        expectedPath,
        JSON.stringify([defaultSite, defaultSite], null, 2),
        {
          encoding: 'utf8',
        }
      )
    ).to.be.true;
  });

  it('should write site info to the provided destinationPath', async () => {
    const destinationPath = 'custom/path/sites.json';
    const c4sConfig: Constellation4SitecoreConfig = {
      virtualFolders: {
        enabled: true,
      },
    };
    const config: GenerateSitesConfig = {
      destinationPath: destinationPath,
      c4sConfig: c4sConfig,
    };
    sinon.stub(SiteInfoService.prototype, 'fetchSiteInfoWithAttributes').resolves([defaultSite]);

    await runCommand(config);

    const expectedPath = path.resolve(destinationPath);
    expect(ensurePathExistsStub.calledWith(expectedPath)).to.be.true;
    expect(
      fsWriteFileSyncStub.calledWith(
        expectedPath,
        JSON.stringify([defaultSite, defaultSite], null, 2),
        {
          encoding: 'utf8',
        }
      )
    ).to.be.true;
  });

  it('should fetch site information when virtual folders are enabled', async () => {
    const fetchedSites: SiteInfoWithVirtualFolder[] = [
      { name: 'site1', hostName: 'site1.com', language: 'de/DE', virtualFolder: '' },
      { name: 'site2', hostName: 'site2.com', language: 'da/DK', virtualFolder: '/site2' },
    ];
    sinon.stub(SiteInfoService.prototype, 'fetchSiteInfoWithAttributes').resolves(fetchedSites);

    const config: GenerateSitesConfig = {
      c4sConfig: {
        virtualFolders: {
          enabled: true,
        },
      },
    };

    await runCommand(config);

    const expectedPath = path.resolve('.sitecore/virtual-folders.json');
    expect(ensurePathExistsStub.calledWith(expectedPath)).to.be.true;

    expect(
      fsWriteFileSyncStub.calledWith(expectedPath, JSON.stringify(fetchedSites, null, 2), {
        encoding: 'utf8',
      })
    ).to.be.true;
  });

  it('should log an error when fetching site information fails', async () => {
    sinon
      .stub(SiteInfoService.prototype, 'fetchSiteInfoWithAttributes')
      .rejects(new Error('Fetch error'));
    const config: GenerateSitesConfig = {
      c4sConfig: {
        virtualFolders: {
          enabled: true,
        },
      },
    };

    try {
      await runCommand(config);
      expect.fail('Expected function to throw an error');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.include('Fetch error');
    }

    expect(
      consoleErrorStub.calledWith(
        chalk.red(`Failed to fetch site information. ${ERROR_MESSAGES.CONTACT_SUPPORT}`)
      )
    ).to.be.true;
  });
});
