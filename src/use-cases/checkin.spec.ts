import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './checkin'
import { InvalidDistanceError } from './errors/invalid-distance-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('Check In', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()

    checkInUseCase = new CheckInUseCase(
      inMemoryGymsRepository,
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to check-in', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-id',
      title: 'My Gym',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-id',
      memberId: 'member-id',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check-in', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-id',
      title: 'My Gym',
      latitude: -27.061262105200647,
      longitude: -49.53081478632995,
    })

    expect(
      checkInUseCase.execute({
        gymId: 'gym-id',
        memberId: 'member-id',
        latitude: -27.2092052,
        longitude: -49.6401092,
      }),
    ).rejects.toBeInstanceOf(InvalidDistanceError)
  })
})
