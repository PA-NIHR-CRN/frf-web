import { pluralise } from './pluralise'

test('Pluralises text correctly', () => {
  expect(pluralise('Search result', 0)).toBe('Search results')
  expect(pluralise('Search result', 1)).toBe('Search result')
  expect(pluralise('Search result', 2)).toBe('Search results')
})
