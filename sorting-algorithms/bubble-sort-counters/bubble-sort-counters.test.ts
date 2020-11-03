import {
  bubbleSortCountersBasic,
  bubbleSortCounters,
} from "./bubble-sort-counters";

describe("bubble-sort-counters", () => {
  const randomArray: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
  const orderedArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const reversedArray: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  it("basic", () => {
    expect(bubbleSortCountersBasic(randomArray.slice())).toEqual({
      countOuter: 10,
      countInner: 90,
      countSwap: 21,
    });
    expect(bubbleSortCountersBasic(orderedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 90,
      countSwap: 0,
    });
    expect(bubbleSortCountersBasic(reversedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 90,
      countSwap: 45,
    });
  });
  it("normal", () => {
    expect(bubbleSortCounters(randomArray.slice())).toEqual({
      countOuter: 9,
      countInner: 90,
      countSwap: 21,
    });
    expect(bubbleSortCounters(orderedArray.slice())).toEqual({
      countOuter: 1,
      countInner: 10,
      countSwap: 0,
    });
    expect(bubbleSortCounters(reversedArray.slice())).toEqual({
      countOuter: 10,
      countInner: 100,
      countSwap: 45,
    });
  });
});
