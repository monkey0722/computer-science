// shellsort counters for sample
const arrayRandom: number[] = [8, 2, 3, 6, 4, 5, 7, 10, 1, 9]
const arrayOrdered: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrayReversed: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// gaps
const gaps = [701, 301, 132, 57, 23, 10, 4, 1]

const shellsort = (array: number[]): number[] => {
  let countOuter: number = 0
  let countInner: number = 0
  let countSwap: number = 0

  for (let g: number = 0; g < gaps.length; g++) {
    const gap: number = gaps[g]
    for (let i: number = gap; i < array.length; i++) {
      countOuter++
      const tmp: number = array[i]
      let last: number = i
      for (let j: number = i; j >= gap && array[j - gap] > tmp; j -= gap) {
        countInner++
        countSwap++
        array[j] = array[j - gap]
        last -= gap
      }
      array[last] = tmp
    }
  }
  console.log(`outer: ${countOuter}, inner: ${countInner}, swap: ${countSwap}`)
  return array
}

shellsort(arrayRandom) // => outer: 15 inner: 7 swap: 7
shellsort(arrayOrdered) // => outer: 15 inner: 0 swap: 0
shellsort(arrayReversed) // => outer: 15 inner: 13 swap: 13
