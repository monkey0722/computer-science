import { insertionSort } from "./insertionSort";

describe("insertion-sort", () => {
  it("normal", () => {
    const array = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const array2 = [100, 20, 50, 60, 40, 30, 70, 90, 10, 80];
    const result2 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    expect(insertionSort(array)).toEqual(result);
    expect(insertionSort(array2)).toEqual(result2);
  });
});
