// basic implementation (pivot is the first element of the array)
export const quickSort = (array: number[]): number[] => {
  if (array.length < 2) {
    return array;
  }

  const pivot: number = array[0];
  const lesser = array.filter((item) => item < pivot);
  const greater = array.filter((item) => item > pivot);

  return [...quickSort(lesser), pivot, ...quickSort(greater)];
};
