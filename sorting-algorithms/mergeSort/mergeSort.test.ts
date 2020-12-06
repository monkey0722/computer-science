import { mergeSortTopDown, mergeSortBottomUp } from "./mergeSort";

describe("merge-sort", () => {
  const array: number[] = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8];
  const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  it("TopDown", () => {
    expect(mergeSortTopDown(array)).toEqual(result);
  });
  it("BottomUp", () => {
    expect(mergeSortBottomUp(array)).toEqual(result);
  });
});
