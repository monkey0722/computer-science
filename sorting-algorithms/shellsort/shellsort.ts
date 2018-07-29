// array to sort
const array: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8]

// gaps
const gaps: number[] = [701, 301, 132, 57, 23, 10, 4, 1]

const shellsort = (array: number[]): number[] => {
  for(let g = 0; g < gaps.length; g++) {
    const gap: number = gaps[g]
    for(let i: number = gap; i < array.length; i++) {
      const temp: number = array[i]
      let last: number = i
      for(let j: number = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap]
        last -= gap
      }
      array[last] = temp
    }
  }
  return array
}

console.log(shellsort(array)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
