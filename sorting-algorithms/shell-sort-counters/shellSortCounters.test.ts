import {shellSortCounters} from './shellSortCounters';

describe('shellSortCounters', () => {
  const randomArray = [8, 2, 3, 6, 4, 5, 7, 10, 1, 9];
  const orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const reversedArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  it('normal', () => {
    expect(shellSortCounters(randomArray)).toEqual({
      countOuter: 15,
      countInner: 7,
      countSwap: 7,
    });
    expect(shellSortCounters(orderedArray)).toEqual({
      countOuter: 15,
      countInner: 0,
      countSwap: 0,
    });
    expect(shellSortCounters(reversedArray)).toEqual({
      countOuter: 15,
      countInner: 13,
      countSwap: 13,
    });
  });
});
