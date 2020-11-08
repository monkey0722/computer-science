import { CounterResult } from "../types";

export function insertionSortCounters<T>(items: Array<T>): CounterResult {
  let countOuter: number = 0;
  let countInner: number = 0;
  let countSwap: number = 0;

  for (let i = 0; i < items.length; i++) {
    countOuter++;
    const tmp: T = items[i];
    let j: number = i - 1;
    while (j >= 0 && items[j] > tmp) {
      countInner++;
      countSwap++;
      items[j + 1] = items[j];
      j--;
    }
    items[j + 1] = tmp;
  }
  return { countOuter, countInner, countSwap };
}
