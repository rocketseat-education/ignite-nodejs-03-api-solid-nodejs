import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from '../search-gym'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

describe('Fetch Nearby Gyms Use Case', () => {
    let gymsRepository: InMemoryGymsRepository
    let sut: FetchNearbyGymsUseCase

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)

    })

    afterEach(() => {
    })

    test('It should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: 'Near Gym',
            description: '',
            phone: '',
            latitude: -17.8890662,
            longitude: -41.5024726
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: '',
            phone: '',
            latitude: -17.3654781,
            longitude: -41.5646174
        })

        const { gyms } = await sut.execute({
            userLatitude: -17.8968175,
            userLongitude: -41.5017247,
        })

        //user -17.8968175,-41.5017247,15
        //near -17.8890662,-41.5024726,18
        //far -17.3654781,-41.5646174

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' }),
        ])
    })
})
