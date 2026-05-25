import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { string } from 'zod'
import { createAndAuthenticateUsers } from '@/http/utils/test/create-and-authenticate-users'

describe('Search Gym (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    it('should be able to seach a gym by title', async () => {
        const { token } = await createAndAuthenticateUsers(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript Gym',
                description: 'Some description',
                phone: '33999999999',
                latitude: -17.8678697,
                longitude: -41.5012022
            })

        const  gyms  = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Typescript Gym',
                description: 'Some description',
                phone: '33999999999',
                latitude: -17.8678697,
                longitude: -41.5012022
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q: 'Javascript',
            })
            .set('Authorization', `Bearer ${token}`)
            .send()


        console.log(gyms.body)
        console.log('Response body gym:', response.body)
        expect(response.statusCode).toEqual(201)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Javascript Gym'
            })
        ])


    })
})