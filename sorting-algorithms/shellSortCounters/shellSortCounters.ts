import { CounterResult } from "../types";

const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

export function shellSortCounters<T>(items: Array<T>): CounterResult {
  let countOuter: number = 0;
  let countInner: number = 0;
  let countSwap: number = 0;

  for (let g = 0; g < gaps.length; g++) {
    const gap: number = gaps[g];
    for (let i = gap; i < items.length; i++) {
      countOuter++;
      const tmp: T = items[i];
      let last: number = i;
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
