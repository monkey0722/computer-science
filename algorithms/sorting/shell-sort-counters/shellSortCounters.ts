import {SortCounters} from '../types';

/**
 * Predefined gap sequence (Ciura's sequence) for Shell Sort.
 * It is relatively efficient for many practical cases.
 */
const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

/**
 * Performs Shell Sort on the given numeric array (in-place), counting various operations.
 *
 * @param items - The numeric array to be sorted.
 * @returns A SortCounters object
 */
export function shellSortCounters(items: number[]): SortCounters {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;

  for (let g = 0; g < gaps.length; g++) {
    const gap = gaps[g];
    for (let i = gap; i < items.length; i++) {
      countOuter++;
      const tmp = items[i];
      let last = i;
      // Shift elements until we find the correct position for 'tmp'
      for (let j = i; j >= gap && items[j - gap] > tmp; j -= gap) {
        countInner++;
        countSwap++;
        items[j] = items[j - gap];
        last -= gap;
      }
      items[last] = tmp;
    }
  }
  return {countOuter, countInner, countSwap};
}
