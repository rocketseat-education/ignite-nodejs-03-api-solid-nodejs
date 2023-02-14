import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-checkin'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate Check In', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()

    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to check-in', async () => {
    const checkIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    await validateCheckInUseCase.execute({
      checkInId: checkIn.id,
    })

    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })
})
