import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

describe('Get User Metrics Use Case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let sut: GetUserMetricsUseCase

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)

    })

    afterEach(() => {
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

        const { checkInsCount } = await sut.execute({
            userId: 'user-id'
        })


        expect(checkInsCount).toBe(2)
    })

    
})
