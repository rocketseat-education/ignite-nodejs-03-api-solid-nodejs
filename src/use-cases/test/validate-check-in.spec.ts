import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInCase } from '../validate-check-in'
import { ResourceNotFound } from '../errors/resource-not-found-error'

describe('Validate CheckIn Use Case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let sut: ValidateCheckInCase

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('It should be able to validate the check-in', async () => {
        //vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })


        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    test('It should not be able to validate an existent checkin', async () => {

        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)

    })

    test('It should not be able to validate a check-in after 20 minutes of its creations', async () => {
        vi.setSystemTime(new Date(2026, 0, 1, 13, 40))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const minutesForward = 1000 * 60 * 21

        vi.advanceTimersByTime(minutesForward)

        await expect(() => sut.execute({
            checkInId: createdCheckIn.id
        })).rejects.toBeInstanceOf(Error)
    })
})
