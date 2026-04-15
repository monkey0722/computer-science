/**
 * Sorts an array in ascending order using the basic Bubble Sort algorithm.
 * This version loops through the entire array multiple times (O(n^2)).
 *
 * @typeParam T - The type of array elements.
 * @param items - The array to be sorted.
 * @param comparator - An optional comparison function. If not provided, the function will compare items using the built-in `>` operator.
 * @returns The sorted array (in-place modification).
 */
export function bubbleSortBasic<T>(items: T[], comparator?: (a: T, b: T) => boolean): T[] {
  const defaultComparator = (a: T, b: T): boolean => a > b;
  const compare = comparator ?? defaultComparator;
  for (let i = 0; i < items.length; i++) {
    for (let j = 1; j < items.length; j++) {
      if (compare(items[j - 1], items[j])) {
        [items[j - 1], items[j]] = [items[j], items[j - 1]];
      }
    }
  }
  return items;
}

/**
 * Sorts an array in ascending order using an optimized Bubble Sort algorithm.
 * This version uses a while loop with a `swapped` flag and stops when no swaps occur.
 * Time complexity is still O(n^2) in the worst case, but it can terminate earlier
 * if the array gets sorted before all passes are completed.
 *
 * @typeParam T - The type of array elements.
 * @param items - The array to be sorted.
 * @param comparator - An optional comparison function. If not provided, the function will compare items using the built-in `>` operator.
 * @returns The sorted array (in-place modification).
 */
export function bubbleSort<T>(items: T[], comparator?: (a: T, b: T) => boolean): T[] {
  const defaultComparator = (a: T, b: T): boolean => a > b;
  const compare = comparator ?? defaultComparator;

  let swapped = true;
  let n = items.length; // This n can be used to narrow down the range of items to be sorted as the final element is determined.

  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (compare(items[i], items[i + 1])) {
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
        swapped = true;
      }
    }
    // Since the last element is fixed with one pass, the search range is narrowed.
    n--;
  }
  return items;
}
