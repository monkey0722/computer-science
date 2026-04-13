import {linearSearch} from './linearSearch';

describe('linearSearch', () => {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  test('should find the first element', () => {
    expect(linearSearch(colors, 'red')).toBe(0);
  });
  test('should find the last element', () => {
    expect(linearSearch(colors, 'violet')).toBe(6);
  });
  test('should return undefined when element is not found', () => {
    expect(linearSearch(colors, 'rainbow')).toBeUndefined();
  });
  test('should handle an empty array', () => {
    expect(linearSearch([], 'anything')).toBeUndefined();
  });
  test('should handle a single-element array (value found)', () => {
    expect(linearSearch(['blue'], 'blue')).toBe(0);
  });
  test('should return undefined in a single-element array (value not found)', () => {
    expect(linearSearch(['blue'], 'red')).toBeUndefined();
  });
  test('should allow a custom comparator for object arrays', () => {
    const objects = [{id: 1}, {id: 2}, {id: 3}];
    const comparator = (a: {id: number}, b: {id: number}): boolean => a.id === b.id;
    expect(linearSearch(objects, {id: 3}, comparator)).toBe(2);
    expect(linearSearch(objects, {id: 999}, comparator)).toBeUndefined();
  });
});
