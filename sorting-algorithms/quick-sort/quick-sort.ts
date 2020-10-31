export function quickSort(items: number[]): number[] {
  if (items.length < 2) {
    return items;
  }

  const pivot: number = items[0];
  const lesser = items.filter((item) => item < pivot);
  const greater = items.filter((item) => item > pivot);

  return [...quickSort(lesser), pivot, ...quickSort(greater)];
}
