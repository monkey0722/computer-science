export function quickSort<T>(items: Array<T>): Array<T> {
  if (items.length < 2) {
    return items;
  }

  const pivot: T = items[0];
  const lesser = items.filter((item) => item < pivot);
  const greater = items.filter((item) => item > pivot);

  return [...quickSort(lesser), pivot, ...quickSort(greater)];
}
