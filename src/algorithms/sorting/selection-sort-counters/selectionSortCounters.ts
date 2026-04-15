import {SortCounters} from '../types';

/**
 * Performs Selection Sort on the given array, counting the number of outer loops,
 * inner comparisons, and swaps.
 *
 * @typeParam T - The type of elements in the array (must be comparable with `<`).
 * @param items - The array to be sorted in-place.
 * @returns A SortCounters object containing
 */
export function selectionSortCounters<T>(items: T[]): SortCounters {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;

  for (let i = 0; i < items.length; i++) {
    countOuter++;
    let minIndex = i;
    for (let j = i + 1; j < items.length; j++) {
      countInner++;
      if (items[j] < items[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      countSwap++;
      [items[i], items[minIndex]] = [items[minIndex], items[i]];
    }
  }
  return {countOuter, countInner, countSwap};
}
