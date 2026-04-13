import {SortCounters} from '../types';

/**
 * A basic Bubble Sort implementation that counts outer loop, inner loop, and swaps.
 * @returns {SortCounters} - An object containing countOuter, countInner, and countSwap.
 */
export function bubbleSortCountersBasic<T>(items: Array<T>): SortCounters {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;

  for (let i = 0; i < items.length; i++) {
    countOuter++;
    for (let j = 1; j < items.length; j++) {
      countInner++;
      if (items[j - 1] > items[j]) {
        countSwap++;
        [items[j - 1], items[j]] = [items[j], items[j - 1]];
      }
    }
  }
  return {countOuter, countInner, countSwap};
}

/**
 * An optimized Bubble Sort implementation with a swapped flag, plus counters.
 * Note that we changed the inner loop condition to prevent out-of-bounds checks.
 *
 * @returns {SortCounters} - An object containing countOuter, countInner, and countSwap.
 */
export function bubbleSortCounters<T>(items: Array<T>): SortCounters {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;
  let swapped = true;

  while (swapped) {
    countOuter++; // Each pass in the while loop
    swapped = false;
    // Use `items.length - 1` to avoid accessing items[i + 1] when i = items.length - 1
    for (let i = 0; i < items.length - 1; i++) {
      countInner++;
      if (items[i] > items[i + 1]) {
        countSwap++;
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
        swapped = true;
      }
    }
  }
  return {countOuter, countInner, countSwap};
}
