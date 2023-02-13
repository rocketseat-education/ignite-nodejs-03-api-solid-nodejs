import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Register', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'My Gym',
      description: 'Some description to the gym!',
      phone: '11999999999',
      latitude: -27.2092052,
      longitude: -49.6401092,
    })

    expect(gym.title).toEqual('My Gym')
    expect(gym.id).toEqual(expect.any(String))
  })
})
