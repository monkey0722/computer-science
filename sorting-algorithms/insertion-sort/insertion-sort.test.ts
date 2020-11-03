import { insertionSort } from "./insertion-sort";

describe("insertion-sort", () => {
  it("normal", () => {
    // array for insertion sort
    const arrayForInsertionSort: number[] = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8];
    const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(insertionSort(arrayForInsertionSort)).toEqual(result);
  });
});
