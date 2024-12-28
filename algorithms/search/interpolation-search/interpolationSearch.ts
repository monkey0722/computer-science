export function interpolationSearch(arr: number[], key: number): number | undefined {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high && key >= arr[low] && key <= arr[high]) {
    const pos = low + ((high - low) / (arr[high] - arr[low])) * (key - arr[low]);
    if (arr[Math.floor(pos)] === key) {
      return Math.floor(pos);
    }
    if (arr[Math.floor(pos)] < key) {
      low = Math.floor(pos) + 1;
    } else {
      high = Math.floor(pos) - 1;
    }
  }
  return undefined;
}
