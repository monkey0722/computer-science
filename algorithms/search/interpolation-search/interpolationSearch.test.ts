import {interpolationSearch} from './interpolationSearch';

describe('interpolationSearch', () => {
  const arr = [1, 4, 6, 7, 9, 12, 15, 16, 17, 23, 25, 26, 27, 31];
  test('should find the element when it exists in the array', () => {
    expect(interpolationSearch(arr, 9)).toEqual(4);
    expect(interpolationSearch(arr, 31)).toEqual(13);
  });
  test('should return undefined when the element does not exist', () => {
    expect(interpolationSearch(arr, 42)).toEqual(undefined);
  });
  test('should return undefined for an empty array', () => {
    expect(interpolationSearch([], 10)).toBeUndefined();
  });
  test('should handle a single-element array (value found)', () => {
    expect(interpolationSearch([7], 7)).toBe(0);
  });
  test('should return undefined for a single-element array (value not found)', () => {
    expect(interpolationSearch([7], 9)).toBeUndefined();
  });
  test('should handle an array where all elements are the same (value found)', () => {
    const sameArr = [5, 5, 5, 5, 5];
    expect(interpolationSearch(sameArr, 5)).toBe(0);
  });
  test('should return undefined for an array where all elements are the same (value not found)', () => {
    const sameArr = [5, 5, 5, 5, 5];
    expect(interpolationSearch(sameArr, 7)).toBeUndefined();
  });
  test('should find the first element', () => {
    expect(interpolationSearch(arr, 1)).toBe(0);
  });
  test('should find the last element', () => {
    expect(interpolationSearch(arr, 31)).toBe(arr.length - 1);
  });
});
