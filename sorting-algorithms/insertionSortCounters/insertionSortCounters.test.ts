import { insertionSortCounters } from "./insertionSortCounters";

describe("insertion-sort-counters", () => {
  const randomArray: number[] = [2, 8, 5, 6, 4, 3, 10, 7, 1, 9];
  const orderedArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const reversedArray: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  it("normal", () => {
    expect(insertionSortCounters(randomArray.slice())).toEqual({
      countOuter: 10,
      countInner: 20,
      countSwap: 20,
    });
    expect(insertionSortCounters(orderedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 0,
      countSwap: 0,
    });
    expect(insertionSortCounters(reversedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 45,
      countSwap: 45,
    });
  });
});
