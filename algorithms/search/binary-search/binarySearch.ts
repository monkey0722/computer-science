export function binarySearch<T>(arr: T[], value: T): number | undefined {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = arr[mid];
    if (element === value) {
      return mid;
    }
    if (element > value) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return undefined;
}
