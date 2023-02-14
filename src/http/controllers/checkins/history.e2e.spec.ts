import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeMember } from '@/test/factories/make-member'
import { prisma } from '@/lib/prisma'

describe('Check-in History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch the check-in history', async () => {
    const member = await makeMember()

    const gym = await prisma.gym.create({
      data: {
        title: 'The JSON Body',
        latitude: -27.2092052,
        longitude: -49.6401092,
      },
    })

    await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        member_id: member.id,
        created_at: '2023-01-01T16:00:00.000Z',
      },
    })

    await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        member_id: member.id,
        created_at: '2023-01-02T16:00:00.000Z',
      },
    })

    const response = await request(app.server)
      .get(`/checkins/history`)
      .set('x-request-member', member.id)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      checkIns: expect.arrayContaining([
        expect.objectContaining({
          created_at: '2023-01-01T16:00:00.000Z',
        }),
        expect.objectContaining({
          created_at: '2023-01-02T16:00:00.000Z',
        }),
      ]),
    })
  })
})
