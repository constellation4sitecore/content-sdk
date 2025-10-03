import { expect } from 'chai';
import { hasContent } from './fields';

describe('fields', () => {
  it('should have a hasContent function', () => {
    expect(hasContent).to.be.a('function');
  });
});
