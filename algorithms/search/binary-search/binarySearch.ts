/**
 * Performs a binary search on a sorted array and returns the index of the specified value.
 * If the value is not found, the function returns `undefined`.
 *
 * @typeParam T - The type of elements in the array.
 * @param arr - A sorted array in which to perform the search.
 * @param value - The value to search for.
 * @param comparator - Optional comparison function. If not provided, the function attempts to compare elements using the built-in `<` and `>` operators.
 * @returns The index of the found element, or `undefined` if the element is not found.
 */
export function binarySearch<T>(
  arr: T[],
  value: T,
  comparator?: (a: T, b: T) => number,
): number | undefined {
  let low = 0;
  let high = arr.length - 1;

  // Default comparator for types that can be compared with < and >
  const defaultComparator = (a: T, b: T): 0 | 1 | -1 => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const compare = comparator ?? defaultComparator;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = arr[mid];
    const cmp = compare(element, value);
    if (cmp === 0) {
      return mid;
    } else if (cmp > 0) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return undefined;
}
