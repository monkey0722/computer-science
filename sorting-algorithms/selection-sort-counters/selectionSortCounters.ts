import { CounterResults } from "../types";

export function selectionSortCounters<T>(items: Array<T>): CounterResults {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;

  for (let i = 0; i < items.length; i++) {
    countOuter++;
    let min = i;
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
