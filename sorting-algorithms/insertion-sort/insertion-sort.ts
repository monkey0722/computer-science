// array for insertion sort
const arrayForInsertionSort: number[] = [10, 2, 5, 6, 4, 3, 7, 9, 1, 8]

const insertionSort = (array: number[]): number[] => {
  for (let i = 0; i < array.length; i++) {
    let tmp: number = array[i]
    let j: number = i - 1
    while (j >= 0 && array[j] > tmp) {
      array[j + 1] = array[j];
      j--
    }
    array[j + 1] = tmp
  }
  return array
}

console.log(insertionSort(arrayForInsertionSort)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
