// array for selection-sort
const array: number[] = [7, 3, 5, 6, 4, 2, 9, 10, 1, 8]

const selectionSort = (array: number[]): number[] => {
  for (let i = 0; i < array.length; i++) {
    let min: number = i
    for (let j: number = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j
      }
    }
    if (i !== min) {
      [array[i], array[min]] = [array[min], array[i]]
    }
  }
  return array
}

console.log(selectionSort(array)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
