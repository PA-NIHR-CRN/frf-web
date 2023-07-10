import axios from 'axios'

export interface ReCaptchaAssessmentResponse {
  name: string
  event: {
    token: string
    siteKey: string
    userAgent: string
    userIpAddress: string
    expectedAction: string
    hashedAccountId: string
    express: boolean
    requestedUri: string
    wafTokenAssessment: boolean
    ja3: string
    headers: string[]
    firewallPolicyEvaluation: boolean
  }
  riskAnalysis: {
    score: number
    reasons: string[]
    extendedVerdictReasons: string[]
  }
  tokenProperties: {
    valid: boolean
    invalidReason: string
    hostname: string
    androidPackageName: string
    iosBundleId: string
    action: string
    createTime: string
  }
}

export class ReCaptchaService {
  constructor(
    private config: {
      // Google Cloud Project Id
      projectId: string

      // Google Cloud API key for authentication
      apiKey: string

      // ReCaptcha Site Key
      siteKey: string
    }
  ) {}

  async validateToken(token: string, expectedAction = 'form_submit') {
    const { projectId, apiKey, siteKey } = this.config

    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`

    try {
      const {
        data: {
          tokenProperties: { valid },
        },
      } = await axios.post<ReCaptchaAssessmentResponse>(url, {
        event: {
          token,
          siteKey,
          expectedAction,
        },
      })

      return { valid }
    } catch (error) {
      console.log(error)
      return { valid: false }
    }
  }
}
