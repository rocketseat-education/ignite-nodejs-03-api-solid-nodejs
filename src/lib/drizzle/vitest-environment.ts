import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import postgres from 'postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { drizzle } from 'drizzle-orm/postgres-js'
import { sql } from 'drizzle-orm'

function generateDatabaseURL(database: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.pathname = `/${database}`

  return url.toString()
}

async function runMigrations(databaseURL: string) {
  const connection = postgres(databaseURL, { max: 1 })
  const db = drizzle(connection)

  await migrate(db, { migrationsFolder: 'drizzle' })

  await connection.end()
}

async function createDatabase(databaseURL: string, database: string) {
  const connection = postgres(databaseURL, { max: 1 })
  const db = drizzle(connection)

  await db.execute(sql.raw(`CREATE DATABASE "${database}"`))

  await connection.end()
}

async function dropDatabase(databaseURL: string, database: string) {
  const connection = postgres(databaseURL, { max: 1 })
  const db = drizzle(connection)

  await db.execute(sql.raw(`DROP DATABASE "${database}" WITH (FORCE)`))

  await connection.end()
}

export default <Environment>{
  name: 'drizzle',
  transformMode: 'ssr',
  async setup() {
    const defaultURL = process.env.DATABASE_URL!
    const database = randomUUID()
    const databaseURL = generateDatabaseURL(database)

    process.env.DATABASE_URL = databaseURL

    await createDatabase(defaultURL, database)
    await runMigrations(process.env.DATABASE_URL)

    return {
      async teardown() {
        await dropDatabase(defaultURL, database)
      },
    }
  },
}
