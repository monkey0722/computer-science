import {SortCounters} from '../types';

/**
 * A variant of Insertion Sort that counts the number of outer loop iterations,
 * inner loop comparisons (or shifts), and swaps.
 *
 * @typeParam T - The type of array elements (must be comparable).
 * @param items - The array to be sorted in-place.
 * @param comparator - An optional comparison function. If not provided, the built-in `>` operator is used.
 * @returns {SortCounters} - An object containing
 */
export function insertionSortCounters<T>(
  items: T[],
  comparator?: (a: T, b: T) => boolean,
): SortCounters {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;

  const defaultComparator = (a: T, b: T): boolean => a > b;
  const compare = comparator ?? defaultComparator;
  for (let i = 1; i < items.length; i++) {
    countOuter++;
    const tmp = items[i];
    let j = i - 1;
    // Shift elements to the right while they are "greater than" tmp
    while (j >= 0 && compare(items[j], tmp)) {
      countInner++;
      countSwap++;
      items[j + 1] = items[j];
      j--;
    }
    items[j + 1] = tmp;
  }
  return {countOuter, countInner, countSwap};
}
