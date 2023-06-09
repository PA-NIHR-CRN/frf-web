import { getStaticPropsRevalidateValue } from './getStaticPropsRevalidateValue'

describe('getStaticPropsRevalidateValue', () => {
  it('returns the correct next revalidation time', () => {
    expect(getStaticPropsRevalidateValue()).toBe(60)
    const currentValue = process.env.NEXT_REVALIDATE_TIME
    process.env.NEXT_REVALIDATE_TIME = 'false'
    expect(getStaticPropsRevalidateValue()).toBe(false)
    process.env.NEXT_REVALIDATE_TIME = currentValue
  })
})
