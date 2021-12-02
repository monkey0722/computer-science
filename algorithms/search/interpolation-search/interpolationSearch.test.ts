import {interpolationSearch} from './interpolationSearch';

describe('interpolation-search', () => {
  const arr = [1, 4, 6, 7, 9, 12, 15, 16, 17, 23, 25, 26, 27, 31];

  it('normal', () => {
    expect(interpolationSearch(arr, 9)).toEqual(4);
    expect(interpolationSearch(arr, 31)).toEqual(13);
    expect(interpolationSearch(arr, 42)).toEqual(undefined);
  });
});
