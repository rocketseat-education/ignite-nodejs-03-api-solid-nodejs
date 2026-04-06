import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
    let usersRepositoy: InMemoryUsersRepository
    let sut: AuthenticateUseCase
    
    beforeEach(() => {
        usersRepositoy = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepositoy)
    })

    test('It should be able to authenticate an user', async () => {

        await usersRepositoy.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'john.doe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('It should not be able to authenticate an user with wrong email', async () => {
        await expect(async () => {
            await sut.execute({
                email: 'john.doe@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test('It should not be able to authenticate an user with wrong password', async () => {

        await usersRepositoy.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password_hash: await hash('123456', 6)
        })

        await expect(async () => {
            await sut.execute({
                email: 'john.doe@example.com',
                password: 'wrong-password'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
}
)
