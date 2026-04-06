import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

describe('CheckIn Use Case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let sut: CheckInUseCase

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)

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
        })


        expect(checkIn.id).toEqual(expect.any(String))
    })

    test('It should not be able to create a check-in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        await expect(async () => {
            await sut.execute({
                userId: 'user-id',
                gymId: 'gym-id',
            })
        }).rejects.toBeInstanceOf(Error)

    })

    test('It should not be able to create a check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        expoect(checkIn.id).toEqual(expect.any(String))

    })

}
)
