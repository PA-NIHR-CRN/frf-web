import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('FRF Env Info: ', JSON.parse(JSON.stringify(process.env)))

  return res.status(200).json(process.env)
}
