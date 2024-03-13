import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/lib/drizzle/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
