export function linearSearch<T>(array: T[], value: T): number | undefined {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return undefined;
}
