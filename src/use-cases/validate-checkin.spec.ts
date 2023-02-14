import { beforeEach, it, describe, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-checkin'
import { LateCheckInValidateError } from './errors/late-checkin-validate-error'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { NoPermissionError } from './errors/no-permission-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryMembersRepository: InMemoryMembersRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate Check In', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryMembersRepository = new InMemoryMembersRepository()

    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryMembersRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const member = await inMemoryMembersRepository.create({
      name: 'Admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      password_hash: 'some-hash',
    })

    const checkIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    vi.advanceTimersByTime(1000 * 60 * 10 /* 10 minutes */)

    await validateCheckInUseCase.execute({
      checkInId: checkIn.id,
      memberId: member.id,
    })

    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should be not able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const member = await inMemoryMembersRepository.create({
      name: 'Admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      password_hash: 'some-hash',
    })

    const checkIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    vi.advanceTimersByTime(1000 * 60 * 30 /* 30 minutes */)

    expect(
      validateCheckInUseCase.execute({
        checkInId: checkIn.id,
        memberId: member.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })

  it('should be not able to validate the check-in if member is not an admin', async () => {
    const member = await inMemoryMembersRepository.create({
      name: 'Not admin',
      email: 'not-admin@example.com',
      role: 'MEMBER',
      password_hash: 'some-hash',
    })

    const checkIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    expect(
      validateCheckInUseCase.execute({
        checkInId: checkIn.id,
        memberId: member.id,
      }),
    ).rejects.toBeInstanceOf(NoPermissionError)
  })
})
