import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'

import { prisma } from '../lib/prisma'

jest.mock('../lib/prisma', () => ({
  prisma: mockDeep<PrismaClient>(),
}))

beforeEach(() => mockReset(prismaMock))

export const prismaMock = prisma as DeepMockProxy<PrismaClient>
