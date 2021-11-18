import babelConfig from '../';

describe('babel-config', () => {
  it('Should return default config', () => {
    expect(babelConfig).toEqual({});
  });
});
