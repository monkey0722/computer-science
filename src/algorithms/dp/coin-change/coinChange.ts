/**
 * Calculates the number of ways to make change for a given amount using given coin denominations.
 * Each coin denomination can be used unlimited times.
 *
 * @param {number[]} coins - An array of coin denominations.
 * @param {number} target - The target amount.
 * @returns {number} The total number of distinct ways to make up the target amount.
 */
export function coinChangeWays(coins: number[], target: number): number {
  if (target < 0) {
    throw new Error('Target amount must be non-negative.');
  }
  for (const coin of coins) {
    if (coin <= 0) {
      throw new Error('Coin denominations must be positive.');
    }
  }
  // dp[x] = number of ways to make amount x
  const dp = Array(target + 1).fill(0);
  dp[0] = 1; // Base case: There's 1 way to make 0 amount: use no coins

  for (const coin of coins) {
    for (let amount = coin; amount <= target; amount++) {
      dp[amount] += dp[amount - coin];
    }
  }
  return dp[target];
}

/**
 * Calculates the minimum number of coins needed to make change for a given amount.
 * Each coin denomination can be used unlimited times.
 *
 * @param {number[]} coins - An array of coin denominations.
 * @param {number} target - The target amount.
 * @returns {number} The minimum number of coins needed to reach the target.
 * If the target cannot be reached with the given denominations, returns -1.
 */
export function minCoinsForChange(coins: number[], target: number): number {
  if (target < 0) {
    throw new Error('Target amount must be non-negative.');
  }
  for (const coin of coins) {
    if (coin <= 0) {
      throw new Error('Coin denominations must be positive.');
    }
  }
  // dp[x] = minimum number of coins to make amount x
  const dp = Array(target + 1).fill(Infinity);
  dp[0] = 0;

  for (const amount of dp.keys()) {
    // If dp[amount] is already Infinity, skip
    if (dp[amount] === Infinity) continue;
    // Try all coins
    for (const coin of coins) {
      const nextAmount = amount + coin;
      if (nextAmount <= target) {
        dp[nextAmount] = Math.min(dp[nextAmount], dp[amount] + 1);
      }
    }
  }
  return dp[target] === Infinity ? -1 : dp[target];
}
