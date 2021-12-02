import {jumpSearch} from './jumpSearch';

describe('jump-search', () => {
  const arr = [0, 2, 4, 7, 10, 23, 34, 40, 55, 68, 77, 90, 110];

  it('normal', () => {
    expect(jumpSearch(arr, 2)).toEqual(1);
    expect(jumpSearch(arr, 55)).toEqual(8);
    expect(jumpSearch(arr, 100)).toEqual(undefined);
  });
});
