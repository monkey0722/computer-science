/**
 * An object to track the number of outer calls, inner comparisons, and "swaps" (or writes).
 */
export interface MergeSortCounters {
  countOuter: number;
  countInner: number;
  countSwap: number;
}

/**
 * Merges two sorted arrays (Top-down approach) while incrementing counters.
 *
 * @param left - A sorted array of numbers.
 * @param right - A sorted array of numbers.
 * @param counters - An object to track outer, inner, and swap counts.
 * @returns A new sorted array containing elements from left and right.
 *
 * @remarks
 ** `countInner` is incremented every time we compare the first elements of left and right.
 ** There is no actual "swap" in top-down mergesort, so `countSwap` might remain 0 if you are counting swaps strictly. If you want to count element copies, you can increment here.
 */
function mergeCountersTopDown(
  left: number[],
  right: number[],
  counters: MergeSortCounters,
): number[] {
  const array: number[] = [];

  while (left.length && right.length) {
    // Each comparison increments countInner
    counters.countInner++;
    if (left[0] < right[0]) {
      array.push(left.shift()!);
    } else {
      array.push(right.shift()!);
    }
    // If you want to count element "copies" to the merged array, increment here:
    // counters.countSwap++;
  }
  return array.concat(left, right);
}

/**
 * Recursively sorts an array using the top-down merge sort approach,
 * while tracking the number of outer calls, inner comparisons, and swaps.
 *
 * @param items - The array of numbers to sort.
 * @param counters - An optional counters object. If not provided, a new one will be created.
 * @returns A new sorted array of numbers.
 *
 * @remarks
 ** This function does NOT modify the original array (non-destructive).
 ** countOuter` is incremented for each call to mergeSortCountersTopDown.
 */
export function mergeSortCountersTopDown(
  items: number[],
  counters?: MergeSortCounters,
): {sortedArray: number[]; counters: MergeSortCounters} {
  // If counters not provided, initialize a new one
  const localCounters = counters ?? {
    countOuter: 0,
    countInner: 0,
    countSwap: 0,
  };

  localCounters.countOuter++;

  if (items.length < 2) {
    return {sortedArray: items, counters: localCounters};
  }

  const middle: number = Math.floor(items.length / 2);
  const leftItems: number[] = items.slice(0, middle);
  const rightItems: number[] = items.slice(middle);

  const leftResult = mergeSortCountersTopDown(leftItems, localCounters);
  const rightResult = mergeSortCountersTopDown(rightItems, localCounters);

  const merged = mergeCountersTopDown(
    leftResult.sortedArray,
    rightResult.sortedArray,
    localCounters,
  );
  return {sortedArray: merged, counters: localCounters};
}

/**
 * Iteratively sorts an array using the bottom-up merge sort approach,
 * while tracking counters.
 *
 * @param items - The array of numbers to sort. (in-place sort)
 * @param counters - An optional counters object. If not provided, a new one will be created.
 * @returns The same array (sorted), plus the updated counters.
 *
 * @remarks
 ** This function modifies the original array in-place.
 ** `countOuter` is incremented each time we increase the merge step.
 ** `countInner` is incremented each time we merge a subarray.
 ** `countSwap` is incremented each time we write back into the items array.
 */
export function mergeSortCountersBottomUp(
  items: number[],
  counters?: MergeSortCounters,
): {sortedArray: number[]; counters: MergeSortCounters} {
  const localCounters = counters ?? {
    countOuter: 0,
    countInner: 0,
    countSwap: 0,
  };

  let step = 1;
  while (step < items.length) {
    localCounters.countOuter++;
    let left = 0;
    while (left + step < items.length) {
      localCounters.countInner++;

      mergeCountersBottomUp(items, left, step, localCounters);
      left += step * 2;
    }
    step *= 2;
  }
  return {sortedArray: items, counters: localCounters};
}

/**
 * Merges two subarrays in-place for the bottom-up approach, incrementing swap counts.
 *
 * @param items - The array to modify in place.
 * @param left - The start index of the left subarray.
 * @param step - The size of the subarray to merge.
 * @param counters - The counters to update.
 */
function mergeCountersBottomUp(
  items: number[],
  left: number,
  step: number,
  counters: MergeSortCounters,
): void {
  const tmp: number[] = [];
  const right: number = left + step;
  const last: number = Math.min(left + step * 2 - 1, items.length - 1);

  let moveLeft: number = left;
  let moveRight: number = right;

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
    counters.countSwap++; // we are overwriting items[j] with tmp[j]
    items[j] = tmp[j];
  }
}
