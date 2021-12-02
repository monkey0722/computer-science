export function jumpSearch(arr: number[], x: number): number | undefined {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < x) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return undefined;
    }
  }
  while (arr[prev] < x) {
    prev++;
    if (prev == Math.min(step, n)) {
      return undefined;
    }
  }
  if (arr[prev] == x) {
    return prev;
  }
  return undefined;
}
