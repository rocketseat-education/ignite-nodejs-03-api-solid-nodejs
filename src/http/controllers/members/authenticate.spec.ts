import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/members').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'john@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
