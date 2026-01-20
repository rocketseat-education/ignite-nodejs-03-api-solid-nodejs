import { env } from '@/env'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'prisma/generated/prisma/client'

export const schema =
  new URL(env.DATABASE_URL).searchParams.get('schema') || 'public'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL }, { schema })

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
