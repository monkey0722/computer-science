export function insertionSort<T>(items: Array<T>): Array<T> {
  for (let i = 0; i < items.length; i++) {
    const tmp: T = items[i];
    let j: number = i - 1;
    while (j >= 0 && items[j] > tmp) {
      items[j + 1] = items[j];
      j--;
    }
    items[j + 1] = tmp;
  }
  return items;
}
