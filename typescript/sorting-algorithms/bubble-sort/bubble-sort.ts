// array to sort
const arrayRandom: number[] = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8]

const bubbleSortBasic = (array: number[]): number[] => {
  array.forEach(() => {
	  array.forEach((j: number) => {
		  if (array[j - 1] > array[j]) {
			  [array[j - 1], array[j]] = [array[j], array[j - 1]];
		  }
	  });
  })
  return array
}
console.log(bubbleSortBasic(arrayRandom)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]


const bubbleSort = (array: number[]): number[] => {
  let swapped: boolean
  do {
    swapped = false
    array.forEach((i:number) => {
      if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]]
        swapped = true
      }
    })
  } while(swapped)
  return array
}
console.log(bubbleSort(arrayRandom)) // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
