import { quickSort } from "./quickSort";

describe("quickSort", () => {
  it("normal", () => {
    const array = [3, 2, 5, 6, 4, 9, 7, 10, 1, 8];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(quickSort(array)).toEqual(result);
  });
});
