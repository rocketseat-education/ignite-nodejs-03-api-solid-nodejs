import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { string } from 'zod'
import { createAndAuthenticateUsers } from '@/http/utils/test/create-and-authenticate-users'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUsers(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -17.8678697,
                longitude: -41.5012022
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -17.8678697,
                longitude: -41.5012022
            })

        expect(response.statusCode).toEqual(201)
    })
})