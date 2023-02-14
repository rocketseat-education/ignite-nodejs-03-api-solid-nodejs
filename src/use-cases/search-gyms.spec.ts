import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search Gyms', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-id',
      title: 'The JSON Body',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    await inMemoryGymsRepository.create({
      id: 'gym-id',
      title: 'Another Gym',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    const { gyms } = await searchGymsUseCase.execute({
      title: 'JSON',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        id: 'gym-id',
      }),
    ])
  })

  it('should be able to fetch paginated search for gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        id: `gym-${i}`,
        title: 'The JSON Body',
        latitude: -27.2092052,
        longitude: -49.6401092,
      })
    }

    const { gyms } = await searchGymsUseCase.execute({
      title: 'JSON',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        id: 'gym-21',
      }),
      expect.objectContaining({
        id: 'gym-22',
      }),
    ])
  })
})
