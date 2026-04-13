/**
 * Sorts an array in ascending order using the Quick Sort algorithm (non-destructive).
 * This implementation picks a random pivot, partitions the array around it, and recurses.
 *
 * @typeParam T - The type of elements in the array.
 * @param items - The array to sort (will not be modified).
 * @param comparator - An optional comparison function. If not provided, the function will compare items using the built-in `<` or `>` operator.
 * @returns A new sorted array.
 *
 * @remarks
 ** Time Complexity: O(n log n) on average, but O(n^2) in the worst case.
 ** This is a non-in-place algorithm: it creates new arrays (via filter).
 ** To make it in-place, we'd need to partition the array without creating new arrays.
 */
export function quickSort<T>(items: T[], comparator?: (a: T, b: T) => boolean): T[] {
  const defaultComparator = (a: T, b: T): boolean => a < b;
  const compare = comparator ?? defaultComparator;

  if (items.length < 2) {
    return items;
  }

  // Choose a random pivot to improve average performance
  const pivotIndex = Math.floor(Math.random() * items.length);
  const pivot = items[pivotIndex];

  // Partition into lesser, equal, and greater
  const lesser: T[] = [];
  const equal: T[] = [];
  const greater: T[] = [];

  for (const item of items) {
    if (compare(item, pivot) && item !== pivot) {
      lesser.push(item);
    } else if (compare(pivot, item) && item !== pivot) {
      greater.push(item);
    } else {
      equal.push(item);
    }
  }

  // Recursively sort lesser and greater, then concatenate
  // The 'equal' array handles duplicates
  return [...quickSort(lesser, comparator), ...equal, ...quickSort(greater, comparator)];
}
