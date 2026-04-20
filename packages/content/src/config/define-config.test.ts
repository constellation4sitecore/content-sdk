/* eslint-disable no-unused-expressions, @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { deepMerge, defineConfig, getFallbackConfig } from './define-config';
import { Constellation4SitecoreConfigInput } from './models';

describe('define-config', () => {
  const mockConfig: Constellation4SitecoreConfigInput = {
    virtualFolders: { enabled: true },
  };

  it('merges config from sitecore.config with default values', () => {
    const config = defineConfig(mockConfig);
    // virtual folders
    expect(config.virtualFolders.enabled).to.equal(mockConfig.virtualFolders?.enabled);
  });

  it('applies fallback virtual folders timeouts when values are falsy', () => {
    const zeroTimeout = { ...mockConfig, virtualFolders: { enabled: false } };
    const fallback = getFallbackConfig();

    let cfg = defineConfig(zeroTimeout);
    expect(cfg.virtualFolders.enabled).to.equal(fallback.virtualFolders.enabled);
  });

  describe('getFallbackConfig', () => {
    it('populates env variables in fallback config', () => {
      process.env.VIRTUAL_FOLDERS_ENABLED = 'true';

      const cfg = getFallbackConfig();
      expect(cfg.virtualFolders.enabled).to.equal(true);
    });

    it('falls back to defaults when env variables are absent', () => {
      delete process.env.VIRTUAL_FOLDERS_ENABLED;

      const cfg = getFallbackConfig();
      expect(cfg.virtualFolders.enabled).to.equal(false);
    });
  });

  describe('deepMerge', () => {
    it('keeps base value when override is empty or undefined', () => {
      expect(deepMerge({ deep: { test: 'base' } }, { deep: { test: '' } })).to.deep.equal({
        deep: { test: 'base' },
      });

      expect(deepMerge({ deep: { test: 'base' } }, { deep: { test: undefined } })).to.deep.equal({
        deep: { test: 'base' },
      });
    });

    it('merges nested objects correctly', () => {
      class Test {
        a = true;
      }
      class BaseTest extends Test {
        b = true;
      }

      const base = {
        deep: {
          fn: () => false,
          class: new BaseTest(),
          array: [4, 5, 6],
          number: 5,
          string: '5',
        },
        boolean: true,
      };

      const override = {
        deep: {
          fn: () => true,
          class: new Test(),
          nullValue: null,
          array: [1, 2, 3],
          number: 10,
          string: '10',
        },
        boolean: false,
      };

      expect(deepMerge(base, override)).to.deep.equal(override);
    });
  });

  describe('validateConfig server-side behaviour', () => {
    let originalWindow: any;

    beforeEach(() => {
      originalWindow = (global as any).window;
      delete (global as any).window; // simulate server
    });

    afterEach(() => {
      if (originalWindow !== undefined) (global as any).window = originalWindow;
    });
  });
});
