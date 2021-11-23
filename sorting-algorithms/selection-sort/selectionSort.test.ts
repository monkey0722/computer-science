import { selectionSort } from "./selectionSort";

describe("selection-sort", () => {
  it("normal", () => {
    const array = [7, 3, 5, 6, 4, 2, 9, 10, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(selectionSort(array)).toEqual(result);
  });
});
