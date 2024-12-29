/**
 * Performs an interpolation search on a sorted numeric array and returns the index of the key.
 * If the key is not found, the function returns `undefined`.
 *
 * @param arr - A sorted array of numbers.
 * @param key - The value to search for.
 * @returns The index of the found value, or `undefined` if not found.
 *
 * @remarks
 * Interpolation search is generally faster than a standard binary search for uniformly
 * distributed data, but can degrade to O(n) in the worst case.
 */
export function interpolationSearch(arr: number[], key: number): number | undefined {
  if (arr.length === 0) return undefined;

  let low = 0;
  let high = arr.length - 1;

  while (low <= high && key >= arr[low] && key <= arr[high]) {
    // Avoiding cases where the denominator becomes 0.
    if (arr[high] === arr[low]) {
      return arr[low] === key ? low : undefined;
    }
    const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (key - arr[low]));
    if (arr[pos] === key) {
      return pos;
    }
    if (arr[pos] < key) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return undefined;
}
