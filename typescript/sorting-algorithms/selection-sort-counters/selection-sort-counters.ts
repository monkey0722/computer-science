// sample of arrays to sort

const arrayRandom: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8]
const arrayOrdered: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrayReversed: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

const selectionSort = (array: number[]): void => {
  let countOuter: number = 0
  let countInner: number = 0
  let countSwap: number = 0

  for(let i: number = 0; i < array.length; i++) {
    countOuter++
    let min: number = i
    for(let j: number = i + 1; j < array.length; j++ ) {
      countInner++
      if(array[j] < array[min]) {
        min = j
      }
    }
    if(i !== min) {
      countSwap++
      [array[i], array[min]] = [array[min], array[i]]
    }
  }

  console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`)
}

selectionSort(arrayRandom.slice()) // => outer: 10 inner: 45 swap: 5
selectionSort(arrayOrdered.slice()) // => outer: 10 inner: 45 swap: 0
selectionSort(arrayReversed.slice()) // => outer: 10 inner: 45 swap: 5
