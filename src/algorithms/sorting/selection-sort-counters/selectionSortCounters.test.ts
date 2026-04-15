import {selectionSortCounters} from './selectionSortCounters';

describe('selectionSortCounters', () => {
  const randomArray = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
  const orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const reversedArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  test('normal', () => {
    expect(selectionSortCounters(randomArray.slice())).toEqual({
      countOuter: 10,
      countInner: 45,
      countSwap: 5,
    });
    expect(selectionSortCounters(orderedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 45,
      countSwap: 0,
    });
    expect(selectionSortCounters(reversedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 45,
      countSwap: 5,
    });
  });
  test('should handle an empty array', () => {
    const empty: number[] = [];
    const result = selectionSortCounters(empty.slice());
    expect(result).toEqual({
      countOuter: 0,
      countInner: 0,
      countSwap: 0,
    });
  });
  test('should handle a single-element array', () => {
    const single = [42];
    const result = selectionSortCounters(single.slice());
    expect(result).toEqual({
      countOuter: 1,
      countInner: 0,
      countSwap: 0,
    });
  });
  test('should handle duplicates', () => {
    const duplicates = [2, 3, 1, 2, 1];
    const sorted = duplicates.slice().sort((a, b) => a - b);
    const arrForCounting = duplicates.slice();

    selectionSortCounters(arrForCounting);
    expect(arrForCounting).toEqual(sorted);

    const {countOuter, countInner, countSwap} = selectionSortCounters(duplicates.slice());
    expect(countOuter).toBe(duplicates.length);
    expect(countInner).toBeGreaterThanOrEqual(0);
    expect(countSwap).toBeGreaterThanOrEqual(0);
  });
});
