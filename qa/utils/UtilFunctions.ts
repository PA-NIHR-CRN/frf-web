export function numDaysBetween(d1: Date, d2: Date): number {
  const diff = Math.abs(d1.getTime() - d2.getTime())
  return diff / (1000 * 60 * 60 * 24)
}
