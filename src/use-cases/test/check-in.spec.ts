import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'

describe('CheckIn Use Case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let gymsRepository: InMemoryGymsRepository
    let sut: CheckInUseCase

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.items.push({
            id: 'gym-id',
            title: 'Gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('It should be able to create a check-in', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))



        const { checkIn } = await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
            userLatitude: 0,
            userLongitude: 0,
        })


        expect(checkIn.id).toEqual(expect.any(String))
    })

    test('It should not be able to create a check-in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(async () => {
            await sut.execute({
                userId: 'user-id',
                gymId: 'gym-id',
                userLatitude: 0,
                userLongitude: 0,
            })
        }).rejects.toBeInstanceOf(Error)

    })

    test('It should not be able to create a check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    test('It should not be able to check in on distant gyn', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await gymsRepository.items.push({
            id: 'gym-id2',
            title: 'Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-17.8354383),
            longitude: new Decimal(-41.508423),
        })

        //-17.8354383,-41.508423

        await expect( () => sut.execute({
            userId: 'user-id',
            gymId: 'gym-id2',
            userLatitude: -17.8678697,
            userLongitude: -41.5012022,
        })).rejects.toBeInstanceOf(Error)
    }
    )
})
