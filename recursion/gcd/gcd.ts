export const gcd = (a: number, b: number): number => {
  if(b === 0) {
    return Math.abs(a)
  }
  return gcd(b, a % b)
}
