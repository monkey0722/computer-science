// gaps
const gaps = [701, 301, 132, 57, 23, 10, 4, 1]

export const shellsortCounters = (array: number[]): number[] => {
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
