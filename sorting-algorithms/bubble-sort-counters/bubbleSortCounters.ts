import { CounterResults } from "../types";

export function bubbleSortCountersBasic<T>(items: Array<T>): CounterResults {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;

  for (let i = 0; i < items.length; i++) {
    countOuter++;
    for (let j = 1; j < items.length; j++) {
      countInner++;
      if (items[j - 1] > items[j]) {
        countSwap++;
        [items[j - 1], items[j]] = [items[j], items[j - 1]];
      }
    }
  }
  return { countOuter, countInner, countSwap };
}

export function bubbleSortCounters<T>(items: Array<T>): CounterResults {
  let countOuter = 0;
  let countInner = 0;
  let countSwap = 0;
  let swapped = true;

  while (swapped) {
    countOuter++;
    swapped = false;
    for (let i = 0; i < items.length; i++) {
      countInner++;
      if (items[i] > items[i + 1]) {
        countSwap++;
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
        swapped = true;
      }
    }
  }
  return { countOuter, countInner, countSwap };
}
