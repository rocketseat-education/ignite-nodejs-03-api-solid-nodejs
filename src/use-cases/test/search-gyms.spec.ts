import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from '../search-gym'

describe('Search Gyms Use Case', () => {
    let gymsRepository: InMemoryGymsRepository
    let sut: SearchGymUseCase

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)

    })

    afterEach(() => {
    })

    test('It should be able to search gyms by query', async () => {

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0
        })

        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0
        })

        const { gyms } = await sut.execute({
            query: 'TypeScript',
            page: 1
        })


        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'TypeScript Gym' }),
        ])
    })

    test('It should be able to fetch paginated gyms', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Gym ${i}`,
                description: '',
                phone: '',
                latitude: 0,
                longitude: 0
            })
        }


        const { gyms } = await sut.execute({
            query: 'Gym',
            page: 2
        })


        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Gym 21' }),
            expect.objectContaining({ title: 'Gym 22' }),
        ])
    })
})
