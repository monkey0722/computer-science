// array to sort
const bubbleSortArray: number[] = [8, 2, 5, 6, 4, 3, 7, 10, 1, 9]

const bubbleSortBasic = (array: number[]): number[] => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length; j++) {
      if(array[j - 1] > array[j]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]]
      }
    }
  }
  return array
}
console.log(bubbleSortBasic(bubbleSortArray)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]


const bubbleSort = (array: number[]): number[] => {
  let swapped: boolean
  do {
    swapped = false
    for (let i = 0; i < array.length; i++) {
      if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]]
        swapped = true
      }
    }
  } while(swapped)
  return array
}
console.log(bubbleSort(bubbleSortArray)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
