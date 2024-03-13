import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { db } from '@/lib/drizzle/connection'
import { checkIns, gyms } from '@/lib/drizzle/schema'

describe('Check-in Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the total count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    await db
      .insert(checkIns)
      .values([
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ])
      .execute()

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })
})
