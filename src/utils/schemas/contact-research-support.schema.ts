import * as z from 'zod'

export const contactResearchSupportSchema = z.object({
  enquiryType: z.string(),
  supportDescription: z.string(),
  fullName: z.string(),
  emailAddress: z.string().email(),
  jobRole: z.string(),
  organisationName: z.string(),
  organisationType: z.string(),
  lcrn: z.string(),
  studyTitle: z.string(),
  protocolReference: z.string(),
  cpmsId: z.string(),
})

// export const contactResearchSupportSchema = yup
//   .object()
//   .shape({
//     enquiryType: yup.string().required('Is your enquiry about is required'),
//     supportDescription: yup.string().required('Please provide a summary of the support you need is required'),
//     fullName: yup.string().required('Full name is required'),
//     emailAddress: yup.string().email('Email address must be a valid email').required('Email address is required'),
//     jobRole: yup.string().required('Job role is required'),
//     organisationName: yup.string().required('Organisation name is required'),
//     organisationType: yup.string().required('Is your organisation is required'),
//     lcrn: yup.string().required('Which region will take a lead in supporting your research is required'),
//     studyTitle: yup.string(),
//     protocolReference: yup.string(),
//     cpmsId: yup.string(),
//   })
//   .required()
