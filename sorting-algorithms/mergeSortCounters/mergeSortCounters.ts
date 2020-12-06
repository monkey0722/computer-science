// sample of arrays to merge-sort-counters
const randomArray: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
const orderedArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const reversedArray: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

let countOuter: number = 0;
let countInner: number = 0;
let countSwap: number = 0;

const resetCounters = (): void => {
  countOuter = 0;
  countInner = 0;
  countSwap = 0;
};

/**
 * Top-down implementation
 */
function mergeCountersTopDown(left: number[], right: number[]): number[] {
  const array: number[] = [];
  let nonFirst: number | undefined;

  while (left.length && right.length) {
    countInner++;
    left[0] < right[0] ? (nonFirst = left.shift()) : (nonFirst = right.shift());
    if (nonFirst) {
      array.push(nonFirst);
    }
  }
  return array.concat(left.slice()).concat(right.slice());
}

export function mergeSortCountersTopDown(items: number[]): number[] {
  countOuter++;
  if (items.length < 2) {
    return items;
  }

  const middle: number = Math.floor(items.length / 2);
  const leftItems: number[] = items.slice(0, middle);
  const rightItems: number[] = items.slice(middle);

  return mergeCountersTopDown(
    mergeSortCountersTopDown(leftItems),
    mergeSortCountersTopDown(rightItems)
  );
}

mergeSortCountersTopDown(randomArray.slice()); // => outer: 19 inner: 24 swap: 0
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersTopDown(orderedArray.slice()); // => outer: 19 inner: 15 swap: 0
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersTopDown(reversedArray.slice()); // => outer: 19 inner: 19 swap: 0
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

/**
 * Bottom-up implementation
 */
function mergeSortCountersBottomUp(items: number[]): number[] {
  let step = 1;
  while (step < items.length) {
    countOuter++;
    let left = 0;
    while (left + step < items.length) {
      countInner++;
      mergeCountersBottomUp(items, left, step);
      left += step * 2;
    }
    step *= 2;
  }
  return items;
}

function mergeCountersBottomUp(
  items: number[],
  left: number,
  step: number
): void {
  const tmp: number[] = [];
  const right: number = left + step;
  const last: number = Math.min(left + step * 2 - 1, items.length - 1);

  let moveLeft: number = left;
  let moveRight: number = right;

  for (let i = left; i <= last; i++) {
    if (
      (items[moveLeft] <= items[moveRight] || moveRight > last) &&
      moveLeft < right
    ) {
      tmp[i] = items[moveLeft];
      moveLeft++;
    } else {
      tmp[i] = items[moveRight];
      moveRight++;
    }
  }

  for (let j = left; j <= last; j++) {
    countSwap++;
    items[j] = tmp[j];
  }
}

mergeSortCountersBottomUp(randomArray.slice()); // => outer: 4 inner: 9 swap: 36
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersBottomUp(orderedArray.slice()); // => outer: 4 inner: 9 swap: 36
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersBottomUp(reversedArray.slice()); // => outer: 4 inner: 9 swap: 36
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();
