import { quickSort } from "./quick-sort";

describe("quickSort", () => {
  it("normal", () => {
    // array for quick sort
    const arrayForQuickSort: number[] = [3, 2, 5, 6, 4, 9, 7, 10, 1, 8];
    const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(quickSort(arrayForQuickSort)).toEqual(result);
  });
});
