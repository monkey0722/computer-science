import {insertionSortCounters} from './insertionSortCounters';

describe('insertion-sort-counters additional tests', () => {
  test('should handle an empty array', () => {
    expect(insertionSortCounters([])).toEqual({
      countOuter: 0,
      countInner: 0,
      countSwap: 0,
    });
  });
  test('should handle a single-element array', () => {
    expect(insertionSortCounters([42])).toEqual({
      countOuter: 0,
      countInner: 0,
      countSwap: 0,
    });
  });
  test('should handle an array with duplicate elements', () => {
    const arr = [3, 3, 1, 1, 2, 2];
    const result = insertionSortCounters(arr.slice());
    expect(result.countOuter).toBeGreaterThanOrEqual(1);
    expect(result.countInner).toBeGreaterThanOrEqual(0);
    expect(result.countSwap).toBeGreaterThanOrEqual(0);
  });
  test('should handle an already sorted array', () => {
    const sorted = [1, 2, 3, 4, 5];
    const result = insertionSortCounters(sorted.slice());
    expect(result.countSwap).toBe(0);
  });
});
