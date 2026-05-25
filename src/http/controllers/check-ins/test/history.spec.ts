import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { string } from 'zod'
import { createAndAuthenticateUsers } from '@/http/utils/test/create-and-authenticate-users'
import { prisma } from '@/lib/prisma'

describe('History Check-in (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    it('should be able to list history of check-ins', async () => {
        const { token } = await createAndAuthenticateUsers(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -17.8678697,
                longitude: -41.5012022
            }
        })

        const checkIns = await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                }
            ]
        })

        const response = await request(app.server)
            .get(`/check-ins/history`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        console.log(response.body)
        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            })
        ]
        )
    })
})