import { render, screen } from '@/config/test-utils'
import { RootLayout } from './RootLayout'

test('Displays page content within the layout', () => {
  render(
    <RootLayout>
      <h1>Welcome</h1>
    </RootLayout>
  )

  expect(screen.getByRole('heading', { name: 'Welcome' }))
})

test('Adds a class to the body to detect js is enabled', () => {
  render(
    <RootLayout>
      <h1>Welcome</h1>
    </RootLayout>
  )
  expect(document.body.classList.contains('js-enabled')).toBeTruthy()
})
