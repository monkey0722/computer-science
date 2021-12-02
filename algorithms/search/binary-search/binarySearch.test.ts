import {binarySearch} from './binarySearch';

describe('binary-search', () => {
  const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('normal', () => {
    expect(binarySearch(colors, 1)).toEqual(0);
    expect(binarySearch(colors, 8)).toEqual(7);
    expect(binarySearch(colors, 17)).toEqual(undefined);
  });
});
