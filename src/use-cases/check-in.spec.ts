import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

describe('CheckIn Use Case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let sut: CheckInUseCase

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    test('It should be able to create a check-in', async () => {

        const { checkIn } = await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })


        expect(checkIn.id).toEqual(expect.any(String))
    })

}
)
