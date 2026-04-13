import {jumpSearch} from './jumpSearch';

describe('jumpSearch', () => {
  const arr = [0, 2, 4, 7, 10, 23, 34, 40, 55, 68, 77, 90, 110];
  test('should find the element when it exists in the array', () => {
    expect(jumpSearch(arr, 2)).toBe(1);
    expect(jumpSearch(arr, 55)).toBe(8);
  });
  test('should return undefined if the element does not exist', () => {
    expect(jumpSearch(arr, 100)).toBeUndefined();
  });
  test('should handle an empty array', () => {
    expect(jumpSearch([], 10)).toBeUndefined();
  });
  test('should handle an array with one element (value found)', () => {
    expect(jumpSearch([42], 42)).toBe(0);
  });
  test('should return undefined for an array with one element (value not found)', () => {
    expect(jumpSearch([42], 24)).toBeUndefined();
  });
  test('should find the first element in the array', () => {
    expect(jumpSearch(arr, 0)).toBe(0);
  });
  test('should find the last element in the array', () => {
    expect(jumpSearch(arr, 110)).toBe(arr.length - 1);
  });
  test('should return undefined if step overshoots the array length', () => {
    expect(jumpSearch(arr, 999)).toBeUndefined();
  });
});
