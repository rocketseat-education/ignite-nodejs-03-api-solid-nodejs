import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeMember } from '@/test/factories/make-member'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the profile', async () => {
    const member = await makeMember()

    const response = await request(app.server)
      .get('/me')
      .set('x-request-member', member.id)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
