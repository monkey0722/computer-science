export function bubbleSortBasic<T>(items: Array<T>): Array<T> {
  for (let i = 0; i < items.length; i++) {
    for (let j = 1; j < items.length; j++) {
      if (items[j - 1] > items[j]) {
        [items[j - 1], items[j]] = [items[j], items[j - 1]];
      }
    }
  }
  return items;
}

export function bubbleSort<T>(items: Array<T>): Array<T> {
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i] > items[i + 1]) {
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
        swapped = true;
      }
    }
  }
  return items;
}
