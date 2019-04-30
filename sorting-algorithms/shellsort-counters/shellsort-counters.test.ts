import { shellsortCounters }  from './shellsort-counters'

describe('shellsortCounters', () => {
  it('arrayRandom', () => {
    // => outer: 15 inner: 7 swap: 7
    const arrayRandom: number[] = [8, 2, 3, 6, 4, 5, 7, 10, 1, 9]
    const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(shellsortCounters(arrayRandom)).toEqual(result)
  })
  it('arrayOrdered', () => {
    // => outer: 15 inner: 0 swap: 0
    const arrayOrdered: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(shellsortCounters(arrayOrdered)).toEqual(result)
  })
  it('arrayReversed', () => {
    // => outer: 15 inner: 13 swap: 13
    const arrayReversed: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(shellsortCounters(arrayReversed)).toEqual(result)
  })
})
