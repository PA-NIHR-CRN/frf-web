export function numDaysBetween(d1: Date, d2: Date): number {
  const diff = Math.abs(d1.getTime() - d2.getTime())
  return diff / (1000 * 60 * 60 * 24)
}

export function convertPromiseStringToNumber(inputString: string | undefined): number {
  let inputAsNumber = 0
  if (inputString != undefined) {
    inputAsNumber = parseInt(inputString)
    return inputAsNumber
  }
  return inputAsNumber
}
//Adding this temporarily to get past empty commit
