import {quickSort} from './quickSort';

describe('quickSort', () => {
  test('should sort an unsorted array of numbers (ascending)', () => {
    const array = [3, 2, 5, 6, 4, 9, 7, 10, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(quickSort(array)).toEqual(result);
    expect(array).toEqual([3, 2, 5, 6, 4, 9, 7, 10, 1, 8]);
  });
  test('should handle an already-sorted array', () => {
    const orderedArray = [1, 2, 3, 4, 5];
    expect(quickSort(orderedArray)).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle a reverse-sorted array', () => {
    const reversed = [5, 4, 3, 2, 1];
    expect(quickSort(reversed)).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle an empty array', () => {
    expect(quickSort([])).toEqual([]);
  });
  test('should handle a single-element array', () => {
    expect(quickSort([42])).toEqual([42]);
  });
  test('should handle duplicate elements', () => {
    const duplicates = [3, 1, 2, 3, 2];
    expect(quickSort(duplicates)).toEqual([1, 2, 2, 3, 3]);
  });
  test('should allow a custom comparator (descending order)', () => {
    const arr = [3, 1, 2];
    const descendingComparator = (a: number, b: number): boolean => a > b;
    expect(quickSort(arr, descendingComparator)).toEqual([3, 2, 1]);
  });
});
