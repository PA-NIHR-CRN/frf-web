import crypto from 'crypto'

export const createReferenceNumber = () => crypto.randomBytes(4).toString('hex').slice(0, 5).toUpperCase()
