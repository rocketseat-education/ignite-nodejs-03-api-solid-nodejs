import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Create Gym', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to create a new gym', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-id',
      title: 'My Gym',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        id: 'gym-id',
      }),
    ])
  })
})
