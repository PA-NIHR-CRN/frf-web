import * as yup from 'yup'

import { MAX_WORDS } from '@/constants/forms'

export const contactResearchSupportSchema = yup
  .object({
    enquiryType: yup.string().required('Is your enquiry about is required'),
    supportDescription: yup
      .string()
      .required('Please provide a summary of the support you need is required')
      .test(
        'maxWords',
        `Please provide a summary of the support you need exceeds the maximum of ${MAX_WORDS} words`,
        (val) => val.split(' ').length <= MAX_WORDS
      ),
    fullName: yup.string().required('Full name is required'),
    emailAddress: yup.string().email('Email address must be a valid email').required('Email address is required'),
    jobRole: yup.string().required('Job role is required'),
    organisationName: yup.string().required('Organisation name is required'),
    organisationType: yup.string().required('Is your organisation is required'),
    lcrn: yup.string().required('Which region will take a lead in supporting your research is required'),
    studyTitle: yup.string().optional(),
    protocolReference: yup.string().optional(),
    cpmsId: yup.string().optional(),
  })
  .required()
