import {insertionSort} from './insertionSort';

describe('insertionSort', () => {
  test('should sort an unsorted array of numbers', () => {
    const array = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(insertionSort(array.slice())).toEqual(result);
  });
  test('should sort another unsorted array of numbers', () => {
    const array2 = [100, 20, 50, 60, 40, 30, 70, 90, 10, 80];
    const result2 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    expect(insertionSort(array2.slice())).toEqual(result2);
  });
  test('should handle an empty array', () => {
    const empty: number[] = [];
    expect(insertionSort(empty.slice())).toEqual([]);
  });
  test('should handle a single-element array', () => {
    const single = [42];
    expect(insertionSort(single.slice())).toEqual([42]);
  });
  test('should handle an already-sorted array', () => {
    const sorted = [1, 2, 3, 4, 5];
    expect(insertionSort(sorted.slice())).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle a reverse-sorted array', () => {
    const reversed = [5, 4, 3, 2, 1];
    expect(insertionSort(reversed.slice())).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle duplicate elements', () => {
    const duplicates = [3, 1, 2, 3, 2];
    expect(insertionSort(duplicates.slice())).toEqual([1, 2, 2, 3, 3]);
  });
  test('should allow a custom comparator (descending order)', () => {
    const arr = [3, 1, 2];
    const descendingComparator = (a: number, b: number): boolean => a < b;
    expect(insertionSort(arr.slice(), descendingComparator)).toEqual([3, 2, 1]);
  });
});
