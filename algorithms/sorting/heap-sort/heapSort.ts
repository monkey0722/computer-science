/**
 * Sorts an array in ascending order using the Heap Sort algorithm.
 * This implementation builds a max heap and repeatedly extracts the maximum element.
 *
 * @typeParam T - The type of elements in the array.
 * @param items - The array to sort (will not be modified).
 * @param comparator - An optional comparison function. Returns true if a should come before b.
 * @returns A new sorted array.
 *
 * @remarks
 * Time Complexity: O(n log n) in all cases (best, average, worst).
 * Space Complexity: O(n) for the copy of the array.
 * Heap Sort is not stable but has guaranteed O(n log n) performance.
 */
export function heapSort<T>(items: T[], comparator?: (a: T, b: T) => boolean): T[] {
  const defaultComparator = (a: T, b: T): boolean => a < b;
  const compare = comparator ?? defaultComparator;

  if (items.length < 2) {
    return [...items];
  }

  const arr = [...items];
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, compare);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // Heapify the reduced heap
    heapify(arr, i, 0, compare);
  }

  return arr;
}

/**
 * Maintains the max heap property for a subtree rooted at index i.
 *
 * @param arr - The array representing the heap.
 * @param heapSize - The size of the heap.
 * @param i - The index of the root of the subtree.
 * @param compare - The comparison function (returns true if a should come before b).
 */
function heapify<T>(arr: T[], heapSize: number, i: number, compare: (a: T, b: T) => boolean): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // For ascending order with compare(a, b) = a < b,
  // we want a max heap, so we check if child is greater than current largest
  if (left < heapSize && compare(arr[largest], arr[left])) {
    largest = left;
  }

  if (right < heapSize && compare(arr[largest], arr[right])) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, heapSize, largest, compare);
  }
}
