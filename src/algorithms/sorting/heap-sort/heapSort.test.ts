import {heapSort} from './heapSort';

describe('heapSort', () => {
  test('should sort an unsorted array of numbers (ascending)', () => {
    const array = [3, 2, 5, 6, 4, 9, 7, 10, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(heapSort(array)).toEqual(result);
    expect(array).toEqual([3, 2, 5, 6, 4, 9, 7, 10, 1, 8]);
  });

  test('should handle an already-sorted array', () => {
    const orderedArray = [1, 2, 3, 4, 5];
    expect(heapSort(orderedArray)).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle a reverse-sorted array', () => {
    const reversed = [5, 4, 3, 2, 1];
    expect(heapSort(reversed)).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle an empty array', () => {
    expect(heapSort([])).toEqual([]);
  });

  test('should handle a single-element array', () => {
    expect(heapSort([42])).toEqual([42]);
  });

  test('should handle duplicate elements', () => {
    const duplicates = [3, 1, 2, 3, 2];
    expect(heapSort(duplicates)).toEqual([1, 2, 2, 3, 3]);
  });

  test('should allow a custom comparator (descending order)', () => {
    const arr = [3, 1, 2];
    const descendingComparator = (a: number, b: number): boolean => a > b;
    expect(heapSort(arr, descendingComparator)).toEqual([3, 2, 1]);
  });

  test('should handle negative numbers', () => {
    const arr = [-3, 5, -1, 0, 2, -4];
    expect(heapSort(arr)).toEqual([-4, -3, -1, 0, 2, 5]);
  });

  test('should handle all identical elements', () => {
    const arr = [7, 7, 7, 7, 7];
    expect(heapSort(arr)).toEqual([7, 7, 7, 7, 7]);
  });

  test('should handle large arrays', () => {
    const arr = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    const sorted = heapSort(arr);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i]).toBeGreaterThanOrEqual(sorted[i - 1]);
    }
  });

  test('should sort strings alphabetically', () => {
    const arr = ['banana', 'apple', 'cherry', 'date'];
    expect(heapSort(arr)).toEqual(['apple', 'banana', 'cherry', 'date']);
  });
});
