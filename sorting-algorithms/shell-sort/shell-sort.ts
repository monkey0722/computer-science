// array for shellsort
const arrayForShellSort: number[] = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8]

// gaps for shellsort
const gapsForShellSort: number[] = [701, 301, 132, 57, 23, 10, 4, 1]

const shellSort = (array: number[]): number[] => {
  for (let g = 0; g < gapsForShellSort.length; g++) {
    const gap: number = gapsForShellSort[g]
    for (let i: number = gap; i < array.length; i++) {
      const tmp: number = array[i]
      let last: number = i
      for (let j: number = i; j >= gap && array[j - gap] > tmp; j -= gap) {
        array[j] = array[j - gap]
        last -= gap
      }
      array[last] = tmp
    }
  }
  return array
}

console.log(shellSort(arrayForShellSort)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
