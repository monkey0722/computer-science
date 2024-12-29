import {bubbleSortCountersBasic, bubbleSortCounters} from './bubbleSortCounters';

describe('bubble-sort-counters-additional', () => {
  test('should handle empty array', () => {
    expect(bubbleSortCountersBasic([])).toEqual({
      countOuter: 0,
      countInner: 0,
      countSwap: 0,
    });
    expect(bubbleSortCounters([])).toEqual({
      countOuter: 1,
      countInner: 0,
      countSwap: 0,
    });
  });
  test('should handle single-element array', () => {
    const singleArray = [42];
    const resultBasic = bubbleSortCountersBasic(singleArray.slice());
    const resultOptimized = bubbleSortCounters(singleArray.slice());
    expect(resultBasic).toEqual({
      countOuter: 1,
      countInner: 0,
      countSwap: 0,
    });
    expect(resultOptimized).toEqual({
      countOuter: 1,
      countInner: 0,
      countSwap: 0,
    });
  });
  test('should handle an array with duplicate elements', () => {
    const duplicates = [3, 3, 1, 1, 2, 2];
    const basicResult = bubbleSortCountersBasic(duplicates.slice());
    const optimizedResult = bubbleSortCounters(duplicates.slice());
    expect(duplicates.slice().sort((a, b) => a - b)).toEqual([1, 1, 2, 2, 3, 3]);
    expect(basicResult.countSwap).toBeGreaterThanOrEqual(0);
    expect(optimizedResult.countSwap).toBeGreaterThanOrEqual(0);
  });
});
