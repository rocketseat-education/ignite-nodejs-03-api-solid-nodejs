import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeMember } from '@/test/factories/make-member'
import { prisma } from '@/lib/prisma'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
    const member = await makeMember()

    await prisma.gym.createMany({
      data: [
        {
          title: 'Near Gym',
          latitude: -27.20912595706693,
          longitude: -49.63849005963418,
        },
        {
          title: 'Far Gym',
          latitude: -27.061262105200647,
          longitude: -49.53081478632995,
        },
      ],
    })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('x-request-member', member.id)
      .query({
        latitude: -27.2092052,
        longitude: -49.6401092,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      gyms: [
        expect.objectContaining({
          title: 'Near Gym',
        }),
      ],
    })
  })
})
