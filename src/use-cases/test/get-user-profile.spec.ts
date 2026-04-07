import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from '../get-user-profile'
import { ResourceNotFound } from '../errors/resource-not-found'

describe('Get User Profile Use Case', () => {
    let usersRepositoy: InMemoryUsersRepository
    let sut: GetUserProfileUseCase
    
    beforeEach(() => {
        usersRepositoy = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepositoy)
    })

    test('It should be able to get user profile', async () => {

        const createdUser = await usersRepositoy.create({
            id: 'user-id',
            name: 'John Doe',
            email: 'john.doe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
    })

    test('It should not be able to get user profile with invalid ID', async () => {
        await expect(async () => {
            await sut.execute({
                userId: 'invalid-user-id'
            })
        }).rejects.toBeInstanceOf(ResourceNotFound)
    })

}
)
