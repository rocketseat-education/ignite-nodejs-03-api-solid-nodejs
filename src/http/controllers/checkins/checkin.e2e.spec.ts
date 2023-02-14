import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeMember } from '@/test/factories/make-member'
import { prisma } from '@/lib/prisma'

describe('Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to check in', async () => {
    const member = await makeMember()

    const gym = await prisma.gym.create({
      data: {
        title: 'The JSON Body',
        latitude: -27.2092052,
        longitude: -49.6401092,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/checkin`)
      .set('x-request-member', member.id)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401092,
      })

    expect(response.statusCode).toEqual(201)
  })
})
