/* eslint-disable no-unused-expressions, @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

describe('defineConfig', () => {
  let defineConfigCoreStub: sinon.SinonStub;
  let defineConfigModule: any;
  const sandbox = sinon.createSandbox();
  const defaultConfig = () => ({});

  beforeEach(() => {
    defineConfigCoreStub = sandbox.stub();
    defineConfigModule = proxyquire('./define-config', {
      '@constellation4sitecore-content-sdk/content/config': { defineConfig: defineConfigCoreStub },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('config.virtualFolders', () => {
    describe('enabled', () => {
      it('should default to false', () => {
        defineConfigModule.defineConfig(defaultConfig());
        const resultConfig = defineConfigCoreStub.getCalls()[0].args[0];
        expect(resultConfig.virtualFolders.enabled).to.be.false;
      });

      it('should be able to override default value of enabled', () => {
        defineConfigModule.defineConfig({ ...defaultConfig(), virtualFolders: { enabled: true } });
        const resultConfig = defineConfigCoreStub.getCalls()[0].args[0];
        expect(resultConfig.virtualFolders.enabled).to.be.true;
      });
    });
  });

  describe('environment variable is set', () => {
    afterEach(() => {
      delete process.env.VIRTUAL_FOLDERS_ENABLED;
    });

    it('should return false when VIRTUAL_FOLDERS_ENABLED is set to false', () => {
      process.env.VIRTUAL_FOLDERS_ENABLED = 'false';

      defineConfigModule.defineConfig({
        ...defaultConfig(),
      });
      const resultConfig = defineConfigCoreStub.getCalls()[0].args[0];
      expect(resultConfig.virtualFolders.enabled).to.equal(false);
    });

    it('should return true when VIRTUAL_FOLDERS_ENABLED is set to true', () => {
      process.env.VIRTUAL_FOLDERS_ENABLED = 'true';

      defineConfigModule.defineConfig({
        ...defaultConfig(),
      });
      const resultConfig = defineConfigCoreStub.getCalls()[0].args[0];
      expect(resultConfig.virtualFolders.enabled).to.equal(true);
    });

    it('should return false when VIRTUAL_FOLDERS_ENABLED is set to any other value', () => {
      process.env.VIRTUAL_FOLDERS_ENABLED = 'some-other-value';

      defineConfigModule.defineConfig({
        ...defaultConfig(),
      });
      const resultConfig = defineConfigCoreStub.getCalls()[0].args[0];
      expect(resultConfig.virtualFolders.enabled).to.equal(false);
    });
  });
});
