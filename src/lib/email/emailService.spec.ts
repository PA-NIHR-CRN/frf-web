import { SES } from 'aws-sdk'
import * as fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'

import { EmailArgs, EmailService } from './emailService'

// Mock dependencies
jest.mock('aws-sdk')
jest.mock('fs')

describe('EmailService', () => {
  let sesClientMock: jest.Mocked<SES>
  let emailService: EmailService

  beforeEach(() => {
    sesClientMock = new SES() as jest.Mocked<SES>
    emailService = new EmailService(sesClientMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should send an email with the correct parameters', async () => {
    // Mock file system readFileSync
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync')
    readFileSyncMock.mockReturnValueOnce('HTML_CONTENT')
    readFileSyncMock.mockReturnValueOnce('TEXT_CONTENT')

    // Mock handlebars compile
    const compileMock = jest.spyOn(handlebars, 'compile')
    compileMock.mockReturnValueOnce((data) => `COMPILED_HTML(${JSON.stringify(data)})`)
    compileMock.mockReturnValueOnce((data) => `COMPILED_TEXT(${JSON.stringify(data)})`)

    // Mock SES sendEmail
    const sendEmailMock = jest.fn().mockResolvedValue({})
    sesClientMock.sendEmail = jest.fn().mockReturnValueOnce({ promise: sendEmailMock })

    const emailData: EmailArgs = {
      to: 'recipient@example.com',
      subject: 'Test Subject',
      templateName: 'support-request',
      templateData: { name: 'John Doe' },
    }

    await emailService.sendEmail(emailData)

    expect(readFileSyncMock).toHaveBeenCalledTimes(2)
    expect(readFileSyncMock).toHaveBeenNthCalledWith(
      1,
      path.resolve(process.cwd(), 'src/templates/emails/support-request.html.hbs'),
      { encoding: 'utf-8' }
    )
    expect(readFileSyncMock).toHaveBeenNthCalledWith(
      2,
      path.resolve(process.cwd(), 'src/templates/emails/support-request.text.hbs'),
      { encoding: 'utf-8' }
    )

    expect(compileMock).toHaveBeenCalledTimes(2)
    expect(compileMock).toHaveBeenNthCalledWith(1, 'HTML_CONTENT')
    expect(compileMock).toHaveBeenNthCalledWith(2, 'TEXT_CONTENT')

    expect(sesClientMock.sendEmail).toHaveBeenCalledTimes(1)
    expect(sesClientMock.sendEmail).toHaveBeenCalledWith({
      Source: 'Find, Recruit & Follow-Up <frfteam@nihr.ac.uk>',
      Destination: { ToAddresses: ['recipient@example.com'] },
      Message: {
        Subject: { Data: 'Test Subject', Charset: 'utf-8' },
        Body: {
          Text: { Data: 'COMPILED_TEXT({"name":"John Doe"})', Charset: 'utf-8' },
          Html: { Data: 'COMPILED_HTML({"name":"John Doe"})', Charset: 'utf-8' },
        },
      },
    })
  })
})
