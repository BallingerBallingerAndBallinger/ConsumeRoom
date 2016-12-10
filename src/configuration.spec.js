/* globals it expect describe */

describe('configuration.js', () => {
  it('loads and does not faceroll', () => {
    expect(require('./configuration.js')).toBeTruthy();
  });
});
