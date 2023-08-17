import { axios } from './axios'

describe('axios', () => {
  it('returns an axios instance', () => {
    expect(axios.get).toBeDefined()
  })

  it('adds caching adapter to axios instance', () => {
    expect(axios.defaults.cache).toBeDefined()
  })
})
