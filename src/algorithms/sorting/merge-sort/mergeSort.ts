/**
 * Merges two sorted arrays into one sorted array (Top-down merge).
 * This function is used by mergeSortTopDown.
 *
 * @param left - A sorted array of numbers.
 * @param right - A sorted array of numbers.
 * @returns A new array containing all elements from left and right in sorted order.
 */
function mergeTopDown(left: number[], right: number[]): number[] {
  const array: number[] = [];
  // While both arrays have elements
  while (left.length && right.length) {
    // If left[0] is smaller or equal, shift from left, otherwise from right
    if (left[0] <= right[0]) {
      array.push(left.shift()!);
    } else {
      array.push(right.shift()!);
    }
  }
  // Concat remaining elements (only one of them will have leftovers)
  return array.concat(left, right);
}

/**
 * Recursively sorts an array using the top-down merge sort approach.
 *
 * @param items - An array of numbers to sort. The original array is NOT modified.
 * @returns A new sorted array (ascending).
 *
 * @remarks
 ** Time complexity: O(n log n).
 ** This is a stable sort, assuming the comparison uses `<=` for ties.
 */
export function mergeSortTopDown(items: number[]): number[] {
  if (items.length < 2) {
    return items;
  }
  const middle = Math.floor(items.length / 2);
  const leftItems = items.slice(0, middle);
  const rightItems = items.slice(middle);
  return mergeTopDown(mergeSortTopDown(leftItems), mergeSortTopDown(rightItems));
}

/**
 * Merges the subarrays [left..left+step-1] and [left+step..left+2*step-1] in-place.
 *
 * @param items - The array of numbers to partially merge (in-place).
 * @param left - The starting index of the left subarray.
 * @param step - The size of the subarray to merge.
 *
 * @remarks
 ** This function modifies `items` directly.
 */
function mergeBottomUp(items: number[], left: number, step: number): void {
  const tmp: number[] = [];
  const right: number = left + step;
  const last = Math.min(left + step * 2 - 1, items.length - 1);

  let moveLeft = left;
  let moveRight = right;

  for (let i = left; i <= last; i++) {
    if ((items[moveLeft] <= items[moveRight] || moveRight > last) && moveLeft < right) {
      tmp[i] = items[moveLeft];
      moveLeft++;
    } else {
      tmp[i] = items[moveRight];
      moveRight++;
    }
  }

  for (let j = left; j <= last; j++) {
    items[j] = tmp[j];
  }
}

/**
 * Iteratively sorts an array using the bottom-up merge sort approach.
 *
 * @param items - An array of numbers to sort. The array is sorted in-place.
 * @returns The same array, now sorted in ascending order.
 *
 * @remarks
 ** Time complexity: O(n log n).
 ** This is a stable sort, assuming the comparison uses `<=` for ties.
 ** `step` starts from 1, doubling each time until it covers the entire array.
 */
export function mergeSortBottomUp(items: number[]): number[] {
  let step = 1;
  while (step < items.length) {
    let left = 0;
    while (left + step < items.length) {
      mergeBottomUp(items, left, step);
      left += step * 2;
    }
    step *= 2;
  }
  return items;
}
