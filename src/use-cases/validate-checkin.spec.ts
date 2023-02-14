import { beforeEach, it, describe, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-checkin'
import { LateCheckInValidateError } from './errors/late-checkin-validate-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate Check In', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()

    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const checkIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    vi.advanceTimersByTime(1000 * 60 * 10 /* 10 minutes */)

    await validateCheckInUseCase.execute({
      checkInId: checkIn.id,
    })

    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should be not able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const checkIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    vi.advanceTimersByTime(1000 * 60 * 30 /* 30 minutes */)

    expect(
      validateCheckInUseCase.execute({
        checkInId: checkIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
