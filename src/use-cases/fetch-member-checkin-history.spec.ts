import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchMemberCheckInHistoryUseCase } from './fetch-member-checkin-history'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let fetchMemberCheckInHistoryUseCase: FetchMemberCheckInHistoryUseCase

describe('Fetch Member Check-in History', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()

    fetchMemberCheckInHistoryUseCase = new FetchMemberCheckInHistoryUseCase(
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to fetch member check-ins', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    const { checkIns } = await fetchMemberCheckInHistoryUseCase.execute({
      memberId: 'member-1',
      page: 1,
    })

    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-1',
      }),
    ])
  })

  it('should be able fetch paginated member check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-${i}`,
        member_id: `member-1`,
      })
    }

    const { checkIns } = await fetchMemberCheckInHistoryUseCase.execute({
      memberId: 'member-1',
      page: 2,
    })

    expect(checkIns.length).toEqual(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        member_id: 'member-1',
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        member_id: 'member-1',
        gym_id: 'gym-22',
      }),
    ])
  })
})
