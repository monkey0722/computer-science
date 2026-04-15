/**
 * Sorts an array in ascending order using the Insertion Sort algorithm.
 *
 * @typeParam T - The type of elements in the array.
 * @param items - An array of elements to sort.
 * @param comparator - An optional comparison function. If not provided, elements will be compared using the built-in `>` operator.
 * @returns The sorted array (in-place modification).
 *
 * @remarks
 ** Time Complexity: O(n^2) in the worst case.
 ** This implementation is stable as long as the comparison is consistent.
 */
export function insertionSort<T>(items: T[], comparator?: (a: T, b: T) => boolean): T[] {
  const defaultComparator = (a: T, b: T): boolean => a > b;
  const compare = comparator ?? defaultComparator;
  // Typically, insertion sort starts i at 1
  for (let i = 1; i < items.length; i++) {
    const tmp = items[i];
    let j = i - 1;
    // Compare using 'compare(items[j], tmp)'.
    // If 'true', it means items[j] should move to the right.
    while (j >= 0 && compare(items[j], tmp)) {
      items[j + 1] = items[j];
      j--;
    }
    items[j + 1] = tmp;
  }
  return items;
}
