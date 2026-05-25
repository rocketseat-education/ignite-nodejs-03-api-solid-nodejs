import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { string } from 'zod'
import { createAndAuthenticateUsers } from '@/http/utils/test/create-and-authenticate-users'

describe('Profile (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    it('should be able to get user profile', async () => {


        const { token } = await createAndAuthenticateUsers(app)


        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user)
            .toEqual(
                expect.objectContaining({
                    email: 'johndoe@email.com'
                })
            )
    })
})