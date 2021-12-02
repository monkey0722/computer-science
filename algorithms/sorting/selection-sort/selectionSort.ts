export function selectionSort<T>(items: Array<T>): Array<T> {
  for (let i = 0; i < items.length; i++) {
    let min: number = i;
    for (let j: number = i + 1; j < items.length; j++) {
      if (items[j] < items[min]) {
        min = j;
      }
    }
    if (i !== min) {
      [items[i], items[min]] = [items[min], items[i]];
    }
  }
  return items;
}
