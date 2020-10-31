import { shellSort } from "./shell-sort";

describe("shell-sort", () => {
  it("normal", () => {
    // array for shellsort
    const arrayForShellSort: number[] = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8];
    const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(shellSort(arrayForShellSort)).toEqual(result);
  });
});
