/**
 * Sorts an array of numbers using the Shell Sort algorithm (in-place),
 * with a predefined gap sequence (Ciura's sequence).
 *
 * @param items - The array of numbers to sort (modified in-place).
 * @returns The same array, now sorted in ascending order.
 */
const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

export function shellSort(items: number[]): number[] {
  for (let g = 0; g < gaps.length; g++) {
    const gap = gaps[g];
    // Perform a gapped insertion sort
    for (let i = gap; i < items.length; i++) {
      const tmp = items[i];
      let j = i;
      // Shift earlier gap-sorted elements up until the correct location is found
      while (j >= gap && items[j - gap] > tmp) {
        items[j] = items[j - gap];
        j -= gap;
      }
      // Put tmp in its correct location
      items[j] = tmp;
    }
  }
  return items;
}
