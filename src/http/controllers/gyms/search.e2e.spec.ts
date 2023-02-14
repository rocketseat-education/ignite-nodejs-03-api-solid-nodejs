import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeMember } from '@/test/factories/make-member'
import { prisma } from '@/lib/prisma'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const member = await makeMember()

    await prisma.gym.createMany({
      data: [
        {
          title: 'The JSON Gym',
          latitude: -27.2092052,
          longitude: -49.6401092,
        },
        {
          title: 'The BlackHole Gym',
          latitude: -27.2092052,
          longitude: -49.6401092,
        },
      ],
    })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('x-request-member', member.id)
      .query({
        q: 'JSON',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      gyms: [
        expect.objectContaining({
          title: 'The JSON Gym',
        }),
      ],
    })
  })
})
