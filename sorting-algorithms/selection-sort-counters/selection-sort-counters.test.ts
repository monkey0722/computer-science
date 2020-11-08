import { selectionSortCounters } from "./selection-sort-counters";

describe("selection-sort-counters", () => {
  const randomArray: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
  const orderedArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const reversedArray: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  it("normal", () => {
    expect(selectionSortCounters(randomArray.slice())).toEqual({
      countOuter: 10,
      countInner: 45,
      countSwap: 5,
    });
    expect(selectionSortCounters(orderedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 45,
      countSwap: 0,
    });
    expect(selectionSortCounters(reversedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 45,
      countSwap: 5,
    });
  });
});
