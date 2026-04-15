import {selectionSort} from './selectionSort';

describe('selectionSort', () => {
  test('should sort a general unsorted array of numbers', () => {
    const array = [7, 3, 5, 6, 4, 2, 9, 10, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(selectionSort(array.slice())).toEqual(result);
  });
  test('should handle an already-sorted array', () => {
    const sorted = [1, 2, 3, 4, 5];
    expect(selectionSort(sorted.slice())).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle a reverse-sorted array', () => {
    const reversed = [5, 4, 3, 2, 1];
    expect(selectionSort(reversed.slice())).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle an empty array', () => {
    expect(selectionSort([])).toEqual([]);
  });
  test('should handle a single-element array', () => {
    expect(selectionSort([42])).toEqual([42]);
  });
  test('should handle duplicate elements', () => {
    const duplicates = [2, 3, 1, 2, 1];
    expect(selectionSort(duplicates.slice())).toEqual([1, 1, 2, 2, 3]);
  });
  test('should allow a custom comparator (descending order)', () => {
    const array = [3, 1, 2];
    const descendingComparator = (a: number, b: number): boolean => a > b;
    expect(selectionSort(array.slice(), descendingComparator)).toEqual([3, 2, 1]);
  });
});
