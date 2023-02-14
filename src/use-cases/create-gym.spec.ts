import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { NoPermissionError } from './errors/no-permission-error'

let inMemoryGymsRepository: InMemoryGymsRepository
let inMemoryMembersRepository: InMemoryMembersRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    inMemoryMembersRepository = new InMemoryMembersRepository()
    createGymUseCase = new CreateGymUseCase(
      inMemoryGymsRepository,
      inMemoryMembersRepository,
    )
  })

  it('should be able to create a new gym', async () => {
    const member = await inMemoryMembersRepository.create({
      name: 'Admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      password_hash: 'some-hash',
    })

    const { gym } = await createGymUseCase.execute({
      memberId: member.id,
      title: 'My Gym',
      description: 'Some description to the gym!',
      phone: '11999999999',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    expect(gym.title).toEqual('My Gym')
    expect(gym.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new gym if member is not an admin', async () => {
    const member = await inMemoryMembersRepository.create({
      name: 'Not admin',
      email: 'not-admin@example.com',
      role: 'MEMBER',
      password_hash: 'some-hash',
    })

    expect(
      createGymUseCase.execute({
        memberId: member.id,
        title: 'My Gym',
        description: 'Some description to the gym!',
        phone: '11999999999',
        latitude: -27.2092052,
        longitude: -49.6401092,
      }),
    ).rejects.toBeInstanceOf(NoPermissionError)
  })
})
