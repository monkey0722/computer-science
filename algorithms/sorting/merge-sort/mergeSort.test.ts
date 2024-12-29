import {mergeSortTopDown, mergeSortBottomUp} from './mergeSort';

describe('merge-sort', () => {
  const array = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8];
  const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  test('TopDown - should sort an unsorted array', () => {
    expect(mergeSortTopDown(array.slice())).toEqual(sorted);
  });
  test('BottomUp - should sort an unsorted array in place', () => {
    const copy = array.slice();
    mergeSortBottomUp(copy);
    expect(copy).toEqual(sorted);
  });
  test('TopDown - should not mutate the original array', () => {
    const original = array.slice();
    mergeSortTopDown(original);
    expect(original).toEqual(array);
  });
  test('BottomUp - should sort an empty array without errors', () => {
    const empty: number[] = [];
    expect(mergeSortBottomUp(empty)).toEqual([]);
  });
  test('TopDown - should handle a single-element array', () => {
    const single = [42];
    expect(mergeSortTopDown(single.slice())).toEqual([42]);
  });
  test('BottomUp - should handle a sorted array (no changes)', () => {
    const alreadySorted = [1, 2, 3, 4, 5];
    const copy = alreadySorted.slice();
    mergeSortBottomUp(copy);
    expect(copy).toEqual(alreadySorted);
  });
  test('TopDown - should handle a reverse-sorted array', () => {
    const reverse = [5, 4, 3, 2, 1];
    expect(mergeSortTopDown(reverse)).toEqual([1, 2, 3, 4, 5]);
  });
  test('BottomUp - should handle duplicates (stable sort)', () => {
    const duplicates = [3, 1, 2, 2, 3];
    const copy = duplicates.slice();
    mergeSortBottomUp(copy);
    expect(copy).toEqual([1, 2, 2, 3, 3]);
  });
});
