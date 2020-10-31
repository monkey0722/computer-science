// array to sort
const arrayForMergingSort: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];

// top-down implementation
const mergeSortTopDown = (array: number[]): number[] => {
  if (array.length < 2) {
    return array;
  }

  const middle: number = Math.floor(array.length / 2);
  const left: number[] = array.slice(0, middle);
  const right: number[] = array.slice(middle);

  return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right));
};

const mergeTopDown = (left: any[], right: any[]): number[] => {
  const array: number[] = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      array.push(left.shift());
    } else {
      array.push(right.shift());
    }
  }
  return array.concat(left.slice()).concat(right.slice());
};

console.log(mergeSortTopDown(arrayForMergingSort.slice())); // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// bottom-up implementation
const mergeSortBottomUp = (array: number[]): number[] => {
  let step: number = 1;
  while (step < array.length) {
    let left: number = 0;
    while (left + step < array.length) {
      mergeBottomUp(array, left, step);
      left += step * 2;
    }
    step *= 2;
  }
  return array;
};

const mergeBottomUp = (array: number[], left: number, step: number): void => {
  const right: number = left + step;
  const end = Math.min(left + step * 2 - 1, array.length - 1);
  let leftMoving = left;
  let rightMoving = right;
  const temp: number[] = [];

  for (let i: number = left; i <= end; i++) {
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

  for (let j: number = left; j <= end; j++) {
    array[j] = temp[j];
  }
};

console.log(mergeSortBottomUp(arrayForMergingSort.slice())); // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
