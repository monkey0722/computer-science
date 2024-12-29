import {bubbleSortBasic, bubbleSort} from './bubbleSort';

describe('bubbleSortBasic', () => {
  test('should sort a numeric array in ascending order', () => {
    const array = [8, 2, 5, 6, 4, 3, 7, 10, 1, 9];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(bubbleSortBasic(array)).toEqual(result);
  });
  test('should sort an empty array', () => {
    expect(bubbleSortBasic([])).toEqual([]);
  });
  test('should sort an array with one element', () => {
    expect(bubbleSortBasic([42])).toEqual([42]);
  });
  test('should sort a sorted array without changes', () => {
    const array = [1, 2, 3, 4];
    expect(bubbleSortBasic(array)).toEqual([1, 2, 3, 4]);
  });
  test('should sort an array with duplicate elements', () => {
    const array = [3, 1, 2, 1, 3];
    const result = [1, 1, 2, 3, 3];
    expect(bubbleSortBasic(array)).toEqual(result);
  });
  test('should allow a custom comparator for descending order', () => {
    const array = [3, 1, 2];
    const descendingComparator = (a: number, b: number): boolean => a < b;
    expect(bubbleSortBasic(array, descendingComparator)).toEqual([3, 2, 1]);
  });
});

describe('bubbleSort (optimized)', () => {
  test('should sort a numeric array in ascending order', () => {
    const array2 = [80, 20, 50, 60, 40, 30, 70, 100, 10, 90];
    const result2 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    expect(bubbleSort(array2)).toEqual(result2);
  });
  test('should sort an empty array', () => {
    expect(bubbleSort([])).toEqual([]);
  });
  test('should sort an array with one element', () => {
    expect(bubbleSort([42])).toEqual([42]);
  });
  test('should sort an array with duplicate elements', () => {
    const array = [4, 4, 2, 5, 2];
    const result = [2, 2, 4, 4, 5];
    expect(bubbleSort(array)).toEqual(result);
  });
  test('should allow a custom comparator for descending order', () => {
    const array = [3, 1, 2];
    const descendingComparator = (a: number, b: number): boolean => a < b;
    expect(bubbleSort(array, descendingComparator)).toEqual([3, 2, 1]);
  });
});
