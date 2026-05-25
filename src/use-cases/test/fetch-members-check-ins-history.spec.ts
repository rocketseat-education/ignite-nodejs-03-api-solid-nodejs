import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchMembersCheckInsHistoryUseCase } from '../fetch-members-check-ins-history'

describe('Fetch Members Check-In History Use Case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let sut: FetchMembersCheckInsHistoryUseCase

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchMembersCheckInsHistoryUseCase(checkInsRepository)
    })

    test('It should be able to fetch check-in history', async () => {

        await checkInsRepository.create({
            id: 'check-in-01',
            gym_id: 'gym-id-01',
            user_id: 'user-id',
        })

        await checkInsRepository.create({
            id: 'check-in-02',
            gym_id: 'gym-id-02',
            user_id: 'user-id',
        })

        const { checkIns } = await sut.execute({
            userId: 'user-id',
            page: 1
        })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-id-01' }),
            expect.objectContaining({ gym_id: 'gym-id-02' }),
        ])
    })

    test('It should be able to fetch paginated check-in history', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                id: `check-in-${i}`,
                gym_id: `gym-id-${i}`,
                user_id: 'user-id',
            })
        }


        const { checkIns } = await sut.execute({
            userId: 'user-id',
            page: 2
        })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-id-21' }),
            expect.objectContaining({ gym_id: 'gym-id-22' }),
        ])
    })
})
