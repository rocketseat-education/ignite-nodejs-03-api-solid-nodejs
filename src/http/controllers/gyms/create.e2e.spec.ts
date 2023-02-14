import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeMember } from '@/test/factories/make-member'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const member = await makeMember()

    const response = await request(app.server)
      .post('/gyms')
      .set('x-request-member', member.id)
      .send({
        title: 'My Gym',
        description: 'Some description to the gym!',
        phone: '11999999999',
        latitude: -27.2092052,
        longitude: -49.6401092,
      })

    expect(response.statusCode).toEqual(201)
  })
})
