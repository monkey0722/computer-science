import {shellSortCounters} from './shellSortCounters';

describe('shellSortCounters additional tests', () => {
  test('should handle an empty array', () => {
    const empty: number[] = [];
    const result = shellSortCounters(empty.slice());
    expect(result).toEqual({countOuter: 0, countInner: 0, countSwap: 0});
  });
  test('should handle a single-element array', () => {
    const single = [42];
    const result = shellSortCounters(single.slice());
    expect(result).toEqual({countOuter: 0, countInner: 0, countSwap: 0});
  });
  test('should handle duplicate elements', () => {
    const duplicates = [2, 3, 1, 2, 1];
    const sortedArray = duplicates.slice().sort((a, b) => a - b);
    const arrToSort = duplicates.slice();
    const counters = shellSortCounters(arrToSort);
    expect(arrToSort).toEqual(sortedArray);
    expect(counters.countOuter).toBeGreaterThanOrEqual(1);
  });
});
