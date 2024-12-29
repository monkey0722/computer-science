import {mergeSortCountersTopDown, mergeSortCountersBottomUp} from './mergeSortCounters';

describe('mergeSortCounters', () => {
  const randomArray = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
  const orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const reversedArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  test('TopDown - random array', () => {
    const {sortedArray, counters} = mergeSortCountersTopDown(randomArray.slice());
    expect(sortedArray).toEqual(orderedArray);
    expect(counters.countOuter).toBeGreaterThan(0);
    expect(counters.countInner).toBeGreaterThan(0);
  });
  test('TopDown - ordered array', () => {
    const {sortedArray, counters} = mergeSortCountersTopDown(orderedArray.slice());
    expect(sortedArray).toEqual(orderedArray);
    expect(counters.countOuter).toBeGreaterThan(0);
  });
  test('TopDown - reversed array', () => {
    const {sortedArray, counters} = mergeSortCountersTopDown(reversedArray.slice());
    expect(sortedArray).toEqual(orderedArray);
    expect(counters.countOuter).toBeGreaterThan(0);
  });
  test('BottomUp - random array', () => {
    const {sortedArray, counters} = mergeSortCountersBottomUp(randomArray.slice());
    expect(sortedArray).toEqual(orderedArray);
    expect(counters.countOuter).toBeGreaterThan(0);
    expect(counters.countInner).toBeGreaterThan(0);
    expect(counters.countSwap).toBeGreaterThan(0);
  });
  test('BottomUp - reversed array', () => {
    const {sortedArray, counters} = mergeSortCountersBottomUp(reversedArray.slice());
    expect(sortedArray).toEqual(orderedArray);
    expect(counters.countOuter).toBeGreaterThan(0);
    expect(counters.countInner).toBeGreaterThan(0);
    expect(counters.countSwap).toBeGreaterThan(0);
  });
  test('BottomUp - empty array', () => {
    const {sortedArray, counters} = mergeSortCountersBottomUp([]);
    expect(sortedArray).toEqual([]);
    expect(counters.countOuter).toBe(0);
    expect(counters.countInner).toBe(0);
    expect(counters.countSwap).toBe(0);
  });
});
