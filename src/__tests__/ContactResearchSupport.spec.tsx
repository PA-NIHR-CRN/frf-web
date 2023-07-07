import { GetServerSidePropsContext } from 'next'

import { render, screen, within } from '@/config/test-utils'
import { defaultMock } from '@/mocks/contactResearchSupport'
import ContactResearchSupport, {
  ContactResearchSupportProps,
  getServerSideProps,
} from '@/pages/contact-research-support'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeEach(() => {
  mockContentfulResponse(defaultMock)
})

test('Contact research support page - initial form', async () => {
  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  render(<ContactResearchSupport {...props} />)

  expect(screen.getByRole('heading', { name: 'Contact research support', level: 2 })).toBeInTheDocument()

  expect(
    screen.getByText(
      'The UK offers multiple services and teams of professionals who can support you with identifying appropriate data services or wider support with planning and delivering your study in the UK.'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'If you would like to access this support please complete the form below and a professional from the relevant research support infrastructure will get in touch to respond to your request'
    )
  ).toBeInTheDocument()

  expect(screen.getByRole('heading', { name: 'About your enquiry', level: 3 })).toBeInTheDocument()

  // Is your enquiry about
  expect(screen.getByLabelText('Is your enquiry about')).toBeInTheDocument()
  expect(screen.getByLabelText('Identifying appropriate data services')).toBeInTheDocument()
  expect(screen.getByLabelText('General enquiry about research support')).toBeInTheDocument()

  // Please provide a summary of the support you need
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toBeInTheDocument()
  expect(screen.getByText('You have 500 characters remaining')).toBeInTheDocument()

  // Fieldset - About you
  const about = within(screen.getByRole('group', { name: 'About you' }))

  // Name
  expect(about.getByLabelText('Full name')).toBeInTheDocument()

  // Email
  expect(about.getByLabelText('Email address')).toBeInTheDocument()

  // Phone
  expect(about.getByLabelText('Phone number')).toBeInTheDocument()
  expect(about.getByText('For international numbers please include the country code')).toBeInTheDocument()

  // Job
  expect(about.getByLabelText('Job role')).toBeInTheDocument()

  // Org name
  expect(about.getByLabelText('Organisation name')).toBeInTheDocument()

  // Org type
  expect(about.getByLabelText('Is your organisation')).toBeInTheDocument()
  expect(about.getByLabelText('Commercial')).toBeInTheDocument()
  expect(about.getByLabelText('Non-commercial')).toBeInTheDocument()

  // Fieldset - About your research
  const research = within(screen.getByRole('group', { name: 'About your research' }))

  // Region
  const regionSelect = research.getByLabelText('Which region will take a lead in supporting your research?')
  expect(regionSelect).toBeInTheDocument()
  expect(
    research.getByText(
      'This is the region within which the Chief Investigator or Clinical Trials Unit (CTU) is based (or for Commercial Studies the lead region selected by the Sponsor).'
    )
  ).toBeInTheDocument()

  expect(research.getByText(/If you are unsure which region to select, please visit/)).toBeInTheDocument()
  expect(research.getByText(/Local Clinical Research Networks/)).toHaveAttribute('href', '#')
  expect(research.getByText(/or email supportmystudy@nihr.ac.uk/)).toBeInTheDocument()

  expect(within(regionSelect).getByText('-')).toHaveAttribute('selected')
  expect(within(regionSelect).getByText('-')).toHaveValue('')
  expect(within(regionSelect).getByText('Mock region 1')).toHaveValue('mockregion1@nihr.ac.uk')
  expect(within(regionSelect).getByText('Mock region 2')).toHaveValue('mockregion2@nihr.ac.uk')
  expect(within(regionSelect).queryByText('Unknown')).not.toBeInTheDocument()

  // Study title (optional)
  expect(research.getByLabelText('Study title (optional)')).toBeInTheDocument()

  // Protocol reference (optional)
  expect(research.getByLabelText('Protocol reference (optional)')).toBeInTheDocument()

  // CPMS ID (optional)
  expect(research.getByLabelText('CPMS ID (optional)')).toBeInTheDocument()
  expect(
    research.getByText(
      'A unique study identifier given to all eligible studies recorded on the NIHR CRN Central Portfolio Management System (CPMS) database.'
    )
  ).toBeInTheDocument()

  // Form CTAs
  expect(screen.getByText('We will email you a copy of this form for your records')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Save and continue' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Cancel' })).toHaveAttribute('href', '/')
})

// test.skip('Contact research support page - successful submission', async () => {})

// test.skip('Contact research support page - failed submission (fatal)', async () => {})

// test.skip('Contact research support page - with client side validation errors', async () => {})

// test.skip('Contact research support page - with server side validation errors', async () => {})
