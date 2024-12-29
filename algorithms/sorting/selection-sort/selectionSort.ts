/**
 * Sorts an array in ascending order using the Selection Sort algorithm (in-place).
 *
 * @typeParam T - The type of elements in the array.
 * @param items - The array to be sorted (will be modified in-place).
 * @param comparator - An optional comparison function. If not provided,
 *                     the function compares using the built-in `<` operator.
 *                     Return `true` if `a` should come before `b`.
 * @returns The same array, now sorted in ascending order (or according to the comparator).
 *
 * @remarks
 * - Time Complexity: O(n^2) in the average and worst cases.
 * - Selection Sort finds the minimum element (considering ascending order) from the unsorted part
 *   and puts it at the beginning of the unsorted part.
 * - Since it always swaps once per outer loop iteration, it performs fewer writes than other
 *   O(n^2) sorts like Bubble Sort or Insertion Sort.
 * - The array is sorted in-place, meaning the original array is modified.
 */
export function selectionSort<T>(items: T[], comparator?: (a: T, b: T) => boolean): T[] {
  const defaultComparator = (a: T, b: T): boolean => a < b;
  const compare = comparator ?? defaultComparator;
  for (let i = 0; i < items.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < items.length; j++) {
      if (compare(items[j], items[minIndex])) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      [items[i], items[minIndex]] = [items[minIndex], items[i]];
    }
  }
  return items;
}
