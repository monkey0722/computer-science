// basic implementation (pivot is the first element of the array)
export const quickSort = (array: number[]): number[] => {
  if (array.length < 2) {
    return array
  }

  const pivot: number = array[0]
  const lesser: number[] = []
  const greater: number[] = []

  for (let i = 1; i < array.length; i++) {
    array[i] < pivot
      ? lesser.push(array[i])
      : greater.push(array[i])
  }

  return quickSort(lesser).concat(pivot, quickSort(greater))
}
