// sample of arrays to sort
const arrayRandom: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8]
const arrayOrdered: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrayReversed: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

const bubbleSortBasic = (array: number[]): number[] => {
  let countOuter: number = 0
  let countInner: number = 0
  let countSwap: number = 0

  array.forEach((value: number, i: number) => {
    countOuter++
    array.forEach((value: number, j: number) => {
      countInner++
      if(array[j - 1] > array[j]) {
        countInner++
        [array[j - 1], array[j]] = [array[j], array[j - 1]]
      }
    })
  })

  array.forEach((value: number, i:number) => {
    countOuter++
    array.forEach((value: number, j:number) => {
      if(array[j - 1] > array[j]) {
        countSwap++
        [array[j - 1], array[j]] = [array[j], array[j - 1]]
      }
    })
  })

  console.log('outer:', countOuter, 'inner:', countInner, 'swap:', countSwap)
  return array
}

bubbleSortBasic(arrayRandom.slice()) // => outer: 10 inner: 90 swap: 21
bubbleSortBasic(arrayOrdered.slice()) // => outer: 10 inner: 90 swap: 0
bubbleSortBasic(arrayReversed.slice()) // => outer: 10 inner: 90 swap: 45

const bubbleSort = (array: number[]): number[] => {
  let countOuter: number = 0
  let countInner: number = 0
  let countSwap: number = 0

  let swapped: boolean
  do {
    countOuter++
    swapped = false

    array.forEach((value: number, i: number) => {
      countInner++
      array.forEach((value: number, j: number) => {
        if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
          countSwap++
          [array[i], array[i + 1]] = [array[i + 1], array[i]]
          swapped = true
        }
      })
    })
  } while(swapped)

  console.log('outer:', countOuter, 'inner:', countInner, 'swap:', countSwap)
  return array
}

bubbleSort(arrayRandom.slice()) // => outer: 9 inner: 90 swap: 21
bubbleSort(arrayOrdered.slice()) // => outer: 1 inner: 10 swap: 0
bubbleSort(arrayReversed.slice()) // => outer: 10 inner: 100 swap: 45
