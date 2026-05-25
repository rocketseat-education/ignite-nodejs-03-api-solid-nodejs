import { prisma } from '@/lib/prisma'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { URL } from 'node:url'

import type { Environment } from 'vitest/environments'

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL env variable')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',

    //setup roda sempre que os testes iniciam
    async setup() {
        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema)

        console.log(databaseUrl)
        process.env.DATABASE_URL = databaseUrl

        execSync('npx prisma migrate deploy')
        //teardown roda sempre que os testes finalizam
        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,

                )

                await prisma.$disconnect
            }
        }
    }
}