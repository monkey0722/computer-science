/**
 * Top-down implementation
 */
function mergeTopDown(left: number[], right: number[]): number[] {
  const array: number[] = [];
  let nonFirst: number | undefined;

  while (left.length && right.length) {
    left[0] < right[0] ? (nonFirst = left.shift()) : (nonFirst = right.shift());
    if (nonFirst) {
      array.push(nonFirst);
    }
  }
  return array.concat(left.slice()).concat(right.slice());
}

export function mergeSortTopDown(items: number[]): number[] {
  if (items.length < 2) {
    return items;
  }

  const middle = Math.floor(items.length / 2);
  const leftItems = items.slice(0, middle);
  const rightItems = items.slice(middle);

  return mergeTopDown(
    mergeSortTopDown(leftItems),
    mergeSortTopDown(rightItems)
  );
}

/**
 * Bottom-up implementation
 */
function mergeBottomUp(items: number[], left: number, step: number): void {
  const tmp: number[] = [];
  const right: number = left + step;
  const last = Math.min(left + step * 2 - 1, items.length - 1);

  let moveLeft = left;
  let moveRight = right;

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
    items[j] = tmp[j];
  }
}

export function mergeSortBottomUp(items: number[]): number[] {
  let step = 1;
  while (step < items.length) {
    let left = 0;
    while (left + step < items.length) {
      mergeBottomUp(items, left, step);
      left += step * 2;
    }
    step *= 2;
  }
  return items;
}
