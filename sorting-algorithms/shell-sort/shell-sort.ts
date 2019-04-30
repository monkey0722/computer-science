// gaps for shellsort
const gapsForShellSort: number[] = [701, 301, 132, 57, 23, 10, 4, 1]

export const shellSort = (array: number[]): number[] => {
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
