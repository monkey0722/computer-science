/**
 * Performs a linear search on the given array. If the value is found, it returns the index;
 * otherwise, it returns `undefined`.
 *
 * @typeParam T - The type of elements in the array.
 * @param arr - The array in which to search.
 * @param value - The value to search for.
 * @param comparator - An optional comparison function. If not provided, the function compares using `===`.
 * @returns The index of the found element or `undefined` if not found.
 */
export function linearSearch<T>(
  arr: T[],
  value: T,
  comparator?: (a: T, b: T) => boolean,
): number | undefined {
  const defaultComparator = (a: T, b: T): boolean => a === b;
  const compare = comparator ?? defaultComparator;
  for (let i = 0; i < arr.length; i++) {
    if (compare(arr[i], value)) {
      return i;
    }
  }
  return undefined;
}
