// array for insertion-sort-counters
const insertionSortCountersArrayRandom: number[] = [2, 8, 5, 6, 4, 3, 10, 7, 1, 9]
const insertionSortCountersArrayOrdered: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const insertionSortCountersArrayReversed: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

const insertionSortCounters = (array:number[]): number[] => {
  let countOuter: number = 0
  let countInner: number = 0
  let countSwap: number = 0

  for (let i: number = 0; i < array.length; i++) {
    countOuter++
    const tmp: number = array[i]
    let j: number = i - 1
    while (j >= 0 && array[j] > tmp) {
      countInner++
      countSwap++
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = tmp
  }

  console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`)
  return array
}

insertionSortCounters(insertionSortCountersArrayRandom) // => outer: 10 inner: 20 swap: 20
insertionSortCounters(insertionSortCountersArrayOrdered) // => outer: 10 inner: 0 swap: 0
insertionSortCounters(insertionSortCountersArrayReversed) // => outer: 10 inner: 45 swap: 45
