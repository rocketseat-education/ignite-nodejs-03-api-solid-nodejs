import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUsers } from '@/http/utils/test/create-and-authenticate-users'
import { prisma } from '@/lib/prisma'

describe('Validate Check-in (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    it('should be able to validate a check-in', async () => {
        const { token } = await createAndAuthenticateUsers(app, true)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -17.8678697,
                longitude: -41.5012022
            }
        })

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id
            }
        })

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(204)

        checkIn = await prisma.checkIn.findFirstOrThrow({
            where: {
                id: checkIn.id
            }
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})