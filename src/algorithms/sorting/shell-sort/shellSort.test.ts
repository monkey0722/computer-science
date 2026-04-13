import {shellSort} from './shellSort';

describe('shellSort', () => {
  test('should sort an unsorted array of numbers', () => {
    const array = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(shellSort(array.slice())).toEqual(result);
  });
  test('should handle an already sorted array', () => {
    const sorted = [1, 2, 3, 4, 5];
    expect(shellSort(sorted.slice())).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle a reverse-sorted array', () => {
    const reversed = [5, 4, 3, 2, 1];
    expect(shellSort(reversed.slice())).toEqual([1, 2, 3, 4, 5]);
  });
  test('should handle an empty array', () => {
    expect(shellSort([])).toEqual([]);
  });
  test('should handle a single-element array', () => {
    expect(shellSort([42])).toEqual([42]);
  });
  test('should handle an array with duplicate elements', () => {
    const arr = [3, 1, 2, 3, 2];
    expect(shellSort(arr.slice())).toEqual([1, 2, 2, 3, 3]);
  });
});
