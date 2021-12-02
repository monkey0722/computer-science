export function linearSearch<T>(arr: T[], value: T): number | undefined {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return undefined;
}
