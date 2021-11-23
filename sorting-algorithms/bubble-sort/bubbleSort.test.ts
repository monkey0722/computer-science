import { bubbleSortBasic, bubbleSort } from "./bubbleSort";

describe("bubble-sort", () => {
  const array = [8, 2, 5, 6, 4, 3, 7, 10, 1, 9];
  const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const array2 = [80, 20, 50, 60, 40, 30, 70, 100, 10, 90];
  const result2 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  it("basic", () => {
    expect(bubbleSortBasic(array)).toEqual(result);
    expect(bubbleSortBasic(array2)).toEqual(result2);
  });
  it("normal", () => {
    expect(bubbleSort(array)).toEqual(result);
    expect(bubbleSort(array2)).toEqual(result2);
  });
});
