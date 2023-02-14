import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeMember } from '@/test/factories/make-member'
import { prisma } from '@/lib/prisma'

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate the check-in', async () => {
    const member = await makeMember({
      role: 'ADMIN',
    })

    const gym = await prisma.gym.create({
      data: {
        title: 'The JSON Body',
        latitude: -27.2092052,
        longitude: -49.6401092,
      },
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        member_id: member.id,
      },
    })

    const response = await request(app.server)
      .patch(`/checkins/${checkIn.id}/validate`)
      .set('x-request-member', member.id)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
