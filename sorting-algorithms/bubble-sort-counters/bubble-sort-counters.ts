// sample of arrays to sort
const randomArray: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8]
const orderedArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const reversedArray: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

const bubbleSortCountersBasic = (array: number[]): void => {
  let countOuter: number = 0
  let countInner: number = 0
  let countSwap: number = 0

  for (let i = 0; i < array.length; i++) {
    countOuter++
    for (let j = 1; j < array.length; j++) {
      countInner++
      if(array[j - 1] > array[j]) {
        countSwap++
        [array[j - 1], array[j]] = [array[j], array[j - 1]]
      }
    }
  }

  console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`)
}

bubbleSortCountersBasic(randomArray.slice()) // => outer: 10 inner: 90 swap: 21
bubbleSortCountersBasic(orderedArray.slice()) // => outer: 10 inner: 90 swap: 0
bubbleSortCountersBasic(reversedArray.slice()) // => outer: 10 inner: 90 swap: 45

const bubbleSortCounters = (array: number[]): void => {
  let countOuter: number = 0
  let countInner: number = 0
  let countSwap: number = 0

  let swapped: boolean
  do {
    countOuter++
    swapped = false
    for (let i = 0; i < array.length; i++) {
      countInner++
      if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
        countSwap++
        [array[i], array[i + 1]] = [array[i + 1], array[i]]
        swapped = true
      }
    }
  } while(swapped)

  console.log('outer:', countOuter, 'inner:', countInner, 'swap:', countSwap)
}

bubbleSortCounters(randomArray.slice()) // => outer: 9 inner: 90 swap: 21
bubbleSortCounters(orderedArray.slice()) // => outer: 1 inner: 10 swap: 0
bubbleSortCounters(reversedArray.slice()) // => outer: 10 inner: 100 swap: 45
