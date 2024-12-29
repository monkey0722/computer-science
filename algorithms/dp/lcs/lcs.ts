/**
 * Object that holds the results of LCS.
 */
interface LCSResult {
  length: number;
  sequence: string;
}

/**
 * Finds the longest common substring (LCS) of two strings.
 * @param strA - First string
 * @param strB - Second string
 * @returns An object containing the length of the LCS and the actual common substring
 */
export function lcs(strA: string, strB: string): LCSResult {
  const lenA = strA.length;
  const lenB = strB.length;

  // Prepare the DP table (length + 1).
  // dp[i][j] = Length of the LCS when considering the first i characters of strA and the first j characters of strB.
  const dp: number[][] = Array.from({length: lenA + 1}, () => Array(lenB + 1).fill(0));

  // Calculates LCS length.
  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      if (strA[i - 1] === strB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Restore the actual sequence of LCS.
  let sequence = '';
  let i = lenA;
  let j = lenB;
  while (i > 0 && j > 0) {
    if (strA[i - 1] === strB[j - 1]) {
      // Add to the sequence as a common character (note that it is added in reverse order).
      sequence = strA[i - 1] + sequence;
      i--;
      j--;
    } else {
      // DP Move the table towards the larger side.
      if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  }

  return {
    length: dp[lenA][lenB],
    sequence,
  };
}
