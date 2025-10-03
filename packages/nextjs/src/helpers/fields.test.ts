import { expect } from 'chai';
import { hasContent } from './fields';

describe('fields', () => {
  describe('hasContent', () => {
    const mockContext = {
      page: {
        mode: {
          isEditing: false,
          name: 'normal' as any,
          designLibrary: { isVariantGeneration: false },
          isNormal: true,
          isPreview: false,
          isDesignLibrary: false,
        },
        layout: {} as any,
        locale: 'en' as any,
      },
    };

    it('should have a hasContent function', () => {
      expect(hasContent).to.be.a('function');
    });

    it('should return true if the field has content', () => {
      expect(hasContent(mockContext, { value: { href: 'https://www.google.com' } })).to.be.true;
    });

    it('should return false if the field has no content', () => {
      expect(hasContent(mockContext, { value: { href: '' } })).to.be.false;
    });

    it('should return true if the field has no content and is editing', () => {
      expect(
        hasContent(
          {
            ...mockContext,
            page: { ...mockContext.page, mode: { ...mockContext.page.mode, isEditing: true } },
          },
          { value: { href: '' } }
        )
      ).to.be.true;
    });
  });
});
