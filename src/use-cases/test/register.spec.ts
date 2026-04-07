import { describe, test, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistError } from './errors/user-already-exist'

describe('Register Use Case', () => {
    let userRepository: InMemoryUsersRepository
    let registerUseCase: RegisterUseCase

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUseCase(userRepository)
    })

    test('It should be able to register an user', async () => {

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('It should hash user password upon registration', async () => {

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456'
        })

        const isPassordHashed = await compare('123456', user.password_hash)

        expect(isPassordHashed).toBe(true)
    })

    test('It should not be able to create an user with an existing email', async () => {
        const email = 'john.doe@example.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        })

        await expect(() => registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistError)
    })
}
)
