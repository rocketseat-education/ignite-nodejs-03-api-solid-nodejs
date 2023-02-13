import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  // Node.js
  NODE_ENV: z
    .enum(['DEVELOPMENT', 'TEST', 'PRODUCTION'])
    .default('DEVELOPMENT'),
  PORT: z.coerce.number().default(3333),

  // Auth
  JWT_SECRET: z.string(),

  // Database
  DATABASE_URL: z.string().startsWith('postgresql://'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
