import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { GetMemberMetricsUseCase } from './get-member-metrics'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let getMemberMetricsUseCase: GetMemberMetricsUseCase

describe('Get Member Metrics', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()

    getMemberMetricsUseCase = new GetMemberMetricsUseCase(
      inMemoryCheckInsRepository,
    )
  })

  it('should be able get member metrics', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-1',
    })

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-1',
      member_id: 'member-2',
    })

    const { checkInsCount } = await getMemberMetricsUseCase.execute({
      memberId: 'member-1',
    })

    expect(checkInsCount).toEqual(1)
  })
})
