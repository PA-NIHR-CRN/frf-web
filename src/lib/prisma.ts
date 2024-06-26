import { PrismaClient } from '@prisma/client'

// https://pris.ly/d/help/next-js-best-practices
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
