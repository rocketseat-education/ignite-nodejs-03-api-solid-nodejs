import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { GetMemberProfileUseCase } from './get-member-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryMembersRepository: InMemoryMembersRepository
let getMemberProfileUseCase: GetMemberProfileUseCase

describe('Get Member Profile', () => {
  beforeEach(() => {
    inMemoryMembersRepository = new InMemoryMembersRepository()
    getMemberProfileUseCase = new GetMemberProfileUseCase(
      inMemoryMembersRepository,
    )
  })

  it('should be able to get member profile', async () => {
    await inMemoryMembersRepository.create({
      id: 'member-1',
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'member-password',
    })

    const { member } = await getMemberProfileUseCase.execute({
      memberId: 'member-1',
    })

    expect(member.name).toEqual('John Doe')
  })

  it('should not be able to get non-existing member profile', async () => {
    expect(
      getMemberProfileUseCase.execute({
        memberId: 'member-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
