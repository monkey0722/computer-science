// sample of arrays to merge-sort-counters
const arrayRandomForMergeSortCounters: number[] = [
  9,
  2,
  5,
  6,
  4,
  3,
  7,
  10,
  1,
  8,
];
const arrayOrderedForMergeSortCounters: number[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];
const arrayReversedForMergeSortCounters: number[] = [
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
];

let countOuter: number = 0;
let countInner: number = 0;
let countSwap: number = 0;

const resetCounters = (): void => {
  countOuter = 0;
  countInner = 0;
  countSwap = 0;
};

// top-down implementation
const mergeSortCountersTopDown = (array: number[]): number[] => {
  countOuter++;
  if (array.length < 2) {
    return array;
  }

  const middle: number = Math.floor(array.length / 2);
  const left: number[] = array.slice(0, middle);
  const right: number[] = array.slice(middle);

  return mergeCountersTopDown(
    mergeSortCountersTopDown(left),
    mergeSortCountersTopDown(right)
  );
};

const mergeCountersTopDown = (left: any[], right: any[]): number[] => {
  const array: number[] = [];

  while (left.length && right.length) {
    countInner++;
    if (left[0] < right[0]) {
      array.push(left.shift());
    } else {
      array.push(right.shift());
    }
  }
  return array.concat(left.slice()).concat(right.slice());
};

mergeSortCountersTopDown(arrayRandomForMergeSortCounters.slice()); // => outer: 19 inner: 24 swap: 0
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersTopDown(arrayOrderedForMergeSortCounters.slice()); // => outer: 19 inner: 15 swap: 0
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersTopDown(arrayReversedForMergeSortCounters.slice()); // => outer: 19 inner: 19 swap: 0
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

// bottom-up implementation
const mergeSortCountersBottomUp = (array: number[]): number[] => {
  let step: number = 1;
  while (step < array.length) {
    countOuter++;
    let left: number = 0;
    while (left + step < array.length) {
      countInner++;
      mergeCountersBottomUp(array, left, step);
      left += step * 2;
    }
    step *= 2;
  }
  return array;
};

const mergeCountersBottomUp = (
  array: number[],
  left: number,
  step: number
): void => {
  const right: number = left + step;
  const end: number = Math.min(left + step * 2 - 1, array.length - 1);
  let leftMoving: number = left;
  let rightMoving: number = right;
  const temp: number[] = [];

  for (let i = left; i <= end; i++) {
    if (
      (array[leftMoving] <= array[rightMoving] || rightMoving > end) &&
      leftMoving < right
    ) {
      temp[i] = array[leftMoving];
      leftMoving++;
    } else {
      temp[i] = array[rightMoving];
      rightMoving++;
    }
  }

  for (let j = left; j <= end; j++) {
    countSwap++;
    array[j] = temp[j];
  }
};

mergeSortCountersBottomUp(arrayRandomForMergeSortCounters.slice()); // => outer: 4 inner: 9 swap: 36
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersBottomUp(arrayOrderedForMergeSortCounters.slice()); // => outer: 4 inner: 9 swap: 36
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();

mergeSortCountersBottomUp(arrayReversedForMergeSortCounters.slice()); // => outer: 4 inner: 9 swap: 36
console.log("outer:", countOuter, "inner:", countInner, "swap:", countSwap);
resetCounters();
