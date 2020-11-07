import { CounterResult } from "../types";

export function selectionSortCounters<T>(items: Array<T>): CounterResult {
  let countOuter: number = 0;
  let countInner: number = 0;
  let countSwap: number = 0;

  for (let i: number = 0; i < items.length; i++) {
    countOuter++;
    let min: number = i;
    for (let j = i + 1; j < items.length; j++) {
      countInner++;
      if (items[j] < items[min]) {
        min = j;
      }
    }
    if (i !== min) {
      countSwap++;
      [items[i], items[min]] = [items[min], items[i]];
    }
  }
  return { countOuter, countInner, countSwap };
}
