/**
 * Performs a jump search on a sorted numeric array and returns the index of the specified value.
 * If the value is not found, the function returns `undefined`.
 *
 * @param arr - A sorted array of numbers.
 * @param x - The value to search for.
 * @returns The index of the found value, or `undefined` if the value is not found.
 *
 * @remarks
 * Jump search is an algorithm that allows searching in O(√n) time by jumping in fixed-size steps,
 * then doing a linear search within the block where the value could exist.
 */
export function jumpSearch(arr: number[], x: number): number | undefined {
  const n = arr.length;
  if (n === 0) return undefined;

  // Ensure step is at least 1 to avoid infinite loops for very small n
  let step = Math.max(1, Math.floor(Math.sqrt(n)));
  let prev = 0;

  // Jump forward in blocks until we overshoot or find a block that might contain 'x'
  while (arr[Math.min(step, n) - 1] < x) {
    prev = step;
    step += Math.max(1, Math.floor(Math.sqrt(n))); // step should never be 0
    if (prev >= n) {
      return undefined;
    }
  }
  // Linear search within the identified block
  while (arr[prev] < x) {
    prev++;
    if (prev === Math.min(step, n)) {
      return undefined;
    }
  }
  // Check if we found the value
  return arr[prev] === x ? prev : undefined;
}
