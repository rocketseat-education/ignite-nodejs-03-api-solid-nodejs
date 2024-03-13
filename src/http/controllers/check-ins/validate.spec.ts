import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { db } from '@/lib/drizzle/connection'
import { checkIns, gyms } from '@/lib/drizzle/schema'

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const user = await db.query.users.findFirst()

    if (!user) {
      throw new Error('User not found')
    }

    const [gym] = await db
      .insert(gyms)
      .values({
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .returning()

    const [checkIn] = await db
      .insert(checkIns)
      .values({ gym_id: gym.id, user_id: user.id })
      .returning()

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    const checkInDB = await db.query.checkIns.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.id, checkIn.id)
      },
    })

    expect(checkInDB?.validated_at).toEqual(expect.any(Date))
  })
})
