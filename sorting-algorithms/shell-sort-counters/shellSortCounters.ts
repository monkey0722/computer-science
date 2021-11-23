import { CounterResults } from "../types";

const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

export function shellSortCounters(items: Array<number>): CounterResults {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;

  for (let g = 0; g < gaps.length; g++) {
    const gap = gaps[g];
    for (let i = gap; i < items.length; i++) {
      countOuter++;
      const tmp = items[i];
      let last = i;
      for (let j = i; j >= gap && items[j - gap] > tmp; j -= gap) {
        countInner++;
        countSwap++;
        items[j] = items[j - gap];
        last -= gap;
      }
      items[last] = tmp;
    }
  }
  return { countOuter, countInner, countSwap };
}
