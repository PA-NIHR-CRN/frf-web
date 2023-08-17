import { Cookie, Locator } from '@playwright/test'

export function numDaysBetween(d1: Date, d2: Date): number {
  const diff = Math.abs(d1.getTime() - d2.getTime())
  return diff / (1000 * 60 * 60 * 24)
}

export async function getTextFromElementArray(inputArray: Locator[]): Promise<(string | null)[]> {
  const arrInputText: Array<string | null> = []
  for (const input of inputArray) {
    const inputText = await input.textContent()
    if (inputText !== null) {
      arrInputText.push(inputText)
    }
  }
  return arrInputText
}

export function convertPromiseStringToNumber(inputString: string | undefined): number {
  let inputAsNumber = 0
  if (inputString != undefined) {
    inputAsNumber = parseInt(inputString)
    return inputAsNumber
  }
  return inputAsNumber
}

export function confirmStringNotNull(inputString: string | null): string {
  if (inputString != null) {
    return inputString
  } else {
    throw new Error(`The input string is null`)
  }
}

export function extractRefNoDigits(inputString: string | undefined, charToBeReplaced: string): string | undefined {
  return inputString?.replaceAll(charToBeReplaced, '')
}

export function getDomainSpecificCookieList(inputCookieArray: Cookie[], domainToFetch: string): Cookie[] {
  const returnedCookieArray: Cookie[] = []
  inputCookieArray.forEach((cookie) => {
    if (cookie.domain == domainToFetch) {
      returnedCookieArray.push(cookie)
    }
  })
  return returnedCookieArray
}
