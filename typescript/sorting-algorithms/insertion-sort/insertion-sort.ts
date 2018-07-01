// array to sort
const array: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8]

const insertionSort = (array: number[]): number[] => {
  array.forEach((value: number, i:number) => {
    let temp: number = array[i]
    let j: number = i - 1
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = temp
  })
  return array
}

console.log(insertionSort(array)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
