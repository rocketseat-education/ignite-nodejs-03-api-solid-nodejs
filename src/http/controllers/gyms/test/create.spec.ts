import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { string } from 'zod'
import { createAndAuthenticateUsers } from '@/http/utils/test/create-and-authenticate-users'

describe('Create Gym (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    it('should be able to create a gym', async () => {
        const { token } = await createAndAuthenticateUsers(app, true)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript Gym',
                description: 'Some description',
                phone: '33999999999',
                latitude: -17.8678697,
                longitude: -41.5012022
            })

        expect(response.statusCode).toEqual(201)
    })
})