interface Item {
  weight: number;
  value: number;
}

export class Knapsack {
  /**
   * Solves the 0-1 knapsack problem.
   * @param items Array of items, each with a weight and value.
   * @param capacity The maximum weight capacity of the knapsack.
   * @returns An object containing the maximum value and the selection status of each item.
   * @throws {Error} If inputs are invalid.
   */
  static solve(
    items: Item[],
    capacity: number
  ): {
    maxValue: number;
    selectedItems: boolean[];
  } {
    if (capacity < 0) {
      throw new Error('Capacity must be non-negative');
    }
    for (const item of items) {
      if (item.weight < 0 || item.value < 0) {
        throw new Error('Item weights and values must be non-negative');
      }
    }

    const n = items.length;
    const dp: number[][] = Array.from({length: n + 1}, () =>
      Array(capacity + 1).fill(0)
    );

    // Build the DP table
    for (let i = 1; i <= n; i++) {
      const item = items[i - 1];
      for (let w = 0; w <= capacity; w++) {
        if (item.weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - item.weight] + item.value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Trace back to find selected items
    const selectedItems: boolean[] = Array(n).fill(false);
    let remainingWeight = capacity;
    for (let i = n; i > 0; i--) {
      if (dp[i][remainingWeight] !== dp[i - 1][remainingWeight]) {
        selectedItems[i - 1] = true;
        remainingWeight -= items[i - 1].weight;
      }
    }

    return {
      maxValue: dp[n][capacity],
      selectedItems,
    };
  }

  /**
   * Solves the fractional knapsack problem.
   * @param items Array of items, each with a weight and value.
   * @param capacity The maximum weight capacity of the knapsack.
   * @returns An object containing the maximum value and the selection fractions of each item.
   * @throws {Error} If inputs are invalid.
   */
  static solveFractional(
    items: Item[],
    capacity: number
  ): {
    maxValue: number;
    fractions: number[];
  } {
    if (capacity < 0) {
      throw new Error('Capacity must be non-negative');
    }
    for (const item of items) {
      if (item.weight < 0 || item.value < 0) {
        throw new Error('Item weights and values must be non-negative');
      }
    }

    const n = items.length;
    const sortedItems = items
      .map((item, index) => ({
        ...item,
        ratio: item.weight === 0 ? Infinity : item.value / item.weight,
        index, // Preserve original index
      }))
      .sort((a, b) => b.ratio - a.ratio); // Sort by value-to-weight ratio

    let remainingCapacity = capacity;
    let totalValue = 0;
    const fractions = Array(n).fill(0);

    for (const item of sortedItems) {
      if (item.value === 0 || remainingCapacity <= 0) {
        continue; // Skip zero value items or if no capacity is left
      }
      if (remainingCapacity >= item.weight) {
        fractions[item.index] = 1;
        totalValue += item.value;
        remainingCapacity -= item.weight;
      } else {
        const fraction = remainingCapacity / item.weight;
        fractions[item.index] = fraction;
        totalValue += item.value * fraction;
        break;
      }
    }
    return {
      maxValue: totalValue,
      fractions,
    };
  }
}
