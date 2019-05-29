import { bubbleSortBasic, bubbleSort }  from './bubble-sort'

describe('bubble-sort', () => {
  // array for bubble sort
  const bubbleSortArray: number[] = [8, 2, 5, 6, 4, 3, 7, 10, 1, 9]
  const result: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  it('basic', () => {
    expect(bubbleSortBasic(bubbleSortArray)).toEqual(result)
  })
  it('normal', () => {
    expect(bubbleSort(bubbleSortArray)).toEqual(result)
  })
})
