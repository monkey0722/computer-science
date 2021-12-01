const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

export function shellSort(items: Array<number>): Array<number> {
  for (let g = 0; g < gaps.length; g++) {
    const gap = gaps[g];
    for (let i = gap; i < items.length; i++) {
      const tmp = items[i];
      let last = i;
      for (let j = i; j >= gap && items[j - gap] > tmp; j -= gap) {
        items[j] = items[j - gap];
        last -= gap;
      }
      items[last] = tmp;
    }
  }
  return items;
}
