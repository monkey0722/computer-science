export const insertionSort = (array: number[]): number[] => {
  for (let i = 0; i < array.length; i++) {
    const tmp: number = array[i];
    let j: number = i - 1;
    while (j >= 0 && array[j] > tmp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = tmp;
  }
  return array;
};
