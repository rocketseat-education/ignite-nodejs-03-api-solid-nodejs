import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the profile', async () => {
    const member = await prisma.member.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: 'some_hash',
      },
    })

    const response = await request(app.server)
      .get('/me')
      .set('x-request-member', member.id)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
