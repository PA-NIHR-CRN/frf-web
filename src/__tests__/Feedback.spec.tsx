import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import mockRouter from 'next-router-mock'

import { render, screen, within } from '@/config/test-utils'
import { defaultMock } from '@/mocks/contactResearchSupport'
import Feedback, { FeedbackProps, getServerSideProps } from '@/pages/feedback'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock axios
jest.mock('axios')
jest.mock('@/lib/logger')

beforeEach(() => {
  console.error = jest.fn()
  mockRouter.push('/feedback')
  mockContentfulResponse(defaultMock)
  jest.clearAllMocks()
})

test('Initial form state', async () => {
  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: FeedbackProps
  }

  const { getByLabelText, getByText, getByRole } = render(<Feedback {...props} />)

  expect(screen.getByRole('heading', { name: 'Let us know what you think', level: 2 })).toBeInTheDocument()

  expect(
    screen.getByText('The Find, Recruit and Follow-Up (FRF) website is new and we would appreciate your feedback.')
  ).toBeInTheDocument()

  expect(screen.getAllByRole('group')).toHaveLength(3)

  // How helpful was the Find, Recruit and Follow-up (FRF) website?
  expect(
    getByRole('group', { name: 'How helpful was the Find, Recruit and Follow-up (FRF) website?' })
  ).toBeInTheDocument()
  expect(getByLabelText('Very helpful')).toBeInTheDocument()
  expect(getByLabelText('Somewhat helpful')).toBeInTheDocument()
  expect(getByLabelText('Neither helpful or unhelpful')).toBeInTheDocument()
  expect(getByLabelText('Not at all helpful')).toBeInTheDocument()

  // Please provide a summary of the support you need
  expect(
    getByLabelText(
      'Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)'
    )
  ).toBeInTheDocument()
  expect(
    getByLabelText(
      'Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)'
    )
  ).not.toBeRequired()
  expect(getByText('You have 1200 characters remaining')).toBeInTheDocument()

  // Fieldset - We may wish to contact you to follow up on your feedback. If you are happy for us to do so please provide your contact details.
  expect(
    getByRole('group', {
      name: 'We may wish to contact you to follow up on your feedback. If you are happy for us to do so please provide your contact details.',
    })
  ).toBeInTheDocument()

  // Name
  expect(getByLabelText('Full name (optional)')).toBeInTheDocument()
  expect(getByLabelText('Full name (optional)')).not.toBeRequired()

  // Email
  expect(getByLabelText('Email address (optional)')).toBeInTheDocument()
  expect(getByLabelText('Email address (optional)')).not.toBeRequired()

  // Org
  expect(getByLabelText('Organisation name (optional)')).toBeInTheDocument()
  expect(getByLabelText('Organisation name (optional)')).not.toBeRequired()

  // Form CTAs
  expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  expect(getByRole('link', { name: 'Cancel' })).toHaveAttribute('href', '/')
})

test('Successful submission redirects to confirmation page', async () => {
  const user = userEvent.setup()

  const apiHandlerMock = jest.mocked(axios.post)
  apiHandlerMock.mockResolvedValueOnce({
    request: { responseURL: 'http://localhost:3000/feedback/confirmation' },
  })

  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: FeedbackProps
  }

  const { getByLabelText, getByRole } = render(
    Feedback.getLayout(<Feedback {...props} />, { ...props, isPreviewMode: false })
  )

  expect(screen.getByRole('heading', { name: 'Let us know what you think', level: 2 })).toBeInTheDocument()

  await user.click(getByLabelText('Somewhat helpful'))
  await user.type(
    getByLabelText(
      'Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)'
    ),
    'Amazing!'
  )
  await user.type(getByLabelText('Full name (optional)'), 'John Terry')
  await user.type(getByLabelText('Email address (optional)'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Organisation name (optional)'), 'NIHR')

  await user.click(getByRole('button', { name: 'Submit' }))

  expect(mockRouter.pathname).toBe('/feedback/confirmation')
})

test('Failed submission due to a misc server error shows an error at the top of the page', async () => {
  const user = userEvent.setup()

  const apiHandlerMock = jest.mocked(axios.post)
  apiHandlerMock.mockResolvedValueOnce({
    request: { responseURL: 'http://localhost:3000/feedback/?fatal=1' },
  })

  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: FeedbackProps
  }

  const { getByLabelText, getByRole } = render(
    Feedback.getLayout(<Feedback {...props} />, { ...props, isPreviewMode: false })
  )

  expect(screen.getByRole('heading', { name: 'Let us know what you think', level: 2 })).toBeInTheDocument()

  await user.click(getByLabelText('Somewhat helpful'))
  await user.type(
    getByLabelText(
      'Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)'
    ),
    'Amazing!'
  )
  await user.type(getByLabelText('Full name (optional)'), 'John Terry')
  await user.type(getByLabelText('Email address (optional)'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Organisation name (optional)'), 'NIHR')

  await user.click(getByRole('button', { name: 'Submit' }))

  expect(mockRouter.asPath).toBe('/feedback?fatal=1')

  const alert = screen.getByRole('alert')
  expect(
    within(alert).getByText('An unexpected error occured whilst processing the form, please try again later.')
  ).toBeInTheDocument()
})

test('Form submission with client side validation errors', async () => {
  const user = userEvent.setup()

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: FeedbackProps
  }

  const { getByRole, getByLabelText } = render(
    Feedback.getLayout(<Feedback {...props} />, { ...props, isPreviewMode: false })
  )

  await user.click(getByRole('button', { name: 'Submit' }))

  // Summary errors
  const alert = getByRole('alert', { name: 'There is a problem' })
  expect(within(alert).getByRole('link', { name: 'Select how helpful you found the FRF website' })).toHaveAttribute(
    'href',
    '#helpfulness'
  )

  // Field errors
  expect(
    getByRole('group', { name: 'How helpful was the Find, Recruit and Follow-up (FRF) website?' })
  ).toHaveErrorMessage('Error: Select how helpful you found the FRF website')
  expect(
    getByLabelText(
      'Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)'
    )
  ).not.toHaveErrorMessage()
  expect(getByLabelText('Full name (optional)')).not.toHaveErrorMessage()
  expect(getByLabelText('Email address (optional)')).not.toHaveErrorMessage()
  expect(getByLabelText('Organisation name (optional)')).not.toHaveErrorMessage()
})

test('Server side field validation errors', async () => {
  mockRouter.push('?helpfulnessError=Select+how+helpful+you+found+the+FRF+website')

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: FeedbackProps
  }

  const { getByRole, getByLabelText } = render(
    Feedback.getLayout(<Feedback {...props} />, { ...props, isPreviewMode: false })
  )

  // Summary errors
  const alert = getByRole('alert', { name: 'There is a problem' })
  expect(within(alert).getByRole('link', { name: 'Select how helpful you found the FRF website' })).toHaveAttribute(
    'href',
    '#helpfulness'
  )

  // Field errors
  expect(
    getByRole('group', { name: 'How helpful was the Find, Recruit and Follow-up (FRF) website?' })
  ).toHaveErrorMessage('Error: Select how helpful you found the FRF website')
  expect(
    getByLabelText(
      'Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)'
    )
  ).not.toHaveErrorMessage()
  expect(getByLabelText('Full name (optional)')).not.toHaveErrorMessage()
  expect(getByLabelText('Email address (optional)')).not.toHaveErrorMessage()
  expect(getByLabelText('Organisation name (optional)')).not.toHaveErrorMessage()
})
