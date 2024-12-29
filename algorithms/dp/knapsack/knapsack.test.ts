import {Knapsack} from './knapsack';

describe('Knapsack', () => {
  describe('solve (0-1 Knapsack)', () => {
    test('should solve the 0-1 knapsack problem correctly', () => {
      const items = [
        {weight: 2, value: 3},
        {weight: 3, value: 4},
        {weight: 4, value: 5},
        {weight: 5, value: 6},
      ];
      const capacity = 5;
      const result = Knapsack.solve(items, capacity);
      expect(result.maxValue).toBe(7);
      expect(result.selectedItems).toEqual([true, true, false, false]);
    });
    test('should return zero when capacity is zero', () => {
      const items = [
        {weight: 2, value: 3},
        {weight: 3, value: 4},
      ];
      const capacity = 0;
      const result = Knapsack.solve(items, capacity);
      expect(result.maxValue).toBe(0);
      expect(result.selectedItems).toEqual([false, false]);
    });

    test('should solve correctly when items have zero weight', () => {
      const items = [
        {weight: 0, value: 5},
        {weight: 2, value: 3},
      ];
      const capacity = 2;
      const result = Knapsack.solve(items, capacity);
      expect(result.maxValue).toBe(8);
      expect(result.selectedItems).toEqual([true, true]);
    });
    test('should solve correctly when items have zero value', () => {
      const items = [
        {weight: 1, value: 0},
        {weight: 2, value: 0},
      ];
      const capacity = 3;
      const result = Knapsack.solve(items, capacity);
      expect(result.maxValue).toBe(0);
      expect(result.selectedItems).toEqual([false, false]);
    });
    test('should throw an error for negative weight or value', () => {
      const items = [
        {weight: -2, value: 3},
        {weight: 3, value: 4},
      ];
      const capacity = 5;
      expect(() => Knapsack.solve(items, capacity)).toThrowError(
        'Item weights and values must be non-negative',
      );
    });
  });

  describe('solveFractional (Fractional Knapsack)', () => {
    test('should return zero when capacity is zero', () => {
      const items = [
        {weight: 10, value: 60},
        {weight: 20, value: 100},
      ];
      const capacity = 0;
      const result = Knapsack.solveFractional(items, capacity);
      expect(result.maxValue).toBe(0);
      expect(result.fractions).toEqual([0, 0]);
    });
    test('should solve correctly when items have zero weight', () => {
      const items = [
        {weight: 0, value: 50},
        {weight: 10, value: 60},
      ];
      const capacity = 10;
      const result = Knapsack.solveFractional(items, capacity);
      expect(result.maxValue).toBe(110);
      expect(result.fractions).toEqual([1, 1]);
    });
    test('should solve correctly when items have zero value', () => {
      const items = [
        {weight: 5, value: 0},
        {weight: 10, value: 0},
      ];
      const capacity = 15;
      const result = Knapsack.solveFractional(items, capacity);
      expect(result.maxValue).toBe(0);
      expect(result.fractions).toEqual([0, 0]);
    });
    test('should throw an error for negative weight or value', () => {
      const items = [
        {weight: 5, value: -10},
        {weight: 10, value: 50},
      ];
      const capacity = 15;
      expect(() => Knapsack.solveFractional(items, capacity)).toThrowError(
        'Item weights and values must be non-negative',
      );
    });
  });
});
