export const numDaysBetween = (d1: Date, d2: Date) => {
  const diff = Math.abs(d1.getTime() - d2.getTime())
  return Math.round(diff / (1000 * 60 * 60 * 24))
}
