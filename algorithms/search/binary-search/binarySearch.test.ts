import {binarySearch} from './binarySearch';

describe('binarySearch', () => {
  describe('numeric array tests', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    test('should find the first element', () => {
      expect(binarySearch(numbers, 1)).toBe(0);
    });
    test('should find an element in the middle', () => {
      expect(binarySearch(numbers, 5)).toBe(4);
    });
    test('should find the last element', () => {
      expect(binarySearch(numbers, 10)).toBe(9);
    });
    test('should return undefined if the value is not found', () => {
      expect(binarySearch(numbers, 99)).toBeUndefined();
    });
    test('should work with an empty array', () => {
      expect(binarySearch([], 1)).toBeUndefined();
    });
    test('should work with a single-element array (value found)', () => {
      expect(binarySearch([42], 42)).toBe(0);
    });
    test('should work with a single-element array (value not found)', () => {
      expect(binarySearch([42], 24)).toBeUndefined();
    });
  });
  describe('string array with custom comparator', () => {
    const words = ['apple', 'banana', 'cherry', 'date', 'eggplant'];
    const comparator = (a: string, b: string): number => a.localeCompare(b);
    test('should find a word in a string array', () => {
      expect(binarySearch(words, 'cherry', comparator)).toBe(2);
    });
    test('should return undefined if a string is not in the array', () => {
      expect(binarySearch(words, 'coconut', comparator)).toBeUndefined();
    });
  });
});
