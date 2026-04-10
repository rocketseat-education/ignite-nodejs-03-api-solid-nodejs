import { describe, test, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistError } from '../errors/user-already-exist-error'
import { CreateGymUseCase } from '../create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Create Gym Use Case', () => {
    let gymRepository: InMemoryGymsRepository
    let sut: CreateGymUseCase

    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymRepository)
    })

    test('It should be able to create a gym', async () => {

        const { gym } = await sut.execute({
            title: 'Gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0
        })

        expect(gym.id).toEqual(expect.any(String))
    })
}
)
