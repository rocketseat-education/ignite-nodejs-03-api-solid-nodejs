import type { Environment } from 'vitest'
import { randomUUID } from 'crypto'
import { env } from '@/env'

function generateDatabaseURL(schema: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide DATABASE_URL environment variable.')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.append('schema', schema)

  return url.toString()
}

/**
 * This environment is used to run e2e tests against real databases
 */
export default <Environment>{
  name: 'prisma',
  setup(global) {
    global.process.env.DATABASE_URL = 'test'

    return {
      teardown() {
        // called after all tests with this env have been run
      },
    }
  },
}
