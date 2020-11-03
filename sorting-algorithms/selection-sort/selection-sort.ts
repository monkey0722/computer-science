export const selectionSort = (array: number[]): number[] => {
  for (let i = 0; i < array.length; i++) {
    let min: number = i;
    for (let j: number = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (i !== min) {
      [array[i], array[min]] = [array[min], array[i]];
    }
  }
  return array;
};
